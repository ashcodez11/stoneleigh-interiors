import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { JsonLd } from "@/components/common/JsonLd";
import { brandImages, teamImages } from "@/lib/images";
import { approachPoints } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const trail = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const metadata: Metadata = pageMetadata({
  title: "About the Studio",
  description:
    "Stoneleigh Interiors is a bespoke interior design studio in Bengaluru, Karnataka, designing complete home interiors, modular kitchens and wardrobes around light, honest materials and the way people actually live.",
  path: "/about",
  keywords: [
    "about Stoneleigh Interiors",
    "interior design studio Bengaluru",
    "interior designers AECS Layout",
    "bespoke interiors Whitefield Bengaluru",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="About the studio"
        title="Quiet Design, Made to Last"
        lede="A bespoke interior design studio in Bengaluru, Karnataka, designing homes that are calm to look at and better to live in."
        trail={trail}
        image={brandImages.introductionWide}
      />

      {/* Studio story */}
      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  Designing Spaces.
                  <br />
                  <em className="italic text-sage-deep">Defining Lifestyles.</em>
                </>
              }
            />
            <div className="mt-10 space-y-6 text-lede text-charcoal/75">
              <p>
                We design homes around the people who live in them, not around a style. Every
                project begins with how a household moves through its day.
              </p>
              <p>
                Planning, material and detail are shaped as one language, with interiors, joinery
                and architecture developed together.
              </p>
              <p>
                Our work spans residential interiors, modular kitchens, turnkey homes and
                interior-led architecture. The approach stays the same: light first, honest
                materials, restraint over ornament.
              </p>
            </div>
            <RevealRule className="mt-12" />
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="field-label">Based in</dt>
                <dd className="text-charcoal/80">
                  {site.address.area}, {site.address.city}, {site.address.region}
                </dd>
              </div>
              <div>
                <dt className="field-label">Working across</dt>
                <dd className="text-charcoal/80">
                  The {site.address.city} metropolitan region
                </dd>
              </div>
            </dl>
          </div>

          <Reveal delay={0.1} className="lg:pt-16">
            <ImageReveal
              asset={brandImages.aboutInterior}
              className="aspect-3/4 w-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              parallax={6}
            />
          </Reveal>
        </div>
      </section>

      {/* Design approach */}
      <section className="section bg-linen/45" aria-labelledby="approach-heading">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How we think"
            title="Six Commitments That Shape Every Project"
            lede="The checks we apply to every drawing and every finish."
          />
          <h2 id="approach-heading" className="sr-only">
            Our design approach
          </h2>

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {approachPoints.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 0.08}>
                  <span className="font-serif text-2xl text-sage-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-charcoal">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{point.summary}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{point.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our process */}
      <ProcessTimeline />

      {/* Team — awaiting client photograph */}
      <section className="section" aria-labelledby="team-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <ImageReveal
            asset={teamImages.placeholder}
            className="aspect-16/10 w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <SectionHeading
              eyebrow="The people"
              title="A Studio You Can Reach"
              lede="You work directly with the people designing and delivering your home, from first conversation to handover. We are waiting on the studio's own photograph — no stock or synthetic portrait stands in for the team here."
            />
            <h2 id="team-heading" className="sr-only">
              The team
            </h2>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
