"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { gallery, galleryFilters, type GalleryCategory } from "@/data/gallery";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { useReduced } from "@/lib/useReduced";

/** Natural proportions carry the rhythm. A column flow means no empty cells. */
const ratio: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function Gallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReduced();

  const items = (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)).slice(
    0,
    limit,
  );

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) => (i === null ? null : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, step]);

  return (
    <section id="work" className="border-b border-hairline py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            lines={["The finish speaks", "for itself."]}
            className="display max-w-[18ch] text-[2.25rem] text-bone sm:text-[3.25rem] lg:text-[4.25rem]"
          />

          <div
            role="group"
            aria-label="Filter gallery"
            className="-mx-[var(--gutter)] flex snap-x gap-6 overflow-x-auto px-[var(--gutter)] pb-1 md:mx-0 md:px-0 md:pb-0"
          >
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setLightbox(null);
                }}
                aria-pressed={filter === f.id}
                className={cn(
                  "relative shrink-0 snap-start whitespace-nowrap pb-2 text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                  filter === f.id ? "text-bone" : "text-smoke hover:text-ash",
                )}
              >
                {f.label}
                {filter === f.id && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-x-0 bottom-0 h-px bg-champagne"
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div
            layout={!reduce}
            className="mt-12 columns-1 gap-3 sm:columns-2 lg:mt-16 lg:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  layout={!reduce}
                  data-cursor-mode="view"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open image: ${item.alt}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className={cn(
                    "group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-graphite",
                    ratio[item.span],
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {items.length === 0 && (
          <p className="mt-16 border-t border-hairline pt-8 text-sm text-ash">
            No images in this category yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/97 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <motion.figure
              className="relative flex max-h-[84vh] w-[92vw] max-w-6xl flex-col"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full bg-graphite">
                <Image
                  src={items[lightbox].src}
                  alt={items[lightbox].alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-6 text-xs text-ash">
                <span className="max-w-[60ch]">{items[lightbox].alt}</span>
                <span className="shrink-0 tabular-nums text-smoke">
                  {lightbox + 1} of {items.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-hairline bg-ink/60 text-bone transition-colors hover:border-champagne hover:text-champagne md:left-8"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-hairline bg-ink/60 text-bone transition-colors hover:border-champagne hover:text-champagne md:right-8"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              autoFocus
              className="absolute right-3 top-5 flex size-12 items-center justify-center text-bone transition-colors hover:text-champagne md:right-8"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
