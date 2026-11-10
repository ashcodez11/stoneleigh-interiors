"use client";

import { useSyncExternalStore } from "react";

import { getConsentSnapshot, subscribeConsent, type ConsentState } from "./consent";

/**
 * Client hook for the stored cookie choice.
 *
 * Kept in its own `"use client"` module because `useSyncExternalStore` is not
 * available to Server Components, while `./consent` (the data and storage
 * layer) is imported by the Cookie Policy page as well.
 *
 * `hydrated` is false during SSR and the first hydration render, so the banner
 * is never rendered on the server, and true once the client has taken over.
 */

/** Nothing to observe — used only to detect when the client has mounted. */
const subscribeNever = () => () => {};

export function useConsent() {
  const isClient = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const consent: ConsentState | null = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    () => null,
  );

  return { consent, hydrated: isClient, hasDecided: isClient && consent !== null };
}
