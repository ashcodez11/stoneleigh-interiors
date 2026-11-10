"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site, whatsappLink } from "@/lib/site";
import { ArrowUpRight, WhatsApp } from "@/components/ui/icons";

/**
 * Sticky mobile consultation bar (conversion checklist item 9).
 * Appears after the first viewport, so it never covers the hero headline or the
 * above-the-fold CTA. The WhatsApp action only renders once the studio has
 * supplied a number — we never link to a guessed one.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const whatsapp = whatsappLink(
    "Hello Stoneleigh Interiors, I'd like to discuss an interior project.",
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[55] lg:hidden"
      initial={false}
      animate={{ y: visible ? 0 : 130 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.19, 1, 0.22, 1] }}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="border-t border-charcoal/12 bg-ivory/95 backdrop-blur-xl">
        <div className="flex items-stretch gap-2 px-3 py-2.5">
          <Link href="/contact" className="btn btn-primary flex-1 !px-4">
            <span>
              Book a Consultation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="flex w-12 shrink-0 items-center justify-center border border-charcoal/25 text-charcoal"
            >
              <WhatsApp className="h-5 w-5" />
            </a>
          ) : (
            <a
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to the studio"
              className="flex w-12 shrink-0 items-center justify-center border border-charcoal/25 text-charcoal"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
