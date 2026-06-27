export const LOGIN_BRAND_COPY = {
  eyebrow: "Admin workspace",
  headline: "Manage SkillBridge with clarity",
  subcopy:
    "Oversee talents, employers, assessments, and support — all from one secure admin portal.",
  disclaimer: "Authorized personnel only",
} as const;

export const LOGIN_BRAND_CARDS = [
  {
    title: "Platform activity",
    subtitle: "Monitor users, offers, and support cases.",
    variant: "teal" as const,
    bars: [82, 64, 48],
    delay: 0.2,
  },
  {
    title: "Review queue",
    subtitle: "Curate questions and resolve flagged content.",
    variant: "purple" as const,
    bars: [76, 58, 88],
    delay: 0.32,
  },
] as const;

export const LOGIN_FORM_COPY = {
  badge: "Admin sign in",
  title: "Welcome back",
  subcopy: "Sign in to continue managing the SkillBridge platform.",
  accessNote: "Need access?",
  accessAction: "Contact a Super Admin",
} as const;
