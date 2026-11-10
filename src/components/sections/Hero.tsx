"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealLines } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { heroImage } from "@/lib/images";

const HERO_HEADLINE = ["Spaces Crafted", "Around the Art", "of Living."];

/**
 * Section B — cinematic hero.
 *
 * Full-bleed still photography with a layered scrim, restrained entrance motion
 * and a scroll-linked drift. Both calls to action sit above the fold at every
 * tested viewport; the scroll indicator is desktop-only and purely decorative.
 *
 * No film was supplied for the studio, so the hero is a photograph rather than
 * a looping video — nothing is faked with a stock clip.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[calc(100dvh-var(--header-h))] w-full overflow-hidden bg-charcoal-deep"
    >
      <ImageReveal
        asset={heroImage}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
        priority
        reveal={false}
        quality={90}
        objectPosition="50% 50%"
      />

      {/* Subtle scrim — just enough to hold the headline, without flattening the photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/88 via-charcoal-deep/26 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/55 via-charcoal-deep/10 to-transparent"
      />

      <motion.div
        className="relative z-10 flex w-full flex-col justify-end pb-20 pt-28 sm:pb-24 sm:pt-32"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="container-luxe">
          <motion.span
            className="eyebrow eyebrow-invert"
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            Interior Design Studio · Bengaluru
          </motion.span>

          <h1 className="mt-6 max-w-[20ch] text-display text-ivory">
            <RevealLines lines={HERO_HEADLINE} delay={0.25} />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lede text-ivory/80 sm:mt-7"
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            Bespoke interiors. Thoughtful architecture. Exceptional living.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link href="/projects" className="btn btn-light">
              <span>
                Explore Our Projects
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/contact" className="btn btn-outline-invert">
              <span>Book a Consultation</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Restrained scroll indicator — desktop only. */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <span className="text-[0.5625rem] uppercase tracking-[0.32em] text-ivory/55">
          Scroll
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-ivory/22">
          <span className="absolute inset-x-0 top-0 h-5 animate-scroll-hint bg-stone" />
        </span>
      </motion.div>
    </section>
  );
}
