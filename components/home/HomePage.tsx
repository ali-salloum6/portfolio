import { MaterialIcon } from "@/components/MaterialIcon";
import {
  GlassPointerDiv,
  GlassPointerLink,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const HERO_IMG =
  "/images/main_picture.jpg";
  // "https://lh3.googleusercontent.com/aida-public/AB6AXuB4JAc4ThjGWgDfhCyHykHBjB94NvaRMfSfyZHL6dkXotora__xdcAdL_bCmTackBqUrKufWVrEhNUxyERTQ70ipUcbTRfmZahgSX5qJB_x7JiK_PDkNqW1gk266zG1S_QQSvb46lzO5Korxy1YLo3M3XJNXp8CwuUwj8MAUaMd1MnSwwLFyj_C05RAGb61ErErJCczBmULjCf2HjTRlDWeAkKh6bdckhyR1Ox4zb9JpAEhhdNjX7OfyiqMmT_fACjVbt8DiPdmX8I";

const TEASE_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqEn-spumb7Y0akTqRdDup2Q4YMrDVHsfhgFfu6V4kaNH68eP1cfn17Q2Zl5HlRTMROBY_M9Rtb-fjJsmvKfRKvjtH8CsdCkQUNxgatyfjQ8fzbyHFK6vYvTNKFfKNCneotLKdDWdcChE0aOj44t8fM666JYrrMUs5Yb7Nep2w2LXzB725UlB8D1dSGioIAXO7xQ_UsTXwOPuAzgAASDQ_Ru0wD3nBrikZB1-DI9Zrtnhi8hufJk0Hfj7ULmsRMEzEwZ7l-VdgCq0";

const TEASE_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACu0AWR9aOKD0oh77-cD0it9SMtOfK_yUGJWDvFTytVBTv9F1inuB3GIchIh3yTzBzehBxh6_58FYtd6BJDTv-RaBx8efIVFkCaAhcetofthL0xmy-l-UYN0uFzT5c5o0OW-3daYRj0WIvmO30BSZneQq_C59HyichZeJGxeK8VGm5e6g8CkpOJHFtN3QB11i4EdyQHNsvVLEtNzI3eGe4OdHjmT_rEYFS5EQkJdvL05zMjfGqQKjoVs2pot4DkGQzDBMeFyd1qTc";

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
              className="rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/portfolio"
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
          <Stat variant="number" value="150+" label={t("statsProjects")} />
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
            title={t("serviceBackendTitle")}
            description={t("serviceBackendDesc")}
          />
          <ServiceCard
            learnMore={learnMore}
            icon="layers"
            title={t("serviceFullstackTitle")}
            description={t("serviceFullstackDesc")}
            featured
          />
          <ServiceCard
            learnMore={learnMore}
            icon="smartphone"
            title={t("serviceMobileTitle")}
            description={t("serviceMobileDesc")}
          />
          <ServiceCard
            learnMore={learnMore}
            icon="psychology"
            title={t("serviceAiTitle")}
            description={t("serviceAiDesc")}
          />
        </div>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-2 font-bold text-primary md:hidden"
        >
          {t("viewAllServices")}
          <MaterialIcon name="arrow_forward" />
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <GlassPointerLink
          href="/portfolio"
          className="glass-panel group relative block h-[500px] overflow-hidden rounded-2xl"
        >
          <Image
            src={TEASE_1}
            alt=""
            fill
            className="relative z-[1] object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 z-[2] flex flex-col justify-end space-y-4 bg-gradient-to-t from-background via-background/40 to-transparent p-10">
            <span className="glass-pill w-fit rounded border-primary/35 bg-gradient-to-b from-primary/25 to-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {t("case1Tag")}
            </span>
            <h3 className="text-3xl font-bold text-on-surface">{t("case1Title")}</h3>
            <p className="max-w-sm text-on-surface-variant">{t("case1Desc")}</p>
          </div>
        </GlassPointerLink>
        <GlassPointerLink
          href="/portfolio"
          className="glass-panel group relative block h-[500px] overflow-hidden rounded-2xl"
        >
          <Image
            src={TEASE_2}
            alt=""
            fill
            className="relative z-[1] object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 z-[2] flex flex-col justify-end space-y-4 bg-gradient-to-t from-background via-background/40 to-transparent p-10">
            <span className="glass-pill w-fit rounded border-indigo-400/35 bg-gradient-to-b from-indigo-500/25 to-indigo-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-indigo-400">
              {t("case2Tag")}
            </span>
            <h3 className="text-3xl font-bold text-on-surface">{t("case2Title")}</h3>
            <p className="max-w-sm text-on-surface-variant">{t("case2Desc")}</p>
          </div>
        </GlassPointerLink>
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
              className="rounded-lg bg-primary px-12 py-5 text-xl font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("bottomCtaPrimary")}
            </Link>
            <Link
              href="/contact"
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

function ServiceCard({
  learnMore,
  icon,
  title,
  description,
  featured,
}: {
  learnMore: string;
  icon: string;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <GlassPointerLink
      href="/services"
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
