"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

/**
 * Photography enters behind a clip mask and settles from a slight scale.
 * One reveal grammar across the whole site so images feel like one system.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
}) {
  const reduce = useReduced();

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-graphite", className)}
      initial={reduce ? undefined : { clipPath: "inset(12% 8% 12% 8%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: easeOutExpo, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.4, ease: easeOutExpo, delay }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </motion.div>
  );
}
