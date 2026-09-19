import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.luxorcardetailing.com.au" },
    ],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
};

export default nextConfig;
