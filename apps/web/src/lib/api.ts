const API = "https://rfil-api.sudeepdhakal.workers.dev";

async function request(path: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("cms_token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers as Record<string, string> || {}),
  };
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
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
};
