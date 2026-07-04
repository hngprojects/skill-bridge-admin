import type {
  AIGenerationLog,
  AnswerOption,
  GeneratedQuestionPreview,
  QualityNote,
} from "@/types/api/question-bank";
import type { TalentTrack } from "@/types/api/talents";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeOptions(texts: string[]): AnswerOption[] {
  return texts.map((text, i) => ({ id: `opt-${i + 1}`, text }));
}

// ---------------------------------------------------------------------------
// Section D — Quality notes
// ---------------------------------------------------------------------------

export const MOCK_QUALITY_NOTES: QualityNote[] = [
  {
    id: "qn-01",
    questionId: "q03",
    questionPreview: "Explain the difference between 'null' and 'undefined'...",
    track: "frontend_developer",
    stage: "Stage 3",
    level: "Senior",
    reason: "Ambiguous",
    note: "Answer options are too similar — candidates keep guessing.",
    loggedBy: "Tunde Bakare",
    date: "2026-06-01",
    status: "Open",
  },
  {
    id: "qn-02",
    questionId: "q02",
    questionPreview: "What does the 'useEffect' hook do in React?",
    track: "frontend_developer",
    stage: "Stage 2",
    level: "Mid",
    reason: "Miscalibrated",
    note: "This question is too hard for Junior level.",
    loggedBy: "Amaka Osei",
    date: "2026-05-10",
    status: "Resolved",
  },
  {
    id: "qn-03",
    questionId: "q09",
    questionPreview: "Explain how gradient descent works.",
    track: "data_scientist",
    stage: "Stage 3",
    level: "Senior",
    reason: "Ambiguous",
    note: "Answer options are too similar — candidates keep guessing.",
    loggedBy: "Tunde Bakare",
    date: "2026-06-03",
    status: "Open",
  },
  {
    id: "qn-04",
    questionId: "q12",
    questionPreview: "Describe blue-green deployment and its trade-offs.",
    track: "cloud_devops",
    stage: "Stage 3",
    level: "Senior",
    reason: "Miscalibrated",
    note: "This question is too hard for Junior level.",
    loggedBy: "Amaka Osei",
    date: "2026-05-28",
    status: "Resolved",
  },
  {
    id: "qn-05",
    questionId: "q06",
    questionPreview: "Describe the CAP theorem and its implications...",
    track: "backend_developer",
    stage: "Stage 3",
    level: "Senior",
    reason: "Wrong track match",
    note: "This feels like a Data Science question, not Backend.",
    loggedBy: "Ngozi Eze",
    date: "2026-06-10",
    status: "Open",
  },
  {
    id: "qn-06",
    questionId: "q11",
    questionPreview: "What is the purpose of a Kubernetes liveness probe?",
    track: "cloud_devops",
    stage: "Stage 2",
    level: "Mid",
    reason: "Other",
    note: "Wording is confusing — could be clearer.",
    loggedBy: "Seun Adebayo",
    date: "2026-06-15",
    status: "Open",
  },
];

// ---------------------------------------------------------------------------
// Section C — AI generation logs (for chart)
// ---------------------------------------------------------------------------

export const MOCK_AI_GENERATION_LOGS: AIGenerationLog[] = [
  {
    id: "ai-01",
    triggeredBy: "Amaka Osei",
    timestamp: "2026-01-08",
    track: "frontend_developer",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 10,
    countAccepted: 8,
  },
  {
    id: "ai-02",
    triggeredBy: "Tunde Bakare",
    timestamp: "2026-01-22",
    track: "backend_developer",
    stage: "Stage 3",
    level: "Senior",
    countRequested: 15,
    countAccepted: 12,
  },
  {
    id: "ai-03",
    triggeredBy: "Ngozi Eze",
    timestamp: "2026-02-05",
    track: "data_scientist",
    stage: "Stage 1",
    level: "Junior",
    countRequested: 20,
    countAccepted: 17,
  },
  {
    id: "ai-04",
    triggeredBy: "Amaka Osei",
    timestamp: "2026-02-14",
    track: "frontend_developer",
    stage: "Stage 3",
    level: "Senior",
    countRequested: 10,
    countAccepted: 7,
  },
  {
    id: "ai-05",
    triggeredBy: "Seun Adebayo",
    timestamp: "2026-02-27",
    track: "cloud_devops",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 8,
    countAccepted: 6,
  },
  {
    id: "ai-06",
    triggeredBy: "Fatima Bello",
    timestamp: "2026-03-10",
    track: "product_designer",
    stage: "Stage 1",
    level: "Junior",
    countRequested: 12,
    countAccepted: 10,
  },
  {
    id: "ai-07",
    triggeredBy: "Tunde Bakare",
    timestamp: "2026-03-20",
    track: "backend_developer",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 15,
    countAccepted: 13,
  },
  {
    id: "ai-08",
    triggeredBy: "Amaka Osei",
    timestamp: "2026-04-03",
    track: "frontend_developer",
    stage: "Stage 1",
    level: "Junior",
    countRequested: 20,
    countAccepted: 18,
  },
  {
    id: "ai-09",
    triggeredBy: "Ngozi Eze",
    timestamp: "2026-04-17",
    track: "data_scientist",
    stage: "Stage 3",
    level: "Senior",
    countRequested: 10,
    countAccepted: 8,
  },
  {
    id: "ai-10",
    triggeredBy: "Seun Adebayo",
    timestamp: "2026-04-25",
    track: "cloud_devops",
    stage: "Stage 1",
    level: "Junior",
    countRequested: 5,
    countAccepted: 4,
  },
  {
    id: "ai-11",
    triggeredBy: "Fatima Bello",
    timestamp: "2026-05-08",
    track: "product_designer",
    stage: "Stage 3",
    level: "Senior",
    countRequested: 10,
    countAccepted: 9,
  },
  {
    id: "ai-12",
    triggeredBy: "Amaka Osei",
    timestamp: "2026-05-19",
    track: "frontend_developer",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 15,
    countAccepted: 11,
  },
  {
    id: "ai-13",
    triggeredBy: "Tunde Bakare",
    timestamp: "2026-06-02",
    track: "backend_developer",
    stage: "Stage 1",
    level: "Junior",
    countRequested: 20,
    countAccepted: 16,
  },
  {
    id: "ai-14",
    triggeredBy: "Ngozi Eze",
    timestamp: "2026-06-09",
    track: "data_scientist",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 10,
    countAccepted: 9,
  },
  {
    id: "ai-15",
    triggeredBy: "Amaka Osei",
    timestamp: "2026-06-16",
    track: "frontend_developer",
    stage: "Stage 3",
    level: "Senior",
    countRequested: 8,
    countAccepted: 5,
  },
  {
    id: "ai-16",
    triggeredBy: "Fatima Bello",
    timestamp: "2026-06-23",
    track: "product_designer",
    stage: "Stage 2",
    level: "Mid",
    countRequested: 12,
    countAccepted: 10,
  },
];

// ---------------------------------------------------------------------------
// AI generation preview (for the Generate modal)
// ---------------------------------------------------------------------------

export function getMockGeneratedQuestions(
  track: TalentTrack,
  count: number,
): GeneratedQuestionPreview[] {
  const templates = [
    `What is a fundamental concept in ${track} development?`,
    `Explain a common pattern used in ${track} projects.`,
    `What tool is most commonly associated with ${track}?`,
    `Describe a best practice for ${track} teams.`,
    `What does the acronym commonly used in ${track} stand for?`,
  ];

  return Array.from({ length: Math.min(count, 20) }, (_, i) => {
    const opts = makeOptions([
      "Option A — the correct answer",
      "Option B — a plausible distractor",
      "Option C — an unlikely distractor",
      "Option D — clearly incorrect",
    ]);
    return {
      id: `gen-${i + 1}`,
      text: templates[i % templates.length],
      options: opts,
      correctAnswerId: "opt-1",
      reviewStatus: "pending",
    };
  });
}
