import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/icons";
import { projects } from "@/lib/projects";

const FEATURED = 4;

/**
 * Section F — Featured case studies.
 *
 * Each entry states what the study is, where the studio works, the design
 * concept, the material palette considered and the details the scheme focuses
 * on. Nothing is asserted as fact that the studio has not confirmed: every
 * entry carries the "Representative study" status set in `projects.ts`.
 */
export function CaseStudies() {
  const featured = projects.slice(0, FEATURED);

  return (
    <section className="section bg-ivory" aria-label="Featured case studies">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Case Studies"
            title={
              <>
                The work, <em className="italic text-sage-deep">written up</em>
              </>
            }
            lede="Four studies covering the brief, the planning, the material palette and the details we resolve before anything is built."
            className="lg:max-w-2xl"
          />
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-charcoal"
            >
              <span className="link-underline">All case studies</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.08}>
              <article className="flex h-full flex-col">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block"
                  aria-label={`${project.title} — read the case study`}
                >
                  <ImageReveal
                    asset={project.hero}
                    className="aspect-4/5 w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    parallax={4}
                    imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                  />
                </Link>

                <div className="mt-7">
                  <span className="text-[0.625rem] uppercase tracking-[0.22em] text-taupe">
                    {project.category}
                    <span className="mx-2">·</span>
                    {project.location}
                  </span>

                  <h3 className="mt-3 text-title text-charcoal">{project.title}</h3>

                  <p className="mt-4 max-w-lg text-charcoal/75">{project.concept}</p>

                  <dl className="mt-7 grid gap-6 border-t border-charcoal/12 pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="field-label">Material palette</dt>
                      <dd>
                        <ul className="space-y-1.5 text-sm text-charcoal/70">
                          {project.materials.map((material) => (
                            <li key={material}>{material}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="field-label">Design details</dt>
                      <dd>
                        <ul className="space-y-1.5 text-sm text-charcoal/70">
                          {project.focus.slice(0, 4).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-charcoal"
                    >
                      <span className="link-underline">Read the study</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    {project.representative && (
                      <span className="text-[0.625rem] uppercase tracking-[0.18em] text-taupe">
                        Representative study
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
