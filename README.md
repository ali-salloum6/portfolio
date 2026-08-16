This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production deployment (self-hosted)

The live site runs on the **Stockholm VPS** (`stockholm` / `132.243.240.175`). See [`DEPLOYMENT.md`](DEPLOYMENT.md) for architecture, DNS cutover, and incident notes.

<!-- Former host: Finland VPS (`fin` / 185.231.206.8), decommissioned 2026-06-05. -->

After you commit or save changes locally:

1. **Prerequisites**
   - SSH to the server works as **`stockholm`** (see `~/.ssh/config`).
   - **`./scripts/deploy-stockholm.sh`** is executable (`chmod +x scripts/deploy-stockholm.sh` once).
   - **`./.env.local`** exists with production values (API keys, `NEXT_PUBLIC_*`). It is **rsync’d** to the server; the deploy script copies it to **`.env.production`** and sets **`NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`**.

2. **Ship changes**

   ```bash
   ./scripts/deploy-stockholm.sh
   ```

   This builds locally, syncs the repo to `/var/www/portfolio` on `stockholm`, uploads `.next` atomically, updates Nginx, and restarts **`portfolio-eu`**.

   Legacy wrappers `./scripts/deploy-fin.sh` and `./scripts/status-fin.sh` forward to the Stockholm scripts.

3. **Check the service**

   ```bash
   ./scripts/status-stockholm.sh
   ```

If something fails, SSH in and inspect logs:

```bash
ssh stockholm
sudo journalctl -u portfolio-eu -n 80 --no-pager
```

**Before DNS cutover:** the site is testable at `http://132.243.240.175/en`. After you point DNS at Stockholm, run Certbot (see [`DEPLOYMENT.md`](DEPLOYMENT.md) → “DNS cutover checklist”) and deploy again for HTTPS.

## Plausible Analytics

`plausible.alisalloum.tech` stays on **Moscow (`tae`)** — do not point it at Stockholm unless you intentionally move Plausible. See [`DEPLOYMENT.md`](DEPLOYMENT.md).

- **Admin:** **`https://plausible.alisalloum.tech`**

## Deploy on Vercel (optional)

You can still use [Vercel](https://vercel.com) for previews. Production traffic uses the self-hosted flow above.
