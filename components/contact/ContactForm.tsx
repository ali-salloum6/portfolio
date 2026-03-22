"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const website = String(fd.get("website") ?? "");
    if (website) {
      setStatus("ok");
      return;
    }

    setStatus("sending");
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      projectType: String(fd.get("projectType") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setStatus("err");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative industrial-card space-y-6 rounded-2xl p-8 md:p-10"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute start-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-on-surface">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-on-surface">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="projectType" className="mb-2 block text-sm font-semibold text-on-surface">
          {t("projectType")}
        </label>
        <input
          id="projectType"
          name="projectType"
          className="w-full rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-on-surface">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
      </div>

      {status === "ok" ? (
        <p className="text-sm font-medium text-primary">{t("success")}</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm font-medium text-red-400">{t("error")}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
