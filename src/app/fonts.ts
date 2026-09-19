import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

/** Display face. Tight industrial grotesque, used for headings only. */
export const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["Arial Narrow", "Helvetica Neue", "sans-serif"],
});

export const sans = GeistSans;
