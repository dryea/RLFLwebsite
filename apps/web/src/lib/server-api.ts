const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export async function serverFetchAPI(path: string, init?: RequestInit) {
  try {
    const res = await fetch(`${API}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
    return await res.json();
  } catch (err: any) {
    console.error("[serverFetchAPI]", path, err?.message, err?.cause?.message || "");
    throw new Error(`serverFetchAPI failed: ${path} — ${err?.message} ${err?.cause?.message || ""}`);
  }
}
