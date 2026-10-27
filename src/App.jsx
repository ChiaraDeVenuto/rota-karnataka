import { useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { CATEGORIES, START_CITIES } from './data/places.js';
import { buildItinerary, haversine } from './lib/plan.js';
import './App.css';

// Marker without external images (avoids the leaflet icon bug with bundlers)
const dotIcon = (color) =>
  L.divIcon({
    className: 'rota-dot',
    html: `<span style="background:${color}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const DAY_COLORS = ['#c2410c', '#0f766e', '#7c3aed', '#b91c1c', '#1d4ed8', '#a16207', '#15803d'];

const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m}min`);
const fmtInr = (n) => '₹' + n.toLocaleString('en-IN');

export default function App() {
  const [startId, setStartId] = useState('bengaluru');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState(['heritage', 'nature']);
  const [budget, setBudget] = useState(25000);
  const [hasTransport, setHasTransport] = useState(true);
  const [plan, setPlan] = useState(null);

  const toggleInterest = (cat) =>
    setInterests((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));

  const generate = () => {
    const safeInterests = interests.length ? interests : Object.keys(CATEGORIES);
    setPlan(
      buildItinerary({ startId, days, interests: safeInterests, budget, hasTransport, perDay: 3 })
    );
  };

  const allPoints = useMemo(() => {
    if (!plan) return [];
    return plan.itinerary.flatMap((d) => d.stops);
  }, [plan]);

  const origin = plan?.origin;
  const bounds = useMemo(() => {
    const pts = origin ? [origin, ...allPoints] : [];
    return pts.length > 1 ? pts.map((p) => [p.lat, p.lng]) : null;
  }, [origin, allPoints]);

  return (
    <div className="app">
      <header className="hero">
        <div className="brand">
          <span className="logo">Rota</span> Karnataka
        </div>
        <p className="tagline">
          AI travel planner for Karnataka: optimized itineraries built from your interests, days and
          budget. 65 real destinations, routes calculated on distance.
        </p>
      </header>

      <section className="panel controls">
        <div className="field">
          <label>Start from</label>
          <select value={startId} onChange={(e) => setStartId(e.target.value)}>
            {START_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Days: {days}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Total budget: {fmtInr(budget)}</label>
          <input
            type="range"
            min="5000"
            max="80000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="field interests">
          <label>Interests</label>
          <div className="chips">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                className={`chip ${interests.includes(key) ? 'on' : ''}`}
                onClick={() => toggleInterest(key)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="field checkbox">
          <label>
            <input
              type="checkbox"
              checked={hasTransport}
              onChange={(e) => setHasTransport(e.target.checked)}
            />
            I have a car / driver on hire
          </label>
        </div>

        <button className="cta" onClick={generate} type="button">
          Build my itinerary
        </button>
      </section>

      {plan && (
        <>
          <section className="summary">
            <div className="stat">
              <span className="num">{plan.itinerary.length}</span>
              <span className="lbl">days</span>
            </div>
            <div className="stat">
              <span className="num">{plan.placeCount}</span>
              <span className="lbl">stops</span>
            </div>
            <div className="stat">
              <span className="num">{plan.totalKm}</span>
              <span className="lbl">km total</span>
            </div>
            <div className="stat">
              <span className="num">{fmtMin(plan.totalDriveMin)}</span>
              <span className="lbl">driving</span>
            </div>
            <div className={`stat ${plan.overBudget ? 'warn' : ''}`}>
              <span className="num">{fmtInr(plan.totalCost)}</span>
              <span className="lbl">of {fmtInr(plan.budget)} budget</span>
            </div>
          </section>

          {plan.overBudget && (
            <p className="alert">
              Estimate runs {fmtInr(plan.totalCost - plan.budget)} over budget: drop a few entry fees
              or raise the limit.
            </p>
          )}

          <div className="split">
            <div className="days">
              {plan.itinerary.map((d) => (
                <article className="day" key={d.day}>
                  <header>
                    <h3>
                      <span className="daynum" style={{ background: DAY_COLORS[(d.day - 1) % 7] }}>
                        {d.day}
                      </span>
                      Day {d.day}
                    </h3>
                    <span className="meta">
                      {fmtMin(d.driveMin)} driving · {d.transportKm} km
                    </span>
                  </header>
                  <div className="route">
                    <span className="from">{d.fromName}</span>
                    <ol>
                      {d.legs.map((leg, i) => (
                        <li key={i}>
                          <strong>{leg.to.name}</strong>
                          <span className="sub">
                            {leg.to.region} · {leg.km} km ({leg.driveMin} min) · entry{' '}
                            {leg.to.cost ? fmtInr(leg.to.cost) : 'free'}
                          </span>
                          <p className="blurb">{leg.to.blurb}</p>
                        </li>
                      ))}
                    </ol>
                    {d.returnKm > 0 && (
                      <p className="back">
                        Back to {plan.origin.name}: {d.returnKm} km ({d.returnMin} min)
                      </p>
                    )}
                  </div>
                  <footer className="costs">
                    <span>Entries {fmtInr(d.costs.entries)}</span>
                    <span>Food {fmtInr(d.costs.food)}</span>
                    <span>Transport {fmtInr(d.costs.transport)}</span>
                    {d.costs.stay > 0 && <span>Stay {fmtInr(d.costs.stay)}</span>}
                    <strong>Total {fmtInr(d.costs.total)}</strong>
                  </footer>
                </article>
              ))}
            </div>

            <div className="mapwrap">
              <MapContainer
                bounds={bounds ? L.latLngBounds(bounds) : undefined}
                boundsOptions={{ padding: [40, 40] }}
                center={[origin.lat, origin.lng]}
                zoom={7}
                className="map"
                scrollWheelZoom
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {origin && (
                  <Marker position={[origin.lat, origin.lng]} icon={dotIcon('#111827')}>
                    <Popup>
                      <strong>Start: {origin.name}</strong>
                    </Popup>
                  </Marker>
                )}

                {plan.itinerary.map((d) => {
                  const color = DAY_COLORS[(d.day - 1) % 7];
                  const path = [
                    [origin.lat, origin.lng],
                    ...d.legs.map((l) => [l.to.lat, l.to.lng]),
                    ...(d.returnKm > 0 ? [[origin.lat, origin.lng]] : []),
                  ];
                  return (
                    <div key={`day-${d.day}`}>
                      <Polyline
                        positions={path}
                        pathOptions={{ color, weight: 4, opacity: 0.85, dashArray: '8 6' }}
                      />
                      {d.stops.map((s) => (
                        <Marker
                          key={`${d.day}-${s.id}`}
                          position={[s.lat, s.lng]}
                          icon={dotIcon(color)}
                        >
                          <Popup>
                            <strong>
                              D{d.day} · {s.name}
                            </strong>
                            <br />
                            {s.blurb}
                            <br />
                            {s.region} · {haversine(origin, s).toFixed(0)} km from start
                          </Popup>
                        </Marker>
                      ))}
                    </div>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </>
      )}

      {!plan && (
        <section className="empty">
          <p>
            Set your start city, days and interests, then build. Example: 3 days from Bengaluru with
            heritage and nature gets you Mysuru, the Cauvery falls and the Hoysala temples.
          </p>
        </section>
      )}

      <footer className="foot">
        Rota Karnataka · entry for Kannada Digital Innovation Hackathon 2026 (PS 06) · HackerRank
        Campus Crew × NIE Mysuru
      </footer>
    </div>
  );
}
