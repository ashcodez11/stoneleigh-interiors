import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealLines, RevealRule } from "@/components/motion/Reveal";
import { brandImages } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";
import { ArrowUpRight, WhatsApp } from "@/components/ui/icons";

/**
 * Section I — final call to action.
 *
 * The photograph is shown whole at every size: the frame carries the file's own
 * ratio on small screens, and `contain` (never `cover`) guarantees no furniture
 * is cropped on the wider half-width panel.
 */
export function FinalCta() {
  const whatsapp = whatsappLink(
    "Hello Stoneleigh Interiors, I'd like to discuss an interior project.",
  );

  return (
    <section className="relative overflow-hidden bg-charcoal-deep" aria-label="Start your project">
      <div className="grid lg:grid-cols-2">
        <div className="relative order-2 aspect-16/9 bg-charcoal-deep lg:order-1 lg:aspect-auto lg:min-h-full">
          <ImageReveal
            asset={brandImages.finalCta}
            className="absolute inset-0 h-full w-full bg-charcoal-deep"
            sizes="(max-width: 1024px) 100vw, 50vw"
            fit="contain"
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="container-luxe py-20 lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-28">
            <Reveal>
              <span className="eyebrow eyebrow-invert">Let&apos;s Begin</span>
            </Reveal>

            <h2 className="mt-6 max-w-[16ch] text-headline text-ivory">
              <RevealLines lines={["Your Dream Space Begins", "With a Conversation."]} />
            </h2>

            <RevealRule className="mt-9 max-w-xs bg-ivory/20" />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-ivory/70">
                Tell us about your home and what you would like it to become. We will reply to
                arrange an initial conversation — no obligation, no pressure.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link href="/contact" className="btn btn-light w-full sm:w-auto">
                  <span className="text-center">Let&apos;s Create Something Beautiful.</span>
                </Link>
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-invert w-full sm:w-auto"
                  >
                    <span>
                      <WhatsApp className="h-4 w-4" />
                      WhatsApp Enquiry
                    </span>
                  </a>
                ) : (
                  <a
                    href={site.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-invert w-full sm:w-auto"
                  >
                    <span>
                      Get Directions
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-xs text-ivory/45">
                {site.responseExpectation && `${site.responseExpectation} `}
                You can also visit the studio —{" "}
                <a
                  href={site.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 underline decoration-stone/60 underline-offset-4"
                >
                  {site.address.short}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
