"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  ar: "AR",
};

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container px-2 py-2"
      role="group"
      aria-label="Language"
    >
      <span className="material-symbols-outlined text-sm text-primary" aria-hidden>
        language
      </span>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "rounded px-2 py-0.5 text-xs font-bold transition-colors",
            loc === locale
              ? "bg-primary text-white"
              : "text-on-surface-variant hover:text-primary",
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
