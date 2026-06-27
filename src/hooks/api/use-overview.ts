"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAIConsumption,
  getNewUsers,
  getOverviewStats,
  getScoreDistribution,
} from "@/actions/overview";
import type { AIConsumptionPeriod } from "@/types/api/overview";

import { overviewKeys } from "./keys";

/** Auto-refreshes every 60 s. Pass `isLoading` (not `isFetching`) to StatCard
 *  so background refreshes don't trigger the skeleton. */
export function useOverviewStats() {
  return useQuery({
    queryKey: overviewKeys.stats(),
    queryFn: getOverviewStats,
    refetchInterval: 60_000,
  });
}

export function useScoreDistribution(track = "all") {
  return useQuery({
    queryKey: overviewKeys.scoreDistribution(track),
    queryFn: () => getScoreDistribution(track),
  });
}

export function useAIConsumption(period: AIConsumptionPeriod) {
  return useQuery({
    queryKey: overviewKeys.aiConsumption(period),
    queryFn: () => getAIConsumption(period),
  });
}

export function useNewUsers() {
  return useQuery({
    queryKey: overviewKeys.newUsers(),
    queryFn: () => getNewUsers(),
  });
}
