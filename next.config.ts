import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Every photograph is served from public/images, so no remote host is
    // allowed. See scripts/image-sources.json and `npm run fetch:images`.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
};

export default nextConfig;
