"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

/** Mobile only. Appears once the hero is behind the visitor. */
export function StickyBookBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/90 backdrop-blur-xl lg:hidden"
      initial={false}
      animate={{ y: show ? 0 : "110%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!show}
    >
      <div
        className="flex items-stretch gap-2 px-4 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={siteConfig.phone.href}
          tabIndex={show ? 0 : -1}
          className="flex w-14 shrink-0 items-center justify-center border border-hairline text-bone"
          aria-label={`Call ${siteConfig.phone.display}`}
        >
          <Phone className="size-4" strokeWidth={1.5} />
        </a>
        <Link
          href="/contact#book"
          tabIndex={show ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center bg-bone text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink"
        >
          Book your detail
        </Link>
      </div>
    </motion.div>
  );
}
