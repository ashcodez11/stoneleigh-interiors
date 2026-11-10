import Link from "next/link";
import type { Breadcrumb } from "@/lib/seo";

/** Visible breadcrumb trail (paired with BreadcrumbList JSON-LD). */
export function Breadcrumbs({
  trail,
  tone = "dark",
}: {
  trail: Breadcrumb[];
  tone?: "dark" | "light";
}) {
  const isDark = tone === "light";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.18em] ${
          isDark ? "text-ivory/60" : "text-taupe"
        }`}
      >
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-3">
              {isLast ? (
                <span aria-current="page" className={isDark ? "text-ivory" : "text-charcoal"}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden className="text-sage-deep">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
