import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { JsonLd } from "@/components/common/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import { getAdjacentProject, getProject, projects } from "@/lib/projects";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

type ProjectRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      title: "Project Not Found",
      description: "The project you are looking for is not available.",
      path: `/projects/${slug}`,
    });
  }

  return pageMetadata({
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.heroWide,
    keywords: [
      `${project.title} Bengaluru`,
      `${project.category} interior design Bengaluru`,
      "Stoneleigh Interiors project",
    ],
  });
}

export default async function ProjectDetailPage({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  const trail = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow={project.category}
        title={project.title}
        lede={project.summary}
        trail={trail}
        image={project.heroWide}
      />

      {/* Overview */}
      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_0.62fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="The brief" title="Design Intent" />
            <blockquote className="mt-8 border-l-2 border-sage pl-5">
              <p className="text-lede text-charcoal/85">{project.concept}</p>
            </blockquote>
            <div className="mt-8 space-y-5 text-lede text-charcoal/75">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="lg:pt-8">
            <dl className="divide-y divide-charcoal/12 border-y border-charcoal/12">
              <div className="grid grid-cols-2 gap-4 py-5">
                <dt className="field-label mb-0">Category</dt>
                <dd className="text-sm text-charcoal/80">{project.category}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-5">
                <dt className="field-label mb-0">Location</dt>
                <dd className="text-sm text-charcoal/80">{project.location}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-5">
                <dt className="field-label mb-0">Status</dt>
                <dd className="text-sm text-charcoal/80">
                  {project.representative ? "Representative study" : "Verified project"}
                </dd>
              </div>
            </dl>

            <h2 className="mt-10 field-label">Focus areas</h2>
            <ul className="mt-4 space-y-3">
              {project.focus.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-charcoal/75">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-sage" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 field-label">Material palette</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.materials.map((material) => (
                <li
                  key={material}
                  className="border border-charcoal/12 bg-linen/40 px-3 py-2 text-xs tracking-wide text-charcoal/75"
                >
                  {material}
                </li>
              ))}
            </ul>

            {project.representative && (
              <p className="mt-8 border border-charcoal/12 bg-linen/40 p-5 text-xs leading-relaxed text-charcoal/60">
                A representative study based on the studio&apos;s services and service area.
                Verified project details will replace it once supplied.
              </p>
            )}
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-tight bg-linen/40" aria-labelledby="gallery-heading">
        <div className="container-luxe">
          <h2 id="gallery-heading" className="eyebrow">
            Gallery
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <Reveal key={image.src + index} delay={(index % 3) * 0.07}>
                <ImageReveal
                  asset={image}
                  className={index === 0 ? "aspect-4/5 sm:col-span-2 sm:aspect-16/11" : "aspect-4/5"}
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                  parallax={4}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="section" aria-labelledby="next-project-heading">
        <div className="container-luxe">
          <RevealRule />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <span className="eyebrow">Next study</span>
              <h2 id="next-project-heading" className="mt-5 text-headline text-charcoal">
                {next.title}
              </h2>
              <p className="mt-5 max-w-md text-charcoal/70">{next.summary}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href={`/projects/${next.slug}`} className="btn btn-primary">
                  <span>
                    View Project
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/projects" className="btn btn-outline">
                  <span>All Projects</span>
                </Link>
              </div>
            </div>
            <Link href={`/projects/${next.slug}`} className="group block" aria-label={`View ${next.title}`}>
              <ImageReveal
                asset={next.rail}
                className="aspect-4/5 w-full lg:aspect-16/12"
                sizes="(max-width: 1024px) 100vw, 50vw"
                imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
