# Raider Tools stats server

This is the standalone, always-running backend for the stats application. It
does not own inventory synchronization and it does not store ArcTracker tokens.

The server calls ArcTracker directly using the documented dual-key contract:
`ARC_APP_KEY` is sent as `X-App-Key` and `ARC_USER_KEY` is sent as the bearer
token. Both keys remain server-side.

## Routes

- `GET /api/health`
- `GET /api/stats/overview?page=1&limit=50`
- `POST /api/stats/extension` (the four browser-only ArcTracker stat payloads)
- `GET /api/stats/extension/status`
- `GET /api/v2/user/profile`
- `GET /api/v2/user/stash`
- `GET /api/v2/user/loadout`
- `GET /api/v2/user/quests`
- `GET /api/v2/user/hideout`
- `GET /api/v2/user/projects`
- `GET /api/v2/user/rounds`
- `GET /api/v2/user/blueprints`
- `GET /api/player/profile`
- `GET /api/player/me`
- `GET /api/player/raider-hub`
- `GET /api/player/progression`
- `GET /api/player/command-center`
- `GET /api/player/combat-breakdown`
- `GET /api/player/enemy-kills`
- `GET /api/player/weapon-kills`
- `GET /api/player/map-performance`

## Run

```bash
cd server
npm install
cp .env.example .env
npm start
```

For local development, the server also falls back to the repository root
`.env` when `server/.env` is absent.

Set `ARC_APP_KEY` and `ARC_USER_KEY` in the server environment. Set
`METAFORGE_PROFILE_ID` to load the documented MetaForge
`/api/arc-raiders/player-stats?userId=...` response into the overview. Set
`VITE_STATS_API_BASE_URL` in the SPA to this server's public origin, for
example `https://stats-api.raider-tools.app`. TLS should terminate at the
hosting platform or reverse proxy; this Node process listens over HTTP.
