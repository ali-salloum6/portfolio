import { MaterialIcon } from "@/components/MaterialIcon";
import {
  GlassPointerDiv,
  GlassPointerLink,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const HERO_IMG = "/images/hero-main.webp";

/** Portfolio case c1 — unified deployment manager blueprint */
const CASE_TEASER_1_IMAGE = "/images/unified-manager-blueprint.webp";
/** Portfolio case c4 — LuukAI embeddable widget */
const CASE_TEASER_2_IMAGE = "/images/luukai-widget-wide.webp";

export async function HomePage() {
  const t = await getTranslations("home");
  const learnMore = t("learnMore");

  return (
    <main className="mx-auto max-w-7xl space-y-32 px-6 pb-12 pt-24 md:px-8">
      <section className="flex flex-col items-center gap-16 py-12 lg:flex-row">
        <div className="flex-1 space-y-8">
          <p className="glass-panel inline-flex items-center rounded-md border-primary/35 bg-gradient-to-br from-primary/12 to-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {t("badge")}
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface lg:text-7xl">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-2xl font-medium leading-relaxed text-on-surface-variant">
            {t("tagline")}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              data-plausible-name="home_hero_contact"
              className="rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary-hover"
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
        <div className="flex flex-1 justify-center lg:justify-end">
          <GlassPointerDiv className="glass-panel relative h-80 w-80 overflow-hidden rounded-2xl p-4 lg:h-[450px] lg:w-[450px]">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          <Stat variant="number" value="9+" label={t("statsYears")} />
          <Stat variant="icon" icon="school" label={t("statsDegree")} />
          <Stat variant="number" value="50+" label={t("statsProjects")} />
          <Stat variant="icon" icon="verified_user" label={t("statsMl")} />
        </div>
      </section>

      <GlassPointerSection className="glass-panel rounded-2xl px-4 py-16 text-center sm:px-6 md:px-6 md:py-20 lg:px-8">
        <div className="relative z-[1]">
          <h2 className="mb-12 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("equationTitle")}
          </h2>
          <div className="mx-auto flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-2 text-3xl font-extrabold tracking-tighter text-on-surface md:flex-row md:flex-wrap md:gap-x-3 md:gap-y-4 md:text-4xl lg:gap-x-4 lg:text-5xl">
            <span className="glass-panel box-border min-w-0 max-w-full shrink rounded-lg border-primary/40 bg-gradient-to-br from-primary/14 to-primary/5 px-4 py-4 text-center text-primary sm:px-5 sm:py-5 md:px-5 md:py-5 lg:px-8 lg:py-6">
              {t("equationTotal")}
            </span>
            <span className="inline-block shrink-0 self-center leading-none text-on-surface-variant -translate-y-[0.1em] md:px-0.5">
              =
            </span>
            <span className="glass-panel box-border min-w-0 max-w-full shrink rounded-lg px-4 py-4 text-center text-2xl text-on-surface-variant sm:px-5 sm:py-5 md:px-5 md:py-5 md:text-3xl lg:px-8 lg:py-6">
              {t("equationKnowledge")}
            </span>
            <span className="inline-block shrink-0 self-center leading-none text-primary -translate-y-[0.1em] md:px-0.5">
              ×
            </span>
            <span className="glass-panel box-border min-w-0 max-w-full shrink rounded-lg border-indigo-400/40 bg-gradient-to-br from-indigo-500/14 to-indigo-500/5 px-4 py-4 text-center text-indigo-400 sm:px-5 sm:py-5 md:px-5 md:py-5 lg:px-8 lg:py-6">
              {t("equationMultiplier")}
            </span>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-lg font-medium italic text-on-surface-variant">
            {t("equationCaption")}
          </p>
        </div>
      </GlassPointerSection>

      <section>
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
              {t("servicesTitle")}
            </h2>
            <p className="font-medium text-on-surface-variant">
              {t("servicesSubtitle")}
            </p>
          </div>
          <Link
            href="/services"
            data-plausible-name="home_view_services"
            className="hidden items-center gap-2 font-bold text-primary md:inline-flex"
          >
            {t("viewAllServices")}
            <MaterialIcon
              name="arrow_forward"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            learnMore={learnMore}
            icon="database"
            plausibleName="home_service_backend"
            title={t("serviceBackendTitle")}
            description={t("serviceBackendDesc")}
          />
          <ServiceCard
            learnMore={learnMore}
            icon="layers"
            plausibleName="home_service_fullstack"
            title={t("serviceFullstackTitle")}
            description={t("serviceFullstackDesc")}
            featured
          />
          <ServiceCard
            learnMore={learnMore}
            icon="smartphone"
            plausibleName="home_service_mobile"
            title={t("serviceMobileTitle")}
            description={t("serviceMobileDesc")}
          />
          <ServiceCard
            learnMore={learnMore}
            icon="psychology"
            plausibleName="home_service_ai"
            title={t("serviceAiTitle")}
            description={t("serviceAiDesc")}
          />
        </div>
        <Link
          href="/services"
          data-plausible-name="home_view_services"
          className="mt-8 inline-flex items-center gap-2 font-bold text-primary md:hidden"
        >
          {t("viewAllServices")}
          <MaterialIcon name="arrow_forward" />
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CaseTeaserCard
          imageSrc={CASE_TEASER_1_IMAGE}
          imageAlt={t("case1Title")}
          imageClassName="object-cover"
          tag={t("case1Tag")}
          tagAccent="primary"
          plausibleName="home_case_teaser_deploy"
          title={t("case1Title")}
          description={t("case1Desc")}
        />
        <CaseTeaserCard
          imageSrc={CASE_TEASER_2_IMAGE}
          imageAlt={t("case2Title")}
          imageClassName="object-cover object-top"
          tag={t("case2Tag")}
          tagAccent="indigo"
          plausibleName="home_case_teaser_luukai"
          title={t("case2Title")}
          description={t("case2Desc")}
        />
      </section>

      <GlassPointerSection className="glass-panel relative space-y-8 overflow-hidden rounded-2xl border-primary/25 px-8 py-20 text-center md:px-12">
        <div className="absolute start-0 top-0 z-[2] h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="relative z-[1] space-y-8">
          <h2 className="text-5xl font-extrabold tracking-tight text-on-surface">
            {t("bottomCtaTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-on-surface-variant">
            {t("bottomCtaBody")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link
              href="/contact"
              data-plausible-name="home_bottom_cta_primary"
              className="rounded-lg bg-primary px-12 py-5 text-xl font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("bottomCtaPrimary")}
            </Link>
            <Link
              href="/contact"
              data-plausible-name="home_bottom_cta_secondary"
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
  imageSrc,
  imageAlt,
  imageClassName,
  tag,
  tagAccent,
  plausibleName,
  title,
  description,
}: {
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
      href="/portfolio"
      data-plausible-name={plausibleName}
      className="glass-panel group relative block h-[500px] overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`scale-105 transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 ${imageClassName}`}
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

function ServiceCard({
  learnMore,
  icon,
  plausibleName,
  title,
  description,
  featured,
}: {
  learnMore: string;
  icon: string;
  plausibleName: string;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <GlassPointerLink
      href="/services"
      data-plausible-name={plausibleName}
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
        <MaterialIcon name="north_east" className="text-sm" />
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
    <GlassPointerDiv className="glass-panel flex flex-col items-center gap-3 rounded-xl px-5 py-7 text-center sm:px-7 sm:py-8">
      <div className="relative z-[1] flex min-h-16 w-full items-center justify-center py-1 sm:min-h-[4.5rem]">
        {variant === "number" ? (
          <span className="text-4xl font-extrabold leading-none tracking-tight text-primary sm:text-5xl">
            {value}
          </span>
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
