import { GlassPointerArticle } from "@/components/ui/GlassPointerSurface";
import { Link } from "@/i18n/navigation";
import { getBlogSlugs, getBlogSource, type BlogFrontmatter } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/page-metadata";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!getBlogSlugs().includes(slug)) return {};
  const raw = getBlogSource(slug);
  const { data } = matter(raw);
  const d = data as BlogFrontmatter & { date?: string | Date };
  const title = d.title ?? slug;
  const description = d.description ?? "";
  const tm = await getTranslations({ locale, namespace: "metadata" });
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${title} — ${tm("siteName")}`,
    description,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!getBlogSlugs().includes(slug)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const raw = getBlogSource(slug);
  const { data, content } = matter(raw);
  const rawFm = data as Record<string, unknown>;
  const dateRaw = rawFm.date;
  const dateStr =
    dateRaw instanceof Date
      ? dateRaw.toISOString().slice(0, 10)
      : String(dateRaw ?? "");
  const fm: BlogFrontmatter = {
    title: String(rawFm.title ?? slug),
    description: String(rawFm.description ?? ""),
    date: dateStr,
  };
  const { content: mdx } = await compileMDX({ source: content });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <Link
        href="/blog"
        className="mb-8 inline-flex text-sm font-bold text-primary hover:text-tertiary"
      >
        ← {t("back")}
      </Link>
      <GlassPointerArticle className="industrial-card rounded-xl p-6 md:p-8">
        <header className="relative z-[1] mb-10 border-b border-outline-variant pb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {fm.date}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            {fm.title}
          </h1>
          <p className="mt-4 text-lg text-on-surface-variant">{fm.description}</p>
        </header>
        <div className="relative z-[1] max-w-none space-y-4 leading-relaxed text-on-surface-variant [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-on-surface [&_li]:ms-6 [&_li]:list-disc [&_p]:mb-4 [&_strong]:text-on-surface">
          {mdx}
        </div>
      </GlassPointerArticle>
    </main>
  );
}
