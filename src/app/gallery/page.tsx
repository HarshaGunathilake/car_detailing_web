import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/sections/PageHeader";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Finished detailing work from the Luxor workshop in Clayton South. Exterior, interior, paint correction and ceramic protection.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Our Work | ${siteConfig.name}`,
    description: "Finished detailing work from the Luxor workshop in Clayton South.",
    url: `${siteConfig.url}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        lines={["The finish", "speaks for itself."]}
        intro="Exterior, interior, correction and protection. Filter by the kind of work you are considering, then open any frame to see it full size."
        image="https://images.unsplash.com/photo-1526459915562-c5ca724b1d02?auto=format&fit=crop&q=85&w=2400"
        imageAlt="Close detail of corrected black paintwork"
      />
      <Gallery />
      <BeforeAfter />
      <BookingCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/gallery" },
        ])}
      />
    </>
  );
}
