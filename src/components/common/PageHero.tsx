import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealLines } from "@/components/motion/Reveal";
import type { ImageAsset } from "@/lib/images";
import type { Breadcrumb } from "@/lib/seo";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  trail: Breadcrumb[];
  image?: ImageAsset;
};

/**
 * Inner-page masthead. Uses a photographic full-bleed treatment when an image is
 * supplied, otherwise a quiet linen editorial band.
 */
export function PageHero({ eyebrow, title, lede, trail, image }: PageHeroProps) {
  const lines = title.split("\n");

  if (image) {
    return (
      <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden bg-charcoal-deep pb-14 pt-32 md:min-h-[70vh] md:pb-20">
        <ImageReveal
          asset={image}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/45 to-charcoal-deep/60"
        />
        <div className="container-luxe relative z-10">
          <Breadcrumbs trail={trail} tone="light" />
          {eyebrow && <span className="eyebrow eyebrow-invert mt-6">{eyebrow}</span>}
          <h1 className="mt-5 max-w-4xl text-headline text-ivory">
            <RevealLines lines={lines} />
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-lede text-ivory/75">{lede}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-charcoal/12 bg-linen/50 pb-14 pt-16 md:pb-20 md:pt-20">
      <div className="container-luxe">
        <Breadcrumbs trail={trail} />
        {eyebrow && <span className="eyebrow mt-6">{eyebrow}</span>}
        <h1 className="mt-5 max-w-4xl text-headline text-charcoal">
          <RevealLines lines={lines} />
        </h1>
        {lede && <p className="mt-6 max-w-2xl text-lede text-charcoal/70">{lede}</p>}
      </div>
    </section>
  );
}
