import type { Metadata } from "next";
import { site } from "./site";
import { socialImages } from "./images";

type SeoInput = {
  title: string;
  description: string;
  /** Route path beginning with "/" — used for canonical + Open Graph URLs. */
  path: string;
  /** Optional dedicated social image. */
  image?: { src: string; alt: string; width: number; height: number };
  keywords?: string[];
};

/**
 * Absolute URL for a site-relative asset path.
 * Open Graph and Twitter crawlers require fully-qualified image URLs, while the
 * image configuration stores local `/assets/...` paths.
 */
function absoluteUrl(src: string): string {
  return src.startsWith("http") ? src : `${site.url}${src}`;
}

/**
 * Builds a complete, unique Metadata object for a page:
 * title, description, canonical URL, Open Graph and Twitter cards.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = socialImages.home,
  keywords,
}: SeoInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const imageUrl = absoluteUrl(image.src);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * InteriorDesignService structured data, built entirely from the one piece of
 * business information the client verified: the registered address. No phone,
 * email, opening hours, price range or aggregate rating is asserted, because
 * none has been supplied — inventing them would create false structured data.
 */
export function localBusinessJsonLd() {
  const { address, name, description, url, mapsDirectionsUrl } = site;

  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesignService",
    "@id": `${url}/#studio`,
    name,
    description,
    url,
    image: `${url}${socialImages.home.src}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.line1}, ${address.line2}`,
      addressLocality: address.area,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: address.city,
    },
    hasMap: mapsDirectionsUrl,
    sameAs: [site.social.instagram].filter(Boolean),
  };
}

export type Breadcrumb = { name: string; href: string };

/** BreadcrumbList structured data built from an ordered trail. */
export function breadcrumbJsonLd(trail: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

/** FAQPage structured data — built only from questions the studio genuinely answers. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
