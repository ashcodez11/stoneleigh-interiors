/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Anything the studio owner may need to change later lives here.
 *
 * CONTENT STATUS — read before launch
 * Supplied by the client in the brief:
 *   · business name
 *   · the full registered address
 * Values that have NOT been supplied are left deliberately empty. Nothing is
 * invented: no phone number, no email, no WhatsApp number, no Instagram URL and
 * no analytics ID is guessed. Each empty value is documented in `README.md`
 * under "Client input required before launch", and the UI degrades gracefully
 * (e.g. the Instagram affordance is hidden rather than pointed somewhere wrong).
 */

/** The full address is the only piece of contact information the client supplied. */
const ADDRESS = {
  line1: "1st Floor, Trinity Square, No. 385/1",
  line2: "ITPL Main Road, Lakshminarayana Pura",
  area: "AECS Layout, Munnekolala",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560037",
  country: "India",
  countryCode: "IN",
} as const;

const ADDRESS_FULL = [
  ADDRESS.line1,
  ADDRESS.line2,
  ADDRESS.area,
  `${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
  ADDRESS.country,
].join(", ");

/**
 * A working Google Maps deep link built from the supplied address.
 * This is a search/directions query — not a fabricated listing URL.
 */
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS_FULL,
)}`;

export const site = {
  name: "Stoneleigh Interiors",
  shortName: "Stoneleigh",
  tagline: "Spaces Crafted Around the Art of Living.",
  description:
    "Stoneleigh Interiors is a bespoke interior design studio in Bengaluru — crafting complete home interiors, living rooms, modular kitchens, bedrooms and wardrobes with warm materials, considered planning and quiet, lasting detail.",

  /**
   * TODO(client): confirm the production domain before launch.
   * Used for canonical URLs, Open Graph tags, the sitemap and robots.txt.
   */
  url: "https://www.stoneleighinteriors.com",
  locale: "en_IN",

  address: {
    ...ADDRESS,
    full: ADDRESS_FULL,
    /** Short, human-readable form for footers and cards. */
    short: `${ADDRESS.area}, ${ADDRESS.city}`,
  },

  /** Returns a Google Maps directions link for the studio address. */
  mapsDirectionsUrl: MAPS_DIRECTIONS,

  social: {
    /**
     * TODO(client): the Instagram profile URL was referenced in the brief but not
     * supplied. Left empty on purpose — the Instagram affordances stay hidden
     * until a real, verified profile URL is provided.
     */
    instagram: "",
    /**
     * TODO(client): a Google Business Profile / review link was referenced but not
     * supplied. Google reviews are therefore not displayed (see `lib/reviews.ts`),
     * and this directions link is the verified Google destination we do have.
     */
    googleMaps: MAPS_DIRECTIONS,
    /**
     * TODO(client): the Google Business Profile review URL has not been supplied,
     * so the "Read Google reviews" affordance stays hidden rather than pointing at
     * a guessed listing. Add the profile URL here once it is available.
     */
    googleReview: "",
  },

  /**
   * TODO(client): awaiting confirmation — intentionally empty.
   * Until these are supplied, the enquiry form is the primary route and the
   * WhatsApp affordances stay hidden rather than linking to a guessed number.
   */
  contact: {
    phone: "",
    whatsapp: "",
    email: "",
  },

  /**
   * TODO(client): a reply-time expectation is allowed "only if approved".
   * None has been agreed, so this stays empty and every affordance that would
   * show it stays hidden — we do not promise a response time the studio has
   * not committed to. Fill this in once confirmed and it appears automatically.
   */
  responseExpectation: "",

  /**
   * Google Analytics 4 — configured through an environment variable and loaded
   * only after the visitor consents to analytics cookies (see CookieConsent).
   */
  analytics: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Builds a WhatsApp deep link when a number has been supplied.
 * Returns `null` when the studio has not provided a number, so the UI falls back
 * to the enquiry form instead of linking to an invented phone number.
 */
export function whatsappLink(message?: string): string | null {
  const number = String(site.contact.whatsapp).replace(/[^\d]/g, "");
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

/** The wordmark lines used by the header and footer (no logo file was supplied). */
export const wordmark = {
  first: "Stoneleigh",
  second: "Interiors",
} as const;

export type NavLink = (typeof navLinks)[number];
