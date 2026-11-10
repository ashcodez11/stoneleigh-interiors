"use client";

import Script from "next/script";

import { useConsent } from "@/lib/useConsent";

/**
 * Google Analytics 4 — loaded ONLY when both conditions are true:
 *  1. the studio owner has configured a GA4 property ID, and
 *  2. the visitor has actively consented to analytics cookies.
 *
 * Until consent is given nothing is fetched and no analytics cookie is set,
 * so no non-essential tracking happens before a choice is made.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const { hydrated, consent } = useConsent();

  if (!hydrated || !measurementId || !consent?.analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
