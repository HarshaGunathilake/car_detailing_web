"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAnimate } from "motion/react";
import { easeOutExpo } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

/**
 * Short dark wipe between routes. Just long enough to hide the paint-in,
 * never long enough to read as a loading screen.
 *
 * Driven imperatively with `useAnimate` rather than `AnimatePresence`
 * keyed on the pathname. That declarative shape looked simpler, but its
 * exit/enter choreography can silently break after a client-side route
 * change (React StrictMode double-invoking the exit-tracking effects is
 * one known trigger) — the entering element then never leaves its
 * `initial` state. For this overlay that means a full-viewport `bg-ink`
 * div stuck permanently covering the page: a black screen with real
 * content rendered but invisible underneath it. Calling `animate()`
 * directly in a layout effect has no such failure mode — it runs on
 * every pathname change, full stop — and the page content below is never
 * gated behind an animation, so even a dropped frame here can't hide it.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReduced();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (reduce) return;
    if (isFirstRender.current) {
      // Skip the wipe on the very first paint — a hard load has nothing to
      // hide a paint-in behind.
      isFirstRender.current = false;
      return;
    }

    // Cover instantly, in the same paint as the route swap landing, then
    // wipe away on the next frame.
    animate(scope.current, { scaleY: 1 }, { duration: 0 });
    const raf = requestAnimationFrame(() => {
      animate(scope.current, { scaleY: 0 }, { duration: 0.6, ease: easeOutExpo });
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <>
      <div
        ref={scope}
        className="pointer-events-none fixed inset-0 z-[75] origin-top bg-ink"
        style={{ transform: "scaleY(0)" }}
      />
      {children}
    </>
  );
}
