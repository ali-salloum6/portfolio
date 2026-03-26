import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  // Avoid duplicate hreflang signals (HTML alternates + HTTP Link header).
  // We keep alternates in page metadata only.
  alternateLinks: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
