#!/usr/bin/env bash
# DEPRECATED: stockholm VPS (132.243.240.175) replaced by contabo-master on 2026-10-05.
# Active status target: scripts/status-contabo.sh
set -euo pipefail
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/status-contabo.sh" "$@"
