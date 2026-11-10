import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Star } from "@/components/ui/icons";
import { averageRating, hasReviews, reviews, reviewsSourceUrl } from "@/lib/reviews";

/**
 * Section G — Client testimonials.
 *
 * Renders only genuine Google reviews. No review text, reviewer name or
 * aggregate rating was supplied with the brief, so `lib/reviews.ts` is empty
 * and this section returns `null` — an empty testimonials band would be worse
 * than none, and inventing reviews would misrepresent real people.
 *
 * The moment genuine reviews are added to `lib/reviews.ts`, this section and
 * its rating summary appear automatically.
 */
export function Testimonials() {
  if (!hasReviews) return null;

  const average = averageRating();

  return (
    <section
      className="section bg-charcoal-deep"
      aria-label="Client testimonials"
    >
      <div className="container-luxe">
        <SectionHeading
          tone="light"
          eyebrow="Client Testimonials"
          title={
            <>
              In their <em className="italic text-stone">words</em>
            </>
          }
          lede={
            average
              ? `Rated ${average} out of 5 across ${reviews.length} published Google review${
                  reviews.length === 1 ? "" : "s"
                }.`
              : undefined
          }
          className="max-w-2xl"
        />

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={`${review.author}-${review.date}`}>
              <Reveal>
                <figure className="flex h-full flex-col border-t border-ivory/15 pt-7">
                  <span className="flex items-center gap-1" aria-hidden>
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 text-stone" />
                    ))}
                  </span>
                  <span className="sr-only">{review.rating} out of 5 stars</span>

                  <blockquote className="mt-5 flex-1">
                    <p className="font-serif text-xl leading-snug text-ivory/90">
                      {review.text}
                    </p>
                  </blockquote>

                  <figcaption className="mt-6 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/50">
                    {review.permalink ? (
                      <a
                        href={review.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-ivory/70"
                      >
                        {review.author}
                      </a>
                    ) : (
                      review.author
                    )}
                    <span className="mx-2">·</span>
                    {review.date}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        {reviewsSourceUrl && (
          <p className="mt-12 text-xs text-ivory/45">
            Reviews shown verbatim from the studio&apos;s{" "}
            <a
              href={reviewsSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ivory/70"
            >
              Google Business Profile
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
