export const LANDING_HERO = {
  headline: "Run SkillBridge with confidence",
  subcopy:
    "SkillBridge verifies talent skills through structured assessments. This admin workspace helps your team oversee the platform, review content, and support users.",
  ctaLabel: "Sign in to admin",
  ctaHref: "/login",
} as const;

export const LANDING_PLATFORM_METRICS = [
  { label: "Active talents", value: "2,000+", width: 78 },
  { label: "Employers", value: "200+", width: 62 },
  { label: "Open support cases", value: "12", width: 45 },
] as const;

export const LANDING_REVIEW_ITEMS = [
  { label: "Pending questions", count: 24, width: 88 },
  { label: "Flagged for review", count: 7, width: 55 },
  { label: "Approved today", count: 41, width: 72 },
] as const;

export const LANDING_CAPABILITIES = [
  {
    id: "oversight",
    title: "Platform oversight",
    description:
      "Monitor talents, employers, offers, integrity cases, and payments from a unified admin dashboard.",
    accent: "var(--landing-teal)",
  },
  {
    id: "questions",
    title: "Question review",
    description:
      "Review, flag, and curate assessment questions — manually or with AI-assisted generation.",
    accent: "var(--landing-purple)",
  },
  {
    id: "support",
    title: "User support",
    description:
      "Handle disputes, engagement workflows, and account issues for platform users.",
    accent: "var(--landing-accent-orange)",
  },
] as const;
