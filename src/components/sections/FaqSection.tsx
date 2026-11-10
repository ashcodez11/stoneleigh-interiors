import Link from "next/link";
import { Accordion } from "@/components/common/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";

/**
 * Section H — Frequently asked questions.
 *
 * Answers cover exactly what the studio has confirmed — services, process,
 * customisation, booking, materials and how to get in touch. No pricing,
 * timeline or guarantee is stated, because none has been agreed.
 */
export function FaqSection() {
  return (
    <section className="section bg-ivory-deep" aria-label="Frequently asked questions">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently Asked Questions"
          lede="The questions we are asked most often, answered directly."
          align="center"
        />

        <div className="mt-12">
          <Accordion items={faqs} />
        </div>

        <p className="mt-10 text-center text-sm text-charcoal/60">
          Still have a question?{" "}
          <Link href="/contact" className="link-underline text-charcoal">
            Send us an enquiry
          </Link>{" "}
          and we will answer it directly.
        </p>
      </div>
    </section>
  );
}
