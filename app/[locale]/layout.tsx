import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PlausibleButtonTracker } from "@/components/analytics/PlausibleButtonTracker";
import { PlausibleScript } from "@/components/seo/PlausibleScript";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { getSiteUrl } from "@/lib/site-config";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Noto_Kufi_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      // The `js` class gates the reveal-animation initial hidden state in
      // CSS. It's set server-side so no inline script / FOUC is needed; the
      // <noscript> tag below restores visibility for JS-disabled visitors.
      className={cn(plusJakarta.variable, notoKufiArabic.variable, "h-full js")}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Material Symbols — not available via next/font */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "flex min-h-full flex-col bg-background text-on-background antialiased",
          isRtl ? notoKufiArabic.className : plusJakarta.className,
        )}
      >
        <SiteJsonLd />
        <PlausibleScript />
        <PlausibleButtonTracker />
        {/* Ambient animated aurora layer + scroll-linked progress bar.
            Both are decorative, pointer-events: none, and opt-out under
            prefers-reduced-motion. */}
        <div className="ambient-aurora" aria-hidden="true" />
        <div className="scroll-progress" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          <RevealObserver />
          <SiteHeader locale={locale} />
          <div className="flex-1">{children}</div>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
