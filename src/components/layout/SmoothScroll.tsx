"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

/**
 * Lenis drives the whole page, and GSAP's ScrollTrigger is told to read from
 * it so pinned sections stay in sync. Skipped entirely for reduced motion, in
 * which case native scrolling takes over.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    });

    let frame = 0;
    let scrollTriggerUpdate: (() => void) | undefined;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    import("gsap/ScrollTrigger")
      .then(({ ScrollTrigger }) => {
        scrollTriggerUpdate = () => ScrollTrigger.update();
        lenis.on("scroll", scrollTriggerUpdate);
        ScrollTrigger.refresh();
      })
      .catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      if (scrollTriggerUpdate) lenis.off("scroll", scrollTriggerUpdate);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
