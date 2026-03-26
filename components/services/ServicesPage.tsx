import { MaterialIcon } from "@/components/MaterialIcon";
import {
  GlassPointerDiv,
  GlassPointerLi,
  GlassPointerLink,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function ServicesPage() {
  const t = await getTranslations("services");

  const steps = [
    t("howStep1"),
    t("howStep2"),
    t("howStep3"),
    t("howStep4"),
    t("howStep5"),
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
      <header className="mx-auto mb-20 max-w-3xl text-center">
        <GlassPointerDiv className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            {t("heroBadge")}
          </span>
        </GlassPointerDiv>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-on-surface md:text-6xl">
          {t.rich("heroTitleRich", {
            accent: (c) => <span className="text-primary">{c}</span>,
          })}
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {t("heroSubtitle")}
        </p>
      </header>

      <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
        <GlassPointerDiv className="industrial-card flex items-center gap-6 rounded-xl p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg industrial-inset text-primary">
            <MaterialIcon name="schedule" className="text-3xl" />
          </div>
          <div>
            <h3 className="font-bold text-on-surface">{t("trustTimezoneTitle")}</h3>
            <p className="text-sm text-on-surface-variant">{t("trustTimezoneBody")}</p>
          </div>
        </GlassPointerDiv>
        <GlassPointerDiv className="industrial-card flex items-center gap-6 rounded-xl p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg industrial-inset text-tertiary">
            <MaterialIcon name="bolt" className="text-3xl" />
          </div>
          <div>
            <h3 className="font-bold text-on-surface">{t("trustResponseTitle")}</h3>
            <p className="text-sm text-on-surface-variant">{t("trustResponseBody")}</p>
          </div>
        </GlassPointerDiv>
      </div>

      <GlassPointerSection className="mb-20 industrial-card rounded-2xl p-8 md:p-10">
        <h2 className="mb-4 text-2xl font-extrabold text-on-surface">{t("pricingTitle")}</h2>
        <p className="max-w-none whitespace-pre-line leading-relaxed text-on-surface-variant">
          {t("pricingBody")}
        </p>
      </GlassPointerSection>

      <section className="mb-24">
        <h2 className="mb-10 text-center text-3xl font-bold text-on-surface">{t("howTitle")}</h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((label, i) => (
            <GlassPointerLi
              key={label}
              className="glass-panel flex items-center gap-3 rounded-xl px-4 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="font-semibold text-on-surface">{label}</span>
            </GlassPointerLi>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <GlassPointerDiv className="industrial-card flex flex-col justify-between rounded-2xl p-8 transition-all hover:border-primary/50 md:p-10 lg:col-span-7">
          <div>
            <div className="mb-8 flex items-start justify-between">
              <div className="rounded-xl industrial-inset p-4 text-primary">
                <MaterialIcon name="database" className="text-4xl" />
              </div>
              <span className="rounded-lg border border-outline-variant bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant">
                {t("s1Time")}
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-extrabold">{t("s1Title")}</h2>
            <p className="mb-8 max-w-lg text-on-surface-variant">{t("s1Desc")}</p>
          </div>
          <Link
            href="/contact"
            data-plausible-name="services_tier_database_contact"
            className="w-full rounded-lg border border-primary px-8 py-4 text-center font-bold text-primary transition-all hover:bg-primary/10 md:w-fit"
          >
            {t("s1Cta")}
          </Link>
        </GlassPointerDiv>

        <GlassPointerDiv className="industrial-card flex flex-col justify-between rounded-2xl p-8 transition-all hover:border-tertiary/50 md:p-10 lg:col-span-5">
          <div>
            <div className="mb-8 flex items-start justify-between">
              <div className="rounded-xl industrial-inset p-4 text-tertiary">
                <MaterialIcon name="smartphone" className="text-4xl" />
              </div>
              <span className="rounded-lg border border-outline-variant bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant">
                {t("s2Time")}
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-extrabold">{t("s2Title")}</h2>
            <p className="mb-8 text-on-surface-variant">{t("s2Desc")}</p>
          </div>
          <Link
            href="/contact"
            data-plausible-name="services_tier_mobile_contact"
            className="w-full rounded-lg border border-tertiary px-8 py-4 text-center font-bold text-tertiary transition-all hover:bg-tertiary/10"
          >
            {t("s2Cta")}
          </Link>
        </GlassPointerDiv>

        <GlassPointerDiv className="industrial-card flex flex-col justify-between rounded-2xl p-8 transition-all hover:border-on-surface/30 md:p-10 lg:col-span-5">
          <div>
            <div className="mb-8 flex items-start justify-between">
              <div className="rounded-xl industrial-inset p-4 text-on-surface">
                <MaterialIcon name="web" className="text-4xl" />
              </div>
              <span className="rounded-lg border border-outline-variant bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant">
                {t("s3Time")}
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-extrabold">{t("s3Title")}</h2>
            <p className="mb-8 text-on-surface-variant">{t("s3Desc")}</p>
          </div>
          <Link
            href="/contact"
            data-plausible-name="services_tier_web_contact"
            className="w-full rounded-lg border border-outline-variant px-8 py-4 text-center font-bold text-on-surface transition-all hover:bg-surface-container-high"
          >
            {t("s3Cta")}
          </Link>
        </GlassPointerDiv>

        <GlassPointerDiv className="industrial-card flex flex-col justify-between rounded-2xl p-8 transition-all hover:border-primary/50 md:p-10 lg:col-span-7">
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex-1">
              <div className="mb-8 flex items-start justify-between">
                <div className="rounded-xl industrial-inset p-4 text-primary">
                  <MaterialIcon name="psychology" className="text-4xl" />
                </div>
                <span className="rounded-lg border border-outline-variant bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant">
                  {t("s4Time")}
                </span>
              </div>
              <h2 className="mb-4 text-2xl font-extrabold">{t("s4Title")}</h2>
              <p className="mb-6 text-on-surface-variant">{t("s4Desc")}</p>
            </div>
            <div className="flex w-full flex-col justify-center md:w-1/3">
              <div className="flex aspect-square flex-col items-center justify-center rounded-2xl industrial-inset p-6 text-center">
                <span className="mb-2 text-4xl font-black text-primary">99%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {t("s4Stat")}
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            data-plausible-name="services_tier_ai_contact"
            className="mt-8 w-full rounded-lg border border-primary px-8 py-4 text-center font-bold text-primary transition-all hover:bg-primary/10 md:w-fit"
          >
            {t("s4Cta")}
          </Link>
        </GlassPointerDiv>
      </div>

      <GlassPointerSection className="mt-32 industrial-card rounded-2xl border-primary/20 p-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold">{t("closingTitle")}</h2>
        <p className="mx-auto mb-10 max-w-xl text-on-surface-variant">{t("closingBody")}</p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="/contact"
            data-plausible-name="services_closing_contact"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-10 py-5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
          >
            <MaterialIcon name="calendar_today" />
            {t("closingPrimary")}
          </Link>
          <GlassPointerLink
            href="/portfolio"
            data-plausible-name="services_closing_portfolio"
            className="glass-panel rounded-lg px-10 py-5 font-bold text-on-surface transition-all hover:brightness-110"
          >
            {t("closingSecondary")}
          </GlassPointerLink>
        </div>
      </GlassPointerSection>
    </main>
  );
}
