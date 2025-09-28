# 🎬 Movies Search App (React + OMDB + Tailwind)

A beginner‑friendly React app that lets you **search movies**, **view full details**, **paginate through results**, and **save favorites** — powered by the **OMDB API**. Built with **Vite**, **React Router v6**, and **Tailwind CSS**.

## ✨ Features
- Search movies/series/episodes via OMDB (`s` param)
- Type filter that **delegates filtering to API** (`type=movie|series|episode`) — **no array.filter() used**
- Results grid with poster, title, year, type
- Pagination using OMDB `page` and `totalResults`
- Movie details page (poster, year, genre, plot, cast, ratings, etc.)
- Favorites (localStorage) + favorites page
- Friendly loading/empty/error states
- Clean, readable, commented code
- SPA routing ready for Netlify (via `_redirects`)

## 🧰 Tech Stack
- React + Vite
- React Router v6
- Tailwind CSS
- JavaScript (fetch)
- OMDB API

## 🚀 Quick Start (Local)
1) **Clone & Install**
```bash
npm install
```
2) **Set your OMDB key**
- Get a free key: https://www.omdbapi.com/apikey.aspx  
- Copy `.env.example` → `.env` and set:
```
VITE_OMDB_API_KEY=YOUR_OMDB_KEY_HERE
VITE_OMDB_BASE_URL=https://www.omdbapi.com/
```
3) **Run dev server**
```bash
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## 🧭 Project Structure
```
movies-search-app/
├─ public/
│  └─ _redirects            # Netlify SPA routing
├─ src/
│  ├─ api/omdb.js           # API service (search, details)
│  ├─ components/           # UI building blocks
│  ├─ pages/                # Route pages: Search, Details, Favorites
│  ├─ utils/favorites.js    # LocalStorage helpers
│  ├─ App.jsx               # Routes
│  ├─ main.jsx              # App bootstrap
│  └─ index.css             # Tailwind + utility classes
├─ .env.example
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js
```

## 🧪 How to Use
- **Search**: Type movie name and press **Search**.
- **Filter**: Use **Type** dropdown → calls OMDB with `type=` param.
- **Paginate**: Use Prev/Next buttons.
- **Details**: Click **Details** to view full info.
- **Favorites**: Click ☆/★ to add/remove. View them in **Favorites** tab.

## 🛠️ Notes
- **No client-side array filtering** is used for type; we pass `type` to OMDB API.
- OMDB returns 10 results per page; we compute pages with `totalResults`.
- Errors from OMDB (e.g., "Movie not found!") are shown nicely.

## 🌐 Deploy to Netlify
1) Push code to GitHub.
2) On Netlify, **New site from Git** → pick your repo.
3) Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4) **Environment variables** (in Site settings → Build & deploy → Environment):
   - `VITE_OMDB_API_KEY=...`
   - `VITE_OMDB_BASE_URL=https://www.omdbapi.com/`
5) Deploy. SPA routing works via `public/_redirects`.

## ✅ Submission
- **Netlify URL** (live app)
- **GitHub repo URL** (source code)

## 📄 License
Open-source. Do not mention any company names as per assessment rules.
