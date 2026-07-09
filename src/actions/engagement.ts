"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  EngagementStats,
  MinorAssessmentUptakeData,
  Nested,
  RetakeDropoffData,
} from "@/types/api/engagement";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

export async function getEngagementStats(): Promise<EngagementStats> {
  const res = await authApi.get<ApiEnvelope<Nested<EngagementStats>>>(
    "/admin/engagement/stats",
  );
  return unwrapData(res).data;
}

export async function getRetakeDropoff(): Promise<RetakeDropoffData> {
  const res = await authApi.get<ApiEnvelope<Nested<RetakeDropoffData>>>(
    "/admin/engagement/retake-dropoff",
  );
  return unwrapData(res).data;
}

export async function getMinorAssessmentUptake(
  track = "all",
): Promise<MinorAssessmentUptakeData> {
  const params = track && track !== "all" ? { track } : undefined;
  const res = await authApi.get<ApiEnvelope<Nested<MinorAssessmentUptakeData>>>(
    "/admin/engagement/minor-uptake",
    { params },
  );
  return unwrapData(res).data;
}
