import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import type { VoidedAttemptsQueryParams } from "@/types/api/integrity";

export function readVoidedAttemptsParams(
  get: (key: string) => string | undefined,
): VoidedAttemptsQueryParams {
  const params: VoidedAttemptsQueryParams = { limit: DEFAULT_PAGE_SIZE };

  const pageValue = Number(get("page"));
  params.page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

  const search = get("search");
  if (search) params.search = search;

  const assessmentType = get("assessment_type");
  if (assessmentType) params.assessment_type = assessmentType;

  const dateFrom = get("date_from");
  if (dateFrom) params.date_from = dateFrom;

  const dateTo = get("date_to");
  if (dateTo) params.date_to = dateTo;

  return params;
}
