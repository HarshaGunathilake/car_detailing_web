import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-32">
      <div className="shell">
        <p className="label text-champagne">404</p>
        <h1 className="display mt-5 max-w-[16ch] text-[2.5rem] text-bone sm:text-[4rem]">
          That page has been detailed away.
        </h1>
        <p className="mt-5 max-w-[44ch] text-[0.95rem] leading-relaxed text-ash">
          The link may be out of date. Start again from the home page, or head straight to the
          services and pricing.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="md" className="px-8">
            Back home
          </Button>
          <Button href="/services" variant="quiet" size="md" className="px-8">
            Services
          </Button>
        </div>
      </div>
    </section>
  );
}
