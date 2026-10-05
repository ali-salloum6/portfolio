#!/usr/bin/env bash
set -euo pipefail

# Production deploy target: contabo-master (109.199.113.233).
# Migrated from stockholm (132.243.240.175) on 2026-10-05.
# Caddy on the server terminates TLS and proxies to Next.js on 127.0.0.1:3000;
# its config (/etc/caddy/Caddyfile) is shared with Plausible and is not managed here.

REMOTE_HOST="${REMOTE_HOST:-contabo-master}"
REMOTE_PATH="/var/www/portfolio"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log_stage() {
  printf '\n[%s] === %s ===\n' "$(date '+%H:%M:%S')" "$1"
}

log_info() {
  printf '[%s] %s\n' "$(date '+%H:%M:%S')" "$1"
}

# Build locally (so the VPS doesn't do expensive compilation work).
# Next.js will automatically read `.env.local`.
log_stage "1/5 Local build"
log_info "Running Next.js production build"
npm run build

# 1) Sync the repo (without `.next`) so config/public/src stays up to date.
# We intentionally exclude `.next` here to avoid deleting the currently-running build mid-deploy.
log_stage "2/5 Sync repository files to ${REMOTE_HOST}"
log_info "Uploading app sources and config (excluding build artifacts)"
rsync \
  -az \
  --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".next-tmp" \
  --exclude ".next-old" \
  --exclude "debug" \
  --exclude ".env.production" \
  --exclude ".env.*.local" \
  ./ "${REMOTE_HOST}:${REMOTE_PATH}/"

# 2) Upload the build artifacts atomically by rsync'ing into `.next-tmp`,
# then swapping into place on the server and restarting systemd.
if [[ ! -d ".next" ]]; then
  echo "Expected local .next/ after build, but it does not exist."
  exit 1
fi

log_stage "3/5 Sync .next build artifacts"
log_info "Uploading .next into remote .next-tmp for atomic swap (excluding cache)"
rsync -az --delete --omit-dir-times \
  --exclude "cache" \
  --info=progress2,stats \
  .next/ "${REMOTE_HOST}:${REMOTE_PATH}/.next-tmp/"

log_stage "4/5 Remote app swap/restart"
log_info "Swapping .next and restarting service"
ssh "${REMOTE_HOST}" "set -euo pipefail
REMOTE_PATH='${REMOTE_PATH}'

cd \"\$REMOTE_PATH\"
test -d .next-tmp/static || (echo 'Missing .next-tmp/static' && exit 1)

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  echo 'Installing production npm dependencies'
  npm install --omit=dev
fi

rm -rf .next-old || true
mv .next .next-old 2>/dev/null || true
mv .next-tmp .next

cp -f .env.local .env.production
if grep -q '^NEXT_PUBLIC_SITE_URL=' .env.production; then
  sed -i 's#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech#' .env.production
else
  echo 'NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech' >> .env.production
fi

systemctl restart portfolio-eu.service
"

log_stage "5/5 Deployment complete"
log_info "Portfolio is deployed on ${REMOTE_HOST}"
