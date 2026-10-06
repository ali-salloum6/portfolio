import { MaterialIcon } from "@/components/MaterialIcon";
import { CountUp } from "@/components/ui/CountUp";
import {
  GlassPointerDiv,
  GlassPointerLink,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

const HERO_IMG = "/images/hero-main.webp";

/** Teasers for the first two portfolio cases. Each image keeps its story in the top third, above the card's text panel. */
/** Portfolio case c1 — answer-quality suite and agent rewrite */
const CASE_TEASER_1_IMAGE = "/images/case-llm-evals-teaser.webp";
const CASE_TEASER_1_HREF = "/portfolio#llm-evals";
/** Portfolio case c2 — GPU vision API scale-out */
const CASE_TEASER_2_IMAGE = "/images/case-gpu-scaleout-teaser.webp";
const CASE_TEASER_2_HREF = "/portfolio#gpu-inference";

/** Current roles — `home.now.*` */
const NOW_ITEMS = [
  ["n1", "hub"],
  ["n2", "dns"],
  ["n3", "school"],
] as const;

/** Areas of work — `home.build.*` (same four areas as the CVs) */
const BUILD_ITEMS = [
  ["b1", "database", "home_build_backend"],
  ["b2", "smart_toy", "home_build_llm"],
  ["b3", "deployed_code", "home_build_platform"],
  ["b4", "model_training", "home_build_ml"],
] as const;

export async function HomePage() {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const t = await getTranslations("home");
  const learnMore = t("learnMore");

  return (
    <main className="mx-auto max-w-7xl space-y-32 px-6 pb-12 pt-24 md:px-8">
      <section className="flex flex-col items-center gap-16 py-12 lg:flex-row">
        <div className="flex-1 space-y-8" data-reveal-group>
          <p
            data-reveal="fade-up"
            className="glass-panel inline-flex items-center rounded-md border-primary/35 bg-gradient-to-br from-primary/12 to-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary"
          >
            {t("badge")}
          </p>
          <h1
            data-reveal="fade-up"
            className="gradient-text text-5xl font-extrabold leading-[1.1] tracking-tight lg:text-7xl"
          >
            {t("title")}
          </h1>
          <p
            data-reveal="fade-up"
            className="max-w-2xl text-2xl font-medium leading-relaxed text-on-surface-variant"
          >
            {t("tagline")}
          </p>
          <div data-reveal="fade-up" className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              data-plausible-name="home_hero_contact"
              className="shine shine-loop rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/portfolio"
              data-plausible-name="home_hero_portfolio"
              className="rounded-lg border border-outline-variant px-8 py-4 text-lg font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-center lg:justify-end" data-reveal="scale-in">
          <GlassPointerDiv className="glass-panel halo-ring relative h-80 w-80 overflow-hidden rounded-2xl p-4 lg:h-[450px] lg:w-[450px]">
            <Image
              src={HERO_IMG}
              alt={t("title")}
              fill
              className="relative z-[1] rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              sizes="(max-width: 1024px) 320px, 450px"
              priority
            />
          </GlassPointerDiv>
        </div>
      </section>

      <section className="py-4">
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
          data-reveal-group
        >
          <Stat variant="number" value={t("statsYearsValue")} label={t("statsYears")} />
          <Stat variant="icon" icon="school" label={t("statsDegree")} />
          <Stat variant="number" value={t("statsCitationsValue")} label={t("statsCitations")} />
          <Stat variant="icon" icon="groups" label={t("statsLead")} />
        </div>
      </section>

      <GlassPointerSection
        data-reveal="fade-up"
        className="glass-panel rounded-2xl px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10"
      >
        <div className="relative z-[1]">
          <h2 className="mb-12 text-center text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("nowTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NOW_ITEMS.map(([key, icon], index) => (
              <div
                key={key}
                className={
                  index === 0
                    ? "glass-panel flex flex-col rounded-xl border-primary/35 p-6 sm:p-8"
                    : "glass-panel flex flex-col rounded-xl p-6 sm:p-8"
                }
              >
                <MaterialIcon name={icon} className="relative z-[1] mb-5 text-3xl text-primary" />
                <h3 className="relative z-[1] text-xl font-bold leading-snug text-on-surface">
                  {t(`now.${key}.role`)}
                </h3>
                <p className="relative z-[1] mt-2 text-xs font-bold uppercase tracking-widest text-tertiary">
                  {t(`now.${key}.meta`)}
                </p>
                <p className="relative z-[1] mt-4 text-sm leading-relaxed text-on-surface-variant">
                  {t(`now.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GlassPointerSection>

      <section>
        <div
          data-reveal="fade-up"
          className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
              {t("buildTitle")}
            </h2>
            <p className="font-medium text-on-surface-variant">
              {t("buildSubtitle")}
            </p>
          </div>
          <Link
            href="/portfolio"
            data-plausible-name="home_view_portfolio"
            className="hidden items-center gap-2 font-bold text-primary md:inline-flex"
          >
            {t("viewPortfolio")}
            <MaterialIcon
              name={isRtl ? "arrow_back" : "arrow_forward"}
              className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
            />
          </Link>
        </div>
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          data-reveal-group
        >
          {BUILD_ITEMS.map(([key, icon, plausibleName]) => (
            <BuildCard
              key={key}
              learnMore={learnMore}
              icon={icon}
              plausibleName={plausibleName}
              title={t(`build.${key}.title`)}
              description={t(`build.${key}.desc`)}
              featured={key === "b2"}
              isRtl={isRtl}
            />
          ))}
        </div>
        <Link
          href="/portfolio"
          data-plausible-name="home_view_portfolio"
          className="mt-8 inline-flex items-center gap-2 font-bold text-primary md:hidden"
        >
          {t("viewPortfolio")}
          <MaterialIcon name={isRtl ? "arrow_back" : "arrow_forward"} />
        </Link>
      </section>

      <section
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        data-reveal-group
      >
        <CaseTeaserCard
          href={CASE_TEASER_1_HREF}
          imageSrc={CASE_TEASER_1_IMAGE}
          imageAlt={t("case1Title")}
          imageClassName="object-cover object-top"
          tag={t("case1Tag")}
          tagAccent="primary"
          plausibleName="home_case_teaser_evals"
          title={t("case1Title")}
          description={t("case1Desc")}
        />
        <CaseTeaserCard
          href={CASE_TEASER_2_HREF}
          imageSrc={CASE_TEASER_2_IMAGE}
          imageAlt={t("case2Title")}
          imageClassName="object-cover object-top"
          tag={t("case2Tag")}
          tagAccent="indigo"
          plausibleName="home_case_teaser_gpu"
          title={t("case2Title")}
          description={t("case2Desc")}
        />
      </section>

      <GlassPointerSection
        data-reveal="fade-up"
        className="glass-panel relative space-y-8 overflow-hidden rounded-2xl border-primary/25 px-8 py-20 text-center md:px-12"
      >
        <div className="absolute start-0 top-0 z-[2] h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="relative z-[1] space-y-8">
          <h2 className="gradient-text text-5xl font-extrabold tracking-tight">
            {t("bottomCtaTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-on-surface-variant">
            {t("bottomCtaBody")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link
              href="/contact"
              data-plausible-name="home_bottom_cta_primary"
              className="shine shine-loop rounded-lg bg-primary px-12 py-5 text-xl font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("bottomCtaPrimary")}
            </Link>
            <Link
              href="/about"
              data-plausible-name="home_bottom_cta_about"
              className="rounded-lg border border-outline-variant px-12 py-5 text-xl font-semibold text-on-surface transition-colors hover:border-primary"
            >
              {t("bottomCtaSecondary")}
            </Link>
          </div>
        </div>
      </GlassPointerSection>
    </main>
  );
}

function CaseTeaserCard({
  href,
  imageSrc,
  imageAlt,
  imageClassName,
  tag,
  tagAccent,
  plausibleName,
  title,
  description,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  tag: string;
  tagAccent: "primary" | "indigo";
  plausibleName: string;
  title: string;
  description: string;
}) {
  const tagClass =
    tagAccent === "primary"
      ? "border-primary/35 bg-primary/12 text-primary"
      : "border-indigo-400/35 bg-indigo-500/12 text-indigo-800 dark:text-indigo-200";

  return (
    <GlassPointerLink
      href={href}
      data-plausible-name={plausibleName}
      data-reveal="fade-up"
      className="glass-panel group relative block h-[500px] overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="anim-kenburns relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`transition-transform duration-700 ease-out will-change-transform ${imageClassName}`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[2] space-y-3 border-t border-white/15 bg-slate-950/35 px-8 pb-8 pt-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:space-y-4 sm:px-10 sm:pb-9 sm:pt-8">
        <span
          className={`inline-flex w-fit rounded-md border px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${tagClass}`}
        >
          {tag}
        </span>
        <h3 className="text-2xl font-bold leading-snug text-on-surface [text-shadow:0_1px_2px_rgba(0,0,0,0.85)] sm:text-3xl">
          {title}
        </h3>
        <p
          className={
            tagAccent === "indigo"
              ? "max-w-prose text-sm font-medium leading-relaxed text-slate-50 [text-shadow:0_1px_4px_rgba(0,0,0,0.55),0_0_20px_rgba(2,6,23,0.45)] sm:max-w-sm sm:text-base"
              : "max-w-prose text-sm leading-relaxed text-on-surface-variant [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] sm:max-w-sm sm:text-base"
          }
        >
          {description}
        </p>
      </div>
    </GlassPointerLink>
  );
}

function BuildCard({
  learnMore,
  icon,
  plausibleName,
  title,
  description,
  featured,
  isRtl,
}: {
  learnMore: string;
  icon: string;
  plausibleName: string;
  title: string;
  description: string;
  featured?: boolean;
  isRtl: boolean;
}) {
  return (
    <GlassPointerLink
      href="/portfolio"
      data-plausible-name={plausibleName}
      data-reveal="fade-up"
      className={
        featured
          ? "glass-panel flex cursor-pointer flex-col space-y-6 rounded-xl border-primary/35 p-8 transition-colors hover:border-primary/50"
          : "glass-panel flex cursor-pointer flex-col space-y-6 rounded-xl p-8 transition-colors hover:border-primary/50"
      }
    >
      <div
        className={
          featured
            ? "glass-panel relative z-[1] flex h-14 w-14 items-center justify-center rounded-lg border-indigo-400/30 text-indigo-400"
            : "glass-panel relative z-[1] flex h-14 w-14 items-center justify-center rounded-lg text-primary"
        }
      >
        <MaterialIcon name={icon} className="text-3xl" />
      </div>
      <h3 className="relative z-[1] text-2xl font-bold text-on-surface">{title}</h3>
      <p className="relative z-[1] flex-grow leading-relaxed text-on-surface-variant">{description}</p>
      <span className="relative z-[1] flex items-center gap-2 text-sm font-bold text-primary">
        {learnMore}
        <MaterialIcon name={isRtl ? "north_west" : "north_east"} className="text-sm" />
      </span>
    </GlassPointerLink>
  );
}

function Stat({
  variant,
  icon,
  value,
  label,
}: {
  variant: "number" | "icon";
  icon?: string;
  value?: string;
  label: string;
}) {
  return (
    <GlassPointerDiv
      data-reveal="fade-up"
      className="glass-panel flex flex-col items-center gap-3 rounded-xl px-5 py-7 text-center sm:px-7 sm:py-8"
    >
      <div className="relative z-[1] flex min-h-16 w-full items-center justify-center py-1 sm:min-h-[4.5rem]">
        {variant === "number" ? (
          <CountUp
            value={value!}
            className="text-4xl font-extrabold leading-none tracking-tight text-primary tabular-nums sm:text-5xl"
          />
        ) : (
          <MaterialIcon
            name={icon!}
            className="text-5xl text-primary sm:text-6xl"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 40" }}
          />
        )}
      </div>
      <span className="relative z-[1] text-xs font-semibold uppercase leading-snug tracking-widest text-on-surface-variant sm:text-sm">
        {label}
      </span>
    </GlassPointerDiv>
  );
}
