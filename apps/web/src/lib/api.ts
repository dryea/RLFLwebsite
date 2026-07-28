const API = "https://rfil-api.sudeepdhakal.workers.dev";

async function request(path: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("cms_token") : null;
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string> || {}),
  };
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

// Build CRUD methods dynamically for each resource
const resources = [
  "products", "services", "product-categories", "team-members",
  "branches", "rates", "news", "events", "notices", "reports",
  "albums", "faq", "careers", "auctions", "merchants", "settings",
];

function resourceMethods(resource: string) {
  const base = `/api/cms/${resource}`;
  const name = resource.replace(/-./g, (s) => s[1].toUpperCase());
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return {
    [`get${capitalize(name)}`]: (params?: string) => request(`${base}${params ? `?${params}` : ""}`),
    [`get${capitalize(name)}ById`]: (id: number) => request(`${base}/${id}`),
    [`create${capitalize(name)}`]: (data: any) => request(`${base}`, { method: "POST", body: JSON.stringify(data) }),
    [`update${capitalize(name)}`]: (id: number, data: any) => request(`${base}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    [`delete${capitalize(name)}`]: (id: number) => request(`${base}/${id}`, { method: "DELETE" }),
  };
}

export const api = {
  // Pages
  getPages: (params?: string) => request(`/api/cms/pages${params ? `?${params}` : ""}`),
  getPage: (id: number) => request(`/api/cms/pages/${id}`),
  createPage: (data: any) => request("/api/cms/pages", { method: "POST", body: JSON.stringify(data) }),
  updatePage: (id: number, data: any) => request(`/api/cms/pages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePage: (id: number) => request(`/api/cms/pages/${id}`, { method: "DELETE" }),
  getPageVersions: (id: number) => request(`/api/cms/pages/${id}/versions`),

  // Media
  getMedia: (folder?: number) => request(`/api/cms/media${folder ? `?folder=${folder}` : ""}`),
  getMediaFolders: () => request("/api/cms/media/folders"),
  uploadMedia: async (file: File, folderId?: number) => {
    const token = localStorage.getItem("cms_token");
    const form = new FormData();
    form.append("file", file);
    if (folderId) form.append("folderId", String(folderId));
    const res = await fetch(`${API}/api/cms/media/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
  deleteMedia: (id: number) => request(`/api/cms/media/${id}`, { method: "DELETE" }),

  // Dashboard
  getStats: () => request("/api/cms/dashboard/stats"),

  // Public
  search: (q: string) => request(`/api/search?q=${encodeURIComponent(q)}`),

  // Auto-generated resource methods
  ...Object.assign({}, ...resources.map(resourceMethods)),
} as any;
