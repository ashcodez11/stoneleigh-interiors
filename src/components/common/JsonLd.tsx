/**
 * Renders a JSON-LD structured-data script tag.
 * Uses native <script> (not next/script) because this is data, not executable
 * code — see the Next.js JSON-LD guidance.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
