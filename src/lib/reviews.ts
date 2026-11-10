/**
 * CLIENT TESTIMONIALS
 * ---------------------------------------------------------------------------
 * The brief asks for a testimonials section built from the studio's genuine
 * Google reviews — "real Google Maps review information and link". Neither the
 * review text nor the review link was supplied with the brief, and no verifiable
 * Stoneleigh Interiors (Bengaluru) Google Business Profile could be located.
 *
 * Rather than invent testimonials — which would misrepresent real people and
 * breach the brief's own "no fake testimonials" rule — this list is empty and
 * the homepage testimonial section is not rendered at all until it is filled.
 *
 * TO ENABLE: paste the studio's genuine, verbatim Google reviews below (name,
 * rating 1–5, review text, date, and — where the reviewer left one — the review
 * permalink), then set `reviewsSourceUrl` to the studio's Google listing. The
 * homepage section and its structured data appear automatically.
 */

export type Review = {
  /** Reviewer name exactly as published on Google. */
  author: string;
  /** 1–5. */
  rating: number;
  /** Verbatim review text. Do not paraphrase or edit a real review. */
  text: string;
  /** Publication date as shown on Google, e.g. "March 2026". */
  date: string;
  /** Optional deep link to the individual review. */
  permalink?: string;
};

/** The studio's Google Business Profile / review link. Empty until supplied. */
export const reviewsSourceUrl = "";

/** Genuine Google reviews only. Empty by design — see the note above. */
export const reviews: Review[] = [];

/** True only when there is at least one genuine review to show. */
export const hasReviews = reviews.length > 0;

/** Mean rating across the supplied reviews, rounded to one decimal place. */
export function averageRating(): number | null {
  if (!hasReviews) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
