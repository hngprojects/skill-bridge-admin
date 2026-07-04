import type {
  AnswerOption,
  GeneratedQuestionPreview,
} from "@/types/api/question-bank";
import type { TalentTrack } from "@/types/api/talents";

function makeOptions(texts: string[]): AnswerOption[] {
  return texts.map((text, i) => ({ id: `opt-${i + 1}`, text }));
}

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
