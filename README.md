This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production deployment (self-hosted)

The live site runs on **`contabo-master`** (`109.199.113.233`, Contabo, France), together with Plausible. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for architecture, DNS, and incident notes.

<!-- Former hosts: Finland VPS (`fin` / 185.231.206.8, decommissioned 2026-06-05); Stockholm VPS (`stockholm` / 132.243.240.175, replaced 2026-10-05). -->

After you commit or save changes locally:

1. **Prerequisites**
   - SSH to the server works as **`contabo-master`** (see `~/.ssh/config`).
   - **`./.env.local`** exists with production values (API keys, `NEXT_PUBLIC_*`). It is **rsync’d** to the server; the deploy script copies it to **`.env.production`** and sets **`NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`**.

2. **Ship changes**

   ```bash
   ./scripts/deploy-contabo.sh
   ```

   This builds locally, syncs the repo to `/var/www/portfolio` on `contabo-master`, uploads `.next` atomically, and restarts **`portfolio-eu`**. Caddy (TLS + reverse proxy) is configured on the server and is not touched by the deploy.

   Legacy wrappers `./scripts/deploy-stockholm.sh`, `./scripts/deploy-fin.sh` and their `status-*` twins forward to the contabo scripts.

3. **Check the service**

   ```bash
   ./scripts/status-contabo.sh
   ```

If something fails, SSH in and inspect logs:

```bash
ssh contabo-master
journalctl -u portfolio-eu -n 80 --no-pager
```

## Plausible Analytics

Plausible CE runs on the same host (`/opt/plausible-hosting`, Docker Compose, `127.0.0.1:8000`). The site loads it first-party: Caddy proxies `/js/script.js` and `/api/event` on `www` straight to the local Plausible.

- **Admin:** **`https://plausible.alisalloum.tech`**

## Deploy on Vercel (optional)

You can still use [Vercel](https://vercel.com) for previews. Production traffic uses the self-hosted flow above.
