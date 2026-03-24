import { MaterialIcon } from "@/components/MaterialIcon";
import { ScholarCitationCount } from "@/components/portfolio/ScholarCitationCount";
import {
  GlassPointerArticle,
  GlassPointerDiv,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

/** Case study 01: blueprint-style architecture (Caddy → Manager → Unix sockets) — `cases.c1` */
const CASE1_IMAGE = "/images/unified-manager-blueprint.webp";

/** LuukAI widget screenshot — `cases.c4` */
const CASE_WIDGET_IMAGE = "/images/luukai-widget-wide.webp";
const CASE_WIDGET_DEMO_URL = "https://ai.myluuk.app/widget/v1/widget-example.html";

/** Published paper — `cases.c5` (Procedia CS 2024; Google Scholar cluster) */
const QBOOST_PAPER_URL =
  "https://www.sciencedirect.com/science/article/pii/S1877050924023330";
const QBOOST_SCHOLAR_CITES_URL =
  "https://scholar.google.com/scholar?cites=4727824286413679555&as_sdt=2005&hl=en";
const NATURE_NPJ_CITING_URL = "https://www.nature.com/articles/s41524-026-02032-x";

/** Electricity price forecasting — `cases.c6` */
const CASE_ELECTRICITY_CHART = "/images/week-of-data.webp";
const ELECTRICITY_REPORT_PDF_URL =
  "https://drive.google.com/file/d/1UrRe9NF8okN4td2ZMYHdbI3LygMXXnoR/view";

export async function PortfolioPage() {
  const t = await getTranslations("portfolio");

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">
      <header className="mb-24 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tighter text-on-background md:text-6xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-on-surface-variant">
          {t("heroSubtitle")}
        </p>
      </header>

      <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-12">
        <GlassPointerArticle className="industrial-card flex flex-col items-center gap-8 rounded-lg p-8 md:col-span-12 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="industrial-inset relative mb-6 aspect-video overflow-hidden rounded-md">
              <Image
                src={CASE1_IMAGE}
                alt={t("cases.c1.imageAlt")}
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="industrial-inset rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-primary">{t("cases.c1.m1")}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {t("cases.c1.m1l")}
                </div>
              </div>
              <div className="industrial-inset rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-primary">{t("cases.c1.m2")}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {t("cases.c1.m2l")}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c1.tag")}
            </span>
            <h2 className="mb-4 text-2xl font-bold">{t("cases.c1.title")}</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              {t("cases.c1.body")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MaterialIcon name="architecture" className="text-sm text-primary" />
                <span className="text-xs font-semibold text-on-surface">{t("cases.c1.f1")}</span>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon name="security" className="text-sm text-primary" />
                <span className="text-xs font-semibold text-on-surface">{t("cases.c1.f2")}</span>
              </li>
            </ul>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col rounded-lg p-8 md:col-span-8">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c2.tag")}
          </span>
          <h2 className="mb-4 text-2xl font-bold">{t("cases.c2.title")}</h2>
          <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("cases.c2.body")}</p>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c2.techTitle")}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MaterialIcon name="sync" className="mt-0.5 shrink-0 text-sm text-primary" />
              <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c2.f1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <MaterialIcon name="fact_check" className="mt-0.5 shrink-0 text-sm text-primary" />
              <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c2.f2")}</span>
            </li>
          </ul>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col justify-between rounded-lg p-8 md:col-span-4">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c3.tag")}
            </span>
            <h2 className="mb-3 text-xl font-bold">{t("cases.c3.title")}</h2>
            <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
              {t("cases.c3.body")}
            </p>
          </div>
          <div className="industrial-inset mb-6 rounded-md p-4">
            <div className="mb-1 text-sm font-semibold">{t("cases.c3.arch")}</div>
            <div className="text-xs font-medium text-primary">{t("cases.c3.archVal")}</div>
            <div className="mt-2 text-xs font-medium text-primary">{t("cases.c3.archVal2")}</div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant pt-4">
            <div className="text-xl font-bold text-on-surface">{t("cases.c3.metric")}</div>
            <div className="text-end text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {t("cases.c3.metricLabel")}
            </div>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col gap-8 rounded-lg p-8 md:col-span-12 md:flex-row">
          <div className="w-full md:w-2/5 md:shrink-0">
            <div className="industrial-inset relative aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={CASE_WIDGET_IMAGE}
                alt={t("cases.c4.imageAlt")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <a
              href={CASE_WIDGET_DEMO_URL}
              data-plausible-name="portfolio_case_luukai_demo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary"
            >
              <MaterialIcon name="open_in_new" className="text-base" />
              {t("cases.c4.demoLink")}
            </a>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c4.tag")}
            </span>
            <h2 className="mb-4 text-2xl font-bold">{t("cases.c4.title")}</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("cases.c4.body")}</p>
            <div className="industrial-inset mb-6 rounded-md p-4">
              <div className="mb-1 text-sm font-semibold">{t("cases.c4.techTitle")}</div>
              <div className="text-xs font-medium text-primary">{t("cases.c4.techVal")}</div>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c4.engineeringTitle")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MaterialIcon name="widgets" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c4.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="forum" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c4.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="translate" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c4.f3")}</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-outline-variant pt-6">
              {["REACT 18", "MUI V5", "VITE 5"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-outline-variant bg-outline-variant px-3 py-1 text-[10px] font-bold text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col gap-8 rounded-lg p-8 md:col-span-12 md:flex-row">
          <div className="flex w-full flex-col justify-between md:w-2/5 md:shrink-0">
            <div className="industrial-inset rounded-md p-6">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {t("cases.c5.citationBlockTitle")}
              </div>
              <ScholarCitationCount
                fallbackCount={t("cases.c5.citationFallbackCount")}
                restLabel={t("cases.c5.citationRest")}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={QBOOST_PAPER_URL}
                data-plausible-name="portfolio_case_qboost_paper"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary"
              >
                <MaterialIcon name="menu_book" className="text-base" />
                {t("cases.c5.paperLink")}
              </a>
              <a
                href={QBOOST_SCHOLAR_CITES_URL}
                data-plausible-name="portfolio_case_qboost_scholar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary"
              >
                <MaterialIcon name="school" className="text-base" />
                {t("cases.c5.scholarLink")}
              </a>
              <a
                href={NATURE_NPJ_CITING_URL}
                data-plausible-name="portfolio_case_qboost_nature"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm font-semibold text-on-surface underline decoration-outline-variant underline-offset-4 transition-colors hover:text-primary"
              >
                <MaterialIcon name="public" className="mt-0.5 shrink-0 text-base text-primary" />
                <span>{t("cases.c5.natureLink")}</span>
              </a>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c5.tag")}
            </span>
            <h2 className="mb-4 text-2xl font-bold">{t("cases.c5.title")}</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("cases.c5.body")}</p>
            <div className="industrial-inset mb-6 rounded-md p-4">
              <div className="mb-1 text-sm font-semibold">{t("cases.c5.venueTitle")}</div>
              <div className="text-xs font-medium text-primary">{t("cases.c5.venueVal")}</div>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c5.engineeringTitle")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MaterialIcon name="hub" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c5.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="memory" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c5.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="trending_up" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c5.f3")}</span>
              </li>
            </ul>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex h-full flex-col gap-6 rounded-lg p-8 md:col-span-8">
          <div className="w-full shrink-0">
            <div className="industrial-inset relative aspect-[983/376] w-full overflow-hidden rounded-md bg-outline-variant/20">
              <Image
                src={CASE_ELECTRICITY_CHART}
                alt={t("cases.c6.imageAlt")}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <a
              href={ELECTRICITY_REPORT_PDF_URL}
              data-plausible-name="portfolio_case_electricity_pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary"
            >
              <MaterialIcon name="open_in_new" className="text-base" />
              {t("cases.c6.pdfLink")}
            </a>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c6.tag")}
            </span>
            <h2 className="mb-4 text-2xl font-bold">{t("cases.c6.title")}</h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("cases.c6.body")}</p>
            <div className="industrial-inset mb-6 rounded-md p-4">
              <div className="mb-1 text-sm font-semibold">{t("cases.c6.evalTitle")}</div>
              <div className="text-xs font-medium text-primary">{t("cases.c6.evalVal")}</div>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c6.engineeringTitle")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MaterialIcon name="show_chart" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c6.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="timeline" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c6.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MaterialIcon name="description" className="mt-0.5 shrink-0 text-sm text-primary" />
                <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c6.f3")}</span>
              </li>
            </ul>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex h-full flex-col rounded-lg p-8 md:col-span-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c7.tag")}
          </span>
          <h2 className="mb-4 text-2xl font-bold">{t("cases.c7.title")}</h2>
          <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("cases.c7.body")}</p>
          <div className="industrial-inset mb-6 rounded-md p-4">
            <div className="mb-1 text-sm font-semibold">{t("cases.c7.detailTitle")}</div>
            <div className="text-xs font-medium text-primary">{t("cases.c7.detailVal")}</div>
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c7.highlightsTitle")}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MaterialIcon name="psychology" className="mt-0.5 shrink-0 text-sm text-primary" />
              <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c7.f1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <MaterialIcon name="groups" className="mt-0.5 shrink-0 text-sm text-primary" />
              <span className="text-xs font-semibold leading-relaxed text-on-surface">{t("cases.c7.f2")}</span>
            </li>
          </ul>
        </GlassPointerArticle>
      </div>

      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">{t("philosophyTitle")}</h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {(["p1", "p2", "p3"] as const).map((key) => (
            <GlassPointerDiv key={key} className="industrial-card rounded-lg p-8">
              <div className="industrial-inset mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md">
                <MaterialIcon
                  name={key === "p1" ? "speed" : key === "p2" ? "verified_user" : "cloud_done"}
                  className="text-3xl text-primary"
                />
              </div>
              <h3 className="mb-3 text-lg font-bold">{t(`${key}Title`)}</h3>
              <p className="text-sm text-on-surface-variant">{t(`${key}Body`)}</p>
            </GlassPointerDiv>
          ))}
        </div>
      </section>

      <GlassPointerSection className="industrial-card relative overflow-hidden rounded-lg p-12 text-center">
        <div className="absolute end-0 top-0 z-0 p-8 opacity-5">
          <MaterialIcon name="engineering" className="text-9xl" />
        </div>
        <div className="relative z-[1]">
          <h2 className="mb-6 text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="mx-auto mb-10 max-w-xl font-medium text-on-surface-variant">{t("ctaBody")}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              data-plausible-name="portfolio_cta_contact_primary"
              className="rounded-md bg-primary px-10 py-4 font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              data-plausible-name="portfolio_cta_contact_secondary"
              className="rounded-md border border-outline-variant px-10 py-4 font-bold text-on-surface transition-all hover:bg-outline-variant/50"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </GlassPointerSection>
    </main>
  );
}
