"use client";

import { motion } from "motion/react";
import { guarantees } from "@/data/why";
import { RevealText } from "@/components/ui/RevealText";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

export function Guarantee() {
  const reduce = useReduced();

  return (
    <section className="border-b border-hairline py-24 md:py-32 lg:py-40">
      <div className="shell text-center">
        <RevealText
          as="h2"
          lines={["We stand behind", "our work."]}
          className="display mx-auto text-[2.5rem] text-bone sm:text-[3.5rem] lg:text-[4.5rem]"
        />
        <motion.p
          className="mx-auto mt-6 max-w-[54ch] text-[0.95rem] leading-relaxed text-ash"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
        >
          Every vehicle is treated with care and attention to detail. We use premium products and
          proven techniques to deliver professional-grade results.
        </motion.p>

        <div className="relative mt-20">
          {/* The line is drawn once, left to right, tying the three promises together. */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px w-full md:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="var(--color-hairline)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: easeOutExpo }}
            />
          </svg>

          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {guarantees.map((g, i) => (
              <motion.li
                key={g.title}
                className="relative"
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 + i * 0.15 }}
              >
                <span className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full border border-hairline bg-ink">
                  <motion.span
                    className="size-1.5 rounded-full bg-champagne"
                    initial={reduce ? undefined : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.6 + i * 0.15 }}
                  />
                </span>
                <h3 className="display mt-7 text-[1.375rem] text-bone">{g.title}</h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-sm leading-relaxed text-ash">{g.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
