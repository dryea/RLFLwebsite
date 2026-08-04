import createMiddleware from "next-intl/middleware";
import { redirects } from "@/lib/redirects";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
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

  const redirect = redirects[pathname];
  if (redirect) {
    const url = new URL(redirect, request.url);
    return NextResponse.redirect(url, 301);
  }

  return handleI18nRouting(request as any as Parameters<typeof handleI18nRouting>[0]);
}

export const config = {
  matcher: "/((?!_next|api|cms|favicon|manifest|icon).*)",
};
