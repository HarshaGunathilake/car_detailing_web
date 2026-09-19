import { images } from "./images";

/**
 * Before and after pairs. Both are Luxor's own photographs, stored locally.
 * Swap in higher-resolution originals under the same filenames when available.
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
    before: images.transform1Before,
    after: images.transform1After,
  },
  {
    id: "t2",
    label: "Full detail",
    caption: "A neglected vehicle returned to presentation condition.",
    before: images.transform2Before,
    after: images.transform2After,
  },
];
