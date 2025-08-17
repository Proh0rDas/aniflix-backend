# Aniflix Backend

## Demo
Front‑end/back‑end walkthrough video:
https://drive.google.com/file/d/1olCj6TbSXh3wK5V8vSFTvZJso2eKGuSP/view?usp=drivesdk

## Overview
Node.js/Express REST API backed by MongoDB (via Mongoose) powering movies, series, seasons, and episodes. Serves JSON resources and proxies caption files for the player.

## Install & Run
```bash
# from aniflix-backend-main/
npm install
# .env
cat > .env <<'ENV'
PORT=7000
MONGODB_URI=mongodb://127.0.0.1:27017/aniflix
ALLOWED_ORIGIN=http://localhost:3000
ENV
npm start
```
Server starts at `http://localhost:$PORT` (default 7000).

## Environment Variables
- `PORT` – server port (default 7000)
- `MONGODB_URI` – MongoDB connection string
- `ALLOWED_ORIGIN` – CORS allowlist origin (your frontend URL)

## Collections & Models (shape)
- Movie: {{ mid, mdata: {{ title, release_year, thumbnail, banner, category[], description, vdata: {{ video_type, video_url, video_caption, poster }} }} }}
- Series: {{ seid, sedata: {{ title, release_year, thumbnail, banner, category[], description, seasons[] }} }}
- Season: {{ sid, sdata: {{ title, release_year, season_number, thumbnail, banner, category[], description, episodes[] }} }}
- Episode: {{ eid, title, episode_number, vdata: {{ video_type, video_url, video_caption, poster }} }}

## REST API
Base path: `/api`
- `GET /api/movies` — list all movies
- `GET /api/movie/:mid` — movie by id
- `GET /api/movie/:mid/caption` — returns VTT caption for movie
- `GET /api/series` — list all series
- `GET /api/series/:seid` — series by id
- `GET /api/season/:sid` — season by id
- `GET /api/episode/:eid` — episode by id
- `GET /api/episode/:eid/caption` — returns VTT caption for episode
- `GET /api/ids` — mixed/random IDs used by the frontend slider

## Notes
- Ensure your movie/episode `video_caption` fields point to accessible `.vtt` URLs.
- Align `ALLOWED_ORIGIN` with the frontend dev server (e.g., http://localhost:3000).
