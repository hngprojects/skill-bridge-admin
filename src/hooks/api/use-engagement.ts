"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getEngagementStats,
  getMinorAssessmentUptake,
  getRetakeDropoff,
} from "@/actions/engagement";

import { engagementKeys } from "./keys";

export function useEngagementStats() {
  return useQuery({
    queryKey: engagementKeys.stats(),
    queryFn: getEngagementStats,
    refetchInterval: 60_000,
  });
}

export function useRetakeDropoff() {
  return useQuery({
    queryKey: engagementKeys.retakeDropoff(),
    queryFn: getRetakeDropoff,
  });
}

export function useMinorAssessmentUptake(track = "all") {
  return useQuery({
    queryKey: engagementKeys.minorAssessmentUptake(track),
    queryFn: () => getMinorAssessmentUptake(track),
  });
}
