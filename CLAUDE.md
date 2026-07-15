# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

AquaVolt Pro is a marketing/lead-gen web app for a Moroccan electricity/plumbing/pool
services company (based in Khouribga). It's a single full-stack TypeScript app: a
French/Arabic bilingual marketing site with a quote-request form, an AI chat widget,
and an admin dashboard for managing gallery images and incoming quotes, gated behind
Kimi OAuth SSO.

## Commands

```bash
npm run dev          # Start Vite dev server (frontend + API on one port, default 3000)
npm run build         # vite build (frontend -> dist/public) + esbuild bundle of api/boot.ts -> dist/boot.js
npm start             # NODE_ENV=production node dist/boot.js  (run after build)
npm run check          # tsc -b (type-check all project references, no emit)
npm run lint           # eslint .
npm run format          # prettier --write .
npm test               # vitest run
npm run db:generate     # drizzle-kit generate (create SQL migration from schema changes)
npm run db:migrate      # drizzle-kit migrate (apply migrations to DATABASE_URL)
npm run db:push         # drizzle-kit push (push schema directly, no migration file)
```

- Run a single test file: `npx vitest run api/some-router.test.ts`
- Vitest only picks up `api/**/*.test.ts` / `api/**/*.spec.ts` (see `vitest.config.ts`) — there
  are currently no test files in the repo, so `npm test` is a no-op until some are added.
- There is no separate backend dev server: `npm run dev` runs Vite with `@hono/vite-dev-server`,
  which mounts the Hono app (`api/boot.ts`) for `/api/*` only; everything else is served by Vite
  (see the `exclude` pattern in `vite.config.ts`).

## Architecture

### Full-stack layout, one server

- `src/` — React 19 + Vite frontend (SPA, `react-router` v7 in data-less `<Routes>` form).
- `api/` — Hono backend, mounted at `/api/*`. Entry point is `api/boot.ts`.
- `db/` — Drizzle ORM schema/migrations (MySQL).
- `contracts/` — code shared by frontend and backend (types, constants, error helpers).

In dev, Vite serves the frontend and proxies to the Hono app for API routes via
`@hono/vite-dev-server`. In production, `npm run build` produces `dist/public` (static
frontend assets) and `dist/boot.js` (an esbuild bundle of the Hono app); `npm start` runs
that single Node process, which serves the static files itself (`api/lib/vite.ts`) and
handles `/api/*`.

Path aliases (`@` → `src`, `@contracts` → `contracts`, `@db` → `db`) are declared in three
places that must stay in sync: `vite.config.ts`, the tsconfig files (`tsconfig.json` root
paths + `tsconfig.app.json`/`tsconfig.server.json`), and `vitest.config.ts`.

### tRPC — no codegen, shared types via direct import

`api/router.ts` composes the whole API: `authRouter`, `galleryRouter`, `quoteRouter`,
`chatRouter`, each a top-level namespace. There's no separate REST/OpenAPI layer —
`src/providers/trpc.tsx` imports `AppRouter` directly from `api/router.ts` and gets full
end-to-end type safety. `superjson` is the wire transformer (handles `Date`, etc.).
The client fetch always sets `credentials: "include"` so the session cookie is sent.

Procedure tiers, defined in `api/middleware.ts`:
- `publicQuery` — no auth.
- `authedQuery` — requires a valid session (`ctx.user` set).
- `adminQuery` — requires `ctx.user.role === "admin"`.

When adding a new router, register it in `api/router.ts` and pick the right tier per
procedure rather than checking `ctx.user` manually inside handlers.

### Auth — Kimi OAuth, not a generic auth library

Login is "Sign in with Kimi": `src/pages/Login.tsx` builds an authorize URL from
`VITE_KIMI_AUTH_URL` / `VITE_APP_ID` and redirects the browser there. The callback lands
on `/api/oauth/callback` (registered directly on the Hono app in `api/boot.ts`, outside
tRPC), handled by `createOAuthCallbackHandler` in `api/kimi/auth.ts`:

1. Exchange the `code` for a Kimi access token (`api/kimi/auth.ts:exchangeAuthCode`).
2. Verify the access token against Kimi's JWKS (`jose.createRemoteJWKSet`).
3. Fetch the user profile from the Kimi Open API (`api/kimi/platform.ts`).
4. Upsert a local `users` row (`api/queries/users.ts`) — a user whose `unionId` matches
   `OWNER_UNION_ID` is auto-promoted to `role: "admin"` on upsert.
5. Sign the app's own session JWT (HS256, `APP_SECRET`, 1-year expiry, see
   `api/kimi/session.ts`) and set it as an httpOnly cookie (`Session.cookieName` from
   `contracts/constants.ts`, currently `kimi_sid`).

Every tRPC request re-derives `ctx.user` by verifying that cookie and looking up the
user by `unionId` (`api/context.ts` → `authenticateRequest`); auth failures there are
swallowed so public procedures still work for anonymous users. Cookie `sameSite`/`secure`
flags differ for localhost vs. real hosts (`api/lib/cookies.ts`) since the app runs behind
different origins for the OAuth redirect in dev vs. prod.

### Database

Drizzle ORM against MySQL, `mode: "planetscale"` (`api/queries/connection.ts`), using a
lazily-initialized singleton (`getDb()`). Schema lives entirely in `db/schema.ts`:
`users`, `galleryItems`, `quotes`, `chatLogs`. `db/relations.ts` is currently an empty
placeholder — there are no Drizzle relational queries defined yet, only plain
`select`/`insert`/`update`/`delete`. Query helpers for `users` live in
`api/queries/users.ts`; other routers query Drizzle directly rather than going through a
queries module — follow that pattern (direct queries in the router) unless a query needs
to be reused across routers.

Migrations are generated into `db/migrations/*.sql` via `drizzle-kit` (gitignored; only
`.gitkeep` is tracked) — schema changes go through `npm run db:generate` +
`npm run db:migrate`, not hand-written SQL.

### Shared contracts

`contracts/` is imported by both `src/` and `api/`:
- `constants.ts` — session cookie name/TTL, shared error message strings, route paths.
- `errors.ts` — `Errors.badRequest/unauthorized/forbidden/notFound/internal(msg)` building
  a tagged `{ tag: "app_error", status, message }` object.
- `types.ts` — re-exports DB row/insert types from `db/schema.ts`.

### Frontend structure

- `src/pages/` — route-level components wired up in `src/App.tsx` (`Home`, `Devis`,
  `Admin`, `Login`, `NotFound`).
- `src/sections/` — marketing page sections composed into `Home` (Hero, Services,
  Gallery, Testimonials, Contact, Footer).
- `src/components/ui/` — shadcn/ui generated primitives (`components.json`: style
  `new-york`, base color `slate`, icons from `lucide-react`). Treat these as generated —
  extend by composing them rather than rewriting internals.
- `src/hooks/useAuth.ts` — wraps `trpc.auth.me`/`trpc.auth.logout`; pass
  `{ redirectOnUnauthenticated: true }` to guard a page (see `Admin.tsx`), otherwise it
  just exposes `user`/`isAuthenticated`/`isLoading`.
- `src/hooks/useLanguage.tsx` — small custom i18n context (`fr`/`ar` only, no external
  i18n library). `t(fr, ar)` picks a string inline; `src/lib/translations.ts` holds a
  larger `translations[language]` dictionary (`T.someKey`) used by bigger pages like
  `Admin`. `dir` (`ltr`/`rtl`) must be threaded onto wrapping elements for Arabic layout.
- Marketing pages (`Home`, `Admin`) use a hardcoded dark theme (`bg-slate-950`,
  `emerald`/`teal` accents) directly with Tailwind utility classes rather than the
  shadcn CSS-variable theme tokens; keep new marketing UI visually consistent with that
  rather than introducing the shadcn theme mid-page.

### AI chat widget

`api/chat-router.ts` calls OpenAI (`gpt-4o-mini`) with a hardcoded French/Arabic system
prompt describing AquaVolt Pro's services and pricing posture. It degrades gracefully
(returns a canned "contact us on WhatsApp" message) when `OPENAI_API_KEY` is unset —
note that var isn't listed in `.env.example`, so set it manually for local chat testing.

## Environment variables

See `.env.example` for the full list (`APP_ID`/`APP_SECRET` for OAuth/JWT signing,
`DATABASE_URL` for MySQL, `VITE_KIMI_AUTH_URL`/`VITE_APP_ID` exposed to the browser,
`KIMI_AUTH_URL`/`KIMI_OPEN_URL` for backend OAuth calls, `OWNER_UNION_ID` to designate the
admin user). `api/lib/env.ts` throws on missing required vars only when
`NODE_ENV=production`; in dev, missing vars silently become `""`.

## Deployment

`Dockerfile` is a multi-stage `node:20-alpine` build: install deps, `npm run build`, then
copy `dist/` + `node_modules` into a slim production image and run `npm start` on port
3000. It expects a `.env` file to be present at build/copy time.
