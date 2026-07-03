"use server";

import { authApi } from "@/lib/api/clients";
import type { ApiEnvelope } from "@/types/api";
import type { AccountSettings } from "@/types/api/payments";
import { unwrapData } from "./utils";

export async function getAccountSettings(): Promise<AccountSettings> {
  const res = await authApi.get<ApiEnvelope<AccountSettings>>("/admin/me");
  const data = unwrapData(res);
  if (!data) throw new Error("No account data returned from /admin/me");
  return data;
}
