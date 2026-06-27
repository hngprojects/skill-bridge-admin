import type { AdminRole } from "@/types/api/auth";

import { ADMIN_NAV_LINKS } from "./admin-nav";

export function canAccessRoute(role: AdminRole, pathname: string): boolean {
  const link = ADMIN_NAV_LINKS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  if (!link) return false;

  return (link.roles as readonly AdminRole[]).includes(role);
}
