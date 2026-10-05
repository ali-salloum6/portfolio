#!/usr/bin/env bash
# DEPRECATED: fin VPS (185.231.206.8) decommissioned 2026-06-05.
# Original: ssh fin "/usr/local/bin/portfolio-status"
# Active status target: scripts/status-contabo.sh
set -euo pipefail
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/status-contabo.sh" "$@"
