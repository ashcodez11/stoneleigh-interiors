"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { brandImages } from "@/lib/images";
import { navLinks } from "@/lib/site";

/**
 * Route-level error boundary. Rendering errors thrown below the root layout
 * land here, so the header, footer and motion layer remain available to help
 * visitors recover their place. The thrown value is never shown to the user —
 * only logged for diagnostics.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-var(--header-h))] items-center overflow-hidden bg-charcoal-deep py-24">
      <ImageReveal
        asset={brandImages.approachWide}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/95 via-charcoal-deep/80 to-charcoal-deep/50"
      />

      <div className="container-luxe relative z-10">
        <p className="eyebrow eyebrow-invert">Unexpected pause</p>
        <h1 className="mt-4 max-w-2xl text-headline text-ivory">
          Something went wrong at our end.
        </h1>
        <p className="mt-6 max-w-xl text-lede text-ivory/70">
          This one is on us — part of the page failed to load. You can try again, or
          return home and pick up where you left off.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button type="button" onClick={() => reset()} className="btn btn-light">
            <span>
              Try again
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <Link href="/" className="btn btn-outline-invert">
            <span>Back to Home</span>
          </Link>
        </div>

        <nav aria-label="Site" className="mt-14 border-t border-ivory/15 pt-8">
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-taupe">
            Or continue to
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/80 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
