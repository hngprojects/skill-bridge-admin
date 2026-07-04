// ── Question list ────────────────────────────────────────────────────────────

export type QuestionType = "required_text" | "single_pick" | "optional_text";
export type QuestionSlotType = "situational" | "work_task";

export type Question = {
  id: string;
  assessment_type: string;
  question_type: QuestionType;
  question_text: string;
  question_number: number;
  track: string;
  verified_level: string;
  competency: string;
  slot_type: QuestionSlotType;
  is_live: boolean;
  review_status: string;
  source: string;
  added_by: string | null;
  created_at: string;
  updated_at: string;
};

export type QuestionsPage = {
  items: Question[];
  total: number;
  page: number;
  limit: number;
};

export type QuestionsQueryParams = {
  page?: number;
  limit?: number;
  assessment_type?: string;
  track?: string;
  verified_level?: string;
  search?: string;
};

// ── Health grid ───────────────────────────────────────────────────────────────

export type HealthCell = {
  assessment_type: string;
  track: string;
  verified_level: string;
  live_count: number;
  flagged_count: number;
  removed_count: number;
  total_count: number;
  is_empty: boolean;
};

export type HealthGrid = {
  target_defined: boolean;
  cells: HealthCell[];
};

// ── Quality notes (mock until endpoint available) ─────────────────────────────

export type FlagReason =
  | "Miscalibrated"
  | "Wrong track match"
  | "Ambiguous"
  | "Other";
export type NoteStatus = "Open" | "Resolved";

export type QualityNote = {
  id: string;
  questionId: string;
  questionPreview: string;
  track: string;
  stage: string;
  level: string;
  reason: FlagReason;
  note: string;
  loggedBy: string;
  date: string;
  status: NoteStatus;
};

// ── AI generation log (mock until endpoint available) ─────────────────────────

export type AIGenerationLog = {
  id: string;
  triggeredBy: string;
  timestamp: string;
  track: string;
  stage: string;
  level: string;
  countRequested: number;
  countAccepted: number;
};

// ── AI generation preview (used in generate modal) ────────────────────────────

export type AnswerOption = { id: string; text: string };

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
