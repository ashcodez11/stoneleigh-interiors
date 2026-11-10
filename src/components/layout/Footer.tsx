import Link from "next/link";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";
import { ArrowRight, ArrowUpRight, Instagram, WhatsApp } from "@/components/ui/icons";
import { CookiePreferencesButton } from "@/components/common/CookiePreferencesButton";
import { getCopyrightYear } from "@/lib/year";

/**
 * Premium editorial footer (brief Section J) — the closing spread of the site.
 *
 * Deliberately dark: a deep burnt espresso ground rather than the porcelain the
 * page body uses, so the site closes like the last page of an architecture
 * magazine rather than a generic dark SaaS strip. The full dark palette lives
 * in `globals.css` (`espresso`, `espresso-soft`, `espresso-line`,
 * `terracotta-light`, `sand-light`).
 *
 * Honesty rules still apply: the Instagram and Google-review affordances are
 * truthiness-gated so no empty or invented link is ever shipped.
 */
export async function Footer() {
  const year = await getCopyrightYear();
  const whatsapp = whatsappLink(
    "Hello Stoneleigh Interiors, I'd like to discuss an interior project.",
  );
  const instagram = site.social.instagram;
  const googleReview = site.social.googleReview;

  return (
    <footer className="relative overflow-hidden bg-espresso text-porcelain">
      {/* A soft terracotta bloom keeps the dark ground from reading as flat
          black and ties the footer back to the accent family. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-terracotta/15 blur-3xl"
      />

      <div className="relative container-luxe">
        {/* --- Closing headline -------------------------------------------- */}
        <div className="grid gap-12 pt-[clamp(4.5rem,9vw,8.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)] lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-invert eyebrow-plain">Let&rsquo;s begin</p>
            <h2 className="mt-7 font-serif text-headline text-porcelain">
              Let&rsquo;s Create Spaces
              <br className="hidden sm:block" /> That Feel Like Home.
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-lede text-sand-light">
              Tell us about your home — the light, the rooms and the life you want
              them to hold. A conversation is where every Stoneleigh project begins.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-accent">
                <span>
                  Start Your Enquiry
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/projects" className="btn btn-outline-invert">
                <span>View Our Projects</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-espresso-line" />

        {/* --- Brand, navigation, services, studio ------------------------- */}
        <div className="grid gap-12 py-[clamp(3.5rem,6vw,5.5rem)] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.25fr] lg:gap-10">
          {/* Brand */}
          <div>
            <span className="flex flex-col leading-[0.92]">
              <span className="font-serif text-[clamp(2.25rem,3.6vw,3rem)] text-porcelain">
                Stoneleigh
              </span>
              <span className="mt-[0.4em] text-[0.625rem] font-medium uppercase tracking-[0.5em] text-terracotta-light">
                Interiors
              </span>
            </span>

            <p className="mt-7 max-w-sm text-sm leading-relaxed text-sand-light">
              A bespoke interior design studio in {site.address.city}, designing
              considered homes around light, honest materials and the way people
              actually live.
            </p>

            <div className="mt-8 flex items-center gap-4">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Instagram`}
                  className="flex h-11 w-11 items-center justify-center border border-espresso-line text-sand-light transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enquire on WhatsApp"
                  className="flex h-11 w-11 items-center justify-center border border-espresso-line text-sand-light transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
                >
                  <WhatsApp className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <h3 className="eyebrow eyebrow-invert eyebrow-plain">Navigate</h3>
            <ul className="mt-7 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-light transition-colors duration-300 hover:text-porcelain"
                  >
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="eyebrow eyebrow-invert eyebrow-plain">Services</h3>
            <ul className="mt-7 space-y-3.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-sand-light transition-colors duration-300 hover:text-porcelain"
                  >
                    <span className="link-underline">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <div>
            <h3 className="eyebrow eyebrow-invert eyebrow-plain">Studio</h3>
            <address className="mt-7 text-sm not-italic leading-relaxed text-sand-light">
              {site.address.full}
            </address>

            {site.contact.phone && (
              <p className="mt-4 text-sm text-sand-light">
                <a
                  href={`tel:${site.contact.phone}`}
                  className="transition-colors duration-300 hover:text-porcelain"
                >
                  {site.contact.phone}
                </a>
              </p>
            )}
            {site.contact.email && (
              <p className="mt-1.5 text-sm text-sand-light">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors duration-300 hover:text-porcelain"
                >
                  {site.contact.email}
                </a>
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3.5">
              <a
                href={site.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-terracotta-light"
              >
                <span className="link-underline">Get directions</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {googleReview && (
                <a
                  href={googleReview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-terracotta-light"
                >
                  <span className="link-underline">Read Google reviews</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>

            {site.responseExpectation && (
              <p className="mt-6 text-xs leading-relaxed text-sand-light/60">
                {site.responseExpectation}
              </p>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-espresso-line" />

        {/* --- Legal ------------------------------------------------------- */}
        <div className="flex flex-col gap-5 py-8 text-xs text-sand-light/70 md:flex-row md:items-center md:justify-between">
          <p className="shrink-0">
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-porcelain"
            >
              Privacy Policy
            </Link>
            <CookiePreferencesButton className="text-left transition-colors duration-300 hover:text-porcelain" />
            <a
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-porcelain"
            >
              Google Maps
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
