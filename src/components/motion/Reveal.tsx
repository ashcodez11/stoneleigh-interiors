"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to delay the reveal — use for staggered sequences. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Horizontal travel in px (for editorial offsets). */
  x?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Scroll-triggered reveal. Honours prefers-reduced-motion by rendering the
 * final state immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  x = 0,
  duration = 0.9,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked reveal for editorial headings. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{
              duration: 1.05,
              delay: delay + index * 0.09,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Fades a hairline rule in from the left as it enters the viewport. */
export function RevealRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`hairline ${className ?? ""}`} />;
  return (
    <motion.div
      className={`hairline origin-left ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
    />
  );
}
