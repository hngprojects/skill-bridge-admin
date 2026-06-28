import type {
  Question,
  HealthRow,
  QualityNote,
  AIGenerationLog,
} from "@/types/api/question-bank";
import {
  MOCK_HEALTH_ROWS,
  MOCK_QUESTIONS,
  MOCK_QUALITY_NOTES,
  MOCK_AI_GENERATION_LOGS,
} from "@/mocks/question-bank";

// TODO: replace mock bodies with real API calls once endpoints are available.

export async function getHealthRows(): Promise<HealthRow[]> {
  return MOCK_HEALTH_ROWS;
}

export async function getQuestions(): Promise<Question[]> {
  return MOCK_QUESTIONS;
}

export async function getQualityNotes(): Promise<QualityNote[]> {
  return MOCK_QUALITY_NOTES;
}

export async function getAIGenerationLogs(): Promise<AIGenerationLog[]> {
  return MOCK_AI_GENERATION_LOGS;
}
