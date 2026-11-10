import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { JsonLd } from "@/components/common/JsonLd";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { CookieConsent } from "@/components/common/CookieConsent";
import { localBusinessJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { socialImages } from "@/lib/images";

/**
 * Typography — Instrument Serif for editorial headings, Inter for everything
 * else. Both are self-hosted by `next/font`, so there is no render-blocking
 * third-party request and no layout shift.
 *
 * Instrument Serif ships a single regular weight; `globals.css` therefore pins
 * heading weight to 400 rather than asking the browser to synthesise a bold.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultTitle = `${site.name} — Luxury Interior Design Studio in Bengaluru`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "interior designers in Bengaluru",
    "luxury interior design Bengaluru",
    "modular kitchen design Bengaluru",
    "complete home interiors Bengaluru",
    "wardrobe and storage design",
    "bespoke interior solutions Bengaluru",
    "Whitefield interior designer",
  ],
  category: "Interior Design",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: defaultTitle,
    description: site.description,
    images: [
      {
        url: `${site.url}${socialImages.home.src}`,
        width: socialImages.home.width,
        height: socialImages.home.height,
        alt: socialImages.home.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [`${site.url}${socialImages.home.src}`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F2EA",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${instrumentSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-ivory text-charcoal">
        <JsonLd data={localBusinessJsonLd()} />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
        >
          Skip to content
        </a>

        <Header />
        <main id="main" className="flex-1 pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />

        {site.analytics.ga4MeasurementId && (
          <GoogleAnalytics measurementId={site.analytics.ga4MeasurementId} />
        )}
        <CookieConsent />
      </body>
    </html>
  );
}
