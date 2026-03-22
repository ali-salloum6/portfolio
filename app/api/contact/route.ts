import { siteConfig } from "@/lib/site-config";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  projectType: z.string().max(200).optional(),
  message: z.string().min(10).max(20000),
  website: z.string().optional(),
  locale: z.string().max(8).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const { name, email, projectType, message, website, locale } = parsed.data;
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!key) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }

  const resend = new Resend(key);
  const subject = `[Portfolio] ${name}${projectType ? ` — ${projectType}` : ""}`;
  const text = [
    `From: ${name} <${email}>`,
    locale ? `Locale: ${locale}` : null,
    projectType ? `Project type: ${projectType}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
