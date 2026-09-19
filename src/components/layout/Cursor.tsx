"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReduced } from "@/lib/useReduced";

type Mode = "default" | "view" | "link";

/**
 * Desktop-only pointer. Small dot by default, opens into a labelled disc over
 * imagery. Never mounted for coarse pointers or reduced motion, and the native
 * cursor is only hidden once this one is actually running.
 */
export function Cursor() {
  const reduce = useReduced();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-cursor");
      return;
    }
    document.documentElement.setAttribute("data-cursor", "on");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as Element)?.closest?.("[data-cursor-mode],a,button,input,textarea,select");
      const declared = el?.getAttribute?.("data-cursor-mode") as Mode | null;
      setMode(declared ?? (el ? "link" : "default"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 84 : mode === "link" ? 40 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: mode === "default" ? "#f5f3ef" : "rgba(245,243,239,0)",
        borderWidth: mode === "default" ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.5 }}
    >
      <span
        className="absolute inset-0 rounded-full border border-bone"
        style={{ opacity: mode === "default" ? 0 : 1 }}
      />
      <motion.span
        className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-bone"
        animate={{ opacity: mode === "view" ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
