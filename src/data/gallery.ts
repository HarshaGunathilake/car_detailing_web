import { images } from "./images";

export type GalleryCategory = "exterior" | "interior" | "paint" | "protection";

export const galleryFilters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "paint", label: "Paint" },
  { id: "protection", label: "Protection" },
];

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Proportion of the tile in the masonry flow. */
  span: "tall" | "wide" | "square";
};

export const gallery: GalleryItem[] = [
  { id: "g01", src: images.finishedCarDusk, alt: "Black sports car photographed after a full exterior detail", category: "exterior", span: "wide" },
  { id: "g02", src: images.cabinDashboard, alt: "Cabin interior detailed through the dashboard and console", category: "interior", span: "square" },
  { id: "g03", src: images.correctedPaint, alt: "Close detail of corrected black paintwork", category: "paint", span: "tall" },
  { id: "g04", src: images.ceramicBeading, alt: "Water beading across a ceramic coated bonnet", category: "protection", span: "square" },
  { id: "g05", src: images.alloyWheel, alt: "Alloy wheel deep cleaned down to the barrel", category: "exterior", span: "square" },
  { id: "g06", src: images.steeringWheel, alt: "Steering wheel and instrument binnacle after an interior detail", category: "interior", span: "tall" },
  { id: "g07", src: images.machinePolisher, alt: "Machine polisher working a panel during paint correction", category: "paint", span: "wide" },
  { id: "g08", src: images.beadsOnProtectedSurface, alt: "Tight water beads sitting on a freshly protected surface", category: "protection", span: "square" },
  { id: "g09", src: images.headlightRestored, alt: "Headlight and front quarter after restoration", category: "exterior", span: "square" },
  { id: "g10", src: images.leatherConditioned, alt: "Leather upholstery cleaned and conditioned", category: "interior", span: "square" },
  { id: "g11", src: images.bonnetReflection, alt: "Reflection running along a polished bonnet", category: "paint", span: "tall" },
  { id: "g12", src: images.dropletsMacro, alt: "Macro of water droplets on a protected black panel", category: "protection", span: "wide" },
  { id: "g13", src: images.carAgainstWall, alt: "Detailed black car standing against a plain wall", category: "exterior", span: "square" },
  { id: "g14", src: images.seatStitching, alt: "Seat and stitching after fabric shampoo and extraction", category: "interior", span: "square" },
  { id: "g15", src: images.glossMacro, alt: "Macro of gloss depth in corrected paintwork", category: "paint", span: "square" },
];
