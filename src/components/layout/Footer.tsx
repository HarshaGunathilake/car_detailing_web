import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-carbon pb-28 pt-16 lg:pb-16 lg:pt-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/logo-light.png"
              alt={siteConfig.name}
              width={579}
              height={314}
              className="h-20 w-auto"
            />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ash">
              Premium car detailing, paint correction and ceramic coating in Clayton South, Melbourne.
            </p>
          </div>

          <nav aria-label="Services">
            <h2 className="label">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-ash transition-colors hover:text-bone"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Pages">
            <h2 className="label">Explore</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-sm text-ash transition-colors hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label">Visit</h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-ash">
              <p className="text-bone">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.suburb} {siteConfig.address.state} {siteConfig.address.postcode}
              </p>
              <p>
                <a href={siteConfig.phone.href} className="transition-colors hover:text-bone">
                  {siteConfig.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-bone">
                  {siteConfig.email}
                </a>
              </p>
            </address>
            <dl className="mt-6 space-y-1.5 text-xs text-smoke">
              {siteConfig.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd className="text-ash">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Serving {siteConfig.serviceAreas.slice(0, 4).join(", ")} and surrounding Melbourne suburbs.
          </p>
        </div>
      </div>
    </footer>
  );
}
