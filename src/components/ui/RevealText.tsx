"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

/**
 * Masked line reveal. Each line sits in an overflow-hidden box and slides up,
 * which reads as type being set rather than fading in. Used for statements
 * only, so the effect stays rare enough to mean something.
 */
export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReduced();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: 0.09 } } }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block pb-[0.08em]", lineClassName)}
          // Clips above and below the line box but never at its sides, so a
          // heading that wraps stays whole instead of losing its last word.
          style={{ clipPath: "inset(0 -100vw)" }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 0.95, ease: easeOutExpo } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
