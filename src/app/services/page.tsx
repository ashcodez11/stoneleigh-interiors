import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/common/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import { brandImages } from "@/lib/images";
import { services } from "@/lib/services";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";

const trail = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Services in Bengaluru",
  description:
    "Complete home interiors, living rooms, modular kitchens, bedrooms, wardrobes and bespoke interior solutions — designed and delivered by Stoneleigh Interiors, an interior design studio in Bengaluru, Karnataka.",
  path: "/services",
  keywords: [
    "interior design services Bengaluru",
    "modular kitchen design Bengaluru",
    "turnkey home interiors Bengaluru",
    "wardrobe and storage design Bengaluru",
    "bespoke interiors AECS Layout",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <PageHero
        eyebrow="What we do"
        title="Services Designed Around Your Home"
        lede="From a single room to a complete turnkey residence, with one studio and one point of accountability."
        trail={trail}
        image={brandImages.introductionWide}
      />

      {/* Service index */}
      <section className="section-tight border-b border-charcoal/12">
        <div className="container-luxe">
          <h2 className="sr-only">Service index</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`#${service.slug}`}
                  className="inline-flex items-baseline gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal/70 transition-colors duration-300 hover:text-sage-deep"
                >
                  <span className="text-sage-deep">{String(index + 1).padStart(2, "0")}</span>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service detail blocks */}
      <div>
        {services.map((service, index) => {
          const flip = index % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className={`section scroll-mt-28 ${flip ? "bg-linen/40" : "bg-ivory"}`}
              aria-labelledby={`${service.slug}-heading`}
            >
              <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <ImageReveal
                    asset={service.image}
                    className="aspect-4/5 w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    parallax={5}
                  />
                </Reveal>

                <div className={flip ? "lg:order-1" : ""}>
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")} — Service
                  </span>
                  <h2
                    id={`${service.slug}-heading`}
                    className="mt-5 text-headline text-charcoal"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-6 text-lede text-charcoal/75">{service.blurb}</p>

                  <div className="mt-6 space-y-4 text-charcoal/70">
                    {service.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <RevealRule className="mt-10" />

                  <h3 className="mt-8 field-label">What this typically covers</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.scope.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-charcoal/75">
                        <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-sage" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href="/contact" className="btn btn-primary">
                      <span>
                        Book a Consultation
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/projects" className="btn btn-outline">
                      <span>See Related Work</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section-tight bg-charcoal-deep">
        <div className="container-luxe">
          <SectionHeading
            tone="light"
            eyebrow="Not sure where to start?"
            title="Tell us about your home."
            lede="Most projects begin with a single room. Send a note and we will help you frame the scope."
          />
          <div className="mt-10">
            <Link href="/contact" className="btn btn-light">
              <span>
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
