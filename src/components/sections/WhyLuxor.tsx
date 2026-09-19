"use client";

import { motion } from "motion/react";
import { whyLuxor } from "@/data/why";
import { Counter } from "@/components/ui/Counter";
import { RevealText } from "@/components/ui/RevealText";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function WhyLuxor() {
  return (
    <section className="border-b border-hairline bg-carbon py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="flex flex-col gap-10 border-b border-hairline pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <RevealText
            as="h2"
            lines={["Why Luxor"]}
            className="display text-[3rem] text-bone sm:text-[4.5rem] lg:text-[6rem]"
          />
          <motion.p
            className="display flex items-start leading-[0.8] text-champagne"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <Counter to={10} className="text-[4rem] sm:text-[5.5rem]" />
            <span className="mt-1 text-[1.75rem] sm:text-[2.25rem]">+</span>
            <span className="label ml-5 mt-3 self-center whitespace-pre-line text-left leading-tight">
              {"Years of\nexperience"}
            </span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2">
          {whyLuxor.map((item, i) => (
            <motion.article
              key={item.index}
              className="group relative border-b border-hairline py-10 md:py-14 md:odd:pr-12 md:even:border-l md:even:pl-12 lg:md:odd:pr-20 lg:md:even:pl-20"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: (i % 2) * 0.1 }}
            >
              <span className="display block text-[3.5rem] leading-none text-steel transition-colors duration-500 group-hover:text-champagne sm:text-[4.5rem]">
                {item.index}
              </span>
              <h3 className="display mt-5 text-[1.5rem] text-bone sm:text-[1.875rem]">{item.title}</h3>
              <p className="mt-4 max-w-[44ch] text-[0.95rem] leading-relaxed text-ash">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
