"use client";

import { GlassPointerForm } from "@/components/ui/GlassPointerSurface";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { siteConfig } from "@/lib/site-config";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";

type ContactField = "name" | "email" | "message";

type ServerBanner =
  | null
  | { kind: "help" }
  | { kind: "text"; message: string };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [serverBanner, setServerBanner] = useState<ServerBanner>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  const onTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const onTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setFieldErrors({});
    setServerBanner(null);

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

    if (turnstileSiteKey && !turnstileToken) {
      setServerBanner({ kind: "text", message: t("captchaRequired") });
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
      ...(turnstileToken ? { turnstileToken } : {}),
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
          setServerBanner({ kind: "help" });
        } else if (body?.error === "captcha_required") {
          setServerBanner({ kind: "text", message: t("captchaRequired") });
        } else if (body?.error === "captcha_failed") {
          setServerBanner({ kind: "text", message: t("captchaFailed") });
        } else if (body?.error === "email_not_configured") {
          setServerBanner({ kind: "text", message: t("errorEmailNotConfigured") });
        } else if (body?.error === "send_failed") {
          setServerBanner({ kind: "text", message: t("errorSendFailed") });
        } else {
          setServerBanner({ kind: "help" });
        }
        setStatus("err");
        return;
      }
      setStatus("ok");
      setFieldErrors({});
      setServerBanner(null);
      form.reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch {
      setServerBanner({ kind: "help" });
      setStatus("err");
    }
  }

  return (
    <GlassPointerForm
      noValidate
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

      {turnstileSiteKey ? (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-on-surface">{t("captchaLabel")}</span>
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={onTurnstileSuccess}
            onExpire={onTurnstileExpire}
            onError={() => setTurnstileToken(null)}
            options={{
              theme: "dark",
              language: locale === "ar" ? "ar" : locale === "ru" ? "ru" : "en",
            }}
          />
        </div>
      ) : null}

      {status === "ok" ? (
        <p className="text-sm font-medium text-primary">{t("success")}</p>
      ) : null}
      {status === "err" && serverBanner ? (
        <p className="text-sm font-medium text-red-400">
          {serverBanner.kind === "help"
            ? t.rich("formErrorHelpRich", {
                email: (chunks) => (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    data-plausible-name="contact_error_email"
                    className="font-semibold text-primary underline decoration-primary/60 underline-offset-2 hover:text-tertiary"
                  >
                    {chunks}
                  </a>
                ),
                telegram: (chunks) => (
                  <a
                    href={siteConfig.telegram}
                    data-plausible-name="contact_error_telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline decoration-primary/60 underline-offset-2 hover:text-tertiary"
                  >
                    {chunks}
                  </a>
                ),
              })
            : serverBanner.message}
        </p>
      ) : null}

      <button
        type="submit"
        data-plausible-name="contact_submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </GlassPointerForm>
  );
}
