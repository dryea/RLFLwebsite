/**
 * Generate a human-readable alt text suggestion from a filename.
 * E.g. "home-loan-banner.png" -> "Home Loan Banner"
 */
export function suggestAltText(filename: string): string {
  const name = filename
    .replace(/\.[^.]+$/, "") // strip extension
    .replace(/[-_]+/g, " ")
    .replace(/[0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = name.split(" ").filter(Boolean);
  const capitalized = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return capitalized ? `${capitalized} - Reliance Finance Limited` : "Reliance Finance Limited";
}
