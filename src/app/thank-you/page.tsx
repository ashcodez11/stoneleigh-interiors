import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/common/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", href: "/" },
  { name: "Thank You", href: "/thank-you" },
];

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank You — Enquiry Received",
    description:
      "Thank you for contacting Stoneleigh Interiors. Your enquiry has been received and the studio will be in touch shortly.",
    path: "/thank-you",
  }),
  // A post-submission confirmation page should not appear in search results.
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        title="Thank You"
        lede="Your note has reached the studio. We read every enquiry personally — no autoresponders."
        trail={trail}
      />

      <section className="section">
        <div className="container-narrow">
          <div className="border border-charcoal/12 bg-ivory p-8 sm:p-12">
            <h2 className="font-serif text-title text-charcoal">What happens next</h2>
            <ol className="mt-8 space-y-6">
              {[
                "We read your enquiry and, if it looks like a fit, come back with a few clarifying questions.",
                "We arrange an initial conversation, and a site visit where it makes sense.",
                "You receive a considered direction for the project — and a transparent estimate once scope is agreed.",
              ].map((step, index) => (
                <li key={step} className="flex gap-5">
                  <span className="mt-1 font-serif text-lg text-sage-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-charcoal/75">{step}</p>
                </li>
              ))}
            </ol>
            {site.responseExpectation && (
              <p className="mt-8 text-sm text-charcoal/60">{site.responseExpectation}</p>
            )}
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href="/projects" className="btn btn-primary">
              <span>
                Explore Our Projects
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/" className="btn btn-outline">
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
