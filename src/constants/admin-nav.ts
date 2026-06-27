import type { AdminNavItem } from "@/types/navigation";

import { ROUTES } from "./admin-routes";

export const ADMIN_NAV_LINKS = [
  {
    label: "Overview",
    href: ROUTES.dashboard,
    icon: "dashboard",
    roles: ["super_admin", "admin", "reviewer"],
  },
  {
    label: "Talents",
    href: ROUTES.talents,
    icon: "users",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Employers",
    href: ROUTES.employers,
    icon: "building",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Question Bank",
    href: ROUTES.questionBank,
    icon: "question",
    roles: ["super_admin", "admin", "reviewer"],
  },
  {
    label: "Integrity",
    href: ROUTES.integrity,
    icon: "shield",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Offers",
    href: ROUTES.offers,
    icon: "offer",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Payments",
    href: ROUTES.payments,
    icon: "payment",
    roles: ["super_admin"],
  },
  {
    label: "Engagement",
    href: ROUTES.engagement,
    icon: "engagement",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Support",
    href: ROUTES.support,
    icon: "support",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Account Settings",
    href: ROUTES.settings,
    icon: "settings",
    roles: ["super_admin", "admin", "reviewer"],
  },
  {
    label: "Admin Management",
    href: ROUTES.adminManagement,
    icon: "admin",
    roles: ["super_admin"],
  },
] as const satisfies readonly AdminNavItem[];
