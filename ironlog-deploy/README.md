# IronLog v2.0 — Deploy to Netlify

## What's new in v2.0
- Calendar view inside History tab (Day / Week / Month / Year)
- Volume heatmaps on all calendar views
- Export sessions as JSON (backup) or CSV (spreadsheet)

## Deploy steps

1. Install Node.js LTS from https://nodejs.org
2. cd into this folder
3. npm install
4. npm run build
5. Drag the dist/ folder to Netlify (netlify.com → your site → Deploys → Deploy manually)

Your existing sessions on hungergains.netlify.app are safe — localStorage is not affected by deploys.
