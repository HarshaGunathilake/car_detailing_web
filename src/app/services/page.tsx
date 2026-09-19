import type { Metadata } from "next";
import Image from "next/image";
import { services, vehicleClasses } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/sections/PageHeader";
import { CeramicFeature } from "@/components/sections/CeramicFeature";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Mini detail, interior detail, cut and polish, full detail and five year ceramic coating. Inclusions and pricing by vehicle size for Clayton South and greater Melbourne.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services & Pricing | ${siteConfig.name}`,
    description:
      "Detailing packages, inclusions and pricing by vehicle size, from a mini detail through to a five year ceramic coating.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services and pricing"
        lines={["Every job,", "priced plainly."]}
        intro="Five packages, each with its inclusions written out in full. Prices start at the figures below and move with vehicle size and the condition we find on the day."
        image={images.handAppliedProtection}
        imageAlt="Protective product being worked into a panel by hand"
      />

      <section className="border-b border-hairline">
        {services.map((service, i) => (
          <article
            key={service.slug}
            id={service.slug}
            className="scroll-mt-20 border-b border-hairline py-20 last:border-b-0 md:py-28"
          >
            <div className="shell">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28">
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-[0.625rem] font-medium tracking-[0.2em] text-champagne">
                        {service.index}
                      </span>
                      <h2 className="display text-[2rem] text-bone sm:text-[2.75rem]">
                        {service.shortName}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-smoke">{service.name}</p>
                    <p className="mt-6 max-w-[46ch] text-[0.95rem] leading-relaxed text-ash">
                      {service.detail}
                    </p>

                    <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-graphite">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={i === 0}
                        className="object-cover"
                      />
                    </div>

                    <dl className="mt-8 border-t border-hairline">
                      {vehicleClasses.map((vc) => (
                        <div
                          key={vc.id}
                          className="flex items-baseline justify-between gap-6 border-b border-hairline py-3"
                        >
                          <dt className="text-sm text-ash">{vc.label}</dt>
                          <dd className="display text-[1.375rem] text-bone">
                            {formatPrice(service.prices[vc.id])}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Button href="/contact#book" size="lg" className="mt-8">
                      Book this service
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="label">What is included</h3>
                  <div className="mt-6 grid gap-10 sm:grid-cols-2">
                    {service.groups.map((group, gi) => (
                      <div
                        key={group.title ?? gi}
                        className={service.groups.length === 1 ? "sm:col-span-2" : ""}
                      >
                        {group.title && (
                          <h4 className="display text-[1.125rem] text-bone">{group.title}</h4>
                        )}
                        <ul
                          className={
                            group.title
                              ? "mt-4 space-y-2.5"
                              : "space-y-2.5 sm:columns-2 sm:gap-x-10 sm:space-y-0"
                          }
                        >
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex break-inside-avoid gap-3 py-1 text-[0.875rem] leading-relaxed text-bone/80"
                            >
                              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-champagne" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {service.note && (
                    <p className="mt-10 border-l border-hairline pl-5 text-xs leading-relaxed text-smoke">
                      {service.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CeramicFeature />
      <BookingCTA />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
