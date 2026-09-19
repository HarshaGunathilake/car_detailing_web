"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";
import { Button } from "@/components/ui/Button";

export function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-hairline">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        <Image
          src="https://images.unsplash.com/photo-1626002595481-688505bc19ba?auto=format&fit=crop&q=85&w=2400"
          alt="Detailed sports car photographed at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink" />

      <div className="shell relative py-28 text-center md:py-40 lg:py-52">
        <RevealText
          as="h2"
          lines={["Ready to bring your", "car back to its best?"]}
          className="display mx-auto max-w-[20ch] text-[2.25rem] text-bone sm:text-[3.5rem] lg:text-[5rem]"
        />
        <motion.p
          className="mx-auto mt-6 text-[0.95rem] text-ash sm:text-base"
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Book your next detail with Luxor Car Detailing.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.4 }}
        >
          <MagneticButton className="w-full sm:w-auto">
            <Button href="/contact#book" size="lg" className="w-full px-10 sm:w-auto">
              Book your detail
            </Button>
          </MagneticButton>
          <Button
            href={siteConfig.phone.href}
            variant="outline"
            size="lg"
            className="w-full px-10 sm:w-auto"
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden />
            Call {siteConfig.phone.display}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
