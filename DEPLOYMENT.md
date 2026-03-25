# Self-hosted deployment (Finland site + optional Plausible)

This document records how the portfolio runs on the **Finland VPS** after moving production off Vercel, with **Plausible** typically on **Moscow** when Finland is resource-limited.

*(Plausible may also run on Finland if the VPS has **≥ 2 GB RAM**; on **1 GB**, keep analytics on Moscow or a second small server.)*

---

## Architecture (high level)

| Role | Host | IP (at time of setup) | Notes |
|------|------|------------------------|--------|
| **Production site** | Finland VPS | `185.231.206.8` | Next.js behind Nginx, systemd service |
| **Analytics (Plausible CE)** | Moscow VPS (`tae`) | `217.26.31.20` | Recommended on a **separate** host if Finland is **1 GB** — Docker Compose; Caddy → `127.0.0.1:8000` |
| **Canonical URL** | `https://www.alisalloum.tech` | — | Apex `alisalloum.tech` redirects to `www` |

**Traffic flow (pages):** Browser → `www` / `eu` (Finland Nginx) → Next.js `127.0.0.1:3000`

**Traffic flow (analytics script):** Browser → `https://www.alisalloum.tech/js/script.js` and `POST /api/event` → Next.js **rewrites** (server-side) → `https://plausible.alisalloum.tech` (Moscow or wherever DNS points). First-party URLs to visitors; server-to-server fetch can cross regions.

---

## DNS records

### Production (current intent)

- **`A` `www`** → `185.231.206.8` (Finland)  
  - Remove old **Vercel** `CNAME` for `www` (e.g. `*.vercel-dns-*.com`) when cutting over.
- **`A` `@`** → `185.231.206.8` (Finland)
- **`A` `plausible`** → **`217.26.31.20`** (Moscow / `tae`) — Plausible dashboard + tracker API; **do not** point this at Finland if the site runs there (keeps 1 GB RAM usable for Next.js only).
- **`A` `eu`** → `185.231.206.8` (optional test hostname; can stay)

Optional:

- **`A` `*`** → `185.231.206.8` (wildcard to Finland)  
  - **Note:** wildcard DNS does **not** imply wildcard TLS; ad-hoc hostnames may get certificate errors unless you add a wildcard cert (DNS-01).

### Canonical host

- **`alisalloum.tech`** (apex) → **301** to **`https://www.alisalloum.tech$request_uri`** (configured in Nginx on Finland).

---

## Finland VPS — software stack

- **OS:** Ubuntu 20.04 LTS (as provisioned by provider)
- **Node.js:** 22.x (NodeSource deb repo)
- **Reverse proxy:** Nginx 1.18 (Ubuntu package)
- **TLS:** Let’s Encrypt via **Certbot** + `python3-certbot-nginx`
- **App:** Next.js **production** build + `next start` on **`127.0.0.1:3000`**
- **Process manager:** **systemd** unit `portfolio-eu.service`

### Paths on server

| Path | Purpose |
|------|---------|
| `/var/www/portfolio` | Application root (synced from laptop) |
| `/etc/nginx/sites-available/portfolio-main.conf` | Nginx vhosts (proxies + apex→www redirects) |
| `/etc/systemd/system/portfolio-eu.service` | systemd unit |
| `/usr/local/bin/portfolio-deploy` | Remote one-command build + restart |
| `/usr/local/bin/portfolio-status` | Remote quick status |
| `/opt/plausible-hosting` | Plausible CE Docker Compose (official `plausible/hosting` repo) |
| `/etc/nginx/sites-available/plausible.alisalloum.tech` | Nginx reverse proxy for Plausible |

### systemd unit (summary)

- `WorkingDirectory=/var/www/portfolio`
- `Environment=NODE_ENV=production`
- `EnvironmentFile=-/var/www/portfolio/.env.production` (leading `-` = **ignore if missing**)
- `ExecStart=/usr/bin/npm run start -- --hostname 127.0.0.1 --port 3000`

### TLS / Certbot

Certificate name on disk: **`eu.alisalloum.tech`** (lineage under `/etc/letsencrypt/live/eu.alisalloum.tech/`).

Hostnames included on the certificate (after expansion):

- `eu.alisalloum.tech`
- `alisalloum.tech`
- `www.alisalloum.tech`

Renewal: `certbot renew` (timer usually installed with certbot package).

A **separate** certificate is normally issued for `plausible.alisalloum.tech` (second Certbot run). Renew handles both lineages.

---

## Stopping Plausible on Finland (analytics on Moscow again)

If Plausible was brought up on Finland but the VPS is too small (e.g. 1 GB RAM), shut it down and point DNS back at Moscow.

**On Finland (`ssh fin`):**

```bash
cd /opt/plausible-hosting && docker compose down
sudo rm -f /etc/nginx/sites-enabled/plausible.alisalloum.tech
sudo nginx -t && sudo systemctl reload nginx
```

**DNS:** `A` **`plausible`** → **`217.26.31.20`** (Moscow VPS where Caddy + Plausible still run).

After DNS propagates, `https://plausible.alisalloum.tech` should load from Moscow again. The app’s `next.config.ts` rewrites already target `https://plausible.alisalloum.tech` (no repo change needed).

---

## Plausible on Finland (install + admin signup) — optional if VPS has enough RAM

### 1) Install stack and HTTP Nginx (from your laptop, repo root)

```bash
./scripts/setup-plausible-finland.sh
```

This runs `scripts/plausible-finland-server.sh` on `fin` via SSH: installs Docker + Compose, clones `/opt/plausible-hosting`, writes `.env` + `compose.override.yml`, starts containers, and enables **`http://plausible.alisalloum.tech`** → `127.0.0.1:8000`.

### 2) DNS

Create **`A` `plausible`** → **`185.231.206.8`** (your Finland server IPv4).

Wait until public resolvers see it:

```bash
dig +short plausible.alisalloum.tech @1.1.1.1
# expect 185.231.206.8
```

### 3) HTTPS

On Finland:

```bash
ssh fin
certbot --nginx -d plausible.alisalloum.tech \
  --non-interactive --agree-tos -m admin@alisalloum.tech --redirect
systemctl reload nginx
```

### 4) When you can create the admin account

**Only after step 3 succeeds** (browser shows a valid lock for `https://plausible.alisalloum.tech`):

1. Open **`https://plausible.alisalloum.tech`** — you should be redirected to **`/register`**.
2. Create the **first user** — that account is your **admin**.
3. Add your tracked property **`alisalloum.tech`** (or `www` — match `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in `.env.local`).

> **Note:** This is a **new** Plausible database on Finland. Stats from the old Moscow instance are **not** migrated unless you manually move Postgres/ClickHouse volumes (not covered here).

### 5) Optional: shut down old Plausible on Moscow

```bash
ssh tae 'cd /opt/plausible-hosting && docker compose down'
```

---

## Historic: Moscow VPS (`tae`) — Plausible (deprecated)

Previously: `/opt/plausible-hosting` on `217.26.31.20` with **Caddy** → `127.0.0.1:8000`. Same env shape (`BASE_URL`, `SECRET_KEY_BASE`, `TOTP_VAULT_KEY`, `HTTP_PORT=8000`). Remove or stop after Finland is live to free RAM.

---

## Application changes (this repo)

### `next.config.ts`

- **`rewrites()`** for first-party analytics proxying:
  - `source: /js/script.js` → `https://plausible.alisalloum.tech/js/script.js`
  - `source: /api/event` → `https://plausible.alisalloum.tech/api/event`
- Optional env override: **`PLAUSIBLE_PROXY_ORIGIN`** (defaults to `https://plausible.alisalloum.tech`)

### `components/seo/PlausibleScript.tsx`

- Loads script from **`NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC`** or defaults to **`/js/script.js`**
- Sets **`data-api`** to **`NEXT_PUBLIC_PLAUSIBLE_API_ENDPOINT`** or defaults to **`/api/event`**

### Vercel Analytics removal

- `app/[locale]/layout.tsx`: removed `@vercel/analytics` + `@vercel/speed-insights` components so the self-hosted site does not keep sending Vercel tracking requests.

### `lib/site-config.ts`

- `getSiteUrl()` fallback updated to **`https://www.alisalloum.tech`** to match canonical production.

### Local env (developer machine)

`.env.local` was updated to align with canonical `www` and first-party Plausible paths:

- `NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alisalloum.tech` (Plausible site/domain as configured in dashboard)
- `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=/js/script.js`
- `NEXT_PUBLIC_PLAUSIBLE_API_ENDPOINT=/api/event`

**Security note:** `.env.local` contains secrets (e.g. Resend). Do not commit it. The deploy flow syncs it to the server — protect laptop and SSH access accordingly.

---

## Deploy scripts (laptop → Finland)

### `scripts/deploy-fin.sh`

- Builds locally on your machine: `npm run build` (so Finland VPS does not compile during deploy).
- **rsync** to `fin:/var/www/portfolio/` with excludes:
  - `.git`, `node_modules`, `.next`, `debug`, **`.env.production`**
- Uploads compiled Next output atomically:
  - rsync `.next/` to `fin:/var/www/portfolio/.next-tmp/`
  - on Finland, swaps `.next-tmp` into place as `.next`
- Updates Finland Nginx config to minimize Next compute:
  - serves `/_next/static/` directly from disk with long cache headers
  - proxies Plausible endpoints (`/js/script.js` and `/api/event`) directly to `https://plausible.alisalloum.tech/...` (avoids Next rewrites during incidents)
  - uses explicit upstream TLS (`proxy_ssl_protocols TLSv1.2 TLSv1.3` + SNI) to avoid TLS handshake failures to Moscow Plausible
- Restarts **`portfolio-eu.service`** after the swap.

### `scripts/status-fin.sh`

- SSH to `fin` and runs **`/usr/local/bin/portfolio-status`**

### Remote swap + Nginx update (on Finland VPS)

- Executed directly by `scripts/deploy-fin.sh` over SSH (no separate `/usr/local/bin/portfolio-deploy` call anymore).
- Swaps `.next-tmp` into `.next`.
- Regenerates `.env.production` from `.env.local` and ensures `NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`.
- Reloads/restarts Nginx and then restarts **`portfolio-eu.service`**.

---

## Operational commands (cheat sheet)

From your laptop (repo root):

```bash
./scripts/deploy-fin.sh
./scripts/status-fin.sh
```

On Finland VPS:

```bash
sudo systemctl status portfolio-eu
sudo journalctl -u portfolio-eu -f
sudo nginx -t && sudo systemctl reload nginx
```

TLS re-issue / expand (if domains change):

```bash
sudo certbot --nginx --cert-name eu.alisalloum.tech \
  -d eu.alisalloum.tech -d alisalloum.tech -d www.alisalloum.tech \
  --non-interactive --agree-tos -m admin@alisalloum.tech --redirect
```

---

## Problems encountered (and fixes)

1. **`npm ci` failed on VPS** — `package-lock.json` out of sync with `package.json`. Used **`npm install`** on server; ideally regenerate lockfile locally with `npm install` and commit for reproducible CI later.

2. **Nginx config broke after heredoc over SSH** — `$host` and friends were expanded by the **local** shell. Fix: use **quoted heredoc** end marker / careful quoting so **`$variables`** reach the remote file literally.

3. **Ubuntu `unattended-upgrades` held `apt` lock** — Certbot install had to wait. Normal on fresh VMs.

4. **Certbot HTTP-01 failed for apex/`www`** — DNS still pointed at Vercel. Fixed by pointing **`@` and `www`** to Finland, then re-running certbot.

5. **Browser “not secure” / wrong IP for `eu`** — local DNS cache showed old IP. Flush local resolver; verify with `dig @1.1.1.1`.

6. **Accidental near-empty `/var/www/portfolio`** — `deploy-fin.sh` ran with **wrong working directory**, so `rsync --delete` synced almost nothing and deleted the app.  
   - Fixed script to **always `cd` to repo root**.  
   - Added **`.env.production` rsync exclude** so it isn’t deleted each deploy.  
   - Deploy now **uploads compiled `.next` from the laptop** and swaps it atomically (`.next-tmp` → `.next`) so Finland never serves partial assets.

7. **`systemd` failed after incident** — `.env.production` missing; `EnvironmentFile=` was mandatory.  
   - Switched to **`EnvironmentFile=-/path`** (optional).  
   - Deploy now **recreates `.env.production` from `.env.local`**.

8. **Next.js runtime errors after partial sync** — corrupt client reference manifest / missing files under `.next`.  
   - Fix: ensure compiled assets are complete by uploading to `.next-tmp` and swapping into place (avoids partial `.next` during deploy).

9. **Finland VPS 1 GB saturated — SSH/VNC login timeouts (March 2026)**  
   - **Cause:** Running **Plausible CE** (Postgres + **ClickHouse**) on the **same** 1 vCPU / 1 GB host as **Next.js + Nginx** exhausted RAM and CPU; the guest became so slow that **SSH hung** and **VNC** showed **“login timed out after 60 seconds”** or a **blank screen with cursor** (getty under load, not necessarily disk death).  
   - **Recovery:** From console/VNC when possible: `cd /opt/plausible-hosting && docker compose down`; stop Docker fully with **`systemctl stop docker.socket`** and **`systemctl stop docker`** (the **socket** otherwise restarts `docker.service`). Optionally **`systemctl disable docker.socket docker`** until a larger plan exists. Keep **`portfolio-eu`** + **`nginx`** for the site. **Panel hard reboot** helped in some cases after cleaning services.  
   - **Policy:** **Plausible** moved back to **Moscow (`tae`)**; Finland hosts **only** the portfolio. DNS: **`A` `plausible`** → **`217.26.31.20`**.

10. **`502` on `/api/event` after cutover**
   - Cause: Finland Nginx proxying to Moscow Plausible over HTTPS was failing TLS handshakes (`SSL_do_handshake()`).
   - Fix: added explicit proxy TLS settings for `/js/script.js` and `/api/event` (`proxy_ssl_protocols TLSv1.2 TLSv1.3` + SNI).

---

## Plausible on Moscow — DNS and TLS (Caddy)

**DNS check (from your laptop):**

```bash
dig +short plausible.alisalloum.tech @1.1.1.1
# expect: 217.26.31.20
```

If **`https://plausible.alisalloum.tech`** opens **without** a valid certificate after you **moved DNS** (e.g. record pointed at Finland, then back to Moscow), Caddy may need to **reload** or **re-obtain** the cert once HTTP-01 can reach this host again.

**On Moscow (`ssh tae`):**

```bash
systemctl status caddy --no-pager
journalctl -u caddy -n 60 --no-pager
```

Reload / restart:

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl restart caddy
```

Confirm Plausible upstream is up:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000
docker ps 2>/dev/null || true
cd /opt/plausible-hosting && docker compose ps
```

If the stack was stopped, start it:

```bash
cd /opt/plausible-hosting && docker compose up -d
```

Then **`systemctl restart caddy`** again and re-test **`https://plausible.alisalloum.tech`** in the browser.

---

## SSH config (your machine)

Host alias **`fin`** was added to `~/.ssh/config`, for example:

```sshconfig
Host fin
  HostName 185.231.206.8
  User root
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

`tae` remains the Moscow host (`217.26.31.20`).

---

## Vercel

Production domain(s) should be **removed from the Vercel project** (or project paused) after DNS is fully on Finland, to avoid split-brain hosting and confusing SEO.

You may still use Vercel for **preview deployments** if desired, without attaching production domains.

---

## Russia / global performance context (why your HAR looked bad)

A captured HAR showed ~**75s** spent in **TCP connect** to `www.alisalloum.tech` while on Vercel — consistent with **path-specific filtering/throttling**, not app code. Production was moved to a **Finland VPS** to improve connectivity. **Plausible** is kept on **Moscow** when Finland is **1 GB**, to avoid overloading the site VM (see incident **#9** above).

---

*Last updated: 2026-03-25 (deployment flow updated; Plausible TLS + Vercel analytics removed.)*
