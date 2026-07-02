import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/constants/admin-routes";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function applySecurityHeaders(
  response: NextResponse,
  requestId: string,
): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set("x-request-id", requestId);
  return response;
}

function continueWithSecurityHeaders(request: NextRequest): NextResponse {
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  return applySecurityHeaders(response, requestId);
}

function isAuthenticated(request: NextRequest): boolean {
  return !!(
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

  // NextAuth internal routes must always pass through
  if (pathname.startsWith("/api/auth/")) {
    return continueWithSecurityHeaders(request);
  }

  const isPublic = (PUBLIC_ROUTES as readonly string[]).some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );
  const isAuthRoute = (AUTH_ROUTES as readonly string[]).some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );

  // Authenticated user hitting login → send to dashboard
  if (authenticated && isAuthRoute) {
    const res = NextResponse.redirect(new URL("/dashboard", request.url));
    return applySecurityHeaders(res, requestId);
  }

  // Unauthenticated user hitting a protected route → send to login
  if (!authenticated && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    const res = NextResponse.redirect(loginUrl);
    return applySecurityHeaders(res, requestId);
  }

  return continueWithSecurityHeaders(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
