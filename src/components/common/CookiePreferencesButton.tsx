"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

/**
 * Footer control that re-opens the cookie preferences panel.
 * Lives in its own client component so the (server-rendered) footer keeps its
 * markup and stays a server component.
 */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
