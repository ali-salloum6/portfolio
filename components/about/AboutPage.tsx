import { MaterialIcon } from "@/components/MaterialIcon";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAyRrXf7lnqEWPZx6IbloZLOLw_-awlpumdK40PYk9RHB-inS1Ti573dq_IcsQvz9rsIvL_3xPBmW7Yx8wLF8BU4ZtwaseeINj9DrJLPV7llv-6xYB-J5jrNNg-Z8wjJQFS8WH5IRTwFEKMg-HY2URw21mO0nDUiSbr0_6HHeyvcr0InMwyrmEfGKJnp_iMK-AEGCXILTm3Ub5O_IPRtlfNwuHPuhURYJocfAThZkvOQLiyKIILG0k7KlwCuCAVXlRh8xpES3Tr8TU";

const CERT_IMGS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjredr3e-idP8QioAa0MrHf3oDpozyE5eAjsRFGN1K0zEsRh7keizI4P8FOOWdH7fvQzNFgoKDBU8JRvbWp6q0DdDcGA8zzHIAQiyJ9pMyU3-Cpv9BQRRvEOLzJCMllLhzYG039cGWC8MFKogTpSMiltieNwu8IE4i4syqsWANGMibYq4n_wYAM6r9YaVoHe82th1Ri3v72fpTjXSsfOJz451lhapG4d1CZg8WWNOx0q2LFpPC1wjUNpg6OUBKkMxKQP5a9vSzZD8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD2tAnlmz427Iv8O629IUEHph1bF47ANExBze5ZxE0OurI2MwPNnpcS5oFgD9UXYegh8NI-_WOWM6LCMWlcV1fliJR9ewlsIG2c4WetVpH6DbxkFWELkHcNr_6HfB7sFcTUOY8CBzO9Kl3hUv68CNSLDeEm1zK0-0HgzSxuZ1hY-P9Ga0u-yqhGP6g0xmfBXOeFeudAaF2znwT9zIINLbN8giSoBHZCXG9iZ5PeP27odmkwHA3YXFU1BZXl4y0U1qKRD0KIv5yBP4g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_eR-E2Pb_OkxZId6WsB73nKxVaeIO6GvtpjomcGG1tWwd9VLYv9ZaFW_OD3rRIMC8r6rSD8Dfw29rXBG-GrZgeYH6XuC4Z0_gULfdG4kzOWHDpgjEM7vXPz1lk_V8UffaGKYJxAVHcYd-3uiUnuME2HQOrF1hZuxFv9nxP1zEH8sbt0gUxZLcGxUDdkvS41MgADYMDkt__r_cIUJDg-SnpKERNApKNaws-4L4NpJssVdX0NfdXYib_yJMJPpAQqC93qXNPhJaEM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlEf8Patig6LXV1vIs4Rt8a2nguC6a7pcLR_hoPlT7svSVczjF6japa-5XaLp2GZAFcqJC3r3NCrWAzyq-DFu3uRPlVBjyjuY-ZZwh-Y01327fw2-LMDC8WyU_nw8s-r1sHethxk31_mzRQ90wRIvsTwU_NA88tFzSVjmxXC0lOSc0xNwuIiqddAj-BQUCBrDT3BqfcqixuuTiZN4jFZlKCDbqwL_IaNpyuTBuqIgTE-1_J73uOeQ--WC9ICJ5KyiAFUc0x5WIv9I",
];

export async function AboutPage() {
  const t = await getTranslations("about");

  const certs = [
    { issuer: t("cert1Issuer"), name: t("cert1Name"), img: CERT_IMGS[0] },
    { issuer: t("cert2Issuer"), name: t("cert2Name"), img: CERT_IMGS[1] },
    { issuer: t("cert3Issuer"), name: t("cert3Name"), img: CERT_IMGS[2] },
    { issuer: t("cert4Issuer"), name: t("cert4Name"), img: CERT_IMGS[3] },
  ];

  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      <section className="mb-24 flex flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter text-on-background md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-2xl text-xl font-medium text-on-surface-variant">{t("heroSubtitle")}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="industrial-card flex items-center gap-3 rounded-lg p-4">
              <MaterialIcon name="bolt" className="text-primary" />
              <span className="text-sm font-semibold">{t("chip1")}</span>
            </div>
            <div className="industrial-card flex items-center gap-3 rounded-lg p-4">
              <MaterialIcon name="psychology" className="text-primary" />
              <span className="text-sm font-semibold">{t("chip2")}</span>
            </div>
          </div>
        </div>
        <div className="industrial-border flex h-72 w-72 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-container p-4 md:h-96 md:w-96">
          <Image
            src={PORTRAIT}
            alt={t("heroTitle")}
            width={360}
            height={360}
            className="h-full w-full rounded-full object-cover opacity-90 contrast-125 grayscale"
            priority
          />
        </div>
      </section>

      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">{t("journeyTitle")}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className="industrial-card flex flex-col justify-between rounded-xl p-8 md:col-span-2">
            <div>
              <div className="industrial-border mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface">
                <MaterialIcon name="code" className="text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">{t("j1Title")}</h3>
              <p className="leading-relaxed text-on-surface-variant">{t("j1Body")}</p>
            </div>
            <div className="mt-8 flex gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                Algorithms
              </span>
              <span className="text-xs font-bold text-primary/40">•</span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                Data Structures
              </span>
            </div>
          </article>
          <article className="industrial-card rounded-xl p-8">
            <div className="industrial-border mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface">
              <MaterialIcon name="school" className="text-primary" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">{t("j2Title")}</h3>
            <p className="leading-relaxed text-on-surface-variant">{t("j2Body")}</p>
          </article>
          <article className="industrial-card rounded-xl p-8">
            <div className="industrial-border mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface">
              <MaterialIcon name="currency_bitcoin" className="text-primary" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">{t("j3Title")}</h3>
            <p className="leading-relaxed text-on-surface-variant">{t("j3Body")}</p>
          </article>
          <article className="industrial-card rounded-xl border border-primary/20 bg-gradient-to-br from-surface-container to-surface p-8 md:col-span-2">
            <div className="industrial-border mb-6 flex h-12 w-12 items-center justify-center rounded-lg border-tertiary/30 bg-surface">
              <MaterialIcon name="auto_awesome" filled className="text-tertiary" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">{t("j4Title")}</h3>
            <p className="leading-relaxed text-on-surface-variant">{t("j4Body")}</p>
          </article>
        </div>
      </section>

      <section className="mb-24">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("certsTitle")}</h2>
          <span className="w-fit rounded-full border border-primary/30 px-4 py-2 text-xs font-bold uppercase text-primary">
            {t("certsBadge")}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <Link
              key={c.name}
              href="https://www.coursera.org/"
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
            </Link>
          ))}
        </div>
      </section>

      <section className="industrial-card mb-24 rounded-xl border border-primary/10 p-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-on-background">
            {t("philosophyTitle")}
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-on-surface-variant">{t("philosophyBody")}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {(
              [
                ["rocket_launch", t("pillar1")],
                ["high_quality", t("pillar2")],
                ["security", t("pillar3")],
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
      </section>
    </main>
  );
}
