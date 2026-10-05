#!/usr/bin/env bash
# DEPRECATED: stockholm VPS (132.243.240.175) replaced by contabo-master on 2026-10-05.
# Original script preserved in scripts/deploy-stockholm.sh.bak
# Active deploy target: scripts/deploy-contabo.sh (SSH host: contabo-master / 109.199.113.233)
set -euo pipefail
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/deploy-contabo.sh" "$@"
