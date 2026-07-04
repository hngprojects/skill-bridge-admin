import type {
  AIConsumptionData,
  AIConsumptionPeriod,
  NewUser,
  OverviewStats,
  ScoreDistribution,
} from "@/types/api/overview";

export const MOCK_OVERVIEW_STATS: OverviewStats = {
  total_candidates: {
    value: 12847,
    trend: { direction: "up", change_percent: 8.3 },
  },
  job_ready_rate: {
    value: 67,
    trend: { direction: "up", change_percent: 2.1 },
  },
  active_employers: {
    value: 384,
    trend: { direction: "down", change_percent: -3.5 },
  },
  offers_sent_this_month: {
    value: 1203,
    trend: { direction: "up", change_percent: 15.2 },
  },
  total_revenue: {
    value: 284750,
    trend: { direction: null, change_percent: null },
  },
};

const SCORE_DISTRIBUTION_BY_TRACK: Record<string, ScoreDistribution> = {
  all: {
    total_completed: 1530,
    empty: false,
    buckets: [
      { range: "0-9", count: 12 },
      { range: "10-19", count: 28 },
      { range: "20-29", count: 45 },
      { range: "30-39", count: 89 },
      { range: "40-49", count: 134 },
      { range: "50-59", count: 198 },
      { range: "60-69", count: 267 },
      { range: "70-79", count: 312 },
      { range: "80-89", count: 289 },
      { range: "90-99", count: 156 },
    ],
  },
  frontend: {
    total_completed: 412,
    empty: false,
    buckets: [
      { range: "0-9", count: 4 },
      { range: "10-19", count: 9 },
      { range: "20-29", count: 18 },
      { range: "30-39", count: 27 },
      { range: "40-49", count: 48 },
      { range: "50-59", count: 72 },
      { range: "60-69", count: 89 },
      { range: "70-79", count: 74 },
      { range: "80-89", count: 52 },
      { range: "90-99", count: 19 },
    ],
  },
  backend: {
    total_completed: 387,
    empty: false,
    buckets: [
      { range: "0-9", count: 2 },
      { range: "10-19", count: 6 },
      { range: "20-29", count: 11 },
      { range: "30-39", count: 19 },
      { range: "40-49", count: 34 },
      { range: "50-59", count: 51 },
      { range: "60-69", count: 78 },
      { range: "70-79", count: 96 },
      { range: "80-89", count: 71 },
      { range: "90-99", count: 19 },
    ],
  },
  "data-science": {
    total_completed: 298,
    empty: false,
    buckets: [
      { range: "0-9", count: 3 },
      { range: "10-19", count: 7 },
      { range: "20-29", count: 14 },
      { range: "30-39", count: 22 },
      { range: "40-49", count: 38 },
      { range: "50-59", count: 55 },
      { range: "60-69", count: 63 },
      { range: "70-79", count: 58 },
      { range: "80-89", count: 27 },
      { range: "90-99", count: 11 },
    ],
  },
  devops: {
    total_completed: 201,
    empty: false,
    buckets: [
      { range: "0-9", count: 1 },
      { range: "10-19", count: 3 },
      { range: "20-29", count: 8 },
      { range: "30-39", count: 14 },
      { range: "40-49", count: 21 },
      { range: "50-59", count: 34 },
      { range: "60-69", count: 42 },
      { range: "70-79", count: 39 },
      { range: "80-89", count: 28 },
      { range: "90-99", count: 11 },
    ],
  },
  design: {
    total_completed: 232,
    empty: false,
    buckets: [
      { range: "0-9", count: 2 },
      { range: "10-19", count: 3 },
      { range: "20-29", count: 9 },
      { range: "30-39", count: 17 },
      { range: "40-49", count: 31 },
      { range: "50-59", count: 44 },
      { range: "60-69", count: 56 },
      { range: "70-79", count: 42 },
      { range: "80-89", count: 20 },
      { range: "90-99", count: 8 },
    ],
  },
};

export function getMockScoreDistribution(track = "all"): ScoreDistribution {
  return SCORE_DISTRIBUTION_BY_TRACK[track] ?? SCORE_DISTRIBUTION_BY_TRACK.all;
}

const AI_CONSUMPTION_BY_PERIOD: Record<AIConsumptionPeriod, AIConsumptionData> =
  {
    yearly: {
      total_completed: 42310,
      empty: false,
      buckets: [
        { range: "2020", count: 1840 },
        { range: "2021", count: 3210 },
        { range: "2022", count: 5670 },
        { range: "2023", count: 9340 },
        { range: "2024", count: 14820 },
        { range: "2025", count: 7430 },
      ],
    },
    monthly: {
      total_completed: 22220,
      empty: false,
      buckets: [
        { range: "Jan", count: 980 },
        { range: "Feb", count: 1240 },
        { range: "Mar", count: 1580 },
        { range: "Apr", count: 1390 },
        { range: "May", count: 1720 },
        { range: "Jun", count: 2040 },
        { range: "Jul", count: 1890 },
        { range: "Aug", count: 2210 },
        { range: "Sep", count: 1960 },
        { range: "Oct", count: 2380 },
        { range: "Nov", count: 2650 },
        { range: "Dec", count: 2180 },
      ],
    },
    weekly: {
      total_completed: 2220,
      empty: false,
      buckets: [
        { range: "Mon", count: 312 },
        { range: "Tue", count: 428 },
        { range: "Wed", count: 391 },
        { range: "Thu", count: 456 },
        { range: "Fri", count: 389 },
        { range: "Sat", count: 148 },
        { range: "Sun", count: 96 },
      ],
    },
    daily: {
      total_completed: 764,
      empty: false,
      buckets: [
        { range: "00:00", count: 14 },
        { range: "02:00", count: 8 },
        { range: "04:00", count: 5 },
        { range: "06:00", count: 22 },
        { range: "08:00", count: 67 },
        { range: "10:00", count: 134 },
        { range: "12:00", count: 118 },
        { range: "14:00", count: 142 },
        { range: "16:00", count: 156 },
        { range: "18:00", count: 98 },
        { range: "20:00", count: 63 },
        { range: "22:00", count: 37 },
      ],
    },
  };

export function getMockAIConsumption(
  period: AIConsumptionPeriod,
): AIConsumptionData {
  return AI_CONSUMPTION_BY_PERIOD[period];
}

export const MOCK_NEW_USERS: NewUser[] = [
  {
    name: "Chioma Adeyemi",
    type: "talent",
    signup_date: "2025-06-27",
    status: "Onboarding",
  },
  {
    name: "TechNova Ltd",
    type: "employer",
    signup_date: "2025-06-27",
    status: "Unverified",
  },
  {
    name: "Emeka Okafor",
    type: "talent",
    signup_date: "2025-06-26",
    status: "Verified",
  },
  {
    name: "Bright Solutions Inc",
    type: "employer",
    signup_date: "2025-06-26",
    status: "Verified",
  },
  {
    name: "Fatima Bello",
    type: "talent",
    signup_date: "2025-06-25",
    status: "Job Ready",
  },
  {
    name: "Amara Nwosu",
    type: "talent",
    signup_date: "2025-06-25",
    status: "Emerging",
  },
  {
    name: "Kola Systems",
    type: "employer",
    signup_date: "2025-06-24",
    status: "Unverified",
  },
  {
    name: "Seun Adebayo",
    type: "talent",
    signup_date: "2025-06-24",
    status: "Onboarding",
  },
  {
    name: "Global Hire Co",
    type: "employer",
    signup_date: "2025-06-23",
    status: "Verified",
  },
  {
    name: "Ngozi Eze",
    type: "talent",
    signup_date: "2025-06-23",
    status: "Verified",
  },
  {
    name: "Tunde Fashola",
    type: "talent",
    signup_date: "2025-06-22",
    status: "Job Ready",
  },
  {
    name: "Apex Ventures",
    type: "employer",
    signup_date: "2025-06-22",
    status: "Unverified",
  },
  {
    name: "Ifeoma Chukwu",
    type: "talent",
    signup_date: "2025-06-21",
    status: "Emerging",
  },
  {
    name: "DataBridge Corp",
    type: "employer",
    signup_date: "2025-06-21",
    status: "Verified",
  },
  {
    name: "Chukwuemeka Obi",
    type: "talent",
    signup_date: "2025-06-20",
    status: "Onboarding",
  },
  {
    name: "Zara Musa",
    type: "talent",
    signup_date: "2025-06-20",
    status: "Verified",
  },
  {
    name: "SkillFirst Ltd",
    type: "employer",
    signup_date: "2025-06-19",
    status: "Unverified",
  },
  {
    name: "Adaeze Ibe",
    type: "talent",
    signup_date: "2025-06-19",
    status: "Job Ready",
  },
  {
    name: "Kemi Abiodun",
    type: "talent",
    signup_date: "2025-06-18",
    status: "Emerging",
  },
  {
    name: "CloudPath Africa",
    type: "employer",
    signup_date: "2025-06-18",
    status: "Verified",
  },
  {
    name: "Oluwaseun Alabi",
    type: "talent",
    signup_date: "2025-06-17",
    status: "Onboarding",
  },
  {
    name: "Mide Coker",
    type: "talent",
    signup_date: "2025-06-17",
    status: "Verified",
  },
  {
    name: "NextGen Staffing",
    type: "employer",
    signup_date: "2025-06-16",
    status: "Unverified",
  },
  {
    name: "Tosin Ogundimu",
    type: "talent",
    signup_date: "2025-06-16",
    status: "Job Ready",
  },
  {
    name: "Blessing Udo",
    type: "talent",
    signup_date: "2025-06-15",
    status: "Emerging",
  },
];
