"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { BookingForm } from "./BookingForm";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section id="book" className="scroll-mt-16 py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <RevealText
              as="h2"
              lines={["Book your", "detail."]}
              className="display text-[2.5rem] text-bone sm:text-[3.5rem] lg:text-[4.25rem]"
            />

            <motion.div
              className="mt-10 border-t border-hairline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
            >
              <ContactRow
                icon={<Phone className="size-4" strokeWidth={1.5} aria-hidden />}
                label="Call"
                value={siteConfig.phone.display}
                href={siteConfig.phone.href}
              />
              <ContactRow
                icon={<Mail className="size-4" strokeWidth={1.5} aria-hidden />}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactRow
                icon={<MapPin className="size-4" strokeWidth={1.5} aria-hidden />}
                label="Workshop"
                value={siteConfig.address.full}
                href={siteConfig.mapsUrl}
                external
              />
            </motion.div>

            {/* Location is drawn as a plan rather than dropped in as an iframe,
                so it reads as part of the page and costs nothing to load. */}
            <motion.a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-10 block overflow-hidden border border-hairline bg-graphite"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative aspect-[16/9]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 320 180"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <rect width="320" height="180" fill="var(--color-graphite)" />
                  <g stroke="var(--color-hairline)" strokeWidth="1">
                    {[20, 52, 84, 116, 148].map((y) => (
                      <line key={y} x1="0" y1={y} x2="320" y2={y} />
                    ))}
                    {[30, 90, 150, 210, 270].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="180" />
                    ))}
                  </g>
                  <path d="M0 116 L320 84" stroke="var(--color-steel)" strokeWidth="7" />
                  <path d="M150 0 L150 180" stroke="var(--color-steel)" strokeWidth="5" />
                  <circle cx="150" cy="103" r="20" fill="var(--color-champagne)" opacity="0.1" />
                  <circle cx="150" cy="103" r="4" fill="var(--color-champagne)" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink to-transparent p-5">
                  <span className="text-sm leading-tight text-bone">
                    {siteConfig.address.street}
                    <br />
                    <span className="text-ash">
                      {siteConfig.address.suburb} {siteConfig.address.state}{" "}
                      {siteConfig.address.postcode}
                    </span>
                  </span>
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-champagne transition-transform duration-300 group-hover:translate-x-0.5">
                    Open in maps
                  </span>
                </div>
              </div>
            </motion.a>

            <dl className="mt-10 border-t border-hairline pt-6">
              {siteConfig.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 border-b border-hairline py-3 text-sm">
                  <dt className="text-ash">{h.day}</dt>
                  <dd className="text-bone">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-center gap-5 border-b border-hairline py-5 transition-colors"
    >
      <span className="flex size-10 shrink-0 items-center justify-center border border-hairline text-ash transition-colors group-hover:border-champagne group-hover:text-champagne">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="label block">{label}</span>
        <span className="mt-1 block truncate text-base text-bone">{value}</span>
      </span>
    </a>
  );
}
