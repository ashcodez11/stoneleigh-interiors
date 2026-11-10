"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "motion/react";

const FINE_POINTER = "(pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/**
 * Restrained custom cursor for desktop (fine pointers only).
 *
 * The native cursor is only hidden once JavaScript has mounted, so a no-JS or
 * reduced-motion user always keeps a visible pointer.
 */
export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const reduce = Boolean(prefersReduced);
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const enabled = finePointer && !reduce;

  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-none-desktop");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor], input, textarea, select, summary",
      );
      setActive(Boolean(interactive));
      const custom = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(custom?.dataset.cursorLabel ?? null);
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden lg:block">
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-charcoal/40 mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 62 : 34,
          height: active ? 62 : 34,
          opacity: active ? 1 : 0.65,
          backgroundColor: active ? "rgba(101,112,100,0.22)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
      />
      {label && (
        <motion.span
          className="absolute text-[0.5625rem] uppercase tracking-[0.22em] text-linen"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
