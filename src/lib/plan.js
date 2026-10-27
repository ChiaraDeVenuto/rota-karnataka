// Rota Karnataka — itinerary planning engine
// Zero dependencies. Pipeline:
// 1) content-based scoring on interests  2) top-N selection
// 3) route ordering (nearest-neighbour + 2-opt)  4) splitting into days
// 5) budget estimate on real distances (Haversine)

import { PLACES, DAILY, START_CITIES } from '../data/places.js';

const START_MAP = Object.fromEntries(START_CITIES.map((c) => [c.id, c]));
const R = 6371;
const toRad = (deg) => (deg * Math.PI) / 180;
const AVG_SPEED_KMH = 42; // average speed on Indian national/state highways
const MAX_DRIVE_MIN_PER_DAY = 330; // at most 5.5h of driving per day

export function haversine(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function driveHours(from, to) {
  return haversine(from, to) / AVG_SPEED_KMH;
}

/** Content-based score: interest match plus a small generic bonus. */
function scoreFor(place, interests, hasTransport) {
  const hit = interests.includes(place.cat) ? 1 : 0;
  // Without a car, remote places lose value (hard to reach)
  const reachableByTransit = ['Bengaluru', 'Mysuru', 'Costa', 'Hoysala'].includes(place.region);
  const remotePenalty = hasTransport || reachableByTransit ? 0 : 0.3;
  return hit + 0.12 - remotePenalty;
}

/** Best order: nearest-neighbour from the start, then a 2-opt cleanup pass. */
function orderRoute(origin, points) {
  if (points.length <= 1) return points.slice();
  const remaining = [...points];
  const route = [];
  let cur = origin;

  while (remaining.length) {
    let bestIdx = 0;
    let bestD = Infinity;
    remaining.forEach((p, i) => {
      const d = haversine(cur, p);
      if (d < bestD) {
        bestD = d;
        bestIdx = i;
      }
    });
    cur = remaining[bestIdx];
    route.push(cur);
    remaining.splice(bestIdx, 1);
  }

  const legs = (arr) => {
    let total = 0;
    let p = origin;
    for (const n of arr) {
      total += haversine(p, n);
      p = n;
    }
    return total;
  };

  let improved = true;
  let guard = 0;
  while (improved && guard < 40) {
    improved = false;
    guard += 1;
    for (let i = 0; i < route.length - 1; i += 1) {
      for (let j = i + 1; j < route.length; j += 1) {
        const candidate = [
          ...route.slice(0, i),
          ...route.slice(i, j + 1).reverse(),
          ...route.slice(j + 1),
        ];
        if (legs(candidate) < legs(route) - 0.01) {
          route.splice(0, route.length, ...candidate);
          improved = true;
        }
      }
    }
  }
  return route;
}

/**
 * @param {Object} opts
 * @param {string} opts.startId    start city
 * @param {number} opts.days       days available
 * @param {string[]} opts.interests preferred categories
 * @param {number} opts.budget     total budget in INR
 * @param {boolean} opts.hasTransport self-drive or hired car
 * @param {number} opts.perDay     stops per day (default 3)
 */
export function buildItinerary({
  startId,
  days,
  interests,
  budget,
  hasTransport = true,
  perDay = 3,
}) {
  const origin = START_MAP[startId] || START_MAP.bengaluru;

  // 1. Filter + score
  const maxKm = hasTransport ? 560 : 200;
  const scored = PLACES.map((p) => ({ ...p, score: scoreFor(p, interests, hasTransport) }))
    .filter((p) => p.score > 0.1)
    .filter((p) => haversine(origin, p) <= maxKm);

  // 2. Top-N selection (small overshoot to fill every day)
  const wanted = Math.min(scored.length, days * perDay + 5);
  const selected = [...scored]
    .sort((a, b) => b.score - a.score || haversine(origin, a) - haversine(origin, b))
    .slice(0, wanted);

  // 3. Order the full route
  const route = orderRoute(origin, selected);

  // 4. Split into days under the driving-time and stop-count constraints
  const dailyBuckets = [];
  let curDay = { stops: [], legs: [], driveMin: 0, km: 0 };
  let from = origin;

  for (const stop of route) {
    const km = haversine(from, stop);
    const min = (km / AVG_SPEED_KMH) * 60;
    const wouldDrive = curDay.driveMin + min;
    const full =
      curDay.stops.length >= perDay ||
      (curDay.stops.length > 0 && wouldDrive > MAX_DRIVE_MIN_PER_DAY);

    if (full) {
      if (dailyBuckets.length < days - 1) {
        dailyBuckets.push(curDay);
        curDay = { stops: [], legs: [], driveMin: 0, km: 0 };
        // next day resumes from the last stop: that is where you sleep
      } else {
        // out of days: extra stops are dropped
        continue;
      }
    }

    curDay.stops.push(stop);
    curDay.legs.push({ to: stop, km: Math.round(km), driveMin: Math.round(min) });
    curDay.driveMin += min;
    curDay.km += km;
    from = stop;
  }
  if (curDay.stops.length && dailyBuckets.length < days) dailyBuckets.push(curDay);

  // 5. Per-day costs
  let cur = origin;
  const itinerary = [];
  let cumCost = 0;
  const lastIdx = dailyBuckets.length - 1;

  dailyBuckets.forEach((bucket, idx) => {
    const entries = bucket.stops.reduce((s, p) => s + p.cost, 0);
    const transport = Math.round(bucket.km * DAILY.transportPerKm);
    const stay = idx === lastIdx ? 0 : DAILY.stay; // last day: you go home
    const food = DAILY.food;
    const total = entries + transport + stay + food;
    cumCost += total;

    itinerary.push({
      day: idx + 1,
      fromName: cur.name,
      stops: bucket.stops,
      legs: bucket.legs,
      driveMin: Math.round(bucket.driveMin),
      transportKm: Math.round(bucket.km),
      costs: { entries, food, transport, stay, total },
    });
    cur = bucket.stops[bucket.stops.length - 1] || cur;
  });

  // 6. Return leg to the start city (final day)
  if (itinerary.length) {
    const last = itinerary[itinerary.length - 1];
    const backKm = last.stops.length ? haversine(last.stops[last.stops.length - 1], origin) : 0;
    const backMin = (backKm / AVG_SPEED_KMH) * 60;
    const backCost = Math.round(backKm * DAILY.transportPerKm);
    last.returnKm = Math.round(backKm);
    last.returnMin = Math.round(backMin);
    last.costs.transport += backCost;
    last.costs.total += backCost;
    last.driveMin += Math.round(backMin);
    cumCost += backCost;
  }

  const totalKm = itinerary.reduce((s, d) => s + d.transportKm + (d.returnKm || 0), 0);
  const totalDriveMin = itinerary.reduce((s, d) => s + d.driveMin, 0);

  return {
    origin,
    itinerary,
    totalCost: cumCost,
    budget,
    overBudget: cumCost > budget,
    totalKm: Math.round(totalKm),
    totalDriveMin: Math.round(totalDriveMin),
    placeCount: itinerary.reduce((s, d) => s + d.stops.length, 0),
  };
}
