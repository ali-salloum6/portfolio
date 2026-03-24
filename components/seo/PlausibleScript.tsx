import Script from "next/script";

export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "/js/script.js";
  const api = process.env.NEXT_PUBLIC_PLAUSIBLE_API_ENDPOINT ?? "/api/event";
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      data-api={api}
      src={src}
      strategy="afterInteractive"
    />
  );
}
