import type {
  EngagementStats,
  MinorAssessmentUptakeData,
  RetakeDropoffData,
} from "@/types/api/engagement";

import {
  getMockMinorAssessmentUptake,
  MOCK_ENGAGEMENT_STATS,
  MOCK_RETAKE_DROPOFF,
} from "@/mocks/engagement";

// TODO: replace mock bodies with real API calls once endpoints are available.

export async function getEngagementStats(): Promise<EngagementStats> {
  return MOCK_ENGAGEMENT_STATS;
}

export async function getRetakeDropoff(): Promise<RetakeDropoffData> {
  return MOCK_RETAKE_DROPOFF;
}

export async function getMinorAssessmentUptake(
  track = "all",
): Promise<MinorAssessmentUptakeData> {
  return getMockMinorAssessmentUptake(track);
}
