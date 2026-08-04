export const ROOT_ROUTES = [
  "/services", "/branches", "/careers", "/contact", "/faq", "/gallery",
  "/downloads", "/emi-calculator", "/loan-enquiry", "/calendar", "/search",
  "/banking-hours", "/auction-notice", "/merchant-offers", "/partner", "/write-to-us",
];

export function localize(href: string, lang: string): string {
  if (href.startsWith("http")) return href;
  if (href.startsWith("/api")) return href;
  const rootMatch = ROOT_ROUTES.find((r) => href === r || href.startsWith(`${r}/`));
  if (rootMatch) return href;
  return `/${lang}${href}`;
}
