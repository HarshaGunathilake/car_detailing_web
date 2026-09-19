import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans " +
  "text-[0.6875rem] font-semibold uppercase tracking-[0.18em] " +
  "transition-[background-color,color,border-color,transform] duration-300 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px";

const variants: Record<Variant, string> = {
  /** Bone on ink. The one primary action per view. */
  solid: "bg-bone text-ink hover:bg-champagne",
  /** Hairline stroke over photography, with its own scrim so the label stays legible. */
  outline:
    "border border-bone/35 bg-ink/30 text-bone backdrop-blur-[2px] hover:border-champagne hover:text-champagne",
  /** Sits inside dark surfaces where there is no photograph behind it. */
  quiet: "border border-hairline text-bone hover:border-champagne hover:text-champagne",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-6",
  lg: "h-14 px-8",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function Button({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const isExternal =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
