# AGENTS.md

## Cursor Cloud specific instructions

### What this app is
AquaVolt Pro — a French/Arabic marketing + lead site for a Moroccan home-services
company (electricity, plumbing, pools). It is a single full-stack app, not a monorepo:

- Frontend: React 19 + Vite + Tailwind (shadcn/ui), entry `index.html` / `src/main.tsx`.
- Backend: Hono + tRPC (`api/`), served by `@hono/vite-dev-server` inside the same Vite
  process during development (there is no separate backend process in dev).
- Database: MySQL via Drizzle ORM (`db/schema.ts`, driver `mysql2`, `mode: "planetscale"`).
- Auth: Kimi OAuth (external); admin-only routes gated by `role === "admin"`.
- Chatbot: OpenAI (optional; disabled and degrades gracefully when `OPENAI_API_KEY` is unset).

### Running everything (dev)
`npm run dev` starts BOTH the frontend and the tRPC/Hono backend on `http://localhost:3000`
(API is under `/api/trpc/*`). See `package.json` scripts for `lint`, `check` (tsc),
`test` (vitest), `build`, and the `db:*` (drizzle-kit) commands. Don't use `npm start`/`build`
for development — that is the production path and requires a prebuilt `dist/`.

### MySQL (system dependency — NOT in the update script)
MySQL 8 is required for DB-backed features (gallery admin, quotes list, users). It is a system
package, so it is not installed by the update script. Per session:

1. Start it: `sudo service mysql start` (it does not auto-start).
2. First-time-only DB + user (idempotent):
   ```sql
   CREATE DATABASE IF NOT EXISTS aquavolt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER IF NOT EXISTS 'aquavolt'@'localhost' IDENTIFIED BY 'aquavolt';
   GRANT ALL PRIVILEGES ON aquavolt.* TO 'aquavolt'@'localhost'; FLUSH PRIVILEGES;
   ```
   (run via `sudo mysql`).
3. Create tables from the Drizzle schema: `npm run db:push` (non-interactive: `npx drizzle-kit push --force`).

Gotcha: the `mysql` CLI defaults to a unix socket that this sandbox user can't read
(`Can't connect ... mysqld.sock (13)`). Connect over TCP instead: `mysql -h 127.0.0.1 -u aquavolt -paquavolt aquavolt`.
The app itself connects fine using the TCP `DATABASE_URL` below.

### Environment file (`.env`, gitignored — recreate if missing)
`.env` is git-ignored, so it is a local artifact and may be absent on a fresh pod. The backend
only hard-fails on missing env vars when `NODE_ENV=production`; in dev, missing vars default to
empty. Only `DATABASE_URL` is needed for DB features. Minimal working dev `.env`:
```
DATABASE_URL=mysql://aquavolt:aquavolt@localhost:3306/aquavolt
APP_ID=dev-app-id
APP_SECRET=dev-app-secret
VITE_KIMI_AUTH_URL=https://auth.kimi.com
VITE_APP_ID=dev-app-id
KIMI_AUTH_URL=https://auth.kimi.com
KIMI_OPEN_URL=https://open.kimi.com
OWNER_UNION_ID=dev-owner-union-id
OPENAI_API_KEY=
```

### What can / can't be tested locally
- Works without external services: the public site, the gallery (reads DB; falls back to bundled
  images when empty), and the multi-step quote form at `/devis` (submits by opening a WhatsApp
  `wa.me` link — it does NOT write to the DB).
- Needs the DB: gallery seeding, the admin quotes list, and the public `quote.create` tRPC
  mutation (writes a `quotes` row).
- Can't be fully exercised locally: Kimi OAuth login and the `/admin` panel (require real Kimi
  credentials); the OpenAI chatbot (needs a real `OPENAI_API_KEY`).

### Known pre-existing issues (do not "fix" as part of env setup)
- `npm run lint` and `npm run check` (tsc) currently report errors in committed source
  (e.g. `Math.random()` purity errors in `src/sections/Hero.tsx`, an unused `Clock` import,
  a missing `date` translation key, and garbled French/Arabic label strings in
  `src/components/QuoteForm.tsx`). These are code bugs, not environment problems.
- There are no automated tests; `npm run test` exits non-zero with "No test files found".
