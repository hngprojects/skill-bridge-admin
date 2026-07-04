import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { getEmployerDetail, getEmployers } from "@/actions/employers";
import type { EmployersQueryParams } from "@/types/api/employers";
import { employersKeys } from "./keys";

export function employersQueryOptions(params: EmployersQueryParams) {
  return queryOptions({
    queryKey: employersKeys.list(params),
    queryFn: () => getEmployers(params),
    placeholderData: keepPreviousData,
  });
}

export function employerDetailQueryOptions(employerId: string | null) {
  return queryOptions({
    queryKey: employersKeys.detail(employerId ?? ""),
    queryFn: () => getEmployerDetail(employerId!),
    enabled: employerId !== null,
  });
}

export function useEmployers(params: EmployersQueryParams) {
  return useQuery(employersQueryOptions(params));
}

export function useEmployerDetail(employerId: string | null) {
  return useQuery(employerDetailQueryOptions(employerId));
}
