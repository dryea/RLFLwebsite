import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "rfil-media.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "imagedelivery.net" },
      { protocol: "https", hostname: "reliancenepal.com.np" },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;
