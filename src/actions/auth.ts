"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  LoginInput,
  LoginResponseData,
  RefreshResponseData,
} from "@/types/api/auth";
import { publicApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

export async function login(body: LoginInput): Promise<LoginResponseData> {
  const res = await publicApi.post<ApiEnvelope<LoginResponseData>>(
    "/admin/auth/login",
    body,
  );
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
