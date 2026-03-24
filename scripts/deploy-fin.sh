#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Sync local repo to Finland VPS, then build and restart service there.
rsync -az --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude "debug" \
  --exclude ".env.production" \
  ./ fin:/var/www/portfolio/

ssh fin "/usr/local/bin/portfolio-deploy"
