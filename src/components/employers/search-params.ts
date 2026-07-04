import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import type { EmployersQueryParams } from "@/types/api/employers";

export function readEmployersParams(
  get: (key: string) => string | undefined,
): EmployersQueryParams {
  const params: EmployersQueryParams = { limit: DEFAULT_PAGE_SIZE };

  const pageValue = Number(get("page"));
  params.page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

  const search = get("search");
  if (search) params.search = search;

  const isVerified = get("is_verified");
  if (isVerified === "true") params.is_verified = true;
  else if (isVerified === "false") params.is_verified = false;

  const region = get("region");
  if (region) params.region = region;

  const industry = get("industry");
  if (industry) params.industry = industry;

  return params;
}
