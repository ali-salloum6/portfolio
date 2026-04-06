import matter from "gray-matter";
import en from "@/messages/en.json";
import { getBlogSlugs, getBlogSource } from "@/lib/blog";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

/** Strip i18n / UI markup tags used in next-intl strings. */
function stripMarkup(s: string): string {
  return s
    .replace(/<accent>(.*?)<\/accent>/gi, "$1")
    .replace(/<verify>(.*?)<\/verify>/gi, "$1")
    .replace(/<email>(.*?)<\/email>/gi, "$1")
    .replace(/<telegram>(.*?)<\/telegram>/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function lines(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join("\n");
}

function section(title: string, body: string): string {
  const b = body.trim();
  if (!b) return "";
  return `## ${title}\n\n${b}\n`;
}

function flattenRecord(
  obj: Record<string, unknown>,
  options?: { skipKeys?: Set<string> },
): string {
  const skip = options?.skipKeys ?? new Set();
  const out: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (skip.has(k)) continue;
    if (typeof v === "string" && v.trim()) {
      out.push(`- **${k}:** ${stripMarkup(v)}`);
    }
  }
  return out.join("\n");
}

function formatPortfolioCases(
  cases: Record<string, Record<string, string>>,
): string {
  const blocks: string[] = [];
  for (const [id, fields] of Object.entries(cases)) {
    const inner = Object.entries(fields)
      .filter(([, v]) => typeof v === "string" && v.trim())
      .map(([k, v]) => `- **${k}:** ${stripMarkup(v)}`)
      .join("\n");
    blocks.push(`### ${id}\n\n${inner}`);
  }
  return blocks.join("\n\n");
}

export function buildLlmsTxt(): string {
  const base = getSiteUrl();
  const year = new Date().getUTCFullYear();
  const copyright = en.footer.copyright
    .replace("{year}", String(year))
    .replace("{timezone}", siteConfig.timezoneLabel);

  const blogPosts = getBlogSlugs()
    .map((slug) => {
      const raw = getBlogSource(slug);
      const { data, content } = matter(raw);
      const fm = data as { title?: string; date?: string; description?: string };
      const meta = [
        fm.title && `title: ${fm.title}`,
        fm.date && `date: ${String(fm.date).slice(0, 10)}`,
        fm.description && `description: ${fm.description}`,
      ]
        .filter(Boolean)
        .join("\n");
      const body = content.trim();
      return lines(`### ${slug}`, "```yaml", meta, "```", "", body);
    })
    .join("\n\n---\n\n");

  const { portfolio, home, services, about, contact, blog, metadata, nav, footer } =
    en;

  const contactBlock = lines(
    `- **${contact.title}**`,
    stripMarkup(contact.subtitle),
    "",
    `- **${contact.prefer}** ${contact.stackEmail}: ${siteConfig.email}`,
    `- **${contact.stackTelegram}:** ${siteConfig.telegram}`,
    "",
    `Other profiles (as configured on the site): GitHub ${siteConfig.github}, LinkedIn ${siteConfig.linkedin}`,
  );

  const homeBody = flattenRecord(home as unknown as Record<string, unknown>);

  const servicesSkip = new Set(["heroTitleRich", "s4Stat"]);
  const servicesBody = flattenRecord(
    services as unknown as Record<string, unknown>,
    { skipKeys: servicesSkip },
  );

  const aboutBody = flattenRecord(about as unknown as Record<string, unknown>);

  return lines(
    "# Ali Salloum — English site copy for LLMs",
    "",
    "This document is generated from the live translation file (`messages/en.json`), blog posts (`content/blog`), and public site config. It is served at `/llms.txt` for tools and automation (e.g. cold outreach drafting).",
    "",
    "### Canonical URLs (English)",
    "",
    `- Home: ${base}/en/`,
    `- Services: ${base}/en/services`,
    `- Portfolio: ${base}/en/portfolio`,
    `- About: ${base}/en/about`,
    `- Contact: ${base}/en/contact`,
    `- Blog index: ${base}/en/blog`,
    "",
    "---",
    "",
    section("Metadata", flattenRecord(metadata as unknown as Record<string, unknown>)),
    section(
      "Navigation labels",
      Object.entries(nav)
        .filter(([k]) => !["openMenu", "closeMenu"].includes(k))
        .map(([k, v]) => `- **${k}:** ${v}`)
        .join("\n"),
    ),
    section("Footer", lines(`- **tagline:** ${footer.tagline}`, `- **response:** ${footer.response}`, `- **copyright:** ${copyright}`)),
    section("Contact (human-facing)", contactBlock),
    section("Home", homeBody),
    section("Services", servicesBody),
    section(
      "Portfolio — hero & philosophy",
      flattenRecord({
        metaTitle: portfolio.metaTitle,
        metaDescription: portfolio.metaDescription,
        heroTitle: portfolio.heroTitle,
        heroSubtitle: portfolio.heroSubtitle,
        philosophyTitle: portfolio.philosophyTitle,
        p1Title: portfolio.p1Title,
        p1Body: portfolio.p1Body,
        p2Title: portfolio.p2Title,
        p2Body: portfolio.p2Body,
        p3Title: portfolio.p3Title,
        p3Body: portfolio.p3Body,
        ctaTitle: portfolio.ctaTitle,
        ctaBody: portfolio.ctaBody,
        ctaPrimary: portfolio.ctaPrimary,
        ctaSecondary: portfolio.ctaSecondary,
      }),
    ),
    section(
      "Portfolio — case studies",
      formatPortfolioCases(portfolio.cases as Record<string, Record<string, string>>),
    ),
    section("About", aboutBody),
    section(
      "Blog — section metadata",
      flattenRecord({
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        title: blog.title,
        subtitle: blog.subtitle || "(empty)",
      }),
    ),
    section("Blog — posts (full MDX body, English)", blogPosts || "_No posts._"),
    "",
    "---",
    "",
    "_End of export._",
    "",
  ).trimEnd() + "\n";
}
