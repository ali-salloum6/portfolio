import { MaterialIcon } from "@/components/MaterialIcon";
import {
  GlassPointerArticle,
  GlassPointerDiv,
  GlassPointerLink,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const PORTRAIT = "/images/secondary_picture.webp";

/** Work history, newest first, in the same order as the CVs — `about.experience.*` */
const EXPERIENCE_KEYS = ["e1", "e2", "e3", "e4", "e5"] as const;

/** `about.education.*` */
const EDUCATION_ITEMS = [
  ["ed1", "psychology"],
  ["ed2", "school"],
  ["ed3", "emoji_events"],
] as const;

export async function AboutPage() {
  const t = await getTranslations("about");

  const certs = [
    {
      href: "https://www.coursera.org/share/4ac77db33ee05bbf9ecb28d9c94e3a98",
      issuer: t("cert1Issuer"),
      name: t("cert1Name"),
      img: "/images/certificates/machine-learning-specialization.svg",
    },
    {
      href: "https://www.coursera.org/share/c1625e0c7e9997547bea0f38107c0c25",
      issuer: t("cert2Issuer"),
      name: t("cert2Name"),
      img: "/images/certificates/neural-networks-deep-learning.svg",
    },
    {
      href: "https://www.coursera.org/share/26dcc76811cf78406306e007eea0aa35",
      issuer: t("cert3Issuer"),
      name: t("cert3Name"),
      img: "/images/certificates/improving-deep-neural-networks.svg",
    },
    {
      href: "https://drive.google.com/drive/folders/18TKsGDzu0gxNYhk-Yb3iAt8vQStn9MmU?usp=sharing",
      issuer: t("cert4Issuer"),
      name: t("cert4Name"),
      img: "/images/certificates/competitive-programming.svg",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      <section className="mb-24 flex flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 space-y-6" data-reveal-group>
          <h1
            data-reveal="fade-up"
            className="text-5xl font-extrabold leading-tight tracking-tighter text-on-background md:text-6xl"
          >
            {t("heroTitle")}
          </h1>
          <p
            data-reveal="fade-up"
            className="max-w-2xl text-xl font-medium text-on-surface-variant"
          >
            {t("heroSubtitle")}
          </p>
          <div data-reveal="fade-up" className="flex flex-wrap gap-4 pt-4">
            <GlassPointerDiv className="industrial-card flex items-center gap-3 rounded-lg p-4">
              <MaterialIcon name="flight_takeoff" className="text-primary" />
              <span className="text-sm font-semibold">{t("chip1")}</span>
            </GlassPointerDiv>
            <GlassPointerDiv className="industrial-card flex items-center gap-3 rounded-lg p-4">
              <MaterialIcon name="translate" className="text-primary" />
              <span className="text-sm font-semibold">{t("chip2")}</span>
            </GlassPointerDiv>
          </div>
        </div>
        <GlassPointerDiv
          data-reveal="scale-in"
          className="industrial-border anim-float flex h-72 w-72 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-container p-4 md:h-96 md:w-96"
        >
          <Image
            src={PORTRAIT}
            alt={t("heroTitle")}
            width={360}
            height={360}
            className="h-full w-full rounded-full object-cover opacity-90 contrast-125 grayscale"
            priority
          />
        </GlassPointerDiv>
      </section>

      <section className="mb-24">
        <h2
          data-reveal="fade-up"
          className="mb-12 text-center text-3xl font-bold tracking-tight"
        >
          {t("experienceTitle")}
        </h2>
        <div className="mx-auto flex max-w-5xl flex-col gap-6" data-reveal-group>
          {EXPERIENCE_KEYS.map((key, index) => (
            <GlassPointerArticle
              key={key}
              data-reveal="fade-up"
              className={
                index === 1
                  ? "industrial-card flex flex-col gap-4 rounded-xl border border-primary/25 p-6 md:flex-row md:gap-10 md:p-8"
                  : "industrial-card flex flex-col gap-4 rounded-xl p-6 md:flex-row md:gap-10 md:p-8"
              }
            >
              <p className="shrink-0 text-sm font-bold uppercase tracking-widest text-primary md:w-48 md:pt-1">
                {t(`experience.${key}.dates`)}
              </p>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold text-on-surface">{t(`experience.${key}.role`)}</h3>
                <p className="mb-3 mt-1 text-sm font-semibold text-tertiary">
                  {t(`experience.${key}.org`)}
                </p>
                <p className="leading-relaxed text-on-surface-variant">{t(`experience.${key}.body`)}</p>
              </div>
            </GlassPointerArticle>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <h2
          data-reveal="fade-up"
          className="mb-12 text-center text-3xl font-bold tracking-tight"
        >
          {t("educationTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3" data-reveal-group>
          {EDUCATION_ITEMS.map(([key, icon]) => (
            <GlassPointerArticle
              key={key}
              data-reveal="fade-up"
              className="industrial-card flex flex-col rounded-xl p-8"
            >
              <div className="industrial-border mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface">
                <MaterialIcon name={icon} className="text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t(`education.${key}.title`)}</h3>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-tertiary">
                {t(`education.${key}.meta`)}
              </p>
              <p className="leading-relaxed text-on-surface-variant">{t(`education.${key}.body`)}</p>
            </GlassPointerArticle>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div
          data-reveal="fade-up"
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t("certsTitle")}</h2>
          <span className="w-fit rounded-full border border-primary/30 px-4 py-2 text-xs font-bold uppercase text-primary">
            {t("certsBadge")}
          </span>
        </div>
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          data-reveal-group
        >
          {certs.map((c, index) => (
            <GlassPointerLink
              key={c.href}
              href={c.href}
              data-plausible-name={`about_cert_${index + 1}`}
              data-reveal="fade-up"
              rel="noopener noreferrer"
              target="_blank"
              className="industrial-card group cursor-pointer rounded-xl p-2 transition-all hover:border-primary/50"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-outline-variant bg-surface-container-high">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  className="object-cover opacity-40 transition-opacity group-hover:opacity-60"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MaterialIcon
                    name="verified"
                    className="text-4xl text-primary opacity-40 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="px-2 pb-2">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary/80">
                  {c.issuer}
                </p>
                <h4 className="text-sm font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                  {c.name}
                </h4>
              </div>
            </GlassPointerLink>
          ))}
        </div>
      </section>

      <GlassPointerSection
        data-reveal="fade-up"
        className="industrial-card mb-24 rounded-xl border border-primary/10 p-12"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-on-background">
            {t("philosophyTitle")}
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-on-surface-variant">{t("philosophyBody")}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {(
              [
                ["fact_check", t("pillar1")],
                ["rate_review", t("pillar2")],
                ["rocket_launch", t("pillar3")],
              ] as const
            ).map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center">
                <div className="industrial-border mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-surface transition-colors hover:border-primary/50">
                  <MaterialIcon name={icon} className="text-primary" />
                </div>
                <span className="text-sm font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassPointerSection>
    </main>
  );
}
