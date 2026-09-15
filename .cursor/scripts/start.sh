#!/usr/bin/env bash
# Per-boot runtime initialization for Cloud Agents.
# Starts the local MySQL instance (idempotently), ensures the database
# exists, and syncs the Drizzle schema. Returns once the DB is ready.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "[start] Ensuring development .env exists"
bash .cursor/scripts/gen-env.sh

echo "[start] Starting local MySQL"
bash .cursor/scripts/dev-db.sh up

echo "[start] Syncing database schema (drizzle-kit push)"
npm run db:push

echo "[start] Ready"
