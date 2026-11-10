"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline terracotta reading-progress indicator pinned to the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-sage"
      style={{ scaleX }}
    />
  );
}
