"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { transformations } from "@/data/transformations";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const current = transformations[active];

  if (!current) return null;

  return (
    <section className="border-b border-hairline bg-carbon py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <RevealText
              as="h2"
              lines={["See the", "difference."]}
              className="display text-[2.5rem] text-bone sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.75rem]"
            />
            <motion.p
              className="mt-6 max-w-[40ch] text-[0.95rem] leading-relaxed text-ash"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
            >
              Drag the handle to move between the vehicle as it arrived and the vehicle as it left.
              Both frames are the same car, same light, same angle.
            </motion.p>

            <div className="mt-10 border-t border-hairline">
              {transformations.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={cn(
                    "group flex w-full items-center gap-4 border-b border-hairline py-4 text-left transition-colors",
                    i === active ? "text-bone" : "text-ash hover:text-bone",
                  )}
                >
                  <span
                    className={cn(
                      "h-px w-6 shrink-0 transition-colors",
                      i === active ? "bg-champagne" : "bg-hairline group-hover:bg-ash",
                    )}
                    aria-hidden
                  />
                  <span className="flex-1 text-[0.8125rem] font-medium uppercase tracking-[0.14em]">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <BeforeAfterSlider
              key={current.id}
              before={current.before}
              after={current.after}
              alt={current.label}
              className="aspect-[4/3] w-full sm:aspect-[16/10]"
            />
            <p className="mt-4 text-xs leading-relaxed text-smoke">{current.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
