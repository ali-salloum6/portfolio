import { MaterialIcon } from "@/components/MaterialIcon";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4JAc4ThjGWgDfhCyHykHBjB94NvaRMfSfyZHL6dkXotora__xdcAdL_bCmTackBqUrKufWVrEhNUxyERTQ70ipUcbTRfmZahgSX5qJB_x7JiK_PDkNqW1gk266zG1S_QQSvb46lzO5Korxy1YLo3M3XJNXp8CwuUwj8MAUaMd1MnSwwLFyj_C05RAGb61ErErJCczBmULjCf2HjTRlDWeAkKh6bdckhyR1Ox4zb9JpAEhhdNjX7OfyiqMmT_fACjVbt8DiPdmX8I";

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
          <p className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
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
          <div className="relative h-80 w-80 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container p-4 lg:h-[450px] lg:w-[450px]">
            <Image
              src={HERO_IMG}
              alt={t("title")}
              fill
              className="rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              sizes="(max-width: 1024px) 320px, 450px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-outline-variant bg-surface-container/50 px-8 py-20 text-center">
        <h2 className="mb-12 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          {t("equationTitle")}
        </h2>
        <div className="flex flex-col items-center justify-center gap-6 text-3xl font-extrabold tracking-tighter text-on-surface md:flex-row md:gap-4 md:text-5xl">
          <span className="rounded-lg border border-primary/40 bg-primary/5 px-8 py-6 text-primary">
            {t("equationTotal")}
          </span>
          <span className="text-on-surface-variant">=</span>
          <span className="rounded-lg border border-outline-variant bg-surface px-8 py-6 text-2xl text-on-surface-variant md:text-3xl">
            {t("equationKnowledge")}
          </span>
          <span className="text-primary">×</span>
          <span className="rounded-lg border border-indigo-500/40 bg-indigo-500/5 px-8 py-6 text-indigo-400">
            {t("equationMultiplier")}
          </span>
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-lg font-medium italic text-on-surface-variant">
          {t("equationCaption")}
        </p>
      </section>

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
        <Link href="/portfolio" className="group relative block h-[500px] overflow-hidden rounded-2xl border border-outline-variant">
          <Image
            src={TEASE_1}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end space-y-4 bg-gradient-to-t from-background via-background/40 to-transparent p-10">
            <span className="w-fit rounded border border-primary/30 bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-md">
              {t("case1Tag")}
            </span>
            <h3 className="text-3xl font-bold text-on-surface">{t("case1Title")}</h3>
            <p className="max-w-sm text-on-surface-variant">{t("case1Desc")}</p>
          </div>
        </Link>
        <Link href="/portfolio" className="group relative block h-[500px] overflow-hidden rounded-2xl border border-outline-variant">
          <Image
            src={TEASE_2}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end space-y-4 bg-gradient-to-t from-background via-background/40 to-transparent p-10">
            <span className="w-fit rounded border border-indigo-500/30 bg-indigo-500/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-indigo-400 backdrop-blur-md">
              {t("case2Tag")}
            </span>
            <h3 className="text-3xl font-bold text-on-surface">{t("case2Title")}</h3>
            <p className="max-w-sm text-on-surface-variant">{t("case2Desc")}</p>
          </div>
        </Link>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Stat variant="number" value="9+" label={t("statsYears")} />
          <Stat variant="icon" icon="school" label={t("statsDegree")} />
          <Stat variant="number" value="150+" label={t("statsProjects")} />
          <Stat variant="icon" icon="verified_user" label={t("statsMl")} />
        </div>
      </section>

      <section className="relative space-y-8 overflow-hidden rounded-2xl border border-primary/20 bg-surface-container/50 px-8 py-20 text-center md:px-12">
        <div className="absolute start-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
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
      </section>
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
    <Link
      href="/services"
      className={
        featured
          ? "flex cursor-pointer flex-col space-y-6 rounded-xl border border-primary/30 bg-surface-container/50 p-8 transition-colors hover:border-primary/50"
          : "flex cursor-pointer flex-col space-y-6 rounded-xl border border-outline-variant bg-surface-container/30 p-8 transition-colors hover:border-primary/50"
      }
    >
      <div
        className={
          featured
            ? "flex h-14 w-14 items-center justify-center rounded-lg border border-indigo-400/30 bg-surface text-indigo-400"
            : "flex h-14 w-14 items-center justify-center rounded-lg border border-outline-variant bg-surface text-primary"
        }
      >
        <MaterialIcon name={icon} className="text-3xl" />
      </div>
      <h3 className="text-2xl font-bold text-on-surface">{title}</h3>
      <p className="flex-grow leading-relaxed text-on-surface-variant">{description}</p>
      <span className="flex items-center gap-2 text-sm font-bold text-primary">
        {learnMore}
        <MaterialIcon name="north_east" className="text-sm" />
      </span>
    </Link>
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
    <div className="flex flex-col items-center space-y-3 rounded-xl border border-outline-variant bg-surface-container/20 p-8 text-center">
      {variant === "number" ? (
        <span className="text-4xl font-extrabold text-primary">{value}</span>
      ) : (
        <MaterialIcon name={icon!} className="text-4xl text-primary" />
      )}
      <span className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
    </div>
  );
}
