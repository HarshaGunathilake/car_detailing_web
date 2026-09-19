export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Prepare",
    body: "Thorough preparation and removal of surface contaminants, so nothing abrasive is left on the paint before a pad touches it.",
    image: "https://images.unsplash.com/photo-1694678505383-676d78ea3b96?auto=format&fit=crop&q=80&w=1800",
    alt: "Pre-rinse and preparation stage of a detail",
  },
  {
    index: "02",
    title: "Clean",
    body: "Deep interior and exterior cleaning using professional techniques, from snow foam and contact wash to steam and extraction inside.",
    image: "https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&q=80&w=1800",
    alt: "Snow foam covering a black sports car in the workshop",
  },
  {
    index: "03",
    title: "Correct",
    body: "Paint enhancement and correction where required. Machine polishing reduces swirls and oxidation and brings clarity back to the finish.",
    image: "https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?auto=format&fit=crop&q=80&w=1800",
    alt: "Machine polishing during the correction stage",
  },
  {
    index: "04",
    title: "Protect",
    body: "Protective treatments applied to preserve the finish, from sealants through to a fully warranted ceramic coating.",
    image: "https://images.unsplash.com/photo-1708805282706-f44730b7e527?auto=format&fit=crop&q=80&w=1800",
    alt: "Protective product being applied by hand to a panel",
  },
  {
    index: "05",
    title: "Perfect",
    body: "Final inspection and presentation check under light, panel by panel, before the keys go back.",
    image: "https://images.unsplash.com/photo-1653407497540-26207a2408d7?auto=format&fit=crop&q=80&w=1800",
    alt: "Finished vehicle under workshop lighting",
  },
];
