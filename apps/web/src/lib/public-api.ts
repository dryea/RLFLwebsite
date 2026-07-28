const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export async function fetchAPI(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export function getServices() { return fetchAPI("/api/services"); }
export function getBranches() { return fetchAPI("/api/branches"); }
export function getFaqs() { return fetchAPI("/api/faq"); }
export function getCareers() { return fetchAPI("/api/careers"); }
export function getAlbums() { return fetchAPI("/api/gallery/albums"); }
export function getDownloads() { return fetchAPI("/api/downloads"); }
export function getDownloadCategories() { return fetchAPI("/api/downloads/categories"); }
export function getNews() { return fetchAPI("/api/news"); }
export function getEvents() { return fetchAPI("/api/events"); }
export function getProducts() { return fetchAPI("/api/products"); }
export function getProductCategories() { return fetchAPI("/api/products/categories"); }
export function getNotices() { return fetchAPI("/api/notices"); }
export function getRates() { return fetchAPI("/api/rates"); }
export function getNoticeCategories() { return fetchAPI("/api/notices/categories"); }
export function getReportCategories() { return fetchAPI("/api/reports/categories"); }
export function getReports() { return fetchAPI("/api/reports"); }
export function getTeamCategories() { return fetchAPI("/api/team/categories"); }
export function getTeamMembers(categorySlug: string) { return fetchAPI(`/api/team/${categorySlug}`); }
export function search(q: string) { return fetchAPI(`/api/search?q=${encodeURIComponent(q)}`); }
