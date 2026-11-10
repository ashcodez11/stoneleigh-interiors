/**
 * The copyright year for the footer.
 *
 * Reading the clock during prerendering is not permitted, so the value is
 * produced inside a cached function — it is baked into the static shell at
 * build time and refreshed on every deployment.
 */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
