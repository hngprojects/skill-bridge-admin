import type { QuestionsQueryParams } from "@/types/api/question-bank";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";

export function readParams(
  get: (key: string) => string | null,
): QuestionsQueryParams {
  const params: QuestionsQueryParams = { limit: DEFAULT_PAGE_SIZE };
  const page = Number(get("qb_page"));
  params.page = Number.isInteger(page) && page > 0 ? page : 1;
  const search = get("qb_search");
  if (search) params.search = search;
  const assessment = get("qb_assessment");
  if (assessment) params.assessment_type = assessment;
  const track = get("qb_track");
  if (track) params.track = track;
  const level = get("qb_level");
  if (level) params.verified_level = level;
  return params;
}
