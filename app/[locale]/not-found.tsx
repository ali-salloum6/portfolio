"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
      <h1 className="mb-4 text-4xl font-extrabold text-on-surface">404</h1>
      <p className="mb-8 text-on-surface-variant">Page not found.</p>
      <Link
        href="/"
        data-plausible-name="error404_home"
        className="rounded-lg bg-primary px-6 py-3 font-bold text-white"
      >
        {t("home")}
      </Link>
    </main>
  );
}
