const API = "https://rfil-api.sudeepdhakal.workers.dev";

export async function fetchAPI(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export function getServices() { return fetchAPI("/api/cms/services"); }
export function getBranches() { return fetchAPI("/api/cms/branches"); }
export function getFaqs() { return fetchAPI("/api/cms/faq"); }
export function getCareers() { return fetchAPI("/api/cms/careers"); }
export function getAlbums() { return fetchAPI("/api/cms/albums"); }
export function getDownloads() { return fetchAPI("/api/cms/downloads"); }
export function getDownloadCategories() { return fetchAPI("/api/cms/download-categories"); }
export function getNews() { return fetchAPI("/api/cms/news"); }
export function getEvents() { return fetchAPI("/api/cms/events"); }
export function getProducts() { return fetchAPI("/api/cms/products"); }
export function getProductCategories() { return fetchAPI("/api/cms/product-categories"); }
export function getNotices() { return fetchAPI("/api/cms/notices"); }
export function getRates() { return fetchAPI("/api/cms/rates"); }
export function search(q: string) { return fetchAPI(`/api/search?q=${encodeURIComponent(q)}`); }
