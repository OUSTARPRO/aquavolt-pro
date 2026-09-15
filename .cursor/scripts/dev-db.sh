#!/usr/bin/env bash
# Manages a user-space MySQL instance for local development.
# No sudo is required at runtime: the data directory lives under $HOME
# and mysqld runs as the current user.
set -euo pipefail

DB_BASE="${DEV_DB_BASE:-$HOME/.local/share/aquavolt-mysql}"
DB_DATADIR="$DB_BASE/data"
DB_SOCKET="$DB_BASE/mysqld.sock"
DB_PORT="${DEV_DB_PORT:-3306}"
DB_NAME="${DEV_DB_NAME:-aquavolt}"
DB_PIDFILE="$DB_BASE/mysqld.pid"
DB_LOG="$DB_BASE/mysqld.log"

log() { echo "[dev-db] $*"; }

init_db() {
  if [ -d "$DB_DATADIR/mysql" ]; then
    log "Data directory already initialized at $DB_DATADIR"
    return 0
  fi
  log "Initializing MySQL data directory at $DB_DATADIR"
  mkdir -p "$DB_DATADIR"
  mysqld --no-defaults --initialize-insecure \
    --datadir="$DB_DATADIR" >/dev/null 2>>"$DB_LOG"
}

is_running() {
  [ -S "$DB_SOCKET" ] && mysqladmin --no-defaults --socket="$DB_SOCKET" ping >/dev/null 2>&1
}

start_db() {
  mkdir -p "$DB_BASE"
  if is_running; then
    log "MySQL already running on socket $DB_SOCKET"
    return 0
  fi
  init_db
  log "Starting mysqld (port $DB_PORT, socket $DB_SOCKET)"
  nohup mysqld \
    --no-defaults \
    --datadir="$DB_DATADIR" \
    --socket="$DB_SOCKET" \
    --port="$DB_PORT" \
    --bind-address=127.0.0.1 \
    --pid-file="$DB_PIDFILE" \
    --secure-file-priv="" \
    --mysqlx=0 \
    >>"$DB_LOG" 2>&1 &

  log "Waiting for MySQL to accept connections..."
  for _ in $(seq 1 60); do
    if is_running; then
      log "MySQL is ready"
      break
    fi
    sleep 1
  done
  if ! is_running; then
    log "MySQL failed to start. Last log lines:"
    tail -n 30 "$DB_LOG" || true
    return 1
  fi
}

create_database() {
  log "Ensuring database '$DB_NAME' exists"
  mysql --no-defaults --socket="$DB_SOCKET" -u root \
    -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
}

case "${1:-up}" in
  init) init_db ;;
  start) start_db ;;
  up)
    start_db
    create_database
    ;;
  status) is_running && echo "running" || { echo "stopped"; exit 1; } ;;
  *) echo "usage: $0 {init|start|up|status}" >&2; exit 1 ;;
esac
