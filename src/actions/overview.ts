import type {
  AIConsumptionData,
  AIConsumptionPeriod,
  NewUser,
  OverviewStats,
  ScoreDistribution,
} from "@/types/api/overview";

import {
  getMockAIConsumption,
  getMockScoreDistribution,
  MOCK_NEW_USERS,
  MOCK_OVERVIEW_STATS,
} from "@/mocks/overview";

// TODO: replace mock bodies with real API calls once endpoints are available.
// Each function signature stays the same — only the implementation changes.
// import { authApi } from "@/lib/api";
// import type { ApiEnvelope } from "@/types/api";
// import { unwrapData } from "./utils";

export async function getOverviewStats(): Promise<OverviewStats> {
  return MOCK_OVERVIEW_STATS;
}

export async function getScoreDistribution(
  track?: string,
): Promise<ScoreDistribution> {
  return getMockScoreDistribution(track);
}

export async function getAIConsumption(
  period: AIConsumptionPeriod,
): Promise<AIConsumptionData> {
  return getMockAIConsumption(period);
}

export async function getNewUsers(limit = 100): Promise<NewUser[]> {
  return MOCK_NEW_USERS.slice(0, limit);
}
