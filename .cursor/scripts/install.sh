#!/usr/bin/env bash
# Idempotent repository bootstrap for Cloud Agents.
# Installs Node dependencies, prepares a local .env, and initializes the
# user-space MySQL data directory. No long-running process is started here.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "[install] Installing Node dependencies (npm ci)"
npm ci

echo "[install] Ensuring development .env exists"
bash .cursor/scripts/gen-env.sh

echo "[install] Initializing local MySQL data directory"
bash .cursor/scripts/dev-db.sh init

echo "[install] Done"
