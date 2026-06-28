# Storage Optimizer

Standards: inherits ../engineering-standards.md. Overrides & project-specifics below.

**Stack:** TS + React + Express + Vite + Drizzle (Neon/Postgres) + Tailwind + Radix. Deploys to Cloudflare Pages (wrangler). §2 (TS/React) of the baseline applies. (package.json name is `rest-express`, v1.0.0.)

## Commands
- dev: `npm run dev` (`NODE_ENV=development tsx server/index.ts`)
- build: `npm run build` (`vite build && cp -r data dist/ && cp -r config dist/ && cp -r i18n dist/`)
- test / check: `npm run check` (`tsc` — typecheck only; no test runner configured)

Other scripts: `npm start` (prod: `node dist/index.js`), `npm run build:server` (esbuild server bundle), `npm run db:push` (`drizzle-kit push`), `npm run simulate`, `npm run report`, `npm run pages:deploy` (`npm run build && wrangler pages deploy dist`).

## Commit protocol
Ask before committing (see ../CLAUDE.md). No project deltas.

## Version tag
Source: package.json `version` (1.1.0), injected at build time via Vite `define` (`__APP_VERSION__` in `vite.config.ts`)  •  Shown in UI: `VersionBadge` in `client/src/App.tsx` — fixed bottom-right `v{version}` badge.

## Project-specific rules & overrides
- Monorepo layout: `client/` (React/Vite frontend), `server/` (Express + tsx entry `server/index.ts`), `shared/` (shared types/Drizzle schema), `data/` + `config/` + `i18n/` (copied into `dist/` at build time — keep the build script's copy steps in sync if you add similar dirs).
- DB is Drizzle ORM against Neon serverless Postgres; schema changes go through `npm run db:push` (`drizzle.config.ts`).
- Deploy target is Cloudflare Pages via `wrangler.toml` (project `storage-optimizer`, `pages_build_output_dir = "dist"`). Originated on Replit (Replit Vite plugins in devDeps, `.replit` / `replit.md` present).
- UI uses Radix primitives + Tailwind + shadcn-style components (`components.json`); follow existing component patterns rather than adding new UI kits.
