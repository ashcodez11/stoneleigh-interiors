"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/content";

/** Section 7 — our process, presented as a scroll-driven timeline. */
export function ProcessTimeline({
  heading = true,
  tone = "dark",
}: {
  heading?: boolean;
  tone?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isDark = tone === "light";

  return (
    <section
      className={isDark ? "section bg-charcoal-deep" : "section bg-ivory"}
      aria-label="Our process"
    >
      <div className="container-luxe">
        {heading && (
          <SectionHeading
            eyebrow="Our Process"
            tone={tone}
            title={
              <>
                From first conversation to{" "}
                <em className={`italic ${isDark ? "text-stone" : "text-sage-deep"}`}>
                  handover
                </em>
              </>
            }
            lede="A defined sequence so you always know what happens next, what we need from you and how decisions are made."
            className="max-w-2xl"
          />
        )}

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-14 lg:mt-20">
          {/* Rail + scroll-driven progress fill */}
          <span
            aria-hidden
            className={`absolute left-[0.3125rem] top-2 bottom-2 w-px sm:left-[0.4375rem] ${
              isDark ? "bg-ivory/18" : "bg-charcoal/15"
            }`}
          />
          <motion.span
            aria-hidden
            className="absolute left-[0.3125rem] top-2 w-px origin-top bg-sage sm:left-[0.4375rem]"
            style={
              reduce
                ? { scaleY: 1, height: "calc(100% - 1rem)" }
                : { scaleY, height: "calc(100% - 1rem)" }
            }
          />

          <ol className="space-y-12 lg:space-y-16">
            {processSteps.map((step, index) => (
              <li key={step.number} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-10 top-2.5 h-3 w-3 rounded-full border sm:-left-14 ${
                    isDark
                      ? "border-sage bg-charcoal-deep"
                      : "border-sage bg-ivory"
                  }`}
                />
                <Reveal delay={index * 0.04}>
                  <div className="grid gap-4 lg:grid-cols-[7rem_1fr] lg:gap-10">
                    <span
                      className={`font-serif text-3xl leading-none ${
                        isDark ? "text-stone" : "text-sage-deep"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3
                        className={`text-title ${
                          isDark ? "text-ivory" : "text-charcoal"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-3 max-w-2xl ${
                          isDark ? "text-ivory/75" : "text-charcoal/75"
                        }`}
                      >
                        {step.summary}
                      </p>
                      <p
                        className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                          isDark ? "text-ivory/50" : "text-charcoal/55"
                        }`}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
