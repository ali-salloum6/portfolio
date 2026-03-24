"use client";

import { GlassPointerForm } from "@/components/ui/GlassPointerSurface";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

type ContactField = "name" | "email" | "message";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setFieldErrors({});
    setServerError(null);

    const website = String(fd.get("website") ?? "");
    if (website) {
      setStatus("ok");
      return;
    }

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const projectType = String(fd.get("projectType") ?? "").trim() || undefined;
    const message = String(fd.get("message") ?? "").trim();

    const nextFieldErrors: Partial<Record<ContactField, string>> = {};
    if (!name) nextFieldErrors.name = t("validationNameRequired");
    if (!email) {
      nextFieldErrors.email = t("validationEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextFieldErrors.email = t("validationEmailInvalid");
    }
    if (!message) {
      nextFieldErrors.message = t("validationMessageRequired");
    } else if (message.length < 10) {
      nextFieldErrors.message = t("validationMessageMin");
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setStatus("err");
      return;
    }

    setStatus("sending");
    const payload = {
      name,
      email,
      projectType,
      message,
      website,
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (body?.error === "validation") {
          setServerError(t("validationServer"));
        } else if (body?.error === "email_not_configured") {
          setServerError(t("errorEmailNotConfigured"));
        } else if (body?.error === "send_failed") {
          setServerError(t("errorSendFailed"));
        } else {
          setServerError(t("error"));
        }
        setStatus("err");
        return;
      }
      setStatus("ok");
      setFieldErrors({});
      setServerError(null);
      form.reset();
    } catch {
      setServerError(t("error"));
      setStatus("err");
    }
  }

  return (
    <GlassPointerForm
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
          aria-invalid={Boolean(fieldErrors.name)}
          className="w-full rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
        {fieldErrors.name ? (
          <p className="mt-2 text-sm font-medium text-red-400">{fieldErrors.name}</p>
        ) : null}
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
          aria-invalid={Boolean(fieldErrors.email)}
          className="w-full rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
        {fieldErrors.email ? (
          <p className="mt-2 text-sm font-medium text-red-400">{fieldErrors.email}</p>
        ) : null}
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
          minLength={10}
          aria-invalid={Boolean(fieldErrors.message)}
          rows={6}
          className="w-full resize-y rounded-lg industrial-inset px-4 py-3 text-on-surface outline-none ring-primary focus:ring-2"
        />
        {fieldErrors.message ? (
          <p className="mt-2 text-sm font-medium text-red-400">{fieldErrors.message}</p>
        ) : null}
      </div>

      {status === "ok" ? (
        <p className="text-sm font-medium text-primary">{t("success")}</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm font-medium text-red-400">{serverError ?? t("error")}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </GlassPointerForm>
  );
}
