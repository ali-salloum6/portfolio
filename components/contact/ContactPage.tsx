import { ContactForm } from "@/components/contact/ContactForm";
import { GlassPointerDiv } from "@/components/ui/GlassPointerSurface";
import { siteConfig } from "@/lib/site-config";
import { getTranslations } from "next-intl/server";

export async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg text-on-surface-variant">{t("subtitle")}</p>
      </header>

      <ContactForm />

      <GlassPointerDiv className="mt-12 industrial-card rounded-xl p-6 text-center">
        <p className="mb-4 text-sm font-semibold text-on-surface-variant">{t("prefer")}</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-bold text-primary hover:text-tertiary"
          >
            {t("stackEmail")}: {siteConfig.email}
          </a>
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:text-tertiary"
          >
            {t("stackTelegram")}
          </a>
        </div>
      </GlassPointerDiv>
    </main>
  );
}
