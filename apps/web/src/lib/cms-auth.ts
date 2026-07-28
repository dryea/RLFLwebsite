const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export interface CmsUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function cmsLogin(email: string, password: string): Promise<CmsUser> {
  const res = await fetch(`${API_URL}/api/cms/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  localStorage.setItem("cms_token", data.token);
  localStorage.setItem("cms_user", JSON.stringify(data.user));
  return data.user;
}

export function cmsLogout() {
  localStorage.removeItem("cms_token");
  localStorage.removeItem("cms_user");
  window.location.href = "/cms/login";
}

export function getCmsUser(): CmsUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cms_user");
  return raw ? JSON.parse(raw) : null;
}

export function getCmsToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cms_token");
}
