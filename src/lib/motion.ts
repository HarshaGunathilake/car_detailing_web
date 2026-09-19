import type { Transition, Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.8,
  ease: easeOutExpo,
};

/** Standard enter: content lifts into place once, when it is first seen. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Parent for sequenced reveals. Children use `riseIn`. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
