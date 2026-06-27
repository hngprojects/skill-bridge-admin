import type { AdminRole } from "@/types/api/auth";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: string;
  roles: AdminRole[];
};
