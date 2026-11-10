import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/icons";
import { approachPoints } from "@/lib/content";
import { projects } from "@/lib/projects";

/**
 * Section E — The Stoneleigh Approach.
 *
 * Six commitments, each given its own editorial row so the alternating
 * image/text rhythm carries the section rather than a wall of copy. Imagery is
 * drawn from the studies already defined for the site, so nothing new is
 * invented for this section.
 */
export function Approach() {
  return (
    <section className="section bg-ivory-deep" aria-label="The Stoneleigh approach">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="The Stoneleigh Approach"
          title={
            <>
              Designed around <em className="italic text-sage-deep">the way you live</em>
            </>
          }
          lede="Six commitments that shape every drawing, every sample and every junction."
          className="max-w-3xl"
        />
      </div>

      <div className="container-luxe mt-16 space-y-16 lg:mt-20 lg:space-y-24">
        {approachPoints.map((point, index) => {
          const image = projects[index % projects.length].gallery[0];
          const reversed = index % 2 === 1;

          return (
            <article
              key={point.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20"
            >
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <ImageReveal
                  asset={image}
                  className="aspect-16/11 w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  parallax={4}
                />
              </Reveal>

              <div className={reversed ? "lg:order-1" : ""}>
                <Reveal>
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")} — Approach
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="mt-5 text-title text-charcoal">{point.title}</h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 max-w-lg text-lede text-charcoal/75">{point.summary}</p>
                </Reveal>
                <RevealRule className="mt-7 max-w-xs" />
                <Reveal delay={0.15}>
                  <p className="mt-7 max-w-lg text-charcoal/70">{point.body}</p>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>

      <div className="container-luxe mt-16 lg:mt-20">
        <Reveal>
          <Link href="/about" className="btn btn-outline">
            <span>
              More about the studio
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
