/**
 * Before and after pairs.
 * The two entries below are Luxor's own photographs, served from the existing site.
 * Replace the URLs with local files under /public once the originals are on hand.
 */
export type Transformation = {
  id: string;
  label: string;
  caption: string;
  before: string;
  after: string;
};

export const transformations: Transformation[] = [
  {
    id: "t1",
    label: "Interior restoration",
    caption: "Fabric seats and carpets shampooed, steamed and extracted.",
    before: "https://www.luxorcardetailing.com.au/images/2024/12/22/before-gallery-1.jpeg",
    after: "https://www.luxorcardetailing.com.au/images/2024/12/22/after-gallery-1.jpeg",
  },
  {
    id: "t2",
    label: "Full detail",
    caption: "A neglected vehicle returned to presentation condition.",
    before: "https://www.luxorcardetailing.com.au/images/2024/12/22/before-gallery-2.jpeg",
    after: "https://www.luxorcardetailing.com.au/images/2024/12/22/after-gallery-2.jpeg",
  },
];
