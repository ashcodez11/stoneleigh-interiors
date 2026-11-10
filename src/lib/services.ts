import { serviceImages, type ImageAsset } from "./images";

export type Service = {
  slug: string;
  title: string;
  /** One-line promise used on cards and in navigation. */
  blurb: string;
  /** Short studio-voice description paragraphs. */
  body: string[];
  /** What the engagement typically covers. */
  scope: string[];
  image: ImageAsset;
};

/**
 * The six disciplines offered by the studio.
 * Scope lists describe the work a project typically includes — they are not
 * price commitments, guarantees or delivery promises.
 */
export const services: Service[] = [
  {
    slug: "complete-home-interiors",
    title: "Complete Home Interiors",
    blurb: "One studio, one palette, one continuous result from shell to handover.",
    body: [
      "Full-service interiors for apartments, villas and independent homes, shaped around how the household actually lives rather than a fixed style.",
      "Planning, joinery, lighting and styling are developed as a single language, so every room reads as part of the same home.",
    ],
    scope: [
      "Whole-home space planning and layouts",
      "Civil, electrical and plumbing coordination",
      "Bespoke joinery across every room",
      "Furnishing, styling and snag-free handover",
    ],
    image: serviceImages["complete-home-interiors"],
  },
  {
    slug: "living-room-design",
    title: "Living Room Design",
    blurb: "The room that sets the tone for the entire home.",
    body: [
      "Living spaces designed for everyday ease and quiet entertaining, with seating arranged to invite conversation and circulation kept clear.",
      "Lighting is layered — ambient, task and accent — so the room shifts comfortably from morning to evening.",
    ],
    scope: [
      "Seating and conversation layouts",
      "TV, display and media joinery",
      "Layered lighting schemes",
      "Rugs, art and accessory curation",
    ],
    image: serviceImages["living-room-design"],
  },
  {
    slug: "modular-kitchens",
    title: "Modular Kitchens",
    blurb: "Precision ergonomics, durable surfaces and honest storage.",
    body: [
      "Kitchens planned millimetre by millimetre around the work triangle, appliance placement and the realities of Indian cooking.",
      "Tall units and concealed pantries absorb clutter so the working surfaces stay clear.",
    ],
    scope: [
      "Ergonomic work-triangle planning",
      "Handleless, shaker and fluted shutter options",
      "Tall units, pantry and appliance housing",
      "Counter, backsplash and task lighting selection",
    ],
    image: serviceImages["modular-kitchens"],
  },
  {
    slug: "bedroom-interiors",
    title: "Bedroom Interiors",
    blurb: "Quiet, restful rooms with storage that disappears into the architecture.",
    body: [
      "Bedrooms treated as retreats, with softer palettes, tactile fabrics and lighting that dims to almost nothing.",
      "Wardrobes and bedside joinery sit flush, so the room reads as one calm surface.",
    ],
    scope: [
      "Wardrobes and walk-in storage",
      "Upholstered headboards and bed walls",
      "Bedside and study nooks",
      "Soft textiles and dimmable lighting",
    ],
    image: serviceImages["bedroom-interiors"],
  },
  {
    slug: "wardrobes-storage",
    title: "Wardrobes and Storage",
    blurb: "Bespoke joinery made to the exact millimetre of your home.",
    body: [
      "Storage designed as architecture: floor-to-ceiling, flush-fitted and detailed so it belongs to the room.",
      "Internal planning is tailored to what you actually own — hanging, folding, shoes, luggage and the seasonal overflow.",
    ],
    scope: [
      "Floor-to-ceiling wardrobe systems",
      "Walk-in dressing rooms",
      "Concealed and seasonal storage",
      "Slim pulls, fluting and internal lighting",
    ],
    image: serviceImages["wardrobes-storage"],
  },
  {
    slug: "bespoke-interior-solutions",
    title: "Bespoke Interior Solutions",
    blurb: "Considered answers to the parts of a home that standard layouts miss.",
    body: [
      "Single rooms, awkward corners, awkward proportions and interior-led renovations — scoped individually rather than forced into a package.",
      "Useful when a home is already partly built, when only one space needs rethinking, or when a detail needs to be resolved properly.",
    ],
    scope: [
      "Single-room and partial-scope projects",
      "Interior-led renovation planning",
      "Custom furniture, consoles and studies",
      "Feature walls, panelling and detailing",
    ],
    image: serviceImages["bespoke-interior-solutions"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
