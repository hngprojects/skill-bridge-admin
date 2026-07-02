"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  LoginInput,
  LoginResponseData,
  RefreshResponseData,
} from "@/types/api/auth";
import { publicApi } from "@/lib/api/clients";
import {
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

  // Forward API auth cookies (access_token, refresh_token, etc.) to the
  // browser so subsequent server-action API calls can read and proxy them.
  const cookies = setCookieHeadersFrom(res.headers)
    .map(parseSetCookieHeader)
    .filter((c): c is NonNullable<typeof c> => c != null);
  await persistServerCookies(cookies);

  return unwrapData(res);
}

export async function refreshTokens(): Promise<RefreshResponseData> {
  const res =
    await publicApi.post<ApiEnvelope<RefreshResponseData>>("/auth/refresh");
  return unwrapData(res);
}

export async function logout(): Promise<void> {
  // TODO: POST /admin/auth/logout when endpoint is available
}
