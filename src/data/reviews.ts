/**
 * ============================================================================
 * PLACEHOLDER CONTENT. NOT REAL CUSTOMER REVIEWS.
 * ----------------------------------------------------------------------------
 * Every entry below is sample copy written to exercise the layout. Replace the
 * whole array with genuine Google reviews before this site goes live, and set
 * `REVIEWS_ARE_PLACEHOLDER` to false. While that flag is true the section
 * renders a short note instead of claiming these are real customers.
 * ============================================================================
 */
export const REVIEWS_ARE_PLACEHOLDER = true;

export type Review = {
  id: string;
  quote: string;
  name: string;
  context: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    id: "r1",
    quote:
      "Booked the full detail before selling the car and ended up keeping it. The paint has not looked like that since it was new.",
    name: "Daniel Marchetti",
    context: "Full Detail & Cut and Polish",
    rating: 5,
  },
  {
    id: "r2",
    quote:
      "Two kids, three years of school runs. They got the carpets and seats back to a state I did not think was possible.",
    name: "Priya Raghavan",
    context: "Ultimate Interior Detail",
    rating: 5,
  },
  {
    id: "r3",
    quote:
      "Ceramic coating was worth every dollar. Six months on, rain still sheets straight off and a rinse is all it needs.",
    name: "Tom Whelan",
    context: "Ceramic Coating",
    rating: 5,
  },
  {
    id: "r4",
    quote:
      "Straight answers on what the paint actually needed rather than an upsell. Careful work and the car came back spotless.",
    name: "Aisha Nourbakhsh",
    context: "Exterior Detail & Cut and Polish",
    rating: 5,
  },
];
