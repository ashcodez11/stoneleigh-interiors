import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowUpRight } from "@/components/ui/icons";

/** Image-led service card with a refined hover state. */
export function ServiceCard({
  service,
  index,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  service: Service;
  index: number;
  sizes?: string;
}) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative block focus-visible:outline-offset-8"
      aria-label={`${service.title} — view service details`}
    >
      <div className="media aspect-3/4">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="absolute inset-0 z-[2] bg-gradient-to-t from-charcoal-deep/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-[3] block h-px origin-left scale-x-0 bg-sage transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-100"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="text-[0.625rem] uppercase tracking-[0.22em] text-taupe">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-serif text-2xl leading-tight text-charcoal transition-colors duration-300 group-hover:text-sage-deep">
            {service.title}
          </h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-charcoal/65">
            {service.blurb}
          </p>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-charcoal/20 text-charcoal transition-all duration-500 group-hover:border-sage group-hover:bg-sage group-hover:text-ivory">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
