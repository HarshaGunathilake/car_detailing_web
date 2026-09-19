"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews, REVIEWS_ARE_PLACEHOLDER } from "@/data/reviews";
import { siteConfig } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

export function Reviews() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  if (reviews.length === 0) return null;
  const r = reviews[i];

  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + reviews.length) % reviews.length);
  };

  return (
    <section className="border-b border-hairline bg-carbon py-24 md:py-32 lg:py-40">
      <div className="shell">
        <RevealText
          as="h2"
          lines={["Trusted by drivers", "who care about", "the details."]}
          className="display text-[2.25rem] text-bone sm:text-[3.25rem] lg:text-[4rem]"
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="relative min-h-[16rem] sm:min-h-[14rem]">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.figure
                  key={r.id}
                  custom={dir}
                  initial={{ opacity: 0, y: 24 * dir }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 * dir }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                >
                  <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-champagne text-champagne" strokeWidth={0} aria-hidden />
                    ))}
                  </div>
                  <blockquote className="display mt-7 max-w-[26ch] text-[1.375rem] leading-[1.2] tracking-[-0.02em] text-bone sm:text-[1.75rem] lg:text-[2.125rem]">
                    <span aria-hidden>&ldquo;</span>
                    {r.quote}
                    <span aria-hidden>&rdquo;</span>
                  </blockquote>
                  <figcaption className="mt-8 text-sm text-ash">
                    <span className="text-bone">{r.name}</span>
                    <span className="mx-2 text-smoke" aria-hidden>
                      /
                    </span>
                    {r.context}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-hairline pt-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="flex size-11 items-center justify-center border border-hairline text-bone transition-colors hover:border-champagne hover:text-champagne"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next review"
                className="flex size-11 items-center justify-center border border-hairline text-bone transition-colors hover:border-champagne hover:text-champagne"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
              <span className="ml-2 text-xs tabular-nums text-smoke">
                {String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <motion.div
            className="flex flex-col justify-end lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          >
            {REVIEWS_ARE_PLACEHOLDER && (
              <p className="mb-6 border-l border-champagne pl-4 text-xs leading-relaxed text-ash">
                Sample copy shown while the real Google reviews are connected. Replace the entries in
                <code className="mx-1 text-ash">src/data/reviews.ts</code>
                and set the placeholder flag to false.
              </p>
            )}
            <Button
              href={siteConfig.reviewsUrl}
              variant="quiet"
              size="lg"
              target="_blank"
              rel="noreferrer noopener"
            >
              View Google reviews
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
