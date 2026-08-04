import createMiddleware from "next-intl/middleware";
import { redirects } from "@/lib/redirects";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

// Cache of CMS redirects keyed by source path. Refreshed on cache miss in-flight.
const cmsRedirectCache = new Map<string, { target: string; type: number }>();
let redirectsFetchedAt = 0;
let redirectsFetchPromise: Promise<void> | null = null;
const REDIRECTS_TTL = 60_000;

function loadCmsRedirects(): Promise<void> {
  if (redirectsFetchPromise) return redirectsFetchPromise;
  const api = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";
  redirectsFetchPromise = fetch(`${api}/api/seo/redirects`, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : []))
    .then((data) => {
      cmsRedirectCache.clear();
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.source && item.target) {
            const src = item.source.startsWith("/") ? item.source : `/${item.source}`;
            cmsRedirectCache.set(src, { target: item.target, type: item.type || 301 });
          }
        }
      }
      redirectsFetchedAt = Date.now();
    })
    .catch(() => {})
    .finally(() => {
      redirectsFetchPromise = null;
    });
  return redirectsFetchPromise;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/cms") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/manifest") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Static redirects (legacy)
  const staticRedirect = redirects[pathname];
  if (staticRedirect) {
    const url = new URL(staticRedirect, request.url);
    return NextResponse.redirect(url, 301);
  }

  // CMS redirects with periodic refresh
  if (Date.now() - redirectsFetchedAt > REDIRECTS_TTL) {
    await loadCmsRedirects();
  }
  const cmsRedirect = cmsRedirectCache.get(pathname) || cmsRedirectCache.get(pathname.toLowerCase());
  if (cmsRedirect) {
    const url = new URL(cmsRedirect.target, request.url);
    return NextResponse.redirect(url, cmsRedirect.type || 301);
  }

  return handleI18nRouting(request as any as Parameters<typeof handleI18nRouting>[0]);
}

export const config = {
  matcher: "/((?!_next|api|cms|favicon|manifest|icon).*)",
};
