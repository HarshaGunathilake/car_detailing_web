# Luxor Car Detailing

Premium marketing site for Luxor Car Detailing, 15 Kitson Rd, Clayton South VIC 3169.

Next.js App Router, TypeScript, Tailwind v4, Motion, GSAP ScrollTrigger and Lenis.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
npm run typecheck
```

Node 20 or newer.

## Where the content lives

Nothing in `src/components` holds copy or prices. Everything editable sits in `src/data`:

| File | Holds |
| --- | --- |
| `site.ts` | Business name, address, phone, email, hours, service areas, navigation |
| `services.ts` | The five packages, their full inclusion lists and price per vehicle class |
| `gallery.ts` | Gallery images, alt text and category |
| `transformations.ts` | Before and after pairs for the comparison slider |
| `process.ts` | The five workshop steps |
| `why.ts` | Why Luxor points and the guarantee points |
| `reviews.ts` | Customer reviews |

Change a price in `services.ts` and it updates the home page panels, the services page,
the footer links and the LocalBusiness structured data at once.

## Two things to replace before launch

**1. Reviews are placeholder copy.**
`src/data/reviews.ts` ships sample entries so the section can be designed and reviewed.
They are not real customers. Replace the array with genuine Google reviews and set
`REVIEWS_ARE_PLACEHOLDER = false`. While the flag is true, the section shows a short
note rather than presenting the samples as real. If the array is emptied, the section
hides itself.

**2. Photography is licensed stock.**
Every image is a hand-picked Unsplash photograph referenced by URL, except the two
before and after pairs in `transformations.ts`, which are Luxor's own photos served
from the existing site. To swap in Luxor's own shots, drop the files into
`public/images/` and change the `src` strings in the data files to `/images/name.jpg`.
No component changes needed. `next.config.ts` allow-lists `images.unsplash.com` and
`www.luxorcardetailing.com.au`; add any new remote host there.

## Brand assets

| File | What it is |
| --- | --- |
| `public/logo.png` | The supplied full-colour lockup, trimmed. For light surfaces, print and structured data. |
| `public/logo-light.png` | The same artwork recoloured to bone. This is the one the interface uses, because navy on near-black does not read. |
| `src/app/icon.png` | Favicon, 512px, built from the supplied L mark. Next emits the `<link rel="icon">` automatically. |
| `src/app/apple-icon.png` | 180px home-screen icon, full-bleed so iOS can apply its own corner mask. |
| `src/app/opengraph-image.png` | 1200x630 social card, with `opengraph-image.alt.txt` beside it for the alt text. |
| `src/app/twitter-image.png` | The same card for the Twitter/X `summary_large_image`. |

To change the social card, edit the source and re-export at 1200x630. Everything in
`src/app` using the file-name convention is picked up by Next with no metadata changes;
drop in a replacement at the same path and the tags update themselves.

## Booking form

`src/components/sections/BookingForm.tsx` validates on the client and then opens the
visitor's email client with the enquiry prefilled, so the form works with no backend
on day one. To send server side instead, POST the `payload` object to an API route
from the `submit` function and keep the existing status handling. The success, error
and submitting states are already built.

## Motion

- **Lenis** drives page scrolling and feeds **GSAP ScrollTrigger** so pinned sections stay in sync (`src/components/layout/SmoothScroll.tsx`).
- **Motion** handles reveals, hovers, the service panels, the gallery and page transitions.
- **GSAP ScrollTrigger** is used for one thing: pinning the process section and panning it horizontally on desktop.
- Everything respects `prefers-reduced-motion`. Under that setting the horizontal pan becomes a vertical list, the custom cursor never mounts, Lenis is skipped and transitions collapse. `src/lib/useReduced.ts` reads the preference without breaking hydration.

## Accessibility notes

- Skip link, single `h1` per page and a descending heading order.
- The before and after comparison is a real range input, so it works with a keyboard.
- The gallery lightbox traps scroll and responds to Escape and the arrow keys.
- Form labels sit above their inputs, errors below, with `aria-invalid` and `aria-describedby`.
- The custom cursor only mounts for a fine pointer, and the native cursor is hidden only while it is running.
- Focus rings are champagne on dark and never removed.

## SEO

- Per-route metadata, canonical URLs, OpenGraph and Twitter cards.
- `AutoDetailing` LocalBusiness structured data with address, geo, hours, service areas and an offer catalogue built from `services.ts`.
- Breadcrumb structured data on each sub-page.
- `sitemap.xml` and `robots.txt` generated from `src/data/site.ts`.

### Currently closed to search engines

`isIndexable` in `src/data/site.ts` is `false`, so every page sends
`noindex, nofollow, nocache`, `robots.txt` disallows everything and the sitemap is
empty. **Flip it to `true` at launch.** That one value drives the metadata, the robots
file and the sitemap, so nothing else needs touching.

Set the production domain in `siteConfig.url` before deploying. It seeds `metadataBase`,
the canonical URLs, the sitemap and the structured data.

## Structure

```
src/
  app/            routes, metadata, sitemap, robots, fonts, globals.css
  components/
    layout/       Navbar, MobileMenu, Footer, PageTransition, SmoothScroll, Cursor, Grain, StickyBookBar
    hero/         Hero
    sections/     Intro, ServiceExperience, BeforeAfter, Process, WhyLuxor, Guarantee,
                  Gallery, CeramicFeature, Reviews, BookingCTA, Contact, BookingForm, PageHeader
    ui/           Button, MagneticButton, SectionHeading, RevealText, Counter,
                  ImageReveal, BeforeAfterSlider
  data/           all editable content
  lib/            utils, motion tokens, schema, useReduced
```

## Design tokens

Defined once in `src/app/globals.css` under `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#080808` | Page background |
| `carbon` | `#0d0d0d` | Alternate section background |
| `graphite` | `#111111` | Image and input backgrounds |
| `hairline` | `#262523` | Every border |
| `bone` | `#f5f3ef` | Primary text and solid buttons |
| `ash` | `#8e8b85` | Body text |
| `smoke` | `#5d5b57` | Captions and metadata |
| `champagne` | `#c6a96b` | Small highlights only |

Type is Archivo for display and Geist Sans for everything else, both self-hosted through
`next/font` so no request leaves the origin. Corner radius is zero everywhere except the
circular cursor and the guarantee markers.
