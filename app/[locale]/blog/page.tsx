import { Link } from "@/i18n/navigation";
import { getAllBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tm = await getTranslations({ locale, namespace: "metadata" });
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: `${t("metaTitle")} — ${tm("siteName")}`,
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getAllBlogPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <header className="mb-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg text-on-surface-variant">{t("subtitle")}</p>
      </header>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="industrial-card rounded-xl p-6 transition-colors hover:border-primary/40">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {post.date}
              </p>
              <h2 className="mb-2 text-xl font-bold text-on-surface">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm text-on-surface-variant">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-bold text-primary hover:text-tertiary"
              >
                {t("readMore")} →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
