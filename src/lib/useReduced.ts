"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * The server cannot know the visitor's motion preference, so reading it during
 * the first client render makes the markup disagree with the server's. This
 * reports "no preference" through hydration, then the real answer.
 */
export function useReduced(): boolean {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, onClient, onServer);
  return hydrated ? Boolean(reduce) : false;
}
