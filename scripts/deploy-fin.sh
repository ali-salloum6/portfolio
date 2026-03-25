#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Build locally (so the Finland VPS doesn't do expensive compilation work).
# Next.js will automatically read `.env.local`.
npm run build

# 1) Sync the repo (without `.next`) so config/public/src stays up to date.
# We intentionally exclude `.next` here to avoid deleting the currently-running build mid-deploy.
rsync -az --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".next-tmp" \
  --exclude ".next-old" \
  --exclude "debug" \
  --exclude ".env.production" \
  --exclude ".env.*.local" \
  ./ fin:/var/www/portfolio/

# 2) Upload the build artifacts atomically by rsync'ing into `.next-tmp`,
# then swapping into place on the server and restarting systemd.
if [[ ! -d ".next" ]]; then
  echo "Expected local .next/ after build, but it does not exist."
  exit 1
fi

# Use a separate rsync call for `.next/` to ensure the VPS never serves partial assets.
rsync -az --delete --omit-dir-times \
  .next/ fin:/var/www/portfolio/.next-tmp/

# 3) Update Nginx to minimize compute on Next.js:
# - serve `/_next/static/` directly from disk
# - proxy Plausible endpoints so `/js/script.js` and `/api/event` don't hit Next
# - keep the main location proxying to Next
ssh fin "set -euo pipefail
cat > /etc/nginx/sites-available/portfolio-main.conf <<'EOF'
server {
    server_name www.alisalloum.tech eu.alisalloum.tech;

    # Serve compiled Next assets directly (cheap on 1GB VPS).
    location /_next/static/ {
        alias /var/www/portfolio/.next/static/;
        expires 365d;
        add_header Cache-Control 'public, max-age=31536000, immutable';
        access_log off;
    }

    # Offload Plausible tracker traffic (avoid Next rewrites during incidents).
    location = /js/script.js {
        proxy_http_version 1.1;
        proxy_set_header Host plausible.alisalloum.tech;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_ssl_server_name on;
        proxy_ssl_name plausible.alisalloum.tech;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;
        proxy_pass https://plausible.alisalloum.tech/js/script.js;
        access_log off;
    }

    location = /api/event {
        proxy_http_version 1.1;
        proxy_set_header Host plausible.alisalloum.tech;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_ssl_server_name on;
        proxy_ssl_name plausible.alisalloum.tech;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;
        proxy_pass https://plausible.alisalloum.tech/api/event;
        access_log off;
    }

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_pass http://127.0.0.1:3000;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/eu.alisalloum.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eu.alisalloum.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    listen [::]:80;
    server_name www.alisalloum.tech eu.alisalloum.tech;
    return 301 https://\$host\$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name alisalloum.tech;
    return 301 https://www.alisalloum.tech\$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name alisalloum.tech;

    ssl_certificate /etc/letsencrypt/live/eu.alisalloum.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eu.alisalloum.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://www.alisalloum.tech\$request_uri;
}
EOF
nginx -t
systemctl reload nginx

# 4) Swap .next into place and restart Next.
cd /var/www/portfolio
test -d .next-tmp/static || (echo \"Missing .next-tmp/static\" && exit 1)
rm -rf .next-old || true
mv .next .next-old 2>/dev/null || true
mv .next-tmp .next

# systemd service expects .env.production; keep behavior consistent with DEPLOYMENT.md.
cp -f .env.local .env.production
# Ensure canonical URL for metadata/SEO.
if grep -q '^NEXT_PUBLIC_SITE_URL=' .env.production; then
  sed -i 's#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech#' .env.production
else
  echo 'NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech' >> .env.production
fi

systemctl restart portfolio-eu.service
"
