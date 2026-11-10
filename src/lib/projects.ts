/**
 * CASE STUDY DATA
 * ---------------------------------------------------------------------------
 * IMPORTANT — CONTENT STATUS
 * The studio has not yet supplied verified project names, addresses, completion
 * dates, carpet areas or specifications. Nothing here is invented.
 *
 * Each entry is a discipline-based study located in the studio's verified
 * service city (Bengaluru, Karnataka) and is flagged `representative: true`.
 * The UI renders a discreet "Representative study" label for flagged entries,
 * and the Projects page states the position plainly in copy.
 *
 * When the client supplies real project data, replace the fields and set
 * `representative: false` — the layouts update automatically.
 */

import {
  projectHero,
  projectHeroWide,
  projectGallery,
  projectRailImage,
  type ImageAsset,
} from "./images";

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Real service city — not a fabricated project address. */
  location: string;
  /** The design idea, in one sentence. */
  concept: string;
  summary: string;
  description: string[];
  /** Material palette considered for the space. */
  materials: string[];
  /** The design details the study focuses on. */
  focus: string[];
  /** Portrait frame — portfolio grid cards. */
  hero: ImageAsset;
  /** Landscape frame — full-bleed mastheads and the homepage carousel. */
  heroWide: ImageAsset;
  gallery: ImageAsset[];
  rail: ImageAsset;
  /** true = representative study awaiting the studio's verified project details. */
  representative: boolean;
};

type Seed = {
  slug: string;
  title: string;
  category: string;
  concept: string;
  summary: string;
  description: string[];
  materials: string[];
  focus: string[];
};

const seeds: Seed[] = [
  {
    slug: "living-room",
    title: "The Living Room as Centre",
    category: "Living Room",
    concept:
      "A generous living space organised around light, conversation and quiet material contrast.",
    summary:
      "A living room planned so that daylight, seating and circulation resolve as one idea — warm and calm, never showy.",
    description: [
      "Planning begins with the light: the primary seating faces the daylight rather than the wall, so the room is comfortable at every hour.",
      "Contrast is held to a minimum — a honed stone surface against soft linen, with a single darker timber note to anchor the composition.",
    ],
    materials: ["Honed limestone", "Ivory lime plaster", "Natural linen", "Warm oak veneer"],
    focus: [
      "Seating and circulation planning",
      "Media and display joinery",
      "Layered ambient and accent lighting",
      "Textile and rug curation",
    ],
  },
  {
    slug: "kitchen",
    title: "A Kitchen Planned to Work",
    category: "Modular Kitchen",
    concept:
      "A handleless kitchen planned around ergonomics, honest storage and durable natural stone.",
    summary:
      "Every movement shortened and made deliberate — the result of planning from the work triangle outward.",
    description: [
      "The layout starts at the work triangle, so the distance between sink, hob and refrigerator stays short and uninterrupted.",
      "Tall units and a concealed pantry absorb the clutter that usually colonises a worktop, leaving the stone surfaces clear.",
    ],
    materials: ["Honed quartzite counters", "Matte laminate shutters", "Brushed metal hardware", "Full-height pantry carcass"],
    focus: [
      "Work-triangle planning",
      "Handleless shutter detail",
      "Tall units and concealed pantry",
      "Task lighting at the counter",
    ],
  },
  {
    slug: "bedroom",
    title: "A Bedroom That Settles",
    category: "Bedroom",
    concept:
      "A restful bedroom with storage detailed to disappear into the architecture of the room.",
    summary:
      "The palette softens, the joinery goes flush, and the lighting is designed to fade to nothing.",
    description: [
      "Wardrobes and bedside joinery are set flush with the wall plane, so the room reads as a single calm surface rather than a series of boxes.",
      "Light is layered in three steps — a soft wash, a reading pool at each side, and a low night setting — all dimmable to near-black.",
    ],
    materials: ["Ivory micro-topping", "Boucle and washed linen", "Warm oak joinery", "Brushed metal hardware"],
    focus: [
      "Flush floor-to-ceiling wardrobes",
      "Upholstered bed wall",
      "Dimmable three-layer lighting",
      "Soft acoustic textiles",
    ],
  },
  {
    slug: "dining",
    title: "A Table Worth Gathering Around",
    category: "Dining",
    concept:
      "An intimate dining room anchored by a solid timber table and a single well-proportioned pendant.",
    summary:
      "The pendant is sized to the table so the light lands on the surface, and the room borrows depth without visual weight.",
    description: [
      "The pendant is scaled to the tabletop, so light falls on the surface below rather than into the room's centre.",
      "A mirrored panel borrows depth from the adjacent space, adding generosity to a compact footprint.",
    ],
    materials: ["Solid oak table", "Muted taupe plaster", "Smoked mirror panel", "Linen-upholstered seating"],
    focus: [
      "Table and seating scale",
      "Pendant lighting design",
      "Buffet and crockery joinery",
      "Mirror feature wall",
    ],
  },
  {
    slug: "apartment",
    title: "One Palette, Whole Home",
    category: "Complete Home",
    concept:
      "An apartment joined by a single continuous material palette from the entrance to the last room.",
    summary:
      "The same stone, timber and plaster run through every space, so an open-plan layout reads as one considered whole.",
    description: [
      "A limited palette repeats from the entrance hall through the living, dining and bedroom zones, giving an open plan a sense of continuity.",
      "Storage is distributed along the walls as joinery, freeing the centre of the plan for light and movement.",
    ],
    materials: ["Continuous stone flooring", "Warm oak veneer", "Ivory lime plaster", "Textured linen"],
    focus: [
      "Open-plan planning",
      "Continuous material palette",
      "Wall-distributed storage",
      "Entrance and threshold detailing",
    ],
  },
  {
    slug: "storage",
    title: "Storage Without Weight",
    category: "Wardrobes and Storage",
    concept:
      "Floor-to-ceiling bespoke storage in warm timber, detailed so it reads as part of the room.",
    summary:
      "Storage treated as architecture — flush-fitted, internally planned and quiet in the way it meets the ceiling and floor.",
    description: [
      "Units run floor to ceiling with shadow-gap detailing instead of heavy cornice, so the joinery does not interrupt the room.",
      "Internal planning follows what the household actually owns: long-hang, short-hang, shoe trays, luggage and the seasonal overflow.",
    ],
    materials: ["Warm timber veneer", "Fluted front detail", "Slim brushed pulls", "Integrated warm LED"],
    focus: [
      "Floor-to-ceiling wardrobe systems",
      "Walk-in dressing room planning",
      "Concealed and seasonal storage",
      "Interior lighting and pull detailing",
    ],
  },
];

export const projects: Project[] = seeds.map((seed) => ({
  slug: seed.slug,
  title: seed.title,
  category: seed.category,
  concept: seed.concept,
  summary: seed.summary,
  description: seed.description,
  materials: seed.materials,
  focus: seed.focus,
  location: "Bengaluru, Karnataka",
  hero: projectHero(seed.slug),
  heroWide: projectHeroWide(seed.slug),
  gallery: [0, 1, 2, 3].map((i) => projectGallery(seed.slug, i)),
  rail: projectRailImage(seed.slug),
  representative: true,
}));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Ordered list used for "next project" navigation on case-study pages. */
export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
