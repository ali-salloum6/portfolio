import { MaterialIcon } from "@/components/MaterialIcon";
import {
  GlassPointerArticle,
  GlassPointerDiv,
  GlassPointerSection,
} from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const CASE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOfqaQzs9kvbHZS4Xmgy6YcK1Gx5jWkDTJbZbbNn3iZ8D-TVkUNF6_4-36X-KGFjsxo1xWpWKcKm3WlbJlyTQQNE5Mg7ZK9PuILLn224eTg-3a3JsM-MnRbud-z-J2kXk0u9vKK9WJ3WH8ry1rojZoXKtqXeK1VjKphd0Zcj8jVIjdQLIbRw-9OUBqIZR37HERf79WnjaoImlrO634sLx3ztgyIDsxc_5Eq7f9FLHmXUxHZFYx0BBzbjlzzjqX65vDz97c9AzAlqE";

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
        <GlassPointerArticle className="industrial-card flex flex-col items-center gap-8 rounded-lg p-8 md:col-span-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="industrial-inset relative mb-6 aspect-video overflow-hidden rounded-md">
              <Image
                src={CASE_IMG}
                alt=""
                fill
                className="object-cover opacity-60 mix-blend-luminosity"
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

        <GlassPointerArticle className="industrial-card flex flex-col justify-between rounded-lg p-8 md:col-span-4">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c2.tag")}
            </span>
            <h2 className="mb-3 text-xl font-bold">{t("cases.c2.title")}</h2>
            <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
              {t("cases.c2.body")}
            </p>
          </div>
          <div className="industrial-inset mb-6 rounded-md p-4">
            <div className="mb-1 text-sm font-semibold">{t("cases.c2.arch")}</div>
            <div className="text-xs font-medium text-primary">{t("cases.c2.archVal")}</div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant pt-4">
            <div className="text-xl font-bold text-on-surface">{t("cases.c2.metric")}</div>
            <div className="text-end text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {t("cases.c2.metricLabel")}
            </div>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col rounded-lg p-8 md:col-span-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c3.tag")}
          </span>
          <h2 className="mb-4 text-xl font-bold">{t("cases.c3.title")}</h2>
          <div className="industrial-inset mb-4 flex flex-1 flex-col rounded-md p-4">
            <div className="mb-2 flex items-center gap-2">
              <MaterialIcon name="database" className="text-lg text-primary" />
              <span className="text-xs font-bold text-on-surface">{t("cases.c3.stack")}</span>
            </div>
            <p className="text-[11px] leading-tight text-on-surface-variant">{t("cases.c3.body")}</p>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant pt-4">
            <span className="text-xs font-semibold text-on-surface-variant">{t("cases.c3.footer")}</span>
            <MaterialIcon name="check_circle" filled className="text-primary" />
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col rounded-lg p-8 md:col-span-4">
          <div className="flex-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
              {t("cases.c4.tag")}
            </span>
            <h2 className="mb-4 text-xl font-bold">{t("cases.c4.title")}</h2>
            <div className="industrial-inset mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-md">
              <MaterialIcon name="fingerprint" className="text-6xl text-primary/20" />
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">{t("cases.c4.body")}</p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-xs font-bold">
              <span className="uppercase text-on-surface-variant">{t("cases.c4.l1")}</span>
              <span className="text-primary">{t("cases.c4.l2")}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-outline-variant">
              <div className="h-full w-[99.8%] bg-primary" />
            </div>
          </div>
        </GlassPointerArticle>

        <GlassPointerArticle className="industrial-card flex flex-col rounded-lg p-8 md:col-span-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-tertiary">
            {t("cases.c5.tag")}
          </span>
          <h2 className="mb-4 text-xl font-bold">{t("cases.c5.title")}</h2>
          <p className="mb-6 flex-1 text-sm text-on-surface-variant">{t("cases.c5.body")}</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {["KUBERNETES", "KAFKA", "GRPC"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-outline-variant bg-outline-variant px-3 py-1 text-[10px] font-bold text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t border-outline-variant pt-4 text-center">
            <div className="text-3xl font-extrabold text-primary">{t("cases.c5.stat")}</div>
            <div className="text-[10px] font-bold uppercase text-on-surface-variant">
              {t("cases.c5.statLabel")}
            </div>
          </div>
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
              className="rounded-md bg-primary px-10 py-4 font-bold text-white transition-all hover:bg-primary-hover"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
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
