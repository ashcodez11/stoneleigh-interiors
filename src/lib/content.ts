/** Editorial + structural content that is not project- or service-specific. */

export type ApproachPoint = {
  title: string;
  summary: string;
  body: string;
};

/**
 * The six commitments behind every Stoneleigh project (homepage Section E).
 * Described as method, not as a guarantee of outcome.
 */
export const approachPoints: ApproachPoint[] = [
  {
    title: "Personalised Design",
    summary: "A home shaped around one household, never a template.",
    body: "We begin with how you live — the routines, the possessions, the way you host — and design from that brief rather than from a look we have used before.",
  },
  {
    title: "Thoughtful Space Planning",
    summary: "Layout first; everything else follows.",
    body: "Circulation, daylight and storage are resolved on paper before a single finish is chosen, so the plan works long after the styling has been lived in.",
  },
  {
    title: "Considered Material Selection",
    summary: "Surfaces chosen in person, reviewed under real light.",
    body: "Stone, timber, plaster and textile are selected together as one palette, so the rooms hold together and the finishes age honestly.",
  },
  {
    title: "Craftsmanship",
    summary: "Joinery detailed before it reaches the workshop.",
    body: "Every unit is resolved to millimetre-accurate shop drawings — shadow gaps, edge thicknesses and junctions decided in advance, not improvised on site.",
  },
  {
    title: "Quality Execution",
    summary: "One accountable team, supervised on site.",
    body: "Work is sequenced and inspected against the drawings at each stage, with the trades coordinated under a single point of responsibility.",
  },
  {
    title: "Attention to Detail",
    summary: "The last five percent, treated as the whole job.",
    body: "Aligned switch plates, flush skirting, consistent reveals and a documented snag walk-through before handover — the details that decide how a home feels.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    summary: "We learn how you live before we draw a single line.",
    detail:
      "A conversation about routines, possessions and hosting habits, followed by a survey of the space and a record of the light through the day.",
  },
  {
    number: "02",
    title: "Concept",
    summary: "The idea that will hold the whole project together.",
    detail:
      "We translate the brief into a concept — planning strategy, material direction and a consistent mood — and agree it with you before developing further.",
  },
  {
    number: "03",
    title: "Design Development",
    summary: "Drawings, elevations and views you can actually read.",
    detail:
      "Layouts, joinery elevations, lighting plans and photorealistic views, iterated until nothing is left to be improvised on site.",
  },
  {
    number: "04",
    title: "Material Selection",
    summary: "Surfaces chosen in person, not from a screen.",
    detail:
      "Guided selection of stone, timber, laminate, veneer, paint and textiles, reviewed together under real light so the palette is decided with confidence.",
  },
  {
    number: "05",
    title: "Execution",
    summary: "One accountable team, supervised on site.",
    detail:
      "Work is sequenced and inspected against the drawings, with joinery produced to millimetre-accurate shop drawings and the trades coordinated throughout.",
  },
  {
    number: "06",
    title: "Handover",
    summary: "A finished home, styled and snag-listed.",
    detail:
      "Final finishing and styling, a documented snag walk-through, and a care guide for the materials we have used.",
  },
];

export type Faq = { question: string; answer: string };

/**
 * Answers are limited to what the studio has confirmed. Pricing, timelines and
 * delivery guarantees are deliberately not stated — they depend on scope and are
 * discussed directly.
 */
export const faqs: Faq[] = [
  {
    question: "What services does Stoneleigh Interiors offer?",
    answer:
      "The studio designs complete home interiors, living rooms, modular kitchens, bedrooms, and bespoke wardrobes and storage, alongside individual bespoke interior solutions for single rooms or partial scopes. See the Services page for what each engagement typically covers.",
  },
  {
    question: "What does the design process look like?",
    answer:
      "Every project moves through six stages — consultation, concept, design development, material selection, execution and handover. You see and approve the direction at each stage, and nothing is improvised on site.",
  },
  {
    question: "Can the design be customised to my home and my requirements?",
    answer:
      "Yes. Nothing is drawn from a fixed template. Layouts, joinery and material palettes are developed specifically for your space, your household and the way you use it.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "Send an enquiry through the contact form with a little detail about your space and what you would like to change. We will reply to arrange an initial conversation, and a site visit where it makes sense.",
  },
  {
    question: "What materials and finishes do you work with?",
    answer:
      "Natural stone and quartz surfaces, timber veneer and solid timber, laminates, lime and gypsum finishes, and a range of textiles. Material and finish options are reviewed together during selection, so the palette is decided with the real samples in hand.",
  },
  {
    question: "How do I get in touch with the studio?",
    answer:
      "Use the enquiry form on the Contact page — it reaches the studio directly. The studio's registered address is also listed there, with directions available on Google Maps.",
  },
];
