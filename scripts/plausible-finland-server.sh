#!/usr/bin/env bash
# Run on Finland VPS as root (e.g. cat scripts/plausible-finland-server.sh | ssh fin bash).
# After this: point DNS A record plausible -> this server IP, then run certbot (see DEPLOYMENT.md).

set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y docker.io docker-compose-v2 git curl openssl

systemctl enable --now docker

mkdir -p /opt
cd /opt
if [ ! -d plausible-hosting ]; then
  git clone https://github.com/plausible/hosting.git plausible-hosting
fi
cd plausible-hosting

SECRET_KEY_BASE="$(openssl rand -base64 48)"
TOTP_VAULT_KEY="$(openssl rand -base64 32)"

cat > .env <<EOF
BASE_URL=https://plausible.alisalloum.tech
SECRET_KEY_BASE=${SECRET_KEY_BASE}
TOTP_VAULT_KEY=${TOTP_VAULT_KEY}
DISABLE_REGISTRATION=invite_only
ENABLE_EMAIL_VERIFICATION=false
HTTP_PORT=8000
DATABASE_URL=postgres://postgres:postgres@plausible_db:5432/plausible_db
CLICKHOUSE_DATABASE_URL=http://plausible_events_db:8123/plausible_events_db
EOF

cat > compose.override.yml <<'EOF'
services:
  plausible:
    ports:
      - 127.0.0.1:8000:8000
EOF

docker compose pull
docker compose up -d

cat > /etc/nginx/sites-available/plausible.alisalloum.tech <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name plausible.alisalloum.tech;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:8000;
    }
}
EOF

ln -sf /etc/nginx/sites-available/plausible.alisalloum.tech /etc/nginx/sites-enabled/plausible.alisalloum.tech
nginx -t
systemctl reload nginx

IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
echo "Plausible stack is up on 127.0.0.1:8000 with HTTP Nginx on plausible.alisalloum.tech"
echo "Next: create DNS A record plausible -> ${IP:-<this-server-IPv4>}"
echo "Then: certbot --nginx -d plausible.alisalloum.tech --non-interactive --agree-tos -m admin@alisalloum.tech --redirect"
echo "Then open https://plausible.alisalloum.tech/register (first visit creates the admin user)"
