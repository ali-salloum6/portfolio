import { MaterialIcon } from "@/components/MaterialIcon";
import { ScholarCitationCount } from "@/components/portfolio/ScholarCitationCount";
import {
  GlassPointerArticle,
  GlassPointerDiv,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

/**
 * Case studies, hardest first. Copy lives in `portfolio.cases.<id>` (problem, hard.*, did.*, results.*.v/l, credit).
 * Diagrams are rendered by `scripts/case-diagrams/render-all.cjs` from `specs.js` there; every number in them
 * must match messages/*.json.
 */
const CASES = [
  {
    id: "c1",
    anchor: "llm-evals",
    icon: "fact_check",
    image: "/images/case-llm-evals.webp",
    hard: ["h1", "h2", "h3", "h4"],
    did: ["d1", "d2", "d3", "d4"],
    results: ["r1", "r2", "r3", "r4"],
    stack: ["PYTHON", "FASTAPI", "LANCEDB", "SQLITE", "GITHUB ACTIONS", "SSE"],
  },
  {
    id: "c2",
    anchor: "gpu-inference",
    icon: "memory",
    image: "/images/case-gpu-scaleout.webp",
    hard: ["h1", "h2", "h3", "h4"],
    did: ["d1", "d2", "d3", "d4"],
    results: ["r1", "r2", "r3", "r4"],
    stack: ["PYTHON", "FASTAPI", "ONNX RUNTIME", "CUDA", "CADDY", "SYSTEMD"],
  },
  {
    id: "c3",
    anchor: "agent-hosting",
    icon: "hub",
    image: "/images/case-agent-hosting.webp",
    hard: ["h1", "h2", "h3", "h4"],
    did: ["d1", "d2", "d3", "d4"],
    results: ["r1", "r2", "r3", "r4"],
    stack: ["PYTHON", "ASYNCIO", "UVLOOP", "HTTPX", "UNIX SOCKETS", "SYSTEMD"],
  },
  {
    id: "c4",
    anchor: "crm-sync",
    icon: "sync_lock",
    image: "/images/case-crm-sync.webp",
    hard: ["h1", "h2", "h3", "h4"],
    did: ["d1", "d2", "d3", "d4"],
    results: ["r1", "r2", "r3", "r4"],
    stack: ["GO", "POCKETBASE", "SQLITE", "BITRIX24 REST"],
  },
  {
    id: "c5",
    anchor: "llm-memory",
    icon: "psychology",
    image: "/images/case-llm-memory.webp",
    hard: ["h1", "h2", "h3"],
    did: ["d1", "d2", "d3"],
    results: ["r1", "r2", "r3"],
    stack: ["PYTHON", "TELEGRAM BOT API"],
  },
] as const;

const WAR_STORIES = ["w1", "w2", "w3", "w4", "w5", "w6"] as const;

const ALSO_BUILT = [
  ["a1", "campaign"],
  ["a2", "how_to_vote"],
  ["a3", "widgets"],
  ["a4", "stream"],
] as const;

const PRINCIPLES = [
  ["p1", "query_stats"],
  ["p2", "rule"],
  ["p3", "bug_report"],
  ["p4", "smart_toy"],
] as const;

const WIDGET_DEMO_URL = "https://ai-dev.myluuk.app/widget/v2/widget-example.html";

/** Published paper (Procedia CS 2024; Google Scholar cluster) — `research.qboost` */
const QBOOST_PAPER_URL =
  "https://www.sciencedirect.com/science/article/pii/S1877050924023330";
const QBOOST_SCHOLAR_CITES_URL =
  "https://scholar.google.com/scholar?cites=4727824286413679555&as_sdt=2005&hl=en";
const NATURE_NPJ_CITING_URL = "https://www.nature.com/articles/s41524-026-02032-x";

/** Keeps each side of "before → after" ("before ← after" in Arabic) on one line, so a range like 0.2–0.5% never breaks. */
function MetricValue({ value }: { value: string }) {
  const [before, arrow, after] = value.split(/\s([→←])\s/);
  if (!arrow) return <span className="whitespace-nowrap">{value}</span>;
  return (
    <>
      <span className="whitespace-nowrap">{`${before} ${arrow}`}</span>{" "}
      <span className="whitespace-nowrap">{after}</span>
    </>
  );
}

const linkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary";
const sectionLabelClass = "mb-4 text-xs font-bold uppercase tracking-widest text-tertiary";

export async function PortfolioPage() {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const t = await getTranslations("portfolio");

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <header className="mb-16 text-center" data-reveal-group>
        <p
          data-reveal="fade-up"
          className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-tertiary"
        >
          {t("heroKicker")}
        </p>
        <h1
          data-reveal="fade-up"
          className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tighter text-on-background md:text-6xl"
        >
          {t("heroTitle")}
        </h1>
        <p
          data-reveal="fade-up"
          className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-on-surface-variant md:text-xl"
        >
          {t("heroSubtitle")}
        </p>
        <p
          data-reveal="fade-up"
          className="mx-auto mt-8 inline-flex max-w-3xl items-start gap-3 rounded-md border border-outline-variant px-5 py-3 text-start text-sm font-semibold leading-relaxed text-on-surface"
        >
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{t("heroStatus")}</span>
        </p>
      </header>

      <nav
        aria-label={t("heroKicker")}
        className="mb-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        data-reveal-group
      >
        {CASES.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.anchor}`}
            data-reveal="fade-up"
            data-plausible-name={`portfolio_index_${c.anchor}`}
            className="group block h-full rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <GlassPointerDiv className="industrial-card flex h-full flex-col rounded-lg p-5 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <MaterialIcon name={c.icon} className="text-xl text-on-surface-variant" />
              </div>
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-tertiary">
                {t(`cases.${c.id}.tag`)}
              </span>
              <span className="mb-4 text-base font-bold leading-snug text-on-surface">
                {t(`cases.${c.id}.title`)}
              </span>
              <span className="mt-auto border-t border-outline-variant pt-4">
                <span className="block text-xl font-extrabold tracking-tight text-primary">
                  <MetricValue value={t(`cases.${c.id}.metric`)} />
                </span>
                <span className="block text-xs font-semibold text-on-surface-variant">
                  {t(`cases.${c.id}.metricLabel`)}
                </span>
              </span>
            </GlassPointerDiv>
          </a>
        ))}
      </nav>

      {CASES.map((c, i) => (
        <section key={c.id} id={c.anchor} className="mb-24 scroll-mt-24">
          <GlassPointerArticle
            data-reveal="fade-up"
            className="industrial-card rounded-lg p-6 md:p-10"
          >
            <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-widest">
                  <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-tertiary">{t(`cases.${c.id}.tag`)}</span>
                  <span className="text-on-surface-variant">{t(`cases.${c.id}.period`)}</span>
                </div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                  {t(`cases.${c.id}.title`)}
                </h2>
                <p className="text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
                  {t(`cases.${c.id}.hook`)}
                </p>
              </div>
              <div className="industrial-inset shrink-0 rounded-md px-6 py-4 lg:text-end">
                <div className="text-3xl font-extrabold tracking-tight text-primary">
                  <MetricValue value={t(`cases.${c.id}.metric`)} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {t(`cases.${c.id}.metricLabel`)}
                </div>
              </div>
            </header>

            <a
              href={c.image}
              target="_blank"
              rel="noopener noreferrer"
              data-plausible-name={`portfolio_diagram_${c.anchor}`}
              className="industrial-inset group relative mb-10 block aspect-video overflow-hidden rounded-md"
            >
              <Image
                src={c.image}
                alt={t(`cases.${c.id}.imageAlt`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-md bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-slate-100 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <MaterialIcon name="open_in_full" className="text-sm" />
                {t("labels.openImage")}
              </span>
            </a>

            <div className="mb-10 max-w-4xl">
              <h3 className={sectionLabelClass}>{t("labels.problem")}</h3>
              <p className="text-base leading-relaxed text-on-surface">{t(`cases.${c.id}.problem`)}</p>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h3 className={sectionLabelClass}>{t("labels.hard")}</h3>
                <ul className="space-y-4">
                  {c.hard.map((k) => (
                    <li key={k} className="flex items-start gap-3">
                      <MaterialIcon
                        name="error"
                        className="mt-0.5 shrink-0 text-base text-amber-600 dark:text-amber-400"
                      />
                      <span className="text-sm leading-relaxed text-on-surface-variant">
                        {t(`cases.${c.id}.hard.${k}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={sectionLabelClass}>{t("labels.did")}</h3>
                <ol className="space-y-4">
                  {c.did.map((k, j) => (
                    <li key={k} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-bold text-primary">
                        {j + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-on-surface">
                        {t(`cases.${c.id}.did.${k}`)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-10">
              <h3 className={sectionLabelClass}>{t("labels.results")}</h3>
              <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${c.results.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}
              >
                {c.results.map((r) => (
                  <div key={r} className="industrial-inset rounded-md p-5">
                    <div className="mb-2 text-2xl font-extrabold tracking-tight text-primary">
                      <MetricValue value={t(`cases.${c.id}.results.${r}.v`)} />
                    </div>
                    <div className="text-xs font-semibold leading-relaxed text-on-surface-variant">
                      {t(`cases.${c.id}.results.${r}.l`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="mt-8 flex flex-col gap-4 border-t border-outline-variant pt-6 lg:flex-row lg:items-start lg:justify-between">
              <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant">
                <span className="font-bold text-on-surface">{t("labels.credit")}: </span>
                {t(`cases.${c.id}.credit`)}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                {c.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-outline-variant bg-outline-variant px-3 py-1 text-[10px] font-bold text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </GlassPointerArticle>
        </section>
      ))}

      <section className="mb-24">
        <h2 data-reveal="fade-up" className="mb-3 text-center text-3xl font-bold">
          {t("warTitle")}
        </h2>
        <p data-reveal="fade-up" className="mb-12 text-center font-medium text-on-surface-variant">
          {t("warSubtitle")}
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" data-reveal-group>
          {WAR_STORIES.map((k) => (
            <GlassPointerArticle
              key={k}
              data-reveal="fade-up"
              className="industrial-card flex flex-col rounded-lg p-6"
            >
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-tertiary">
                {t(`war.${k}.tag`)}
              </span>
              <h3 className="mb-5 text-lg font-bold leading-snug">{t(`war.${k}.title`)}</h3>
              <dl className="space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="mb-1 text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-300">
                    {t("labels.cause")}
                  </dt>
                  <dd className="text-on-surface-variant">{t(`war.${k}.cause`)}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                    {t("labels.fix")}
                  </dt>
                  <dd className="text-on-surface">{t(`war.${k}.fix`)}</dd>
                </div>
              </dl>
            </GlassPointerArticle>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 data-reveal="fade-up" className="mb-12 text-center text-3xl font-bold">
          {t("researchTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-reveal-group>
          <GlassPointerArticle data-reveal="fade-up" className="industrial-card flex flex-col rounded-lg p-8">
            <span className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("research.qboost.tag")}
            </span>
            <h3 className="mb-4 text-2xl font-bold">{t("research.qboost.title")}</h3>
            <div className="industrial-inset mb-6 rounded-md p-5">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {t("research.qboost.citationBlockTitle")}
              </div>
              <ScholarCitationCount
                fallbackCount={t("research.qboost.citationFallbackCount")}
                restLabel={t("research.qboost.citationRest")}
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("research.qboost.body")}</p>
            <ul className="mb-6 space-y-3">
              {(["f1", "f2", "f3"] as const).map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <MaterialIcon name="check" className="mt-0.5 shrink-0 text-sm text-primary" />
                  <span className="text-xs font-semibold leading-relaxed text-on-surface">
                    {t(`research.qboost.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mb-6 text-xs font-semibold text-on-surface-variant">
              {t("research.qboost.venueTitle")}: {t("research.qboost.venueVal")}
            </p>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href={QBOOST_PAPER_URL}
                data-plausible-name="portfolio_case_qboost_paper"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <MaterialIcon name="menu_book" className="text-base" />
                {t("research.qboost.paperLink")}
              </a>
              <a
                href={QBOOST_SCHOLAR_CITES_URL}
                data-plausible-name="portfolio_case_qboost_scholar"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <MaterialIcon name="school" className="text-base" />
                {t("research.qboost.scholarLink")}
              </a>
              <a
                href={NATURE_NPJ_CITING_URL}
                data-plausible-name="portfolio_case_qboost_nature"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm font-semibold text-on-surface underline decoration-outline-variant underline-offset-4 transition-colors hover:text-primary"
              >
                <MaterialIcon name="public" className="mt-0.5 shrink-0 text-base text-primary" />
                <span>{t("research.qboost.natureLink")}</span>
              </a>
            </div>
          </GlassPointerArticle>

          <GlassPointerArticle data-reveal="fade-up" className="industrial-card flex flex-col rounded-lg p-8">
            <span className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("research.grok.tag")}
            </span>
            <h3 className="mb-4 text-2xl font-bold">{t("research.grok.title")}</h3>
            <div className="industrial-inset mb-6 rounded-md p-5">
              <div className="text-3xl font-extrabold tracking-tight text-primary">
                <MetricValue value={t("research.grok.statValue")} />
              </div>
              <div className="text-xs font-semibold text-on-surface-variant">{t("research.grok.statLabel")}</div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{t("research.grok.body")}</p>
            <ul className="space-y-3">
              {(["f1", "f2", "f3"] as const).map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <MaterialIcon name="science" className="mt-0.5 shrink-0 text-sm text-primary" />
                  <span className="text-xs font-semibold leading-relaxed text-on-surface">
                    {t(`research.grok.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </GlassPointerArticle>
        </div>
      </section>

      <section className="mb-24">
        <h2 data-reveal="fade-up" className="mb-12 text-center text-3xl font-bold">
          {t("alsoTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
          {ALSO_BUILT.map(([key, icon]) => (
            <GlassPointerDiv key={key} data-reveal="fade-up" className="industrial-card flex flex-col rounded-lg p-6">
              <div className="industrial-inset mb-5 flex h-11 w-11 items-center justify-center rounded-md">
                <MaterialIcon name={icon} className="text-xl text-primary" />
              </div>
              <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-tertiary">
                {t(`also.${key}.tag`)}
              </span>
              <h3 className="mb-3 text-lg font-bold leading-snug">{t(`also.${key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{t(`also.${key}.body`)}</p>
              {key === "a3" && (
                <a
                  href={WIDGET_DEMO_URL}
                  data-plausible-name="portfolio_case_luukai_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} mt-4`}
                >
                  <MaterialIcon name={isRtl ? "north_west" : "north_east"} className="text-base" />
                  {t("also.a3.link")}
                </a>
              )}
            </GlassPointerDiv>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2 data-reveal="fade-up" className="mb-12 text-center text-3xl font-bold">
          {t("philosophyTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
          {PRINCIPLES.map(([key, icon]) => (
            <GlassPointerDiv key={key} data-reveal="fade-up" className="industrial-card rounded-lg p-8">
              <div className="industrial-inset mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md">
                <MaterialIcon name={icon} className="text-3xl text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-bold">{t(`${key}Title`)}</h3>
              <p className="text-sm text-on-surface-variant">{t(`${key}Body`)}</p>
            </GlassPointerDiv>
          ))}
        </div>
      </section>

      <GlassPointerSection
        data-reveal="fade-up"
        className="industrial-card relative overflow-hidden rounded-lg p-12 text-center"
      >
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
              className="shine rounded-md bg-primary px-10 py-4 font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/about"
              data-plausible-name="portfolio_cta_about_secondary"
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
