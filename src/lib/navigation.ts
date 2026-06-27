import type { AdminRole } from "@/types/api/auth";
import type { AdminNavItem } from "@/types/navigation";

import { ROUTES } from "@/constants/admin-routes";

export function getPostLoginPath(role: AdminRole): string {
  if (role === "reviewer") return ROUTES.questionBank;
  return ROUTES.dashboard;
}

export function filterNavByRole(
  links: readonly AdminNavItem[],
  role: AdminRole,
): AdminNavItem[] {
  return links.filter((link) => link.roles.includes(role));
}
