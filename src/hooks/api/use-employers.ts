import { useQuery } from "@tanstack/react-query";

import { getEmployerDetail, getEmployers } from "@/actions/employers";
import { employersKeys } from "./keys";

export function useEmployers() {
  return useQuery({
    queryKey: employersKeys.list(),
    queryFn: getEmployers,
  });
}

export function useEmployerDetail(employerId: string | null) {
  return useQuery({
    queryKey: employersKeys.detail(employerId ?? ""),
    queryFn: () => getEmployerDetail(employerId!),
    enabled: employerId !== null,
  });
}
