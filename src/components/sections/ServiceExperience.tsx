"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { services, vehicleClasses, type Service } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReduced } from "@/lib/useReduced";
import { Button } from "@/components/ui/Button";

/** Top inclusions shown in the panel. Full lists live on the services page. */
function highlights(service: Service, count = 5) {
  return service.groups.flatMap((g) => g.items).slice(0, count);
}

export function ServiceExperience() {
  return (
    <section id="services" className="border-b border-hairline py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          lines={["The Luxor", "standard."]}
          sub="Professional detailing for vehicles that deserve exceptional care. Every price below is a starting point, set by vehicle size and the condition we find."
          size="lg"
        />
      </div>

      <div className="mt-14 md:mt-20">
        <DesktopPanels />
        <MobileAccordion />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- desktop */

function DesktopPanels() {
  const [active, setActive] = useState(0);
  const reduce = useReduced();

  return (
    <div className="hidden lg:block">
      <div
        className="shell flex h-[78vh] max-h-[820px] min-h-[560px] gap-1"
        onMouseLeave={() => setActive(0)}
      >
        {services.map((service, i) => {
          const open = active === i;
          return (
            <motion.div
              key={service.slug}
              className="relative overflow-hidden border border-hairline bg-graphite"
              animate={{ flexGrow: open ? 6 : 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeOutExpo }}
              style={{ flexBasis: 0, minWidth: 0 }}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                className="absolute inset-0 z-20 h-full w-full cursor-pointer text-left"
                aria-expanded={open}
                aria-label={`${service.name}, from ${formatPrice(service.fromPrice)}`}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              />

              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 0px, 60vw"
                className="object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: open ? 0.42 : 0.16, transform: `scale(${open ? 1 : 1.12})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />

              {/* Collapsed spine */}
              <AnimatePresence initial={false}>
                {!open && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-between py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <span className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-champagne">
                      {service.index}
                    </span>
                    <span
                      className="display whitespace-nowrap text-[1.4rem] tracking-[0.02em] text-bone"
                      style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                    >
                      {service.shortName}
                    </span>
                    <span className="font-sans text-[0.625rem] font-medium tracking-[0.14em] text-ash">
                      {formatPrice(service.fromPrice)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded content */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    className="absolute inset-0 z-10 flex flex-col justify-end p-8 xl:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.45 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <PanelBody service={service} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PanelBody({ service }: { service: Service }) {
  return (
    <div className="max-w-[58rem]">
      <div className="flex items-baseline gap-4">
        <span className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-champagne">
          {service.index}
        </span>
        <h3 className="display text-[2rem] text-bone xl:text-[2.75rem]">{service.shortName}</h3>
      </div>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash">{service.detail}</p>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5">
          {highlights(service).map((item, i) => (
            <motion.li
              key={item}
              className="flex gap-3 text-[0.8125rem] leading-snug text-bone/80"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.035, duration: 0.4, ease: easeOutExpo }}
            >
              <span className="mt-[0.45em] h-px w-3 shrink-0 bg-champagne" aria-hidden />
              {item}
            </motion.li>
          ))}
        </ul>

        <div>
          <dl className="border-t border-hairline">
            {vehicleClasses.map((vc, i) => (
              <motion.div
                key={vc.id}
                className="flex items-baseline justify-between gap-6 border-b border-hairline py-2.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 + i * 0.07, duration: 0.45, ease: easeOutExpo }}
              >
                <dt className="text-[0.75rem] text-ash">{vc.short}</dt>
                <dd className="display text-[1.25rem] text-bone">{formatPrice(service.prices[vc.id])}</dd>
              </motion.div>
            ))}
          </dl>
          <Button href={`/services#${service.slug}`} className="mt-6">
            Book this service
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- mobile */

function MobileAccordion() {
  const [open, setOpen] = useState<string | null>(services[0].slug);

  return (
    <div className="shell lg:hidden">
      <div className="border-t border-hairline">
        {services.map((service) => {
          const isOpen = open === service.slug;
          return (
            <div key={service.slug} className="relative overflow-hidden border-b border-hairline">
              {isOpen && (
                <>
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
                </>
              )}

              <h3 className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : service.slug)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-champagne">
                    {service.index}
                  </span>
                  <span className="display flex-1 text-[1.5rem] text-bone sm:text-[1.875rem]">
                    {service.shortName}
                  </span>
                  <span className="font-sans text-[0.6875rem] font-medium tracking-[0.12em] text-ash">
                    {formatPrice(service.fromPrice)}
                  </span>
                  {isOpen ? (
                    <Minus className="size-4 shrink-0 text-ash" strokeWidth={1.5} aria-hidden />
                  ) : (
                    <Plus className="size-4 shrink-0 text-ash" strokeWidth={1.5} aria-hidden />
                  )}
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="relative overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                  >
                    <div className="pb-8">
                      <p className="max-w-[52ch] text-sm leading-relaxed text-ash">{service.detail}</p>

                      <ul className="mt-6 space-y-2">
                        {highlights(service, 5).map((item) => (
                          <li key={item} className="flex gap-3 text-[0.8125rem] leading-snug text-bone/80">
                            <span className="mt-[0.5em] h-px w-3 shrink-0 bg-champagne" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <dl className="mt-6 border-t border-hairline">
                        {vehicleClasses.map((vc) => (
                          <div
                            key={vc.id}
                            className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5"
                          >
                            <dt className="text-xs text-ash">{vc.short}</dt>
                            <dd className="display text-[1.125rem] text-bone">
                              {formatPrice(service.prices[vc.id])}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <Button href={`/services#${service.slug}`} className="mt-6 w-full">
                        Book this service
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <motion.p
        className="mt-8 text-xs leading-relaxed text-smoke"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
      >
        Prices are a starting point and may vary with excessive dirt, sand, pet hair or stains.
      </motion.p>
    </div>
  );
}
