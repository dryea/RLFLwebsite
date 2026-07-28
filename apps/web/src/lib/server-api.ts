const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export async function serverFetchAPI(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: 300 },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
