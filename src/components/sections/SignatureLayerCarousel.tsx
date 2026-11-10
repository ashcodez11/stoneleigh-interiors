"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { projects } from "@/lib/projects";

/** Autoplay dwell time per slide, in milliseconds. */
const AUTOPLAY_MS = 6000;

/** How far (as a % of the card's own width) each neighbouring card sits from centre. */
const STEP = 58;

/**
 * Spring with a deliberate, slight overshoot — the transition settles rather
 * than snapping. Damping sits just under critical for this stiffness/mass.
 */
const SPRING = { type: "spring", stiffness: 200, damping: 27, mass: 1 } as const;

/**
 * Section C — Selected Projects, "Signature Layer" carousel.
 *
 * A depth-stacked coverflow: the active study is sharp and centred while its
 * neighbours recede (scaled down, rotated back and blurred) into the space
 * around it. Nothing is a flat strip — every card is a real frame at real depth.
 *
 * Input support:
 *   · pointer drag / touch swipe (touch falls through to vertical page scroll)
 *   · horizontal trackpad wheel — vertical wheel is deliberately left alone
 *     so the page is never scroll-hijacked
 *   · ← / → keys while the carousel has focus
 *   · prev / next buttons
 *   · click a neighbouring card to bring it forward
 *
 * Autoplay pauses on hover, focus, drag, wheel, tab-hidden and when the
 * carousel scrolls out of view, and is switched off entirely for visitors who
 * prefer reduced motion.
 */
export function SignatureLayerCarousel() {
  const reduce = useReducedMotion();
  const total = projects.length;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);
  const wheelLocked = useRef(false);

  /**
   * A set of independent pause reasons. Using a set (rather than a boolean)
   * means hovering away does not resume autoplay while the carousel is also
   * off-screen, or vice versa.
   */
  const pauseReasons = useRef<Set<string>>(new Set());
  const pause = useCallback((reason: string) => {
    pauseReasons.current.add(reason);
    setIsPaused(true);
  }, []);
  const resume = useCallback((reason: string) => {
    pauseReasons.current.delete(reason);
    setIsPaused(pauseReasons.current.size > 0);
  }, []);

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  /* --- Autoplay ---------------------------------------------------------- */
  useEffect(() => {
    if (reduce || isPaused) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [reduce, isPaused, index, total]);

  /* --- Pause while off-screen ------------------------------------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? resume("offscreen") : pause("offscreen")),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pause, resume]);

  /* --- Pause while the tab is hidden ------------------------------------ */
  useEffect(() => {
    const onVisibility = () =>
      document.hidden ? pause("hidden") : resume("hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause, resume]);

  /* --- Pointer drag / touch swipe --------------------------------------- */
  function handlePointerDown(event: React.PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStartX.current = event.clientX;
    pause("drag");
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    resume("drag");
    if (Math.abs(distance) > 56) {
      if (distance < 0) next();
      else prev();
    }
  }

  /* --- Horizontal trackpad wheel only ----------------------------------- */
  function handleWheel(event: React.WheelEvent) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 650);
    if (event.deltaX > 0) next();
    else prev();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  return (
    <section
      ref={sectionRef}
      className="section overflow-hidden bg-ivory-deep"
      aria-labelledby="selected-projects-heading"
    >
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected Projects"
            title={
              <>
                Studies in <em className="italic text-sage-deep">light</em>, material
                <br className="hidden sm:block" /> and proportion
              </>
            }
            lede="A cross-section of the studio's design language. Drag, swipe or use the arrows to move through them."
            className="lg:max-w-2xl"
          />
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-charcoal"
            >
              <span className="link-underline">All projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* --- Coverflow stage --- */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => pause("hover")}
        onMouseLeave={() => resume("hover")}
        onFocus={() => pause("focus")}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) resume("focus");
        }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="mt-14 touch-pan-y pb-2 focus-visible:outline-offset-4 lg:mt-20"
      >
        <div className="perspective-far relative mx-auto select-none">
          {/* Invisible spacer: it alone decides the stage height. */}
          <div
            aria-hidden
            className="mx-auto aspect-16/10 w-[82vw] max-w-[52rem] opacity-0 sm:w-[66vw] lg:w-[56vw]"
          />

          <div className="preserve-3d absolute inset-0">
            {projects.map((project, i) => {
              const offset = i - index;
              const depth = Math.abs(offset);
              const active = offset === 0;
              const visible = depth <= 2;

              return (
                <motion.article
                  key={project.slug}
                  aria-hidden={!active}
                  className="absolute top-0 left-1/2 h-full w-[82vw] max-w-[52rem] sm:w-[66vw] lg:w-[56vw]"
                  style={{ zIndex: 30 - depth, pointerEvents: visible ? "auto" : "none" }}
                  animate={{
                    x: `${offset * STEP - 50}%`,
                    scale: active ? 1 : Math.max(0.7, 0.87 - (depth - 1) * 0.13),
                    rotateY: offset * -17,
                    opacity: visible ? (active ? 1 : Math.max(0.18, 0.52 - (depth - 1) * 0.3)) : 0,
                    filter: `blur(${Math.min(depth, 2) * 2.6}px)`,
                  }}
                  transition={reduce ? { duration: 0 } : SPRING}
                >
                  <div
                    className={`media h-full w-full ${
                      active ? "cursor-default" : "cursor-pointer"
                    }`}
                    onClick={active ? undefined : () => goTo(i)}
                  >
                    <Image
                      src={project.heroWide.src}
                      alt={active ? project.heroWide.alt : ""}
                      fill
                      priority={i < 2}
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 66vw, 56vw"
                      className="object-cover"
                    />

                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/92 via-charcoal-deep/22 to-transparent"
                    />

                    <motion.div
                      className="absolute inset-x-0 bottom-0 z-[3] p-6 sm:p-8 lg:p-10"
                      animate={{ opacity: active ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.45 }}
                    >
                      <span className="eyebrow eyebrow-invert">{project.category}</span>
                      <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory sm:text-3xl lg:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[0.625rem] uppercase tracking-[0.18em] text-ivory/55">
                        {project.location}
                      </p>
                      <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-ivory/75 lg:block">
                        {project.summary}
                      </p>
                      <Link
                        href={`/projects/${project.slug}`}
                        tabIndex={active ? undefined : -1}
                        className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory"
                      >
                        <span className="link-underline">View Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* --- Counter, progress and arrows --- */}
        <div className="container-luxe mt-10">
          <div className="flex items-center gap-5">
            <p aria-live="polite" className="shrink-0 text-[0.6875rem] tracking-[0.2em] text-taupe">
              <span className="text-charcoal">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-1.5">/</span>
              {String(total).padStart(2, "0")}
            </p>

            {!reduce && (
              <span aria-hidden className="relative h-px flex-1 bg-charcoal/12">
                <span
                  key={index}
                  className="carousel-progress absolute inset-y-0 left-0 w-full bg-sage"
                  style={
                    {
                      animationPlayState: isPaused ? "paused" : "running",
                      "--carousel-duration": `${AUTOPLAY_MS}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
            )}

            <div className={`flex shrink-0 items-center gap-2 ${reduce ? "ml-auto" : ""}`}>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
