import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const year = new Date().getFullYear();

  return (
    <footer className="glass-footer mt-auto py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
        <p className="text-center text-lg font-semibold text-on-surface md:text-start">
          {t("tagline")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <a
            href={siteConfig.telegram}
            data-plausible-name="footer_telegram"
            className="text-on-surface-variant transition-colors hover:text-primary"
            rel="noopener noreferrer"
            target="_blank"
          >
            Telegram
          </a>
          <a
            href={siteConfig.github}
            data-plausible-name="footer_github"
            className="text-on-surface-variant transition-colors hover:text-primary"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            data-plausible-name="footer_linkedin"
            className="text-on-surface-variant transition-colors hover:text-primary"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            data-plausible-name="footer_email"
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            {siteConfig.email}
          </a>
          <Link
            href="/contact"
            data-plausible-name="footer_contact"
            className="font-bold text-primary hover:text-tertiary"
          >
            {tNav("contact")}
          </Link>
        </div>
        <p className="text-center text-sm text-on-surface-variant/70 md:text-end">
          {t("copyright", {
            year,
            timezone: siteConfig.timezoneLabel,
          })}
          <span className="ms-2">{t("response")}</span>
        </p>
      </div>
    </footer>
  );
}
