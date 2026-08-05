import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    unoptimized: false,
    loaderFile: "./src/lib/cloudflare-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev",
  },
};

export default withNextIntl(nextConfig as any);
