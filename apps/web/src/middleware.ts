import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirects } from "@/lib/redirects";

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

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|api|cms|favicon|manifest|icon).*)",
};
