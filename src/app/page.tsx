import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { SignatureLayerCarousel } from "@/components/sections/SignatureLayerCarousel";
import { Expertise } from "@/components/sections/Expertise";
import { Approach } from "@/components/sections/Approach";
import { PoojaRoom } from "@/components/sections/PoojaRoom";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Studio in Bengaluru",
  description:
    "Stoneleigh Interiors is a residential interior design studio in Bengaluru — crafting bespoke living rooms, modular kitchens, bedrooms, wardrobes and complete home interiors with warm, considered detailing.",
  path: "/",
  keywords: [
    "interior designers in Bengaluru",
    "interior design Bengaluru",
    "modular kitchen Bengaluru",
    "residential interior design Bengaluru",
    "complete home interiors Bengaluru",
    "bespoke interior design studio",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* SECTION B — Cinematic hero */}
      <Hero />

      {/* SECTION C — Selected projects: signature layer carousel */}
      <SignatureLayerCarousel />

      {/* SECTION D — Our expertise */}
      <Expertise />

      {/* SECTION E — The Stoneleigh approach */}
      <Approach />

      {/* SECTION F — Pooja rooms & Indian interiors */}
      <PoojaRoom />

      {/* SECTION G — Featured case studies */}
      <CaseStudies />

      {/* SECTION H — Client testimonials (real reviews only; hides itself when none) */}
      <Testimonials />

      {/* SECTION I — Frequently asked questions */}
      <FaqSection />

      {/* SECTION J — Final call to action */}
      <FinalCta />

      <span className="sr-only">
        {site.name} — interior design studio in {site.address.city}, {site.address.region}.
      </span>
    </>
  );
}
