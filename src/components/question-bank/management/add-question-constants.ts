export const QB_TRACKS = [
  "backend_developer",
  "bi_developer",
  "brand_designer",
  "business_analyst",
  "cloud_devops",
  "customer_success",
  "data_analyst",
  "data_engineer",
  "data_scientist",
  "frontend_developer",
  "fullstack_developer",
  "hr_people_ops",
  "ml_engineer",
  "mobile_developer",
  "operations_manager",
  "product_designer",
  "product_manager",
  "project_manager",
  "quality_assurance",
  "ux_researcher",
] as const;

export const ASSESSMENT_TYPES = [
  { value: "skill", label: "Skill" },
  { value: "advanced", label: "Advanced" },
] as const;

export const QUESTION_TYPES = [
  { value: "single_pick", label: "Single pick (MCQ)" },
  { value: "multi_pick", label: "Multi pick (MCQ)" },
  { value: "required_text", label: "Required text" },
  { value: "optional_text", label: "Optional text" },
] as const;

export const LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
] as const;

export const SLOT_TYPES = [
  { value: "situational", label: "Situational" },
  { value: "work_task", label: "Work Task" },
  { value: "reflection", label: "Reflection" },
] as const;

export function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export type AnswerOption = { id: string; text: string };

export type AddQuestionFormProps = {
  assessmentType: string;
  questionType: string;
  track: string;
  verifiedLevel: string;
  questionText: string;
  options: AnswerOption[];
  correctId: string;
  competency: string;
  slotType: string;
  filledOptions: AnswerOption[];
  onAssessmentTypeChange: (v: string) => void;
  onQuestionTypeChange: (v: string) => void;
  onTrackChange: (v: string) => void;
  onVerifiedLevelChange: (v: string) => void;
  onQuestionTextChange: (v: string) => void;
  onUpdateOption: (id: string, text: string) => void;
  onAddOption: () => void;
  onRemoveOption: (id: string) => void;
  onCorrectIdChange: (v: string) => void;
  onCompetencyChange: (v: string) => void;
  onSlotTypeChange: (v: string) => void;
};
