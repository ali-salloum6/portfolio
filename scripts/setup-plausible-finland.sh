#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec ssh fin "bash -s" < "$ROOT/scripts/plausible-finland-server.sh"
