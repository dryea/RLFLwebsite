import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname === "/cms/login") return;

  if (!isLoggedIn) {
    const loginUrl = new URL("/cms/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/cms/:path*"],
};
