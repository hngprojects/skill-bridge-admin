import {
  useQuery,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  getAIGenerationLogs,
  getHealthGrid,
  getQualityNotes,
  getQuestions,
} from "@/actions/question-bank";
import type { QuestionsQueryParams } from "@/types/api/question-bank";
import { questionBankKeys } from "./keys";

export function useHealthGrid() {
  return useQuery({
    queryKey: questionBankKeys.health(),
    queryFn: getHealthGrid,
  });
}

export function questionsQueryOptions(params: QuestionsQueryParams) {
  return queryOptions({
    queryKey: questionBankKeys.questions(params),
    queryFn: () => getQuestions(params),
    placeholderData: keepPreviousData,
  });
}

export function useQuestions(params: QuestionsQueryParams = {}) {
  return useQuery(questionsQueryOptions(params));
}

export function useQualityNotes() {
  return useQuery({
    queryKey: questionBankKeys.qualityNotes(),
    queryFn: getQualityNotes,
  });
}

export function useAIGenerationLogs() {
  return useQuery({
    queryKey: questionBankKeys.aiLogs(),
    queryFn: getAIGenerationLogs,
  });
}
