import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "coresg-normal.trae.ai" },
    ],
    formats: ["image/avif", "image/webp"],
    // Allowlisted optimiser qualities (Next 16 requires an explicit list).
    // 75 is the default; 90 is reserved for full-bleed hero frames.
    qualities: [75, 90],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1920, 2560],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /**
   * Baseline production hardening. These are safe defaults for a static,
   * mostly-server-rendered marketing site with a single POST enquiry endpoint.
   * HTTPS itself is terminated by the hosting platform; add HSTS at the edge
   * once the final domain is confirmed.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
