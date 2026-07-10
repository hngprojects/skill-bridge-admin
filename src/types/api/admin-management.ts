import type { ApiEnvelope } from "./common";
import type { AdminRole } from "@/types/api/auth";

export type AdminAccountStatus = "active" | "pending_setup" | "deactivated";

export const ADMIN_STATUS_LABELS: Record<AdminAccountStatus, string> = {
  active: "Active",
  pending_setup: "Pending Setup",
  deactivated: "Deactivated",
};

export type ManagedAdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  last_login: string | null;
  status: AdminAccountStatus;
};

export type AdminAccountsQueryParams = {
  page?: number;
  limit?: number;
  status?: AdminAccountStatus;
  search?: string;
};

export type AdminAccountsPage = {
  items: ManagedAdminAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/** The GET /admin/admins response is double-wrapped: data.data.items */
type AdminAccountsApiData = {
  status: string;
  data: AdminAccountsPage;
};

export type GetAdminAccountsResponse = ApiEnvelope<AdminAccountsApiData>;

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
  confirm_downgrade?: boolean;
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
