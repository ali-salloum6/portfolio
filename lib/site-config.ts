/** Public links — replace with your real profiles */
export const siteConfig = {
  name: "Ali Salloum",
  title: "AI-Accelerated Full-Stack Architect",
  domain: "alisalloum.tech",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@alisalloum.tech",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/yourusername",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/yourusername",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/yourusername",
  timezoneLabel: "Moscow UTC+3",
  responseTime: "< 12 hours",
};

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://alisalloum.tech"
  );
}
