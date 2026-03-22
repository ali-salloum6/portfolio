"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";

const nav = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/about", key: "about" as const },
  { href: "/blog", key: "blog" as const },
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-primary"
        >
          {locale === "en" ? "Ali Salloum" : locale === "ru" ? "Али Саллум" : "علي سلّوم"}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-sm font-semibold tracking-tight transition-colors",
                  active
                    ? "border-b border-primary pb-1 text-primary"
                    : "text-on-surface-variant hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Link
            href="/contact"
            className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-hover sm:inline-flex"
          >
            {t("startProject")}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg border border-outline-variant p-2 text-on-surface-variant md:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((o) => !o)}
          >
            <MaterialIcon name={open ? "close" : "menu"} className="text-2xl" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-outline-variant bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="font-semibold text-on-surface"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-4 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t("startProject")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
