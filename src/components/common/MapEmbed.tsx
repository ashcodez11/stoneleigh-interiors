import { site } from "@/lib/site";

/**
 * Embedded map for the verified studio address.
 * Uses the public Google Maps embed (no API key required) so the pin always
 * reflects the address the client supplied.
 */
export function MapEmbed() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&z=15&output=embed`;

  return (
    <div className="relative h-full min-h-[20rem] w-full overflow-hidden border border-charcoal/12 bg-stone-soft">
      <iframe
        title={`Map showing ${site.name} at ${site.address.full}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[0.35] contrast-[1.03]"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
