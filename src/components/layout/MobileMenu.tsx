"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Mail, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { easeOutExpo } from "@/lib/motion";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4, ease: easeOutExpo } }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <Image
              src="/logo-light.png"
              alt={siteConfig.name}
              width={579}
              height={314}
              className="h-8 w-auto"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex size-10 items-center justify-center text-bone"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
            <ul>
              {siteConfig.nav.map((item, i) => (
                <li key={item.label} className="overflow-hidden border-b border-hairline">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="display flex items-baseline gap-4 py-5 text-[2.25rem] text-bone sm:text-[2.75rem]"
                    >
                      <span className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-smoke">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="shell shrink-0 space-y-3 pb-10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Link
              href="/contact#book"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center bg-bone text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink"
            >
              Book your detail
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.phone.href}
                className="flex h-12 items-center justify-center gap-2 border border-hairline text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bone"
              >
                <Phone className="size-3.5" strokeWidth={1.5} /> Call
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex h-12 items-center justify-center gap-2 border border-hairline text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bone"
              >
                <Mail className="size-3.5" strokeWidth={1.5} /> Email
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
