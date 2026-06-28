import type { AdminRole } from "@/types/api/auth";

export type AdminAccountStatus = "Active" | "Pending Setup" | "Deactivated";

export type ManagedAdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLogin: string | null;
  status: AdminAccountStatus;
};

export type InviteAdminInput = {
  email: string;
};

export type ChangeAdminEmailInput = {
  id: string;
  email: string;
};

export type ChangeAdminRoleInput = {
  id: string;
  role: AdminRole;
};

export type AdminManagementResult = {
  ok: boolean;
  message: string;
};

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  reviewer: "Reviewer",
};

export const ADMIN_ROLES: AdminRole[] = ["super_admin", "admin", "reviewer"];
