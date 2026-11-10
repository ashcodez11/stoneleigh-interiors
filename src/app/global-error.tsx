"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Root error boundary. Next.js renders this *instead of* the root layout when
 * an error escapes it, so it must define its own <html>/<body>. Global styles
 * are not guaranteed here, so the brand palette is applied with inline styles
 * rather than Tailwind classes. The thrown value is never shown to the user.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#30231f",
          color: "#f7f2ea",
          fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
          fontWeight: 400,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#c1846c",
            }}
          >
            Stoneleigh Interiors
          </p>

          <h1
            style={{
              margin: "1.25rem 0 0",
              fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
              lineHeight: 1.08,
              fontWeight: 400,
            }}
          >
            Something went wrong.
          </h1>

          <p
            style={{
              margin: "1.25rem 0 0",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#c9b8aa",
            }}
          >
            The page could not be displayed. Please try again, or return to the
            homepage.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "1.0625rem 2rem",
                border: "1px solid transparent",
                borderRadius: "1px",
                cursor: "pointer",
                backgroundColor: "#875744",
                color: "#f7f2ea",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "1.0625rem 2rem",
                border: "1px solid rgba(247, 242, 234, 0.45)",
                borderRadius: "1px",
                cursor: "pointer",
                textDecoration: "none",
                color: "#f7f2ea",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
