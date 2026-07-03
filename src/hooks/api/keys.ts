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

export const supportKeys = {
  all: ["support"] as const,
  tickets: () => [...supportKeys.all, "tickets"] as const,
};

export const talentsKeys = {
  all: ["talents"] as const,
  lists: () => [...talentsKeys.all, "list"] as const,
  list: () => [...talentsKeys.lists()] as const,
  details: () => [...talentsKeys.all, "detail"] as const,
  detail: (id: string) => [...talentsKeys.details(), id] as const,
};

export const paymentsKeys = {
  all: ["payments"] as const,
  stats: () => [...paymentsKeys.all, "stats"] as const,
  revenue: (period: string) =>
    [...paymentsKeys.all, "revenue", period] as const,
  employerPackages: () => [...paymentsKeys.all, "employer-packages"] as const,
  talentSubscription: () =>
    [...paymentsKeys.all, "talent-subscription"] as const,
  subscriptions: () => [...paymentsKeys.all, "subscriptions"] as const,
  transactions: () => [...paymentsKeys.all, "transactions"] as const,
};

export const offersKeys = {
  all: ["offers"] as const,
  stats: () => [...offersKeys.all, "stats"] as const,
  funnel: () => [...offersKeys.all, "funnel"] as const,
  lists: () => [...offersKeys.all, "list"] as const,
  list: () => [...offersKeys.lists()] as const,
};

export const integrityKeys = {
  all: ["integrity"] as const,
  stats: () => [...integrityKeys.all, "stats"] as const,
  voidedAttempts: () => [...integrityKeys.all, "voided-attempts"] as const,
};
export const employersKeys = {
  all: ["employers"] as const,
  lists: () => [...employersKeys.all, "list"] as const,
  list: () => [...employersKeys.lists()] as const,
  details: () => [...employersKeys.all, "detail"] as const,
  detail: (id: string) => [...employersKeys.details(), id] as const,
};

export const engagementKeys = {
  all: ["engagement"] as const,
  stats: () => [...engagementKeys.all, "stats"] as const,
  retakeDropoff: () => [...engagementKeys.all, "retake-dropoff"] as const,
  minorAssessmentUptake: (track = "all") =>
    [...engagementKeys.all, "minor-assessment-uptake", track] as const,
};

export const adminManagementKeys = {
  all: ["admin-management"] as const,
  accounts: () => [...adminManagementKeys.all, "accounts"] as const,
};

export const accountKeys = {
  all: ["account"] as const,
  me: () => [...accountKeys.all, "me"] as const,
};
