import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { brandImages } from "@/lib/images";

const continueLinks = [
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Custom 404. Rendered inside the root layout, so the header, footer and
 * motion layer remain available to help visitors recover their place.
 */
export default function NotFound() {
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
        <p className="font-serif text-[clamp(5rem,16vw,11rem)] leading-none text-sage-deep/80">
          404
        </p>
        <h1 className="mt-4 max-w-2xl text-headline text-ivory">
          This space does not exist — yet.
        </h1>
        <p className="mt-6 max-w-xl text-lede text-ivory/70">
          The page you were looking for may have moved, or the link may be incomplete. Let us help
          you find your way back.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-light">
            <span>
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/projects" className="btn btn-outline-invert">
            <span>Explore Our Projects</span>
          </Link>
        </div>

        <nav aria-label="Site" className="mt-14 border-t border-ivory/15 pt-8">
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-taupe">
            Or continue to
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {continueLinks.map((link) => (
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
