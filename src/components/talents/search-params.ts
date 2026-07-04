import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import type { TierFilterParam, TalentsQueryParams } from "@/types/api/talents";

const VALID_TIERS = new Set<TierFilterParam>([
  "not_ready",
  "emerging",
  "job_ready",
]);

export function readTalentsParams(
  get: (key: string) => string | undefined,
): TalentsQueryParams {
  const params: TalentsQueryParams = { limit: DEFAULT_PAGE_SIZE };

  const pageValue = Number(get("page"));
  params.page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

  const search = get("search");
  if (search) params.search = search;

  const track = get("track");
  if (track) params.track = track;

  const tierRaw = get("tier");
  if (tierRaw && VALID_TIERS.has(tierRaw as TierFilterParam))
    params.tier = tierRaw as TierFilterParam;

  const scoreMin = get("score_min");
  if (scoreMin) params.score_min = Number(scoreMin);

  const scoreMax = get("score_max");
  if (scoreMax) params.score_max = Number(scoreMax);

  const dateFrom = get("date_from");
  if (dateFrom) params.date_from = dateFrom;

  const dateTo = get("date_to");
  if (dateTo) params.date_to = dateTo;

  return params;
}
