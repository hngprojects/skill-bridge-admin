import { useQuery } from "@tanstack/react-query";

import {
  getAIGenerationLogs,
  getHealthRows,
  getQualityNotes,
  getQuestions,
} from "@/actions/question-bank";
import { questionBankKeys } from "./keys";

export function useHealthRows() {
  return useQuery({
    queryKey: questionBankKeys.health(),
    queryFn: getHealthRows,
  });
}

export function useQuestions() {
  return useQuery({
    queryKey: questionBankKeys.questions(),
    queryFn: getQuestions,
  });
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
