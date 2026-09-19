import type { MetadataRoute } from "next";
import { siteConfig, isIndexable } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // No sitemap while the site is closed to crawlers.
  if (!isIndexable) return [];

  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/gallery", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
