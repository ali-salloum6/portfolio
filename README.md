This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Production deployment (self-hosted)

The live site runs on the **Finland VPS** (see [`DEPLOYMENT.md`](DEPLOYMENT.md) for architecture, DNS, and incident notes).

After you commit or save changes locally:

1. **Prerequisites**
   - SSH to the server works as **`fin`** (see `~/.ssh/config`).
   - **`./scripts/deploy-fin.sh`** is executable (`chmod +x scripts/deploy-fin.sh` once).
   - **`./.env.local`** exists with production values (API keys, `NEXT_PUBLIC_*`). It is **rsync’d** to the server; the remote deploy script copies it to **`.env.production`** and sets **`NEXT_PUBLIC_SITE_URL=https://www.alisalloum.tech`**.

2. **Ship changes**

   ```bash
   ./scripts/deploy-fin.sh
   ```

   This syncs the repo to `/var/www/portfolio` on `fin`, runs `npm install`, a **clean** production build (`rm -rf .next` on the server), and restarts the **`portfolio-eu`** systemd service.

3. **Check the service**

   ```bash
   ./scripts/status-fin.sh
   ```

If something fails, SSH in and inspect logs:

```bash
ssh fin
sudo journalctl -u portfolio-eu -n 80 --no-pager
```

## Plausible Analytics

`plausible.alisalloum.tech` is whatever **`A` DNS** points at (often **Moscow** on a 1 GB Finland VPS so the site stays fast). See [`DEPLOYMENT.md`](DEPLOYMENT.md).

- **Finland install (needs ≥ 2 GB RAM):** `./scripts/setup-plausible-finland.sh` + DNS + Certbot.
- **Admin:** **`https://plausible.alisalloum.tech/register`** after HTTPS works; first user is admin.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (optional)

You can still use [Vercel](https://vercel.com) for previews or experiments. Production traffic is intended to use the self-hosted flow above; see [`DEPLOYMENT.md`](DEPLOYMENT.md) for DNS and cutover notes.
