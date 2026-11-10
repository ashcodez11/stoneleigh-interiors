import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/common/Accordion";
import { MapEmbed } from "@/components/common/MapEmbed";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/common/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Instagram, WhatsApp, ArrowUpRight } from "@/components/ui/icons";
import { brandImages } from "@/lib/images";
import { faqs } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const trail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata: Metadata = pageMetadata({
  title: "Contact — Discuss Your Interior Project in Bengaluru",
  description:
    "Talk to Stoneleigh Interiors about your home. Share your project through the enquiry form, or reach the studio at Trinity Square, ITPL Main Road, Bengaluru.",
  path: "/contact",
  keywords: [
    "contact interior designer Bengaluru",
    "interior design enquiry AECS Layout",
    "hire interior designer Bengaluru",
  ],
});

export default function ContactPage() {
  const wa = whatsappLink(
    "Hello Stoneleigh Interiors — I would like to discuss an interior design project.",
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        eyebrow="Start a conversation"
        title="Let's Discuss Your Space"
        lede="Tell us a little about the home and what you would like it to become. Every project begins with a conversation."
        trail={trail}
        image={brandImages.contactHero}
      />

      <section className="section" aria-labelledby="enquiry-heading">
        <div className="container-luxe grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <h2 id="enquiry-heading" className="sr-only">
              Contact details and enquiry form
            </h2>

            <SectionHeading
              eyebrow="The studio"
              title="Stoneleigh Interiors"
              lede="We design residential interiors and interior-led architecture across the Bengaluru metropolitan region."
            />

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="field-label">Studio location</dt>
                <dd className="text-charcoal/80">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.area}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </dd>
              </div>

              {site.contact.phone && (
                <div>
                  <dt className="field-label">Phone</dt>
                  <dd>
                    <a href={`tel:${site.contact.phone}`} className="link-underline text-charcoal/80">
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              )}

              {site.contact.email && (
                <div>
                  <dt className="field-label">Email</dt>
                  <dd>
                    <a href={`mailto:${site.contact.email}`} className="link-underline text-charcoal/80">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              )}

              {site.responseExpectation && (
                <div>
                  <dt className="field-label">Response time</dt>
                  <dd className="text-charcoal/80">{site.responseExpectation}</dd>
                </div>
              )}
            </dl>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal hover:text-sage-deep"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal hover:text-sage-deep"
                >
                  <WhatsApp className="h-4 w-4" />
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              <a
                href={site.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal hover:text-sage-deep"
              >
                Get directions
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-14">
              <MapEmbed />
              <p className="mt-4 text-xs leading-relaxed text-charcoal/50">
                Map pin reflects the studio&apos;s address in {site.address.area},{" "}
                {site.address.city}. After an enquiry we will share the exact meeting point.
              </p>
            </div>
          </div>

          <Reveal className="lg:pt-4">
            <div className="border border-charcoal/12 bg-ivory p-6 sm:p-10">
              <h3 className="font-serif text-title text-charcoal">Project enquiry</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/65">
                Fields marked with an asterisk are required. The more you can share, the more
                useful our first reply will be.
              </p>
              <div className="mt-10">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-linen/45" aria-labelledby="faq-heading">
        <div className="container-narrow">
          <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
          <p className="mt-10 text-sm text-charcoal/60">
            Still have a question?{" "}
            <Link href="#enquiry-heading" className="link-underline text-charcoal">
              Send us an enquiry
            </Link>{" "}
            and we will answer it directly.
          </p>
        </div>
      </section>
    </>
  );
}
