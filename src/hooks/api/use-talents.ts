import { useQuery } from "@tanstack/react-query";

import { getCandidateDetail, getTalents } from "@/actions/talents";
import { talentsKeys } from "./keys";

export function useTalents() {
  return useQuery({
    queryKey: talentsKeys.list(),
    queryFn: getTalents,
  });
}

export function useCandidateDetail(talentId: string | null) {
  return useQuery({
    queryKey: talentsKeys.detail(talentId ?? ""),
    queryFn: () => getCandidateDetail(talentId!),
    enabled: talentId !== null,
  });
}
