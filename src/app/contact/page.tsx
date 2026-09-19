import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/sections/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book a detail at 15 Kitson Rd, Clayton South VIC 3169. Call 0428 657 955 or send an enquiry and we will confirm a time.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact & Booking | ${siteConfig.name}`,
    description: "Book a detail at 15 Kitson Rd, Clayton South. Call 0428 657 955.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        lines={["Let's book", "your detail."]}
        intro="Tell us the vehicle and the service you are after. For same day availability, calling the workshop is quickest."
        image={images.carAgainstWall}
        imageAlt="Detailed black car standing against a plain wall"
      />
      <Contact />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
