import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** `light` inverts the text for dark charcoal sections. */
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  /** Cap the lede measure for comfortable reading. */
  narrow?: boolean;
};

/** Consistent editorial section header used on every page. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  className = "",
  narrow = false,
}: SectionHeadingProps) {
  const onDark = tone === "light";

  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <span
          className={`eyebrow ${align === "center" ? "eyebrow-plain justify-center" : ""} ${
            onDark ? "eyebrow-invert" : ""
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-5 text-headline text-balance ${onDark ? "text-ivory" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-6 text-lede text-pretty ${narrow ? "max-w-2xl" : "max-w-3xl"} ${
            align === "center" ? "mx-auto" : ""
          } ${onDark ? "text-ivory/70" : "text-charcoal/70"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
