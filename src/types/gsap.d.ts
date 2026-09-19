// gsap ships its declarations only for the package root, so the per-plugin
// entry points need mapping back to them.
declare module "gsap/ScrollTrigger" {
  export * from "gsap";
  export { ScrollTrigger as default } from "gsap";
}
