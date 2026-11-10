"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Lightweight page transition. A template re-mounts on every navigation, so the
 * enter animation replays per route change. Deliberately short (~450ms) so
 * navigation never feels gated.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
