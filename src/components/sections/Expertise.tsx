import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/services";
import { ArrowRight } from "@/components/ui/icons";

/** Section D — Our Expertise: the six disciplines as image-led cards. */
export function Expertise() {
  return (
    <section className="section bg-ivory" aria-label="Our expertise">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Expertise"
            title={
              <>
                What we <em className="italic text-sage-deep">design</em>
              </>
            }
            lede="From a single modular kitchen to a complete home delivered turnkey — one studio, one palette, one standard of detailing."
            className="lg:max-w-2xl"
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-charcoal"
            >
              <span className="link-underline">All services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.07}>
              <ServiceCard
                service={service}
                index={index}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
