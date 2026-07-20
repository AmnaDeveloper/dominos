import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Content 301s that must live in middleware (root-level flagship + drinks alias)
const REDIRECTS: Record<string, string> = {
  "/posts/dominos-delivery-near-me": "/dominos-delivery-near-me",
  "/menus-prices/drinks": "/drinks",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 301 redirects
  const target = REDIRECTS[pathname];
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 301);
  }

  // CORS preflight for API
  if (pathname.startsWith("/api/")) {
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("X-Request-Time", new Date().toISOString());
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("X-Request-Time", new Date().toISOString());
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|ads.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
