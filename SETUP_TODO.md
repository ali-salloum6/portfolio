# Remaining setup checklist

Code is largely in place; most items below are **your** accounts, environment, assets, and polish.

## Deploy and environment

- [x] Create **`.env.local`** from `.env.example` and fill every variable you use in production.
- [x] Set **`NEXT_PUBLIC_SITE_URL`** to the real canonical URL (e.g. `https://alisalloum.tech`) so metadata, sitemap, and 
- [x] Open Graph URLs are correct.
- [x] **Deploy on Vercel** (or your host) and add the same environment variables in the project settings.
- [x] Point **DNS** for `alisalloum.tech` to the host and confirm HTTPS.

## Contact form (Resend)

- [x] Create a **Resend** account and API key; set **`RESEND_API_KEY`**.
- [x] Set **`CONTACT_TO_EMAIL`** to the inbox that should receive submissions.
- [x] Replace **`RESEND_FROM_EMAIL`** with a **verified domain** sender (not `onboarding@resend.dev` in production).
- [x] Send a **test submission** from `/en/contact` (and check spam folder).

## Public identity and links

- [x] Update **`NEXT_PUBLIC_TELEGRAM_URL`**, **`NEXT_PUBLIC_GITHUB_URL`**, **`NEXT_PUBLIC_LINKEDIN_URL`** (defaults in `lib/site-config.ts` may still use placeholders like `yourusername`).
- [x] Set **`NEXT_PUBLIC_CONTACT_EMAIL`** if you want the footer `mailto` to match your real address.

## Analytics (optional; in PRD)

- [x] **Vercel Analytics** is wired in the app; enable it in the Vercel project dashboard if you want it active.
- [x] think about tracking button clicks.

## Content and assets (still mock / external)

- [x] Replace **hero and portfolio images** that still use `lh3.googleusercontent.com` (`components/home/HomePage.tsx`, `components/portfolio/PortfolioPage.tsx`, `components/about/AboutPage.tsx`) with files under **`public/`** and `next/image`.
- [x] Swap **certificate thumbnails** for real images and link each card to **Coursera verify URLs** (About page may still link generically to coursera.org).
- [x] Review **copy and numbers** in `messages/en.json` (and `ru` / `ar`) so stats, pricing ranges, and case studies match what you are comfortable claiming.
- [x] check translations.

## SEO follow-through

- [x] After deploy, submit **`/sitemap.xml`** in Google Search Console (and Bing if you care).
- [x] **Validate** `hreflang` / canonicals for a few URLs (page source or an hreflang validator).
- [x] Optional: add **`opengraph-image`** (or static OG art) so shares look intentional on Telegram, WhatsApp, and LinkedIn.

## QA (PRD-style)

- [x] **RTL pass** on `/ar/...` (nav, grids, equation block, forms).
- [x] **Mobile** pass on all main routes.
- [x] Optional hardening: CAPTCHA on **`/api/contact`** beyond the honeypot.

## Housekeeping

- [ ] Update **`README.md`** so it describes this portfolio project (not the default create-next-app boilerplate).