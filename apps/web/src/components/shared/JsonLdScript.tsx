"use client";

/**
 * Renders JSON-LD structured data inside a client component.
 * Used for Product/Article/FAQ/Service schemas on client-rendered pages.
 */
export default function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
