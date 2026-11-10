/**
 * Cookie consent state.
 *
 * Shared by the consent banner, the analytics gate and the footer's
 * "Cookie preferences" control.
 *
 * Design rule: a category can only ever be switched ON when the service behind
 * it is actually configured. Nothing non-essential is loaded, and no
 * non-essential cookie is written, before the visitor has consented.
 *
 * This module is deliberately free of React so it can also be imported by
 * Server Components (the Cookie Policy renders `NECESSARY_STORAGE`). The
 * client hook lives in `./useConsent`.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = {
  version: number;
  /** Always true — the site cannot function without these. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the visitor's most recent choice. */
  updatedAt: string;
};

export const CONSENT_STORAGE_KEY = "stoneleigh.cookie-consent";
export const CONSENT_VERSION = 1;

/** Dispatched on `window` whenever the stored consent changes. */
export const CONSENT_CHANGE_EVENT = "stoneleigh:consent-change";
/** Dispatched on `window` by the footer control to re-open preferences. */
export const CONSENT_OPEN_EVENT = "stoneleigh:open-cookie-preferences";

/**
 * The only browser storage this site writes itself. Listed in the Cookie
 * Policy and treated as strictly necessary.
 */
export const NECESSARY_STORAGE = [
  {
    name: CONSENT_STORAGE_KEY,
    purpose: "Remembers your cookie choices so the banner is not shown again.",
    duration: "Until you clear your browser storage.",
  },
];

/** Turns a raw stored string into a validated state, or null if unusable. */
function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    // Corrupt value — treat as "not decided" rather than guess.
    return null;
  }
}

/** Raw stored string, or null when absent / storage is unavailable. */
function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    // Private mode / storage disabled — treat as "not decided" rather than guess.
    return null;
  }
}

/** Reads the stored choice. Returns null when the visitor has not decided yet. */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  return parseConsent(readRaw());
}

/** Persists a choice and notifies listeners. */
export function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the choice cannot be remembered after this visit.
  }
  invalidateSnapshot();
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }));
  return state;
}

/** Removes the stored choice (used when a version changes). */
export function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* no-op */
  }
  invalidateSnapshot();
}

/**
 * Cached snapshot for `useSyncExternalStore`. React compares the returned value
 * by identity, so parsing on every call would loop forever — the cache keeps a
 * stable reference until the underlying stored string actually changes.
 */
let snapshotRaw: string | null | undefined;
let snapshotValue: ConsentState | null = null;

function invalidateSnapshot() {
  snapshotRaw = undefined;
}

export function getConsentSnapshot(): ConsentState | null {
  const raw = readRaw();
  if (raw !== snapshotRaw) {
    snapshotRaw = raw;
    snapshotValue = parseConsent(raw);
  }
  return snapshotValue;
}

/** Subscribes to changes in the stored consent. Used by the client hook. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
