import type { TalentTrack } from "@/types/api/talents";

export type { TalentTrack as QuestionTrack };

export type QuestionStage = "Stage 1" | "Stage 2" | "Stage 3";
export type QuestionLevel = "Junior" | "Mid" | "Senior";
export type QuestionStatus = "Active" | "Flagged" | "Removed";
export type QuestionSource = "Manual" | "AI-generated" | "Imported";
export type FlagReason =
  | "Miscalibrated"
  | "Wrong track match"
  | "Ambiguous"
  | "Other";
export type NoteStatus = "Open" | "Resolved";
export type HealthStatus = "Healthy" | "Warning" | "Critical";

export type AnswerOption = {
  id: string;
  text: string;
};

export type FlagEntry = {
  id: string;
  reason: FlagReason;
  note: string;
  loggedBy: string;
  date: string;
  status: NoteStatus;
};

export type Question = {
  id: string;
  text: string;
  options: AnswerOption[];
  correctAnswerId: string;
  track: TalentTrack;
  stage: QuestionStage;
  level: QuestionLevel;
  status: QuestionStatus;
  source: QuestionSource;
  dateAdded: string;
  addedBy: string;
  flagHistory: FlagEntry[];
};

export type HealthRow = {
  track: TalentTrack;
  stage: QuestionStage;
  level: QuestionLevel;
  remaining: number;
  total: number;
  percentage: number;
  status: HealthStatus;
};

export type QualityNote = {
  id: string;
  questionId: string;
  questionPreview: string;
  track: TalentTrack;
  stage: QuestionStage;
  level: QuestionLevel;
  reason: FlagReason;
  note: string;
  loggedBy: string;
  date: string;
  status: NoteStatus;
};

export type AIGenerationLog = {
  id: string;
  triggeredBy: string;
  timestamp: string;
  track: TalentTrack;
  stage: QuestionStage;
  level: QuestionLevel;
  countRequested: number;
  countAccepted: number;
};

export type GeneratedQuestionPreview = {
  id: string;
  text: string;
  options: AnswerOption[];
  correctAnswerId: string;
  reviewStatus: "pending" | "accepted" | "rejected";
  editedText?: string;
  editedOptions?: AnswerOption[];
  editedCorrectAnswerId?: string;
};
