export const healthKeys = {
  all: ["health"] as const,
  check: () => [...healthKeys.all, "check"] as const,
};

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params?: { page?: number; limit?: number }) =>
    [...usersKeys.lists(), params ?? {}] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

export const overviewKeys = {
  all: ["overview"] as const,
  stats: () => [...overviewKeys.all, "stats"] as const,
  scoreDistribution: (track = "all") =>
    [...overviewKeys.all, "score-distribution", track] as const,
  aiConsumption: (period: string) =>
    [...overviewKeys.all, "ai-consumption", period] as const,
  newUsers: () => [...overviewKeys.all, "new-users"] as const,
};

export const questionBankKeys = {
  all: ["question-bank"] as const,
  health: () => [...questionBankKeys.all, "health"] as const,
  questions: () => [...questionBankKeys.all, "questions"] as const,
  qualityNotes: () => [...questionBankKeys.all, "quality-notes"] as const,
  aiLogs: () => [...questionBankKeys.all, "ai-logs"] as const,
};

export const talentsKeys = {
  all: ["talents"] as const,
  lists: () => [...talentsKeys.all, "list"] as const,
  list: () => [...talentsKeys.lists()] as const,
  details: () => [...talentsKeys.all, "detail"] as const,
  detail: (id: string) => [...talentsKeys.details(), id] as const,
};
