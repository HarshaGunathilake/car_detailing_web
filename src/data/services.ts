import { images } from "./images";

/**
 * Source of truth for every service, inclusion and price.
 * Content mirrors luxorcardetailing.com.au. Edit here, never in components.
 */

export type VehicleClass = "hatch" | "suv" | "large";

export const vehicleClasses: { id: VehicleClass; label: string; short: string }[] = [
  { id: "hatch", label: "Hatchbacks & Sedans", short: "Hatch / Sedan" },
  { id: "suv", label: "Small SUVs & Wagons", short: "Small SUV / Wagon" },
  { id: "large", label: "Large SUVs, 4WDs & 7 Seaters", short: "Large SUV / 4WD" },
];

export type InclusionGroup = {
  title?: string;
  items: string[];
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  summary: string;
  detail: string;
  fromPrice: number;
  prices: Record<VehicleClass, number>;
  groups: InclusionGroup[];
  note?: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "mini-detail",
    index: "01",
    name: "Interior & Exterior Mini Detail",
    shortName: "Mini Detail",
    summary: "A complete reset, inside and out, in a single visit.",
    detail:
      "The maintenance detail. A safe contact wash, light decontamination and a hand-applied polish outside, paired with a full vacuum and surface clean inside. The right choice for a car that is already looked after.",
    fromPrice: 160,
    prices: { hatch: 160, suv: 180, large: 210 },
    groups: [
      {
        title: "Exterior refresh",
        items: [
          "Deep clean of rims, tyres and inner guards",
          "Safe contact wash using premium pH-balanced products",
          "Removal of light surface contaminants with clay treatment",
          "Paintwork enhancement using a hand-applied polish",
          "Protective paint sealant for added shine and protection",
          "Cleaning of door openings, boot surrounds and fuel filler area",
          "Streak-free cleaning of all exterior glass",
          "Tyre conditioning for a rich, clean finish",
          "Final wipe-down and presentation check",
        ],
      },
      {
        title: "Interior refresh",
        items: [
          "Thorough vacuum of cabin, luggage area and floor coverings",
          "Cleaning of dashboard, console, door trims and interior panels",
          "Dust and debris removed from vents, crevices and storage areas",
          "Interior glass polished for maximum visibility",
          "Surface treatment applied to restore a clean natural look",
          "Light deodorising treatment to freshen the cabin",
          "Final inspection to ensure a tidy finish",
        ],
      },
    ],
    note: "Additional fees may apply for excessive dirt build-up, sand, pet hair, stains or vehicles requiring extra time and attention.",
    image: images.snowFoamHandWash,
    imageAlt: "Car covered in snow foam during a hand wash",
  },
  {
    slug: "interior-detail",
    index: "02",
    name: "Ultimate Interior Detail",
    shortName: "Interior Detail",
    summary: "Every surface inside the cabin, cleaned back to new.",
    detail:
      "Steam, shampoo and extraction across seats, carpets and cargo area. Leather cleaned and conditioned, trims rejuvenated, vents and seat rails detailed by hand. The service that changes how a car feels to sit in.",
    fromPrice: 250,
    prices: { hatch: 250, suv: 270, large: 290 },
    groups: [
      {
        items: [
          "Comprehensive wipe-down of all interior surfaces",
          "Detailed vacuum of seats, carpets, floor mats, boot area and hard-to-reach sections",
          "Deep shampoo and steam cleaning of fabric seats, carpets, mats and cargo area",
          "Leather seating cleaned and conditioned (where applicable)",
          "Dashboard, centre console, door trims and plastic surfaces cleaned and rejuvenated",
          "Air vents, seat tracks, cup holders and sun visors thoroughly detailed",
          "Pedals cleaned and sanitised",
          "Interior glass and mirrors cleaned to a crystal-clear finish",
          "Interior deodorising treatment to leave the cabin smelling fresh",
        ],
      },
    ],
    image: images.leatherInterior,
    imageAlt: "Detailed modern car interior with leather seats",
  },
  {
    slug: "cut-and-polish",
    index: "03",
    name: "Exterior Detail & Cut and Polish",
    shortName: "Cut & Polish",
    summary: "Machine correction that brings depth back to the paint.",
    detail:
      "Chemical and mechanical decontamination followed by a single-stage machine polish. Light swirl marks and minor defects are reduced, clarity and colour depth return, and the finish is sealed and dressed.",
    fromPrice: 250,
    prices: { hatch: 250, suv: 280, large: 310 },
    groups: [
      {
        title: "Wash and decontamination",
        items: [
          "Thorough pre-wash rinse to remove loose dirt and debris",
          "Removal of bug residue, road grime and tar contamination where required",
          "Deep cleaning of wheels, tyres and wheel wells",
          "Door shuts, boot surrounds and fuel flap area pressure cleaned and dried",
          "Snow foam application followed by a safe hand wash",
          "Chemical and mechanical paint decontamination to remove embedded contaminants",
        ],
      },
      {
        title: "Single-stage cut & polish",
        items: [
          "Machine polish to reduce light swirl marks and minor paint imperfections",
          "Improves paint clarity, depth and overall gloss",
          "Enhances colour richness and restores shine",
          "Helps minimise the appearance of light scratches and oxidation",
        ],
      },
      {
        title: "Finishing",
        items: [
          "Exterior plastics and rubber trims dressed and protected",
          "Glass and mirrors cleaned for a streak-free finish",
          "Tyres, wheel arches and mud flaps dressed for a clean, satin appearance",
        ],
      },
    ],
    image: images.machinePolisher,
    imageAlt: "Dual action machine polisher used on vehicle paintwork",
  },
  {
    slug: "full-detail",
    index: "04",
    name: "Premium Full Detail & Cut & Polish",
    shortName: "Full Detail",
    summary: "The complete treatment. Corrected paint, restored cabin.",
    detail:
      "Everything in the exterior detail and cut & polish, combined with the full interior programme. One booking, one vehicle, taken as far as a detail goes short of coating.",
    fromPrice: 400,
    prices: { hatch: 400, suv: 450, large: 480 },
    groups: [
      {
        title: "Exterior",
        items: [
          "Pre-wash rinse, bug and tar removal, wheel and arch cleaning",
          "Snow foam application followed by a safe hand wash",
          "Chemical and mechanical paint decontamination",
          "Single-stage machine cut & polish for clarity, depth and gloss",
          "Trim dressing, glass cleaning and tyre finishing",
        ],
      },
      {
        title: "Interior",
        items: [
          "Comprehensive wipe-down and detailed vacuum throughout",
          "Deep shampoo and steam cleaning of fabrics, carpets and cargo area",
          "Leather cleaned and conditioned (where applicable)",
          "Dashboard, console, trims, vents and seat rails detailed",
          "Interior glass cleaned and deodorising treatment applied",
        ],
      },
    ],
    image: images.waterSheetingCoupe,
    imageAlt: "Water sheeting off the panels of a freshly detailed black coupe",
  },
  {
    slug: "ceramic-coating",
    index: "05",
    name: "Ceramic Coating",
    shortName: "Ceramic Coating",
    summary: "Five year warranted protection over corrected paint.",
    detail:
      "Advanced ceramic protection designed to enhance gloss, improve hydrophobic performance and help protect your vehicle's paint from everyday environmental contaminants. Applied only over fully decontaminated and machine-corrected paint.",
    fromPrice: 900,
    prices: { hatch: 900, suv: 1100, large: 1400 },
    groups: [
      {
        title: "Paint preparation",
        items: [
          "Complete exterior decontamination wash",
          "Wheels, tyres and wheel arches deep cleaned",
          "Iron remover treatment to eliminate embedded contaminants",
          "Clay bar treatment for an ultra-smooth paint surface",
          "Machine paint correction to enhance gloss and clarity",
          "Reduction of light swirl marks and minor paint defects",
          "Paintwork prepared to ensure maximum coating bonding",
        ],
      },
      {
        title: "Ceramic protection",
        items: [
          "Professional-grade ceramic coating applied to all painted surfaces",
          "Intense gloss enhancement and colour depth",
          "Advanced hydrophobic protection for superior water beading",
          "Protection against UV rays, oxidation, bird droppings and environmental contaminants",
          "Easier vehicle cleaning and maintenance",
          "Long-lasting paint protection and shine",
        ],
      },
      {
        title: "Finishing and warranty",
        items: [
          "Exterior glass cleaned and polished",
          "Tyres dressed for a premium finish",
          "Final quality inspection",
          "5-year ceramic coating warranty",
          "Warranty-backed protection against premature coating failure",
          "Ongoing support and maintenance advice to maximise coating performance",
        ],
      },
    ],
    note: "Warranty is subject to proper vehicle care and recommended maintenance procedures.",
    image: images.ceramicBeading,
    imageAlt: "Water beading tightly on a ceramic coated black panel",
    featured: true,
  },
];

export const ceramicBenefits = [
  { title: "UV protection", body: "Helps shield paint from oxidation and sun fade." },
  { title: "Hydrophobic finish", body: "Water lifts contaminants away instead of sitting on the panel." },
  { title: "Enhanced gloss", body: "Deeper colour and a harder, clearer reflection." },
  { title: "Easier maintenance", body: "Dirt releases faster, so washing takes less time." },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
