import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const plausibleOrigin =
      process.env.PLAUSIBLE_PROXY_ORIGIN ?? "https://plausible.alisalloum.tech";

    return [
      {
        source: "/js/script.js",
        destination: `${plausibleOrigin}/js/script.js`,
      },
      // /api/event is handled by app/api/event/route.ts so visitor IP headers are forwarded to Plausible.
    ];
  },
};

export default withNextIntl(nextConfig);
