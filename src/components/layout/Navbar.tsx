"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReduced } from "@/lib/useReduced";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReduced();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-hairline bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
            <Image
              src="/logo-light.png"
              alt={siteConfig.name}
              width={579}
              height={314}
              priority
              className="w-auto transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ height: scrolled || reduce ? "2.75rem" : "3.25rem" }}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative block py-1 text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                        active ? "text-bone" : "text-ash hover:text-bone",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-champagne transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <MagneticButton className="hidden sm:inline-flex">
              <Button href="/contact#book" size="sm">
                Book now
              </Button>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-2 flex size-10 items-center justify-center text-bone lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className="absolute left-0 top-0 h-px w-full bg-current" />
                <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
