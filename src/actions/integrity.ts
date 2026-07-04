"use server";

import type {
  GetIntegrityStatsResponse,
  GetVoidedAttemptsResponse,
  IntegrityStats,
  VoidedAttemptsPage,
  VoidedAttemptsQueryParams,
} from "@/types/api/integrity";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

export async function getIntegrityStats(): Promise<IntegrityStats> {
  const res = await authApi.get<GetIntegrityStatsResponse>(
    "/admin/integrity/stats",
  );

  return unwrapData(res);
}

export async function getVoidedAttempts(
  params: VoidedAttemptsQueryParams = {},
): Promise<VoidedAttemptsPage> {
  const res = await authApi.get<GetVoidedAttemptsResponse>(
    "/admin/integrity/voided-attempts",
    { params },
  );

  return unwrapData(res);
}
