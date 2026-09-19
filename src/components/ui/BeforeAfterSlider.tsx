"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Draggable comparison. Pointer, touch and keyboard all drive the same value,
 * exposed as a slider so screen readers and keyboard users get the real thing
 * rather than a decorative image pair.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  className,
  priority,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const id = useId();

  const move = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={wrap}
      className={cn(
        "relative touch-pan-y select-none overflow-hidden bg-graphite",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setDragging(true);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* After sits underneath, revealed as the handle travels left. */}
      <Image
        src={after}
        alt={`${alt}. After detailing.`}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={priority}
        className="object-cover"
      />

      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt}. Before detailing.`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      <span className="label pointer-events-none absolute left-4 top-4 bg-ink/70 px-2 py-1 text-bone backdrop-blur-sm">
        Before
      </span>
      <span className="label pointer-events-none absolute right-4 top-4 bg-ink/70 px-2 py-1 text-bone backdrop-blur-sm">
        After
      </span>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-bone/80"
        style={{ left: `${pos}%` }}
      />

      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        aria-label={`Reveal the after image for ${alt}`}
        onChange={(e) => setPos(Number(e.target.value))}
        className="peer absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0"
      />

      <div
        className="pointer-events-none absolute top-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/70 bg-ink/50 backdrop-blur-md transition-colors peer-focus-visible:border-champagne peer-focus-visible:ring-2 peer-focus-visible:ring-champagne"
        style={{ left: `${pos}%` }}
      >
        <span className="text-bone" aria-hidden>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <path d="M6 1 1 6l5 5M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
