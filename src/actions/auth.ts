"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  LoginInput,
  LoginResponseData,
  RefreshResponseData,
} from "@/types/api/auth";
import { publicApi } from "@/lib/api/clients";
import {
  getServerCookieHeader,
  parseSetCookieHeader,
  persistServerCookies,
  setCookieHeadersFrom,
} from "@/lib/api/cookies";
import { unwrapData } from "./utils";

export async function login(body: LoginInput): Promise<LoginResponseData> {
  const res = await publicApi.post<ApiEnvelope<LoginResponseData>>(
    "/admin/auth/login",
    body,
  );

  // Forward API auth cookies to the browser so subsequent server-action API
  // calls can read and proxy them via getServerCookieHeader().
  const cookies = setCookieHeadersFrom(res.headers)
    .map(parseSetCookieHeader)
    .filter((c): c is NonNullable<typeof c> => c != null);

  if (cookies.length === 0) {
    throw new Error(
      "Authentication failed: no session cookies returned by the API.",
    );
  }

  await persistServerCookies(cookies);

  return unwrapData(res);
}

export async function refreshTokens(): Promise<RefreshResponseData> {
  const cookieHeader = await getServerCookieHeader();
  const res = await publicApi.post<ApiEnvelope<RefreshResponseData>>(
    "/auth/refresh",
    undefined,
    cookieHeader ? { headers: { Cookie: cookieHeader } } : undefined,
  );

  // Persist any rotated cookies (new access/refresh tokens) back to the browser.
  const cookies = setCookieHeadersFrom(res.headers)
    .map(parseSetCookieHeader)
    .filter((c): c is NonNullable<typeof c> => c != null);
  await persistServerCookies(cookies);

  return unwrapData(res);
}

export async function logout(): Promise<void> {
  // TODO: POST /admin/auth/logout when endpoint is available
}
