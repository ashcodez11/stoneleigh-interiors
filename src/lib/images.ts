/**
 * CENTRAL IMAGE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every image slot on the site resolves through this file, so the studio owner
 * can replace artwork without touching page layouts.
 *
 * IMPORTANT — CONTENT STATUS
 * The studio has not yet supplied its own project photography. The photographs
 * below are therefore licence-cleared stock artwork (Pexels License — free for
 * commercial use, attribution not required), art-directed to the site's stated
 * "Terracotta & Porcelain — Warm Designer Luxury" direction: warm porcelain and
 * linen surfaces, travertine and limestone, oak and walnut, muted terracotta and
 * clay, brushed brass and soft natural daylight.
 *
 * Every image referenced by this configuration was measured for palette fit
 * (mean RGB, warmth R−B and saturation) and then taken through one house colour
 * grade so the whole library shares a single warm editorial look: a warm
 * (champagne) white balance, exposure preserved, rich brown shadows, soft
 * highlight roll-off, a touch of contrast and a normalised, natural saturation
 * band. After grading no frame is cold, blue-lit, neon, grey or saturated-red,
 * so the referenced library sits inside the colour system.
 *
 * This imagery is REPRESENTATIVE. It is not presented anywhere on the site as
 * one of Stoneleigh Interiors' completed projects. Each slot is flagged
 * `placeholder: true` so that provenance stays recorded in code, and every entry
 * in `projects.ts` carries a "Representative study" status.
 *
 * To go live with genuine photography: drop the studio's own files into
 * `/public/assets/images/...`, update `src` (and `alt`) per slot, then set
 * `placeholder: false`. Nothing else needs to change. Full source, photographer
 * and licence details for every file are recorded in
 * `public/assets/images/ATTRIBUTION.md`.
 */

export type ImageAsset = {
  /** Path inside /public. Never a hotlinked third-party URL. */
  src: string;
  /** Descriptive, human-written alt text for accessibility + SEO. */
  alt: string;
  /** Intrinsic pixel size of the stored file. */
  width: number;
  height: number;
  /**
   * true = licence-cleared stand-in artwork rather than one of the studio's own
   * photographs. Recorded for provenance; it does not alter how the image renders.
   */
  placeholder: boolean;
};

const BASE = "/assets/images";

const asset = (
  src: string,
  alt: string,
  width: number,
  height: number,
  placeholder = true,
): ImageAsset => ({ src, alt, width, height, placeholder });

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const heroImage: ImageAsset = asset(
  `${BASE}/brand/hero-stoneleigh.png`,
  "Warmly lit Stoneleigh interior in the studio's signature palette of natural textures and soft daylight",
  1024,
  1024,
  false,
);

/* -------------------------------------------------------------------------- */
/*  Pooja rooms & Indian interiors                                            */
/* -------------------------------------------------------------------------- */

/**
 * Featured sacred-space frame (homepage pooja room section).
 *
 * Supplied directly by the studio owner and used exactly as provided — it is a
 * pooja room, so it is captioned and placed as one; it is never presented as a
 * living room. See ATTRIBUTION.md for provenance.
 */
export const poojaRoomImage: ImageAsset = asset(
  `${BASE}/spaces/pooja-room.webp`,
  "Warmly lit pooja room with a carved wooden mandir, soft ambient lighting and rich timber detailing",
  2048,
  2048,
  false,
);

/* -------------------------------------------------------------------------- */
/*  Brand                                                                     */
/* -------------------------------------------------------------------------- */

export const brandImages = {
  /**
   * Portrait sibling of the introduction frame. Reserved rather than deleted: no
   * section currently consumes it, but it belongs to the same warm shoot and the
   * studio may wire it into a future panel.
   */
  introduction: asset(
    `${BASE}/brand/introduction.webp`,
    "Soft contemporary living room in warm ivory and linen tones with a natural stone floor",
    1200,
    1500,
  ),
  /** Landscape sibling used for page mastheads (About, Services). */
  introductionWide: asset(
    `${BASE}/brand/introduction-wide.webp`,
    "Open-plan living room composed around a stone feature wall and low, linen-upholstered seating",
    2400,
    1350,
  ),
  /** Portrait interior shown beside the studio story on the About page. */
  aboutInterior: asset(
    `${BASE}/brand/about-interior.webp`,
    "Warmly lit living room with oak furniture, layered ambient lighting and a muted neutral palette",
    1600,
    2133,
  ),
  /**
   * Landscape interior used for the Contact page masthead. An arched, warmly lit
   * entrance is the right note for a "come and visit the studio" page, and it is
   * the one landscape frame in the library not already carried by the carousel or
   * a project masthead — so nothing repeats between the homepage and Contact.
   */
  contactHero: asset(
    `${BASE}/projects/facade/gallery-01.webp`,
    "Arched timber entrance to a warmly lit luxury residence",
    2000,
    1375,
  ),
  /** Architectural detail — warm joinery and stair. Portrait. */
  approach: asset(
    `${BASE}/philosophy/staircase.webp`,
    "Solid timber staircase and warm joinery detail in a contemporary home interior",
    1200,
    1600,
  ),
  /** Landscape sibling used for the Projects masthead and the 404 page. */
  approachWide: asset(
    `${BASE}/philosophy/staircase-wide.webp`,
    "Contemporary living room with a low linen sofa, armchairs and layered warm lighting",
    2400,
    1350,
  ),
  /** Closing call to action — landscape. */
  finalCta: asset(
    `${BASE}/brand/introduction-wide.webp`,
    "Open-plan living room composed around a stone feature wall and low, linen-upholstered seating",
    2400,
    1350,
  ),
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export const serviceImages: Record<string, ImageAsset> = {
  "complete-home-interiors": asset(
    `${BASE}/services/complete-home-interiors.webp`,
    "Open-plan dining and kitchen zone finished in warm timber and natural stone",
    1200,
    1600,
  ),
  "living-room-design": asset(
    `${BASE}/services/living-room-interiors.webp`,
    "Living room with layered linen seating and warm ambient light",
    1200,
    1600,
  ),
  "modular-kitchens": asset(
    `${BASE}/services/modular-kitchens.webp`,
    "Modular kitchen with handleless shutters and a honed stone worktop",
    1200,
    1600,
  ),
  "bedroom-interiors": asset(
    `${BASE}/services/bedroom-interiors.webp`,
    "Master bedroom with oak-toned joinery and soft layered lighting",
    1200,
    1600,
  ),
  "wardrobes-storage": asset(
    `${BASE}/services/custom-furniture-storage.webp`,
    "Bespoke wardrobe joinery finished in a warm matte timber veneer",
    1200,
    1600,
  ),
  "bespoke-interior-solutions": asset(
    `${BASE}/services/residential-interior-design.webp`,
    "Hallway lined with linear wall panelling and concealed warm lighting",
    1200,
    1600,
  ),
};

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * One entry per case study. Each project carries a portrait frame (portfolio
 * grid), a landscape frame (full-bleed mastheads and the carousel), a tall rail
 * card and four gallery frames — all different photographs.
 *
 * A note on reuse: the library supplies a limited number of warm landscape frames,
 * so one brand slot is deliberately shared — `introductionWide` carries the About
 * and Services mastheads and the homepage closing CTA. Every other landscape slot
 * (hero, Contact masthead, Projects masthead, the six carousel frames) resolves to
 * its own photograph, so no image is repeated *within* a single page and no
 * homepage frame reappears on an inner page. Reuse disappears as soon as the
 * studio supplies its own project photography.
 */
const projectImagery = [
  {
    key: "living-room",
    heroAlt: "Living room framed by a stone accent wall and brushed metal detailing",
    heroWideAlt: "Living and dining zones combined in one warm, elegant interior",
    railAlt: "Living room with linen seating and layered ambient lighting",
    galleryAlt: [
      "Elegant living room with sculptural furniture and considered styling",
      "Cozy living room with layered pendant and cove lighting",
      "Living room furniture grouping finished in warm timber and neutral linen",
      "Generous living room with warm lighting and layered seating",
    ],
  },
  {
    key: "kitchen",
    heroAlt: "Contemporary kitchen with stone counters and warm underlit cabinetry",
    heroWideAlt: "Kitchen interior with timber-fronted units and a bright worktop",
    railAlt: "Modular kitchen with pale shutters and an integrated hob",
    galleryAlt: [
      "Contemporary kitchen with a dining table set alongside the cooking zone",
      "Kitchen interior with handleless shutters and a stone worktop",
      "Beige timber kitchen cupboards with a soft matte finish",
      "Renovated kitchen with warm cabinetry and task lighting",
    ],
  },
  {
    key: "bedroom",
    heroAlt: "Master bedroom with warm timber joinery and soft diffused daylight",
    heroWideAlt: "Serene bedroom with an upholstered bed wall and warm cove lighting",
    railAlt: "Bedroom in beige tones with a patterned upholstered headboard",
    galleryAlt: [
      "Bedroom interior with layered bedside lighting and timber flooring",
      "Bedroom with plush upholstered furnishings and soft ambient light",
      "Bedroom with a feature headboard and warm ambient light",
      "Master bedroom with a soft neutral palette and considered storage",
    ],
  },
  {
    key: "dining",
    heroAlt: "Dining room with a sculptural table and statement lighting",
    heroWideAlt: "Dining room laid for a meal with a composed table setting",
    railAlt: "Dining room with sculpted chairs and a slim pendant",
    galleryAlt: [
      "Elegant dining room with upholstered seating and restrained decor",
      "Contemporary dining room with warm timber and muted walls",
      "Bright dining area with vintage chairs and a pale palette",
      "Dining room with timber furniture beside tall windows",
    ],
  },
  {
    key: "apartment",
    heroAlt: "Luxurious open living and dining space with ambient lighting",
    heroWideAlt: "Entry to a luxury residence with stone floors and soft lighting",
    railAlt: "Compact apartment interior combining kitchen, dining and living zones",
    galleryAlt: [
      "Contemporary apartment interior with restrained, warm finishes",
      "Study corner lit by a large sunlit window",
      "Hallway lined with timber panelling and concealed lighting",
      "Main entrance with a solid timber door",
    ],
  },
  {
    key: "storage",
    heroAlt: "Walk-in wardrobe with timber cabinetry and even, warm lighting",
    heroWideAlt: "Contemporary walk-in wardrobe in warm timber with ambient lighting",
    railAlt: "Timber-panelled walk-in wardrobe with integrated storage",
    galleryAlt: [
      "Detail of turned timber furniture legs on a joiner's workbench",
      "Coats hanging on wall hooks beside wardrobe storage",
      "Open wardrobe with organised shelving, shoe storage and a coat rail",
      "Walk-in wardrobe with timber shelving and softly lit hanging space",
    ],
  },
] as const;

export type ProjectImageKey = (typeof projectImagery)[number]["key"];

function imageryFor(key: string) {
  const found = projectImagery.find((p) => p.key === key);
  if (!found) throw new Error(`Unknown project image slot: ${key}`);
  return found;
}

/** Portrait frame — portfolio grid cards. */
export function projectHero(key: string): ImageAsset {
  const imagery = imageryFor(key);
  return asset(`${BASE}/projects/${key}/hero.webp`, imagery.heroAlt, 1200, 1500);
}

/** Landscape frame — full-bleed mastheads and the homepage carousel. */
export function projectHeroWide(key: string): ImageAsset {
  const imagery = imageryFor(key);
  return asset(`${BASE}/projects/${key}/hero-wide.webp`, imagery.heroWideAlt, 2400, 1350);
}

/** Gallery frames — index 0 is the wide feature tile, 1–3 are portrait. */
export function projectGallery(key: string, index: number): ImageAsset {
  const imagery = imageryFor(key);
  const slot = index % 4;
  const wide = slot === 0;
  return asset(
    `${BASE}/projects/${key}/gallery-0${slot + 1}.webp`,
    imagery.galleryAlt[slot],
    wide ? 2000 : 1200,
    wide ? 1375 : 1500,
  );
}

/** Tall rail card image. */
export function projectRailImage(key: ProjectImageKey | string): ImageAsset {
  const imagery = imageryFor(key);
  return asset(`${BASE}/projects/${key}/rail.webp`, imagery.railAlt, 900, 1800);
}

/* -------------------------------------------------------------------------- */
/*  Studio                                                                    */
/* -------------------------------------------------------------------------- */

export const teamImages = {
  /**
   * Awaiting the studio's genuine team photograph.
   * No stock or synthetic portrait is presented as a real person here — this is
   * a people-free materials study used purely as a stand-in.
   */
  placeholder: asset(
    `${BASE}/brand/team-pending.webp`,
    "Flat lay of fabric samples and hand sketches on a studio worktable",
    1600,
    1000,
  ),
};

/* -------------------------------------------------------------------------- */
/*  Social sharing                                                            */
/* -------------------------------------------------------------------------- */

export const socialImages = {
  home: asset(
    `${BASE}/social/og-home.webp`,
    "Living room with modern furniture, timber flooring and ambient lighting",
    1200,
    630,
  ),
};
