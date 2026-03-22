import { routing } from "@/i18n/routing";
import { getBlogSlugs } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site-config";
import type { MetadataRoute } from "next";

const staticPaths = ["", "/services", "/portfolio", "/about", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path || ""}`,
        lastModified,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const slug of getBlogSlugs()) {
      entries.push({
        url: `${base}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
