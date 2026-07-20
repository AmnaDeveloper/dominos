import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
    ],
  },

  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      // Hide internal SEO tooling + API from indexing
      { source: "/seo-tools", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // AdSense must be able to read ads.txt
      {
        source: "/ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/menus", destination: "/menus-prices", permanent: true },
      { source: "/menu", destination: "/menus-prices", permanent: true },
      { source: "/locations", destination: "/store-locator", permanent: true },
      { source: "/blog", destination: "/posts", permanent: true },
      { source: "/post/:slug", destination: "/posts/:slug", permanent: true },
      // Points to the pillar guide until the dedicated nutrition post is added.
      { source: "/nutrition", destination: "/menus-prices", permanent: true },
      { source: "/rewards", destination: "/dominos-rewards", permanent: true },
      // Gate legacy auth/admin paths
      { source: "/login", destination: "/", permanent: true },
      { source: "/auth", destination: "/", permanent: true },
      { source: "/admin", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
