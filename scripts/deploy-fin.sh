#!/usr/bin/env bash
# DEPRECATED: fin VPS (185.231.206.8) decommissioned 2026-06-05.
# Original script preserved in scripts/deploy-fin.sh.bak
# Active deploy target: scripts/deploy-contabo.sh (SSH host: contabo-master / 109.199.113.233)
set -euo pipefail
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/deploy-contabo.sh" "$@"
