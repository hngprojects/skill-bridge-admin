import type { CandidateDetail, TalentListItem } from "@/types/api/talents";
import { getMockCandidateDetail, MOCK_TALENTS } from "@/mocks/talents";

// TODO: replace mock bodies with real API calls once endpoints are available.
// Each function signature stays the same — only the implementation changes.
// import { authApi } from "@/lib/api";
// import type { ApiEnvelope } from "@/types/api";
// import { unwrapData } from "./utils";

export async function getTalents(): Promise<TalentListItem[]> {
  return MOCK_TALENTS;
}

export async function getCandidateDetail(id: string): Promise<CandidateDetail> {
  return getMockCandidateDetail(id);
}
