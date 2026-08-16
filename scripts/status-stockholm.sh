#!/usr/bin/env bash
set -euo pipefail

# Production status target: Stockholm VPS (migrated from fin 2026-06-05).
REMOTE_HOST="${REMOTE_HOST:-stockholm}"

ssh "${REMOTE_HOST}" "/usr/local/bin/portfolio-status"
