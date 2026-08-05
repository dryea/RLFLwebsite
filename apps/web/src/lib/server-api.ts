import { getCloudflareContext } from "@opennextjs/cloudflare";

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

type ApiFetcher = (path: string, init?: RequestInit) => Promise<Response>;

/**
 * Resolves a fetcher for the rfil-api worker. Prefers the Cloudflare service
 * binding (env.API) at runtime — this avoids worker-to-worker public fetches,
 * which Cloudflare's edge security may block (404/403). Falls back to the
 * public API URL during `next build` (no Cloudflare runtime available).
 */
async function resolveApiFetcher(): Promise<ApiFetcher> {
  try {
    const { env } = getCloudflareContext();
    const api = (env as unknown as { API?: { fetch: ApiFetcher } }).API;
    if (api && typeof api.fetch === "function") {
      // Service binding requires an absolute URL (the host is ignored; it
      // routes directly to the bound rfil-api worker, bypassing the edge).
      return (path: string, init?: RequestInit) => api.fetch(`${API}${path}`, init);
    }
  } catch {
    // Not running inside the Cloudflare worker (e.g. next build / local dev)
  }
  return (path: string, init?: RequestInit) => fetch(`${API}${path}`, init);
}

export async function serverFetchAPI(path: string, init?: RequestInit) {
  try {
    const apiFetch = await resolveApiFetcher();
    const res = await apiFetch(path, {
      cache: "no-store",
      ...(init as RequestInit),
    });
    if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
    return await res.json();
  } catch (err: any) {
    console.error("[serverFetchAPI]", path, err?.message, err?.cause?.message || "");
    throw new Error(`serverFetchAPI failed: ${path} — ${err?.message} ${err?.cause?.message || ""}`);
  }
}

/**
 * Same as serverFetchAPI but compatible with static generation:
 * uses a plain fetch (no Next cache options) so pages/sitemaps can be
 * statically rendered at build time without runtime cache bindings.
 */
export async function serverFetchAPIRevalidate(path: string, _revalidate = 3600) {
  try {
    const apiFetch = await resolveApiFetcher();
    const res = await apiFetch(path);
    if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
    return await res.json();
  } catch (err: any) {
    console.error("[serverFetchAPIRevalidate]", path, err?.message, err?.cause?.message || "");
    throw new Error(`serverFetchAPIRevalidate failed: ${path} — ${err?.message} ${err?.cause?.message || ""}`);
  }
}
