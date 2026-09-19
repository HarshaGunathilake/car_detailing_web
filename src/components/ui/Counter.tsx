"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useReduced } from "@/lib/useReduced";

/** Counts up once when scrolled into view. Static under reduced motion. */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReduced();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!reduce && inView) mv.set(to);
  }, [inView, mv, to, reduce]);

  useEffect(() => {
    if (reduce) return;
    return spring.on("change", (v) => setValue(Math.round(v)));
  }, [spring, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{reduce ? to : value}</span>
      {suffix}
    </span>
  );
}
