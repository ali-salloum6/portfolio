import { redirect } from "next/navigation";

/** Locale lives under `/[locale]`; `localePrefix` is always — ensure `/` never 404s if proxy skips. */
export default function RootPage() {
  redirect("/en");
}
