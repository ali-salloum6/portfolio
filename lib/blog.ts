import fs from "fs";
import matter from "gray-matter";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
};

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogSource(slug: string): string {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  return fs.readFileSync(file, "utf8");
}

export function getAllBlogPosts(): (BlogFrontmatter & { slug: string })[] {
  return getBlogSlugs()
    .map((slug) => {
      const raw = getBlogSource(slug);
      const { data } = matter(raw);
      const d = data as Partial<BlogFrontmatter>;
      return {
        slug,
        title: d.title ?? slug,
        date: d.date != null ? String(d.date).slice(0, 10) : "",
        description: d.description ?? "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
