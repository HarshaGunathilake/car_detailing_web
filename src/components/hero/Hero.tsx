"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { easeOutExpo } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReduced } from "@/lib/useReduced";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The frame holds still while the picture drifts, so the hero reads as one
  // long camera move rather than a page sliding away.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale, y }}
      >
        <Image
          src={images.workshopSnowFoam}
          alt="Snow foam covering a black sports car during a hand wash"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Readability scrim. Bottom-weighted so the type sits in shadow. */}
      {/* Weighted to the bottom, where the type sits, so the picture keeps its
          highlights at the top instead of going flat black. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />
      <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_0%,transparent_42%,rgba(8,8,8,0.72)_100%)]" />

      <motion.div
        className="shell relative flex min-h-[100dvh] flex-col justify-end pb-24 pt-24 md:pb-28"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="label text-champagne"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }}
        >
          Luxor Car Detailing
        </motion.p>

        <h1 className="display mt-5 max-w-[16ch] text-[3.25rem] leading-[0.88] text-bone sm:text-[5.5rem] lg:text-[8rem] xl:text-[9.5rem]">
          {["Detailing,", "elevated."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? undefined : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.25 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-[38ch] text-base leading-relaxed text-ash sm:text-lg"
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.55 }}
        >
          Precision detailing. Deep gloss. Lasting protection.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.68 }}
        >
          <MagneticButton>
            <Button href="/contact#book" size="lg" className="w-full sm:w-auto">
              Book your detail
            </Button>
          </MagneticButton>
          <Button href="/services" variant="outline" size="lg">
            Explore services
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={reduce ? undefined : { opacity: copyOpacity }}
      >
        <span className="flex flex-col items-center gap-3">
          <span className="text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-smoke">
            Scroll to explore
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-hairline">
            <motion.span
              className="absolute inset-x-0 top-0 block h-4 bg-champagne"
              animate={reduce ? undefined : { y: ["-100%", "260%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
