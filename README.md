# ✈ Trip Planner

A lightweight browser-based app to register and track trips — pick a destination, transport, and accommodation, and get an instant cost estimate.

---

## Features

- Register trips with destination, date, transport, and accommodation
- Automatic cost calculation based on selections
- Persisted storage via `localStorage` — trips survive page reloads
- Clean, responsive UI with per-destination visual accents

---

## Project Structure

```
travel-planner/
├── index.html      # Markup and layout
├── styles.css      # Design system and component styles
├── app.js          # UI logic, form handling, and rendering
└── trips.js        # TravelManager module — state, validation, and persistence
```

---

## How It Works

### `trips.js` — TravelManager

The core logic lives in an IIFE-based module that keeps its state private. It exposes four public methods:

| Method | Description |
|---|---|
| `registerDestination(destination, date, transport, accommodation)` | Validates inputs, calculates cost, saves to state and localStorage |
| `getTrips()` | Returns a shallow copy of the trips array |
| `showItinerary()` | Logs all trips to the console |
| `clearTrips()` | Resets state and removes the localStorage entry |

Cost is calculated by summing three fixed maps:

```js
cost = DESTINATION_COSTS[destination]
     + TRANSPORT_COSTS[transport]
     + ACCOMMODATION_COSTS[accommodation]
```

### `app.js` — UI Layer

Handles form submission, calls `TravelManager`, and renders the itinerary list. On page load it calls `renderItinerary(getTrips())` to restore any persisted trips immediately.

### localStorage

Trips are serialized to JSON under the key `travel_planner_trips` every time a new trip is registered. On module initialization, `trips.js` reads and parses this key to restore previous state.

---

## Available Destinations & Costs

| Destination | Base Cost | Plane | Train | Hotel | Hostel | Airbnb |
|---|---|---|---|---|---|---|
| Paris | $500 | +$200 | +$100 | +$150 | +$50 | +$100 |
| London | $400 | +$200 | +$100 | +$150 | +$50 | +$100 |
| New York | $600 | +$200 | +$100 | +$150 | +$50 | +$100 |

---

## Getting Started

No build step or dependencies required. Just open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
# or
python -m http.server
```

> Note: `app.js` uses ES modules (`import/export`), so it requires a local server — opening `index.html` directly via `file://` will throw a CORS error on the module imports.

---

## Tech Stack

- Vanilla JavaScript (ES Modules)
- HTML5 / CSS3
- localStorage API
- No frameworks, no build tools

---

---

> 📝 **Note:** This project was built as a practical exercise for the **Logic and Algorithms** module, part of the Frontend Extension course at **[DEV.F](https://www.devf.la)**.