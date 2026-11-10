"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { site } from "@/lib/site";
import { Close } from "@/components/ui/icons";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/consent";
import { useConsent } from "@/lib/useConsent";

/**
 * Cookie consent banner + preferences panel.
 *
 * - Necessary cookies are always on.
 * - Analytics can only be switched on when a GA4 property ID is configured.
 * - Marketing can only be switched on when a marketing service is configured.
 *
 * Until the visitor chooses, no non-essential script runs and no non-essential
 * cookie is written.
 */
export function CookieConsent() {
  const reduce = useReducedMotion();
  const { hydrated, hasDecided } = useConsent();

  const analyticsAvailable = Boolean(site.analytics.ga4MeasurementId);
  /** No advertising / marketing service is wired up, so the category stays off. */
  const marketingAvailable = false;

  const [manualOpen, setManualOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const [view, setView] = useState<"banner" | "preferences">("banner");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Shown until the visitor decides, unless they have dismissed it. Derived on
   * the client rather than pushed into state from an effect, so the banner is
   * never rendered on the server and no cascading render is triggered.
   */
  const open = !closed && (manualOpen || (hydrated && !hasDecided));

  function close() {
    setManualOpen(false);
    setClosed(true);
  }

  // Re-open from the footer ("Cookie preferences").
  useEffect(() => {
    const onOpen = () => {
      const stored = readConsent();
      setAnalytics(stored?.analytics ?? false);
      setMarketing(stored?.marketing ?? false);
      setView("preferences");
      setClosed(false);
      setManualOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  // Escape closes the panel; if nothing has been decided yet, fall back to the banner.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (view === "preferences" && !hasDecided) {
        setView("banner");
      } else {
        setManualOpen(false);
        setClosed(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, view, hasDecided]);

  function decide(nextAnalytics: boolean, nextMarketing: boolean) {
    saveConsent(nextAnalytics, nextMarketing);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setView("banner");
    close();
  }

  const buttonBase =
    "inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300";
  const buttonPrimary = `${buttonBase} border-linen bg-linen text-charcoal-deep hover:border-sage hover:bg-sage`;
  const buttonGhost = `${buttonBase} border-linen/35 text-ivory hover:border-linen hover:bg-linen hover:text-charcoal-deep`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            ref={panelRef}
            role={view === "preferences" ? "dialog" : "region"}
            aria-modal={view === "preferences" ? false : undefined}
            aria-label={view === "preferences" ? "Cookie preferences" : "Cookie consent"}
            className="max-h-[85dvh] w-full max-w-2xl overflow-y-auto border border-linen/15 bg-charcoal-deep/97 text-ivory shadow-[0_-12px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            {view === "banner" ? (
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <h2 className="font-serif text-2xl leading-tight text-ivory sm:text-3xl">
                    Your privacy
                  </h2>
                  <button
                    type="button"
                    onClick={() => decide(false, false)}
                    aria-label="Reject non-essential cookies and close"
                    className="-mr-1 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-ivory/60 transition-colors hover:text-ivory"
                  >
                    <Close className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/70">
                  We use necessary cookies to run this website. Analytics cookies are optional and
                  stay off until you accept them.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className={buttonPrimary}
                    onClick={() => decide(analyticsAvailable, marketingAvailable)}
                  >
                    Accept all
                  </button>
                  <button type="button" className={buttonGhost} onClick={() => decide(false, false)}>
                    Reject non-essential
                  </button>
                  <button
                    type="button"
                    className={`${buttonGhost} border-transparent underline decoration-ivory/40 underline-offset-4 hover:bg-transparent hover:text-stone`}
                    onClick={() => setView("preferences")}
                  >
                    Manage preferences
                  </button>
                </div>

                <p className="mt-5 text-xs text-ivory/50">
                  Read our{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-ivory">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <h2 className="font-serif text-2xl leading-tight text-ivory sm:text-3xl">
                    Cookie preferences
                  </h2>
                  <button
                    type="button"
                    onClick={() => (hasDecided ? close() : setView("banner"))}
                    aria-label="Close cookie preferences"
                    className="-mr-1 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-ivory/60 transition-colors hover:text-ivory"
                  >
                    <Close className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/70">
                  Choose which categories you allow. You can change this at any time from the
                  footer.
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="border border-linen/15 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                          Necessary
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                          Required for the site to work — remembering your cookie choice. Always
                          active.
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-[0.625rem] uppercase tracking-[0.16em] text-stone">
                        Always on
                      </span>
                    </div>
                  </li>

                  <li className="border border-linen/15 p-4">
                    <label className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                          Analytics
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ivory/60">
                          {analyticsAvailable
                            ? "Aggregate, anonymous statistics about how the site is used."
                            : "No analytics service is configured on this site, so this stays off."}
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 shrink-0 accent-sage disabled:opacity-40"
                        checked={analyticsAvailable && analytics}
                        disabled={!analyticsAvailable}
                        onChange={(event) => setAnalytics(event.target.checked)}
                      />
                    </label>
                  </li>

                  <li className="border border-linen/15 p-4">
                    <label className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                          Marketing
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ivory/60">
                          No advertising or marketing service is configured, so this stays off.
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 shrink-0 accent-sage disabled:opacity-40"
                        checked={marketingAvailable && marketing}
                        disabled={!marketingAvailable}
                        onChange={(event) => setMarketing(event.target.checked)}
                      />
                    </label>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className={buttonPrimary}
                    onClick={() =>
                      decide(
                        analyticsAvailable && analytics,
                        marketingAvailable && marketing,
                      )
                    }
                  >
                    Save preferences
                  </button>
                  <button type="button" className={buttonGhost} onClick={() => decide(false, false)}>
                    Reject non-essential
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
