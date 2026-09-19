import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/sections/Intro";
import { ServiceExperience } from "@/components/sections/ServiceExperience";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { WhyLuxor } from "@/components/sections/WhyLuxor";
import { Guarantee } from "@/components/sections/Guarantee";
import { Gallery } from "@/components/sections/Gallery";
import { CeramicFeature } from "@/components/sections/CeramicFeature";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServiceExperience />
      <BeforeAfter />
      <Process />
      <CeramicFeature />
      <WhyLuxor />
      <Gallery limit={12} />
      <Guarantee />
      <Reviews />
      <BookingCTA />
    </>
  );
}
