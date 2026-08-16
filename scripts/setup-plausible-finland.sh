#!/usr/bin/env bash
# DEPRECATED host alias: fin (185.231.206.8) decommissioned 2026-06-05.
# Active site VPS: stockholm (132.243.240.175). Stockholm has 2 GB RAM so Plausible
# *could* run there, but current policy keeps it on Moscow (tae).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_HOST="${REMOTE_HOST:-stockholm}"
exec ssh "${REMOTE_HOST}" "bash -s" < "$ROOT/scripts/plausible-finland-server.sh"
