/**
 * Every photograph on the site, by role.
 *
 * All paths are local, under `public/images/`. Nothing is loaded from a third
 * party at runtime. The files themselves are fetched once with
 * `npm run fetch:images`, which reads `scripts/image-sources.json`.
 *
 * To use a Luxor original instead, drop it into `public/images/` under the same
 * filename. No component or data change is needed.
 */
const dir = "/images";

export const images = {
  // Full-bleed and section imagery
  heroStudioCar: `${dir}/studio-black-sports-car.jpg`,
  workshopSnowFoam: `${dir}/snow-foam-black-car.jpg`,
  ceramicBeading: `${dir}/water-beading-black-panel.jpg`,
  finishedCarDusk: `${dir}/detailed-sports-car-dusk.jpg`,
  handAppliedProtection: `${dir}/hand-applied-protection.jpg`,
  correctedPaint: `${dir}/corrected-black-paint.jpg`,
  carAgainstWall: `${dir}/black-car-plain-wall.jpg`,

  // Services
  snowFoamHandWash: `${dir}/snow-foam-hand-wash.jpg`,
  leatherInterior: `${dir}/leather-interior.jpg`,
  machinePolisher: `${dir}/machine-polisher.jpg`,
  waterSheetingCoupe: `${dir}/water-sheeting-coupe.jpg`,

  // Process
  preRinse: `${dir}/pre-rinse-wash.jpg`,

  // Gallery
  cabinDashboard: `${dir}/cabin-dashboard.jpg`,
  alloyWheel: `${dir}/alloy-wheel-clean.jpg`,
  steeringWheel: `${dir}/steering-wheel.jpg`,
  beadsOnProtectedSurface: `${dir}/beads-protected-surface.jpg`,
  headlightRestored: `${dir}/headlight-restored.jpg`,
  leatherConditioned: `${dir}/leather-conditioned.jpg`,
  bonnetReflection: `${dir}/bonnet-reflection.jpg`,
  dropletsMacro: `${dir}/droplets-macro.jpg`,
  seatStitching: `${dir}/seat-stitching.jpg`,
  glossMacro: `${dir}/gloss-macro.jpg`,

  // Before and after, Luxor's own photographs
  transform1Before: `${dir}/transform-1-before.jpg`,
  transform1After: `${dir}/transform-1-after.jpg`,
  transform2Before: `${dir}/transform-2-before.jpg`,
  transform2After: `${dir}/transform-2-after.jpg`,
} as const;

export type ImageKey = keyof typeof images;
