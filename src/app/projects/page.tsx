import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/common/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import { brandImages } from "@/lib/images";
import { projects } from "@/lib/projects";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const trail = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

export const metadata: Metadata = pageMetadata({
  title: "Projects & Portfolio",
  description:
    "Explore the disciplines of Stoneleigh Interiors — living rooms, modular kitchens, bedrooms, dining spaces, complete homes, bespoke joinery and storage, designed from our Bengaluru studio.",
  path: "/projects",
  keywords: [
    "interior design portfolio Bengaluru",
    "residential interior projects Bengaluru",
    "interior design gallery AECS Layout",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="Selected Work"
        title="Projects & Studies"
        lede="Our work, organised by the spaces we design most — each one a study in light, material and restraint."
        trail={trail}
        image={brandImages.approachWide}
      />

      <section className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Portfolio"
            title="Where to Begin"
            lede="Choose a discipline to see how we approach it, the details we consider and the materials we favour."
          />

          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 0.08}>
                <article>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block"
                    aria-label={`${project.title} — view project`}
                  >
                    <ImageReveal
                      asset={project.hero}
                      className="aspect-4/5 w-full"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      parallax={5}
                      imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                    />
                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div>
                        <span className="text-[0.625rem] uppercase tracking-[0.22em] text-taupe">
                          {project.category} · {project.location}
                        </span>
                        <h3 className="mt-3 font-serif text-title text-charcoal transition-colors duration-300 group-hover:text-sage-deep">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/65">
                          {project.summary}
                        </p>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-charcoal/20 text-charcoal transition-all duration-500 group-hover:border-sage group-hover:bg-sage group-hover:text-ivory">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-16 max-w-3xl border-t border-charcoal/12 pt-8 text-sm leading-relaxed text-charcoal/55">
            These entries are clearly-labelled representative studies based on Stoneleigh
            Interiors&apos; services and its Bengaluru service area. Verified project names,
            locations, areas and completion dates will replace the current details as soon as the
            studio supplies them — we do not invent project data.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
