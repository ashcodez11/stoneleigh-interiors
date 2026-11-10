import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/common/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

/** Update this whenever the policy text changes. */
const LAST_UPDATED = "November 2026";

const trail = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Stoneleigh Interiors collects, uses and protects the information you share through this website — including enquiry details, analytics and your rights.",
  path: "/privacy-policy",
});

const sections = [
  {
    heading: "Who we are",
    body: [
      `This website is operated by ${site.name}, an interior and architectural design studio based in ${site.address.city}, ${site.address.region}, ${site.address.country}.`,
      "This policy explains what information we collect through the website, why we collect it, and how we handle it.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "We collect only the information you choose to give us. When you submit the enquiry form we receive the details you enter — typically your name, email address, an optional phone number, an optional project location, an optional service interest and your message.",
      "We do not ask for, and do not wish to receive, sensitive personal information such as financial details or government identifiers through this site.",
      "Our hosting provider automatically records basic technical information in standard server logs, such as your IP address and browser type, for security and reliability purposes.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you provide solely to respond to your enquiry, to understand your project and to arrange a conversation or site visit if that is appropriate.",
      "We do not sell your information, and we do not use it for unrelated marketing.",
    ],
  },
  {
    heading: "Legal basis and consent",
    body: [
      "We process your enquiry details on the basis of the consent you give when you submit the form. You may withdraw that consent at any time by contacting us — see “Contacting us” below.",
    ],
  },
  {
    heading: "Sharing",
    body: [
      "Your information may be handled by the service providers we use to run this website — for example website hosting and the service that delivers enquiry form submissions to us. These providers process data on our behalf and only for that purpose.",
      "We may disclose information if we are legally required to do so.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "By default this website sets only strictly necessary local storage — the record of your cookie choice — unless you opt in to optional cookies.",
      "Optional analytics cookies are used only when you have consented and the studio owner has configured an analytics service. When active, analytics are used to understand aggregate visitor behaviour, not to identify individuals.",
      "We do not use marketing or advertising cookies.",
      "You can give, change or withdraw your consent at any time using the “Cookie preferences” control in the footer of the site, which lets you review each category and update your choice.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "We keep enquiry correspondence only for as long as it is needed to handle your enquiry and any resulting project relationship, after which it is deleted or archived in line with our normal business records.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable law, you may ask us to confirm what information we hold about you, to correct it, or to delete it. You may also object to our processing of your information.",
      "To make a request, please contact us using the details below and we will respond within a reasonable period.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "This website is served over HTTPS. We take reasonable technical and organisational measures to protect the information you share, though no method of transmission over the internet is completely secure.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      `If this policy changes, the updated version will be published on this page with a revised date. This version was last updated in ${LAST_UPDATED}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="We keep this simple: we collect what you send us, we use it to answer you, and we do not sell it."
        trail={trail}
      />

      <section className="section">
        <div className="container-narrow">
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-taupe">
            Last updated — {LAST_UPDATED}
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-title text-charcoal">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-charcoal/75">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div id="contacting-us">
              <h2 className="font-serif text-title text-charcoal">Contacting us</h2>
              <div className="mt-4 space-y-4 text-charcoal/75">
                <p>
                  To make a privacy request, or to ask a question about this policy, please reach
                  the studio through the contact page.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  <span>
                    Contact the Studio
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
