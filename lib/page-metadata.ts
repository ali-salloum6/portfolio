import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

type Args = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: Args): Metadata {
  const base = getSiteUrl();
  const normalized = path === "/" ? "" : path;
  const canonicalPath = `/${locale}${normalized}`;

  const languages: Record<string, string> = {
    "x-default": `${base}/en${normalized}`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${base}/${loc}${normalized}`;
  }

  const ogLocale =
    locale === "ar" ? "ar_SA" : locale === "ru" ? "ru_RU" : "en_US";

  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${canonicalPath}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${base}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
