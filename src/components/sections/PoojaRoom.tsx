import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { poojaRoomImage } from "@/lib/images";

/**
 * Section — Pooja rooms & Indian interiors.
 *
 * A single editorial feature for the studio's sacred-space work, sitting mid-page
 * on the deep espresso band so the warm interior reads as a lit, framed moment.
 *
 * The frame carries the supplied pooja-room photograph at its native 1:1
 * proportions, so it is neither stretched nor cropped, and it is captioned as a
 * pooja room — never as a living room.
 */
export function PoojaRoom() {
  return (
    <section
      className="section bg-charcoal-deep"
      aria-label="Pooja rooms and Indian interiors"
    >
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <ImageReveal
            asset={poojaRoomImage}
            className="aspect-square w-full ring-1 ring-ivory/10"
            sizes="(max-width: 1024px) 100vw, 50vw"
            parallax={4}
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Pooja Rooms & Indian Interiors"
            tone="light"
            title={
              <>
                A sacred corner, <em className="italic text-stone">held in light</em>
              </>
            }
            lede="Pooja rooms and mandir corners, designed with the same care as every other room in the home — a calm surface, a considered threshold and lighting that gathers softly around the rituals they hold."
          />

          <RevealRule className="hairline-invert mt-8 max-w-xs" delay={0.05} />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-ivory/70">
              The mandir, storage for ritual objects, seating and ventilation are resolved
              together with the rooms around them, so the sacred space belongs to the whole
              home rather than sitting apart from it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
