#!/usr/bin/env bash
# Idempotent repository bootstrap for Cloud Agents.
# Installs Node dependencies, prepares a local .env, and initializes the
# user-space MySQL data directory. No long-running process is started here.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "[install] Installing Node dependencies (npm ci)"
npm ci

# Ensure the MySQL server/client are available. In a snapshot-backed
# environment these are already baked in; this guard makes a from-scratch
# rebuild still work when passwordless sudo is available.
if ! command -v mysqld >/dev/null 2>&1; then
  echo "[install] mysqld not found, installing mysql-server"
  if command -v sudo >/dev/null 2>&1; then
    sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq || true
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq mysql-server mysql-client || \
      echo "[install] WARNING: could not install mysql-server automatically"
  else
    echo "[install] WARNING: sudo unavailable; expected mysql-server from base snapshot"
  fi
fi

echo "[install] Ensuring development .env exists"
bash .cursor/scripts/gen-env.sh

echo "[install] Initializing local MySQL data directory"
bash .cursor/scripts/dev-db.sh init

echo "[install] Done"
