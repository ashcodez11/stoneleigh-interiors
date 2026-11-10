/**
 * Route-level loading UI. Rendered inside the root layout (so the header and
 * footer stay interactive) while a route segment streams in. Deliberately
 * quiet: a centred brand mark over a slim terracotta hairline that breathes —
 * no spinner, and a fixed min-height so nothing shifts when content arrives.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[calc(100dvh-var(--header-h))] w-full flex-col items-center justify-center gap-6 bg-ivory px-6 text-center"
    >
      <span className="sr-only">Loading</span>

      <p className="font-serif text-title text-charcoal/85" aria-hidden>
        Stoneleigh Interiors
      </p>

      <span
        aria-hidden
        className="relative block h-px w-40 overflow-hidden bg-linen"
      >
        <span className="absolute inset-0 block origin-left animate-pulse bg-sage" />
      </span>

      <p
        aria-hidden
        className="text-[0.6875rem] uppercase tracking-[0.28em] text-taupe"
      >
        Preparing your space
      </p>
    </div>
  );
}
