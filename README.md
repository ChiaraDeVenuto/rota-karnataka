# Rota Karnataka

An AI travel planner that builds Karnataka itineraries from the days you have, your start city,
your interests and your budget. 65 real destinations with coordinates, routes ordered by distance,
costs estimated per stop.

**Problem statement:** 06 — AI Travel Planner for Karnataka
**Hackathon:** Kannada Digital Innovation Hackathon 2026 (HackerRank Campus Crew × NIE Mysuru)

## The problem

Karnataka is 190,000 km² of state where the highlights sit 400 km apart: Hampi in the north,
Gokarna on the coast, Coorg and Chikkamagaluru in the coffee hills, Mysuru down south. The
itineraries you find online are lists of names with no order to them. The traveller ends up
driving 200 km back on the same afternoon, blowing past the budget without noticing, and seeing
six places instead of twelve in three days.

## The solution

The planner runs four steps in sequence, entirely on the client:

1. **Content-based scoring.** Every destination gets a score based on how well it matches the
   selected interests. Without a car, remote places lose weight.
2. **Route ordering.** Nearest-neighbour from the start city, cleaned up by a 2-opt pass that
   removes crossed legs.
3. **Splitting into days.** A real constraint of 5.5 driving hours per day and 3 stops per day, so
   the trip does not eat the rest.
4. **Budget estimate.** Actual entry fees + food + transport computed on Haversine distance + one
   night's stay. When the sum exceeds the declared budget, the planner says so.

The output is a day-by-day itinerary with a map, per-leg distances, driving times and a cost
breakdown.

## Demo

Input: start Bengaluru, 3 days, heritage + nature interests, budget ₹25,000.
Result: 9 stops, 301 km, 7h 11m driving, ₹9,829 total
(Bengaluru → Savandurga → Shivanasamudra → Talakadu → Mysuru → return).

## Tech stack

| Component | Choice |
|---|---|
| Framework | React 19 + Vite |
| Map | Leaflet + react-leaflet (OpenStreetMap tiles) |
| Planning logic | Plain JavaScript, zero dependencies (`src/lib/plan.js`) |
| Data | `src/data/places.js` — local dataset with coordinates, costs, durations |
| Deploy | Vercel |
| External APIs | none: no keys, no runtime cost |

## Structure

```
src/
├── data/places.js    65 attractions: coordinates, category, entry fee, duration, blurb
├── lib/plan.js       engine: scoring, nearest-neighbour, 2-opt, budget
├── App.jsx           interface: form, summary, day cards, map
└── App.css           styling
```

## Getting started

```bash
npm install
npm run dev      # development server on localhost
npm run build    # production build into dist/
```

No environment variables required. To extend the dataset, add entries in
`src/data/places.js` keeping the schema `id, name, region, cat, lat, lng, cost, hours, blurb`.

## Features

- Departure from 5 Karnataka cities (Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi)
- 6 interest categories, freely combinable
- 1–10 days, budget adjustable from ₹5,000 to ₹80,000
- No-car mode: reduced range, penalty on remote places
- Return leg to the start city calculated into the final day
- Automatic warning when the estimate passes the limit

## Known limits and next steps

- Distances are straight-line Haversine, corrected with an average speed of 42 km/h on Indian
  highways rather than real road routing
- The dataset is hand-curated, not synced with tourism APIs
- Next: meal preferences, monsoon seasonality, an LLM layer for dynamic descriptions,
  a multilingual UI (Kannada/English)

---

*This document was developed with the assistance of generative AI tools for research, structuring, and content generation. Final content has been reviewed and validated by the author. Full compliance with: Reg. (EU) 2024/1689 (AI Act) Art. 50 · Italian Law 132/2025 Art. 13 · EU Code of Practice on AI Transparency (2026) · U.S. AI Labeling Act (S. 4915) · U.S. H.R.8479 · U.S. Executive Order on AI (Dec 2025) · California TFAIA & AB 2013 (eff. Jan 2026).*
