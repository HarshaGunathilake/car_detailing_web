"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ceramicBenefits, getService } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";
import { Button } from "@/components/ui/Button";

export function CeramicFeature() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const service = getService("ceramic-coating");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="ceramic"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden border-b border-hairline bg-ink"
    >
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={reduce ? undefined : { y }}>
        <Image
          src="https://images.unsplash.com/photo-1550565076-b2371ea1a324?auto=format&fit=crop&q=85&w=2400"
          alt="Water beading tightly across a ceramic coated black panel"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />

      <div className="shell relative py-28 md:py-36 lg:py-48">
        <div className="max-w-[46rem]">
          <p className="label text-champagne">Ceramic coating</p>
          <RevealText
            as="h2"
            lines={["Protection", "that shines."]}
            className="display mt-5 text-[2.75rem] text-bone sm:text-[4rem] lg:text-[5.5rem]"
          />
          <motion.p
            className="mt-6 max-w-[46ch] text-[0.975rem] leading-relaxed text-bone/70 sm:text-base"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          >
            Enhance your vehicle&rsquo;s finish with advanced ceramic protection designed for
            long-lasting gloss, hydrophobic performance and easier maintenance. Applied only over
            fully decontaminated and machine-corrected paint, and backed by a five year warranty.
          </motion.p>
        </div>

        <ul className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {ceramicBenefits.map((b, i) => (
            <motion.li
              key={b.title}
              className="bg-ink/70 p-6 backdrop-blur-sm lg:p-8"
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.08 }}
            >
              <h3 className="display text-[1.125rem] text-bone">{b.title}</h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ash">{b.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {service && (
            <p className="text-sm text-ash">
              From{" "}
              <span className="display text-[1.5rem] align-middle text-bone">
                {formatPrice(service.fromPrice)}
              </span>{" "}
              with a five year warranty.
            </p>
          )}
          <MagneticButton>
            <Button href="/contact#book" size="lg">
              Request a ceramic quote
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
