"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  HealthGrid,
  QuestionsPage,
  QuestionsQueryParams,
  QualityNote,
  AIGenerationLog,
} from "@/types/api/question-bank";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";
import {
  MOCK_QUALITY_NOTES,
  MOCK_AI_GENERATION_LOGS,
} from "@/mocks/question-bank";

export async function getHealthGrid(): Promise<HealthGrid> {
  const res = await authApi.get<ApiEnvelope<HealthGrid>>(
    "/admin/question-bank/health-grid",
  );
  return unwrapData(res);
}

export async function getQuestions(
  params: QuestionsQueryParams = {},
): Promise<QuestionsPage> {
  const res = await authApi.get<ApiEnvelope<QuestionsPage>>(
    "/admin/question-bank/questions",
    { params },
  );
  return unwrapData(res);
}

export type AddQuestionPayload = {
  assessmentType: "skill" | "advanced";
  questionType:
    | "single_pick"
    | "multi_pick"
    | "required_text"
    | "optional_text";
  questionText: string;
  track: string;
  verifiedLevel: "junior" | "mid" | "senior" | "expert";
  options?: string[];
  correctAnswer?: string;
  competency?: string;
  slotType?: "situational" | "work_task" | "reflection";
};

export async function addQuestion(body: AddQuestionPayload): Promise<void> {
  await authApi.post("/admin/question-bank/questions", body);
}

// Quality notes and AI logs remain on mock until endpoints are available.
export async function getQualityNotes(): Promise<QualityNote[]> {
  return MOCK_QUALITY_NOTES;
}

export async function getAIGenerationLogs(): Promise<AIGenerationLog[]> {
  return MOCK_AI_GENERATION_LOGS;
}
