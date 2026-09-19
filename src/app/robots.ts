import type { MetadataRoute } from "next";
import { siteConfig, isIndexable } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    // Pre-launch: nothing is crawlable, and no sitemap is advertised.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
