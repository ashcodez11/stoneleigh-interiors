"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Faq } from "@/lib/content";
import { Plus } from "@/components/ui/icons";

/** Accessible FAQ accordion (also used to build FAQPage structured data). */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className="divide-y divide-charcoal/12 border-y border-charcoal/12">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-xl leading-snug text-charcoal sm:text-2xl">
                  {item.question}
                </span>
                <Plus
                  className={`mt-1 h-5 w-5 shrink-0 text-sage-deep transition-transform duration-500 ease-[var(--ease-luxe)] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-10 text-charcoal/70">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
