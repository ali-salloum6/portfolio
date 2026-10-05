# Self-hosted deployment (contabo-master: site + Plausible)

Since **2026-10-05** the portfolio and Plausible both run on **`contabo-master`** (`109.199.113.233`, Contabo, Lauterbourg FR; Ubuntu 24.04, 4 vCPU, 8 GB RAM, 100 GB disk). It replaced the Stockholm VPS (site) and the Moscow VPS `tae` (Plausible). Everything below the "History" divider describes the old setup and is kept for reference.

## Architecture

| Role | Where | Notes |
|------|-------|-------|
| **Production site** | `portfolio-eu.service` → Next.js `127.0.0.1:3000` | App root `/var/www/portfolio` |
| **Analytics (Plausible CE v3.2.1)** | `/opt/plausible-hosting` (Docker Compose) → `127.0.0.1:8000` | Upstream `plausible/community-edition` checkout at tag `v3.2.1` |
| **TLS + reverse proxy** | Caddy, `/etc/caddy/Caddyfile` | Automatic Let's Encrypt certs for all four hostnames |
| **Canonical URL** | `https://www.alisalloum.tech` | Apex redirects to `www` |

**Pages:** Browser → Caddy (`www` / `eu`) → Next.js `127.0.0.1:3000`.

**Analytics:** Browser → `https://www.alisalloum.tech/js/script.js` and `POST /api/event` → Caddy → Plausible `127.0.0.1:8000` on the same box (header `X-Plausible-IP` carries the visitor IP). No cross-region hop and no WireGuard any more. `portfolio-eu.service` also sets `PLAUSIBLE_PROXY_ORIGIN=http://127.0.0.1:8000` for the Next.js `/api/event` route, in case Caddy's interception is ever removed.

## DNS records (REG.RU, `ns1/ns2.reg.ru`)

All point at **`109.199.113.233`**: `A @`, `A www`, `A eu`, `A plausible`, `A *`. TTL was 86400 (24 h) during the move, so old resolvers can keep returning the previous IPs for up to a day after a change.

After changing DNS, reload Caddy so it requests certificates immediately instead of waiting out its ACME retry backoff:

```bash
ssh contabo-master systemctl reload caddy
```

## Caddyfile (summary)

- `www.alisalloum.tech, eu.alisalloum.tech`: `/js/script.js` and `/api/event` → `127.0.0.1:8000` (Host `plausible.alisalloum.tech`, `X-Plausible-IP {remote_host}`); everything else → `127.0.0.1:3000`.
- `alisalloum.tech` → 301 to `https://www.alisalloum.tech{uri}`.
- `plausible.alisalloum.tech` → `127.0.0.1:8000`, with `/storybook*` blocked (see incident below).

## Operational commands

```bash
./scripts/deploy-contabo.sh          # build locally, sync, swap .next, restart portfolio-eu
./scripts/status-contabo.sh          # service, Caddy config, localhost:3000, disk
ssh contabo-master journalctl -u portfolio-eu -n 80 --no-pager
ssh contabo-master 'cd /opt/plausible-hosting && docker compose ps'
ssh contabo-master 'cd /opt/plausible-hosting && docker compose logs --tail 50 plausible'
```

Upgrading Plausible: `git fetch --tags && git checkout <new tag>` in `/opt/plausible-hosting`, then `docker compose pull && docker compose up -d`. Read the release notes first.

## Incident: cryptominer on `tae` via Plausible (2026-09-17 → 2026-10-05)

`tae` ran Plausible CE **v3.2.0**, which has **CVE-2026-8467** (GHSA-55hg-8qxv-qj4p): an exposed `/storybook` endpoint allowing remote code execution as the app user. From about 2026-09-17 a miner (`/var/tmp/linuxsys`, deleted after launch) ran inside the Plausible container at ~200% CPU and 2.4 GB RAM. Fixed in **v3.2.1** (2026-05-15).

On migration the Plausible data was moved with a **logical dump** (Postgres `pg_dump`, ClickHouse `events_v2` / `sessions_v2` / `ingest_counters` in Native format) into a **fresh v3.2.1** stack with new `SECRET_KEY_BASE` and `TOTP_VAULT_KEY` (no account used 2FA). Nothing from the compromised container filesystem was carried over.

---

# History: Stockholm site + Plausible on Moscow (2026-06-05 → 2026-10-05)


## Architecture (high level)

| Role | Host | IP (current) | Notes |
|------|------|----------------|--------|
| **Production site** | Stockholm VPS (`stockholm`) | `132.243.240.175` | Next.js behind Nginx, systemd service |
| **Analytics (Plausible CE)** | Moscow VPS (`tae`) | `217.26.31.20` | Docker Compose; Caddy → `127.0.0.1:8000` |
| **WireGuard** | Stockholm ↔ Moscow | `10.8.0.1` / `10.8.0.2` | Stockholm runs `wg0` + tinyproxy for `tae` egress |
| **Canonical URL** | `https://www.alisalloum.tech` | — | Apex `alisalloum.tech` redirects to `www` |

**Traffic flow (pages):** Browser → `www` / `eu` (Stockholm Nginx) → Next.js `127.0.0.1:3000`

**Traffic flow (analytics script):** Browser → `https://www.alisalloum.tech/js/script.js` and `POST /api/event` → Nginx proxy (or Next.js rewrites) → `https://plausible.alisalloum.tech` (Moscow). First-party URLs to visitors; server-to-server fetch crosses regions.

---

## Migration from Finland (2026-06-05)

The previous production host **`fin`** (`185.231.206.8`) was decommissioned. Stockholm replaces it for the portfolio app.

| Item | Finland (former) | Stockholm (current) |
|------|------------------|---------------------|
| SSH alias | `fin` | `stockholm` |
| IPv4 | `185.231.206.8` | `132.243.240.175` |
| Deploy script | `scripts/deploy-fin.sh.bak` | `scripts/deploy-stockholm.sh` |
| WG role | Was `10.8.0.1` peer for `tae` | Now `10.8.0.1` peer for `tae` (repointed 2026-06-05) |

`scripts/deploy-fin.sh` and `scripts/status-fin.sh` are thin wrappers that forward to the Stockholm scripts. The original Finland deploy script is preserved in **`scripts/deploy-fin.sh.bak`**.

---

## DNS records

### Production (update at your registrar)

Point these at **Stockholm** (`132.243.240.175`):

- **`A` `www`** → `132.243.240.175`
- **`A` `@`** → `132.243.240.175`
- **`A` `eu`** → `132.243.240.175` (optional test hostname)

**Leave unchanged:**

- **`A` `plausible`** → **`217.26.31.20`** (Moscow / `tae`)

Optional:

- **`A` `*`** → `132.243.240.175` (wildcard; does **not** imply wildcard TLS)

Verify after propagation:

```bash
dig +short www.alisalloum.tech @1.1.1.1
# expect: 132.243.240.175
```

<!-- Former Finland DNS (decommissioned 2026-06-05):
- A www / @ / eu / * → 185.231.206.8 (fin)
-->

### Canonical host

- **`alisalloum.tech`** (apex) → **301** to **`https://www.alisalloum.tech$request_uri`** (configured in Nginx on Stockholm).

---

## DNS cutover checklist (you do this)

1. **Lower TTL** on `www`, `@`, and `eu` a day ahead if possible (optional but helps faster rollback).
2. **Update `A` records** as in the table above (`185.231.206.8` → `132.243.240.175`).
3. **Wait for propagation** — check with `dig +short www.alisalloum.tech @1.1.1.1` until it returns `132.243.240.175`.
4. **Issue TLS on Stockholm** (SSH in):

   ```bash
   ssh stockholm
   certbot --nginx \
     --cert-name eu.alisalloum.tech \
     -d eu.alisalloum.tech -d alisalloum.tech -d www.alisalloum.tech \
     --non-interactive --agree-tos -m admin@alisalloum.tech --redirect
   systemctl reload nginx
   ```

5. **Re-deploy** so the full HTTPS Nginx config is applied:

   ```bash
   ./scripts/deploy-stockholm.sh
   ```

6. **Smoke test:** `https://www.alisalloum.tech/en`, `https://www.alisalloum.tech/js/script.js`.

Until step 3 completes, the site is reachable at **`http://132.243.240.175/en`** (HTTP bootstrap mode).

---

## Stockholm VPS — software stack

- **OS:** Ubuntu 22.04 LTS
- **Node.js:** 22.x (NodeSource deb repo)
- **Reverse proxy:** Nginx 1.18 (Ubuntu package)
- **TLS:** Let’s Encrypt via **Certbot** + `python3-certbot-nginx` (after DNS cutover)
- **App:** Next.js **production** build + `next start` on **`127.0.0.1:3000`**
- **Process manager:** **systemd** unit `portfolio-eu.service`
- **WireGuard:** `wg0` at `10.8.0.1`, peer `tae` (`10.8.0.2`); **tinyproxy** on `10.8.0.1:8888` for Moscow egress

### Paths on server

| Path | Purpose |
|------|---------|
| `/var/www/portfolio` | Application root (synced from laptop) |
| `/etc/nginx/sites-available/portfolio-main.conf` | Nginx vhosts (proxies + apex→www redirects) |
| `/etc/systemd/system/portfolio-eu.service` | systemd unit |
| `/usr/local/bin/portfolio-status` | Remote quick status |
| `/opt/plausible-hosting` | Plausible CE Docker Compose (only if installed on Stockholm) |

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

Renewal: `certbot renew` (timer installed with certbot package).

---

## Former: Finland VPS (decommissioned 2026-06-05)

<!--
| Role | Host | IP (former) | Notes |
|------|------|-------------|--------|
| Production site | Finland VPS (`fin`) | 185.231.206.8 | Next.js behind Nginx, systemd service |
| OS | Ubuntu 20.04 LTS | | |
| RAM | 1 GB | | Too small for Plausible + Next.js (see incident #9) |

SSH config (former):
Host fin
  HostName 185.231.206.8
  User root
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes

Former paths also included:
- /usr/local/bin/portfolio-deploy (deprecated; deploy script now does swap inline)
- /etc/nginx/sites-available/plausible.alisalloum.tech (when Plausible was briefly on Finland)
- /opt/plausible-hosting (when Plausible was on Finland)
-->

Finland was retired after SSH became unreachable and WG was repointed to Stockholm. Incident notes below (#9, etc.) still apply to capacity planning.

---

## Stopping Plausible on the site VPS (analytics on Moscow)

If Plausible was brought up on Stockholm but you want it on Moscow again:

**On Stockholm (`ssh stockholm`):**

```bash
cd /opt/plausible-hosting && docker compose down
sudo rm -f /etc/nginx/sites-enabled/plausible.alisalloum.tech
sudo nginx -t && sudo systemctl reload nginx
```

**DNS:** `A` **`plausible`** → **`217.26.31.20`** (Moscow VPS where Caddy + Plausible still run).

---

## Plausible on Stockholm (optional — ≥ 2 GB RAM)

Stockholm has **2 GB RAM**, so colocated Plausible is feasible. Current policy: keep on Moscow.

### 1) Install stack and HTTP Nginx (from your laptop, repo root)

```bash
./scripts/setup-plausible-finland.sh
```

This runs `scripts/plausible-finland-server.sh` on `stockholm` via SSH.

### 2) DNS

Create **`A` `plausible`** → **`132.243.240.175`** (only if moving Plausible off Moscow).

### 3) HTTPS

On Stockholm:

```bash
ssh stockholm
certbot --nginx -d plausible.alisalloum.tech \
  --non-interactive --agree-tos -m admin@alisalloum.tech --redirect
systemctl reload nginx
```

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

### `lib/site-config.ts`

- `getSiteUrl()` fallback updated to **`https://www.alisalloum.tech`** to match canonical production.

### Local env (developer machine)

`.env.local` aligns with canonical `www` and first-party Plausible paths:

- `NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alisalloum.tech`
- `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=/js/script.js`
- `NEXT_PUBLIC_PLAUSIBLE_API_ENDPOINT=/api/event`

**Security note:** `.env.local` contains secrets (e.g. Resend). Do not commit it. The deploy flow syncs it to the server — protect laptop and SSH access accordingly.

---

## Deploy scripts (laptop → Stockholm)

### `scripts/deploy-stockholm.sh`

- Builds locally: `npm run build` (Stockholm does not compile during deploy).
- Timestamped stage markers (`1/5` → `5/5`).
- **rsync** to `stockholm:/var/www/portfolio/` with excludes:
  - `.git`, `node_modules`, `.next`, `debug`, **`.env.production`**
- Uploads compiled Next output atomically:
  - rsync `.next/` to `stockholm:/var/www/portfolio/.next-tmp/`
  - excludes `.next/cache`
  - swaps `.next-tmp` → `.next` on the server
- **Nginx:** uses full TLS config when `/etc/letsencrypt/live/eu.alisalloum.tech/fullchain.pem` exists; otherwise HTTP bootstrap config (for pre-DNS testing).
- Runs `npm install --omit=dev` when `node_modules` is missing or stale.
- Restarts **`portfolio-eu.service`**.

### `scripts/status-stockholm.sh`

- SSH to `stockholm` and runs **`/usr/local/bin/portfolio-status`**

### Legacy wrappers

- `scripts/deploy-fin.sh` → execs `deploy-stockholm.sh`
- `scripts/status-fin.sh` → execs `status-stockholm.sh`
- `scripts/deploy-fin.sh.bak` — frozen copy of the Finland deploy script

---

## Operational commands (cheat sheet)

From your laptop (repo root):

```bash
./scripts/deploy-stockholm.sh
./scripts/status-stockholm.sh
```

On Stockholm VPS:

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

4. **Certbot HTTP-01 failed for apex/`www`** — DNS still pointed at Vercel (or old host). Fixed by pointing **`@` and `www`** at the production VPS, then re-running certbot.

5. **Browser “not secure” / wrong IP for `eu`** — local DNS cache showed old IP. Flush local resolver; verify with `dig @1.1.1.1`.

6. **Accidental near-empty `/var/www/portfolio`** — `deploy-fin.sh` ran with **wrong working directory**, so `rsync --delete` synced almost nothing and deleted the app.  
   - Fixed script to **always `cd` to repo root**.  
   - Added **`.env.production` rsync exclude** so it isn’t deleted each deploy.  
   - Deploy now **uploads compiled `.next` from the laptop** and swaps it atomically.

7. **`systemd` failed after incident** — `.env.production` missing; `EnvironmentFile=` was mandatory.  
   - Switched to **`EnvironmentFile=-/path`** (optional).  
   - Deploy now **recreates `.env.production` from `.env.local`**.

8. **Next.js runtime errors after partial sync** — corrupt client reference manifest / missing files under `.next`.  
   - Fix: upload to `.next-tmp` and swap into place.

9. **Finland VPS 1 GB saturated — SSH/VNC login timeouts (March 2026)**  
   - **Cause:** Plausible CE + Next.js + Nginx on 1 vCPU / 1 GB host.  
   - **Policy:** Plausible on **Moscow (`tae`)**; site VPS hosts **only** the portfolio.  
   - **Note:** Stockholm has 2 GB; still keeping Plausible on Moscow after migration.

10. **`502` on `/api/event` after cutover**  
    - Cause: Nginx proxying to Moscow Plausible over HTTPS failed TLS handshakes.  
    - Fix: explicit proxy TLS settings (`proxy_ssl_protocols TLSv1.2 TLSv1.3` + SNI).

11. **Finland decommissioned (June 2026)**  
    - `fin` (`185.231.206.8`) unreachable; production moved to **`stockholm`** (`132.243.240.175`).  
    - WG peer on `tae` repointed to Stockholm (`wg0.conf.bak.fin.20260605` on Moscow).  
    - Pre-DNS verification: `http://132.243.240.175/en` returns 200.

---

## Plausible on Moscow — DNS and TLS (Caddy)

**DNS check (from your laptop):**

```bash
dig +short plausible.alisalloum.tech @1.1.1.1
# expect: 217.26.31.20
```

**On Moscow (`ssh tae`):**

```bash
systemctl status caddy --no-pager
cd /opt/plausible-hosting && docker compose ps
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000
```

---

## SSH config (your machine)

Active production host:

```sshconfig
Host stockholm
  HostName 132.243.240.175
  User root
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

`tae` remains the Moscow host (`217.26.31.20`).

<!-- Former Finland host (decommissioned 2026-06-05):
Host fin
  HostName 185.231.206.8
  User root
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
-->

---

## Vercel

Production domain(s) should be **removed from the Vercel project** (or project paused) after DNS is fully on Stockholm, to avoid split-brain hosting and confusing SEO.

You may still use Vercel for **preview deployments** if desired, without attaching production domains.

---

*Last updated: 2026-06-05 (migrated production from fin to stockholm; deploy-stockholm.sh with TLS auto-detect.)*
