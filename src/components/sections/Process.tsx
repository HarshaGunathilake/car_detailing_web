"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/process";
import { RevealText } from "@/components/ui/RevealText";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop turns the five steps sideways: the section pins and the track pans
 * as you scroll, so the sequence reads as one continuous move through the
 * workshop. Narrow screens and reduced motion get the same five steps stacked
 * vertically, with no hijack.
 */
export function Process() {
  return (
    <section className="border-b border-hairline py-24 md:py-32 lg:py-0">
      <div className="shell lg:pt-40">
        <div className="max-w-[20em]">
          <RevealText
            as="h2"
            lines={["Precision in", "every step."]}
            className="display text-[2.5rem] text-bone sm:text-[3.5rem] lg:text-[4.5rem]"
          />
        </div>
      </div>

      <HorizontalTrack />
      <StackedSteps />
    </section>
  );
}

/* --------------------------------------------------------------- desktop */

function HorizontalTrack() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        if (!track.current || !wrap.current) return;
        const distance = () => track.current!.scrollWidth - window.innerWidth;

        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      }, wrap);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduce]);

  if (reduce) return null;

  const active = Math.min(
    processSteps.length - 1,
    Math.round(progress * (processSteps.length - 1)),
  );

  return (
    <div ref={wrap} className="relative hidden overflow-hidden lg:block">
      <div ref={track} className="flex h-[100dvh] items-center will-change-transform">
        {processSteps.map((step, i) => (
          <article
            key={step.index}
            className="flex h-full w-[74vw] shrink-0 items-center gap-12 px-[var(--gutter)] xl:w-[66vw]"
          >
            <div className="relative aspect-[4/5] h-[62vh] shrink-0 overflow-hidden bg-graphite">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="display absolute bottom-6 left-6 text-[5rem] leading-none text-bone">
                {step.index}
              </span>
            </div>

            <div className="max-w-[34ch]">
              <span className="label text-champagne">Step {i + 1} of {processSteps.length}</span>
              <h3 className="display mt-5 text-[3rem] text-bone xl:text-[4rem]">{step.title}</h3>
              <p className="mt-6 text-[0.975rem] leading-relaxed text-ash">{step.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-10 flex items-center gap-5">
        <span className="display text-[0.875rem] tracking-[0.1em] text-ash">
          {processSteps[active].title}
        </span>
        <span className="relative h-px flex-1 bg-hairline">
          <span
            className="absolute inset-y-0 left-0 block bg-champagne"
            style={{ width: `${Math.max(progress, 0.02) * 100}%` }}
          />
        </span>
        <span className="text-[0.6875rem] tabular-nums tracking-[0.1em] text-smoke">
          {String(active + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- mobile and fallback */

function StackedSteps() {
  const reduce = useReduced();

  return (
    <ol className={reduce ? "shell mt-14" : "shell mt-14 lg:hidden"}>
      {processSteps.map((step) => (
        <li key={step.index} className="border-t border-hairline py-10 last:border-b">
          <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden bg-graphite">
            <Image src={step.image} alt={step.alt} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <span className="display absolute bottom-4 left-4 text-[2.75rem] leading-none text-bone">
              {step.index}
            </span>
          </div>
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <h3 className="display text-[2rem] text-bone sm:text-[2.5rem]">{step.title}</h3>
            <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-ash">{step.body}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
