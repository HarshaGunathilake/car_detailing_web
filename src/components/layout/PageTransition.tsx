"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

/**
 * Short dark wipe between routes. Just long enough to hide the paint-in,
 * never long enough to read as a loading screen.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReduced();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.45, ease: easeOutExpo } }}
        exit={{ opacity: 0, transition: { duration: 0.22 } }}
      >
        <motion.div
          className="pointer-events-none fixed inset-0 z-[75] origin-top bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.6, ease: easeOutExpo } }}
          exit={{ scaleY: 0 }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
