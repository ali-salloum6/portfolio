#!/usr/bin/env bash
set -euo pipefail

# Production status target: contabo-master (migrated from stockholm 2026-10-05).
REMOTE_HOST="${REMOTE_HOST:-contabo-master}"

ssh "${REMOTE_HOST}" "/usr/local/bin/portfolio-status"
