"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks, site, wordmark } from "@/lib/site";
import { ArrowUpRight, Close, Instagram, Menu } from "@/components/ui/icons";

/** Text wordmark. No logo file was supplied, so the studio name is set in type. */
function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-serif text-[1.5rem] tracking-[-0.01em] sm:text-[1.75rem] ${
          tone === "light" ? "text-ivory" : "text-charcoal"
        }`}
      >
        {wordmark.first}
      </span>
      <span
        className={`mt-[0.2em] text-[0.5rem] font-medium uppercase tracking-[0.42em] sm:text-[0.5625rem] ${
          tone === "light" ? "text-stone" : "text-taupe"
        }`}
      >
        {wordmark.second}
      </span>
    </span>
  );
}

/**
 * Sticky primary navigation (brief Section A).
 * Refined translucent band that tightens on scroll, a desktop nav, the
 * prominent consultation CTA, and a full-screen mobile menu with staggered
 * transitions, scroll-lock and Escape handling.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const instagram = site.social.instagram;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scrolling behind the mobile menu.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
    } else {
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
    return () => {
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        <div
          className={`absolute inset-0 border-b transition-all duration-500 ease-[var(--ease-luxe)] ${
            scrolled
              ? "border-charcoal/12 bg-ivory/92 backdrop-blur-xl"
              : "border-charcoal/8 bg-ivory/78 backdrop-blur-md"
          }`}
        />
        <div className="container-luxe relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="relative flex shrink-0 items-center transition-opacity duration-300 hover:opacity-70"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className="nav-link text-charcoal"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Instagram`}
                className="text-charcoal transition-opacity duration-300 hover:opacity-60"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            <Link href="/contact" className="btn btn-primary">
              <span>
                Book a Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center text-charcoal lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[65] bg-linen lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex h-[var(--header-h)] items-center justify-between px-5">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center text-charcoal"
              >
                <Close className="h-6 w-6" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex h-[calc(100dvh-var(--header-h))] flex-col justify-between overflow-y-auto px-5 pb-8 pt-4"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.06 + index * 0.05,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="border-b border-charcoal/12"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-serif text-[2rem] leading-none text-charcoal"
                    >
                      {link.label}
                      <span className="font-sans text-[0.625rem] tracking-[0.2em] text-taupe">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 space-y-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  <span>Book a Consultation</span>
                </Link>
                <address className="space-y-2 text-sm not-italic text-charcoal/70">
                  <p>{site.address.full}</p>
                  {site.responseExpectation && <p>{site.responseExpectation}</p>}
                </address>
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-charcoal"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
