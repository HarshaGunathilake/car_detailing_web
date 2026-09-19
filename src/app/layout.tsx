import type { Metadata, Viewport } from "next";
import { archivo, sans } from "./fonts";
import "./globals.css";

import { siteConfig, isIndexable } from "@/data/site";
import { localBusinessSchema, JsonLd } from "@/lib/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { Cursor } from "@/components/layout/Cursor";
import { Grain } from "@/components/layout/Grain";
import { StickyBookBar } from "@/components/layout/StickyBookBar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Luxor Car Detailing | Premium Car Detailing in Melbourne",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  keywords: [
    "car detailing Melbourne",
    "car detailing Clayton South",
    "ceramic coating Melbourne",
    "paint correction",
    "cut and polish",
    "interior detailing",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Luxor Car Detailing | Premium Car Detailing in Melbourne",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxor Car Detailing | Premium Car Detailing in Melbourne",
    description: siteConfig.description,
  },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
  formatDetection: { telephone: true, address: true },
  category: "Automotive",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-3 focus:text-[0.6875rem] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-ink"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Cursor />
        <Grain />
        <Navbar />

        <PageTransition>
          <main id="main">{children}</main>
          <Footer />
        </PageTransition>

        <StickyBookBar />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
