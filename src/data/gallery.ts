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
  /** Tile span on the desktop masonry grid. */
  span: "tall" | "wide" | "square";
};

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const gallery: GalleryItem[] = [
  { id: "g01", src: u("photo-1626002595481-688505bc19ba", 1800), alt: "Black sports car photographed after a full exterior detail", category: "exterior", span: "wide" },
  { id: "g02", src: u("photo-1605437241278-c1806d14a4d9"), alt: "Cabin interior detailed through the dashboard and console", category: "interior", span: "square" },
  { id: "g03", src: u("photo-1526459915562-c5ca724b1d02"), alt: "Close detail of corrected black paintwork", category: "paint", span: "tall" },
  { id: "g04", src: u("photo-1550565076-b2371ea1a324"), alt: "Water beading across a ceramic coated bonnet", category: "protection", span: "square" },
  { id: "g05", src: u("photo-1565689876697-e467b6c54da2"), alt: "Alloy wheel deep cleaned down to the barrel", category: "exterior", span: "square" },
  { id: "g06", src: u("photo-1502014335594-c026800f24ee"), alt: "Steering wheel and instrument binnacle after an interior detail", category: "interior", span: "tall" },
  { id: "g07", src: u("photo-1620584898989-d39f7f9ed1b7"), alt: "Machine polisher working a panel during paint correction", category: "paint", span: "wide" },
  { id: "g08", src: u("photo-1665434009255-92af2b6b44f9"), alt: "Tight water beads sitting on a freshly protected surface", category: "protection", span: "square" },
  { id: "g09", src: u("photo-1618642542397-ef97a739f1d7"), alt: "Headlight and front quarter after restoration", category: "exterior", span: "square" },
  { id: "g10", src: u("photo-1519120433933-22bc753101f3"), alt: "Leather upholstery cleaned and conditioned", category: "interior", span: "square" },
  { id: "g11", src: u("photo-1773236321529-fe13541e95f2"), alt: "Reflection running along a polished bonnet", category: "paint", span: "tall" },
  { id: "g12", src: u("photo-1608382247609-7078eb3f9108"), alt: "Macro of water droplets on a protected black panel", category: "protection", span: "wide" },
  { id: "g13", src: u("photo-1609521233053-345bfa8b6f17"), alt: "Detailed black car standing against a plain wall", category: "exterior", span: "square" },
  { id: "g14", src: u("photo-1614273444704-26eb9f90d1e7"), alt: "Seat and stitching after fabric shampoo and extraction", category: "interior", span: "square" },
  { id: "g15", src: u("photo-1567410508636-da81b03875a7"), alt: "Macro of gloss depth in corrected paintwork", category: "paint", span: "square" },
];
