import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

export function SectionHeading({
  lines,
  sub,
  align = "left",
  className,
  size = "lg",
  as = "h2",
}: {
  lines: string[];
  sub?: string;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2";
}) {
  const scale = {
    md: "text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem]",
    lg: "text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem]",
    xl: "text-[3.25rem] sm:text-[5rem] lg:text-[7rem]",
  }[size];

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <RevealText as={as} lines={lines} className={cn("display text-bone", scale)} />
      {sub && (
        <p
          className={cn(
            "mt-6 max-w-[46ch] text-[0.95rem] leading-relaxed text-ash sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
