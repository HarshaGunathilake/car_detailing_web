"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "@/components/ui/RevealText";
import { Counter } from "@/components/ui/Counter";
import { viewportOnce, easeOutExpo } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";
import { images } from "@/data/images";

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-hairline py-24 md:py-36 lg:py-48">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <RevealText
              as="h2"
              lines={["Your vehicle", "deserves more", "than a wash."]}
              className="display text-[2.25rem] text-bone sm:text-[3.25rem] lg:text-[4.25rem] xl:text-[5.25rem]"
            />
          </div>

          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-3">
            <motion.p
              className="max-w-[46ch] text-[0.975rem] leading-[1.75] text-ash sm:text-base"
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 }}
            >
              At Luxor Car Detailing, every vehicle is treated with meticulous care. From thorough
              interior restoration to paint enhancement and long-lasting protection, our approach is
              built around precision, presentation and pride.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 grid items-end gap-10 border-t border-hairline pt-10 md:mt-24 md:grid-cols-12 md:pt-14">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="display flex items-start leading-[0.8] text-bone">
              <Counter to={10} className="text-[5.5rem] sm:text-[7rem] lg:text-[8.5rem]" />
              <span className="mt-2 text-[2rem] text-champagne sm:text-[2.5rem]">+</span>
            </p>
            <p className="label mt-4">Years of experience</p>
          </div>

          {/* The reveal is a curtain that slides off, not a clip on the image's
              own container. Clipping an ancestor to zero height leaves the
              browser convinced a lazy image is off-screen, and if no further
              scroll event arrives once the animation ends it never loads,
              leaving an empty frame. The picture is always laid out; only the
              curtain in front of it moves. */}
          <div
            className="relative aspect-[16/10] overflow-hidden bg-graphite md:col-span-8 lg:col-span-9"
            data-cursor-mode="view"
          >
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduce ? undefined : { y: imgY }}>
              <Image
                src={images.waterSheetingCoupe}
                alt="Water sheeting off the panels of a freshly detailed coupe"
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                loading="eager"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-0 origin-bottom bg-ink"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: easeOutExpo }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
