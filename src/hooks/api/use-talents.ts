import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { getCandidateDetail, getTalents } from "@/actions/talents";
import type { TalentsQueryParams } from "@/types/api/talents";
import { talentsKeys } from "./keys";

export function talentsQueryOptions(params: TalentsQueryParams) {
  return queryOptions({
    queryKey: talentsKeys.list(params),
    queryFn: () => getTalents(params),
    placeholderData: keepPreviousData,
  });
}

export function useTalents(params: TalentsQueryParams = {}) {
  return useQuery(talentsQueryOptions(params));
}

export function useCandidateDetail(talentId: string | null) {
  return useQuery({
    queryKey: talentsKeys.detail(talentId ?? ""),
    queryFn: () => getCandidateDetail(talentId!),
    enabled: talentId !== null,
  });
}
