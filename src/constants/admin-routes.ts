export const AUTH_ROUTES = ["/login"] as const;

export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/forbidden",
  "/unauthorized",
] as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  talents: "/talents",
  employers: "/employers",
  questionBank: "/question-bank",
  integrity: "/integrity",
  offers: "/offers",
  payments: "/payments",
  engagement: "/engagement",
  support: "/support",
  settings: "/settings",
  adminManagement: "/admin-management",
} as const;
