"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  AIConsumptionData,
  AIConsumptionPeriod,
  NewUser,
  OverviewStats,
  ScoreDistribution,
} from "@/types/api/overview";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

// All overview endpoints wrap their payload in an extra { status, data } layer.
type Nested<T> = { status: string; data: T };

export async function getOverviewStats(): Promise<OverviewStats> {
  const res = await authApi.get<ApiEnvelope<Nested<OverviewStats>>>(
    "/admin/overview/stats",
  );
  return unwrapData(res).data;
}

export async function getScoreDistribution(
  track?: string,
): Promise<ScoreDistribution> {
  const params = track && track !== "all" ? { track } : undefined;
  const res = await authApi.get<ApiEnvelope<Nested<ScoreDistribution>>>(
    "/admin/overview/score-distribution",
    { params },
  );
  return unwrapData(res).data;
}

export async function getAIConsumption(
  period: AIConsumptionPeriod,
): Promise<AIConsumptionData> {
  const res = await authApi.get<ApiEnvelope<Nested<AIConsumptionData>>>(
    "/admin/overview/ai-generation-consumption",
    { params: { period } },
  );
  return unwrapData(res).data;
}

type NewUsersPage = {
  items: NewUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getNewUsers(): Promise<NewUser[]> {
  const res = await authApi.get<ApiEnvelope<Nested<NewUsersPage>>>(
    "/admin/overview/new-users",
  );
  return unwrapData(res).data.items;
}
