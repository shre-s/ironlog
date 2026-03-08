# IronLog

A workout logging PWA built with React. No backend, no account required — everything lives in your browser's localStorage.

**Live demo:** https://hungergains.netlify.app

---

## What it does

- Log workouts session by session, either freestyle or from a built-in program
- Track sets, reps, weight, RIR (Reps in Reserve), and RPE per exercise
- View your history as a list or in calendar views (day / week / month / year) with volume heatmaps
- Automatically detect personal records using the Epley estimated 1RM formula
- Suggest progressive overload based on your last logged performance for each exercise
- Add custom exercises that save to your library and appear in future sessions
- Edit previously saved sessions — fix mistakes after the fact
- Soft-delete sessions with a 5-second undo window; deleted sessions sit in a "Deleted Sessions" bin for 30 days before permanent removal
- Export your data as JSON or CSV; import JSON backups from other devices; or use the QR export for quick cross-device transfer of recent sessions
- Nutrition calculator (calories, protein, fat, carbs) based on Jeff Nippard's approach
- 10 pre-built programs: Jeff Nippard PHAT, RP Strength, Athlean-X, Tennis Foundation, Calisthenics, and others
- 226 exercises across 9 muscle groups
- Works offline after first load (service worker)
- Installs as a PWA on Android and iOS

---

## Tech

- React + Vite
- Pure CSS-in-JS (no UI library)
- localStorage for persistence
- Service worker for offline/PWA
- Deployed on Netlify

No server. No database. No tracking.

---

## Run locally

```bash
git clone https://github.com/shre-s/ironlog.git
cd ironlog
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

To test on your phone over local network:

```bash
npm run dev -- --host
```

Then open the Network URL shown in your terminal on your phone browser.

---

## Deploy

The `ironlog-deploy/` folder contains the built output ready to drop into Netlify, Vercel, or any static host.

To rebuild from source:

```bash
npm run build
```

---

## Why I built this

I got tired of logging workouts in notes apps and wanted something that understood RIR-based training. Built it as a side project to learn React properly and to have a tool I'd actually use. The science-based programs are sourced from evidence-based coaches (Nippard, RP Strength, Athlean-X).

---

## Data privacy

All data stays on your device. There's no server, no analytics, no ads. If you clear your browser storage, your data is gone — use the JSON export to back up.
