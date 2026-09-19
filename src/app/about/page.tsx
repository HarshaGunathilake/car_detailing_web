import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/sections/PageHeader";
import { Intro } from "@/components/sections/Intro";
import { Process } from "@/components/sections/Process";
import { WhyLuxor } from "@/components/sections/WhyLuxor";
import { Guarantee } from "@/components/sections/Guarantee";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Over ten years of hands-on detailing in Clayton South. How Luxor works, what goes into every vehicle, and what we stand behind.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "Over ten years of hands-on detailing in Clayton South, Melbourne.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Luxor"
        lines={["Detailing is", "in the detail."]}
        intro="Passionate artisans dedicated to preserving and enhancing the beauty of your vehicle. Over ten years of hands-on work, from the Clayton South workshop."
        image={images.machinePolisher}
        imageAlt="Machine polishing a panel during paint correction"
      />
      <Intro />
      <Process />
      <WhyLuxor />
      <Guarantee />
      <Reviews />
      <BookingCTA />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
