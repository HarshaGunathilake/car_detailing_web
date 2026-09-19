import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";

export function PageHeader({
  eyebrow,
  lines,
  intro,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  lines: string[];
  intro?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/85" />

      <div className="shell relative flex min-h-[62vh] flex-col justify-end pb-16 pt-32 md:min-h-[70vh] md:pb-20">
        {eyebrow && <p className="label text-champagne">{eyebrow}</p>}
        <RevealText
          as="h1"
          lines={lines}
          className="display mt-5 max-w-[16ch] text-[2.75rem] text-bone sm:text-[4.5rem] lg:text-[6rem]"
        />
        {intro && (
          <p className="mt-6 max-w-[52ch] text-[0.975rem] leading-relaxed text-ash sm:text-base">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
