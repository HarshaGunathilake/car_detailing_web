export const siteConfig = {
  name: "Luxor Car Detailing",
  shortName: "Luxor",
  tagline: "Detailing, elevated.",
  description:
    "Professional car detailing, interior detailing, paint correction, cut & polish and ceramic coating services in Clayton South, Melbourne.",
  url: "https://www.luxorcardetailing.com.au",
  yearsExperience: 10,
  address: {
    street: "15 Kitson Rd",
    suburb: "Clayton South",
    state: "VIC",
    postcode: "3169",
    country: "AU",
    full: "15 Kitson Rd, Clayton South VIC 3169",
    lat: -37.9494,
    lng: 145.1211,
  },
  phone: {
    display: "0428 657 955",
    href: "tel:+61428657955",
    e164: "+61428657955",
  },
  email: "info@luxorcardetailing.com.au",
  /** Full-colour lockup, for light surfaces and structured data. */
  logo: "/logo.png",
  /** Monochrome lockup used across the dark interface. */
  logoLight: "/logo-light.png",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=15+Kitson+Rd+Clayton+South+VIC+3169",
  reviewsUrl:
    "https://www.google.com/search?q=Luxor+Car+Detailing+Clayton+South+reviews",
  serviceAreas: [
    "Clayton South",
    "Clayton",
    "Springvale",
    "Oakleigh",
    "Mulgrave",
    "Dandenong",
    "Bentleigh",
    "Moorabbin",
    "Cheltenham",
    "Glen Waverley",
  ],
  hours: [
    { day: "Monday to Friday", time: "8:00am to 6:00pm" },
    { day: "Saturday", time: "8:00am to 5:00pm" },
    { day: "Sunday", time: "By appointment" },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/gallery" },
    { label: "Ceramic", href: "/services#ceramic" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const isIndexable = false;
