"use server";

import type {
  AdminAccountsPage,
  AdminAccountsQueryParams,
  AdminManagementResult,
  ChangeAdminEmailInput,
  ChangeAdminRoleInput,
  GetAdminAccountsResponse,
  InviteAdminInput,
} from "@/types/api/admin-management";
import { authApi } from "@/lib/api/clients";
import { toApiError } from "@/lib/api/errors";
import { unwrapData } from "./utils";

function ok(message: string): AdminManagementResult {
  return { ok: true, message };
}

function fail(message: string): AdminManagementResult {
  return { ok: false, message };
}

export async function getAdminAccounts(
  params: AdminAccountsQueryParams = {},
): Promise<AdminAccountsPage> {
  const res = await authApi.get<GetAdminAccountsResponse>("/admin/admins", {
    params,
  });
  // Response is double-wrapped: ApiEnvelope.data = { status, data: { items, ... } }
  return unwrapData(res).data;
}

export async function inviteAdmin(
  input: InviteAdminInput,
): Promise<AdminManagementResult> {
  try {
    await authApi.post("/admin/admins/invite", { email: input.email });
    return ok(`Invite sent to ${input.email}.`);
  } catch (err) {
    return fail(toApiError(err).message);
  }
}

export async function resetAdminPassword(
  id: string,
): Promise<AdminManagementResult> {
  try {
    await authApi.post(`/admin/admins/${id}/reset-password`);
    return ok("Password reset email sent.");
  } catch (err) {
    return fail(toApiError(err).message);
  }
}

export async function changeAdminEmail(
  input: ChangeAdminEmailInput,
): Promise<AdminManagementResult> {
  try {
    await authApi.patch(`/admin/admins/${input.id}/email`, {
      email: input.email,
    });
    return ok("Email updated successfully.");
  } catch (err) {
    return fail(toApiError(err).message);
  }
}

export async function changeAdminRole(
  input: ChangeAdminRoleInput,
): Promise<AdminManagementResult> {
  try {
    await authApi.patch(`/admin/admins/${input.id}/role`, {
      role: input.role,
      confirm_downgrade: input.confirm_downgrade,
    });
    return ok("Role updated successfully.");
  } catch (err) {
    return fail(toApiError(err).message);
  }
}

export async function deactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  try {
    await authApi.patch(`/admin/admins/${id}/deactivate`);
    return ok("Account deactivated.");
  } catch (err) {
    return fail(toApiError(err).message);
  }
}

export async function reactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  try {
    await authApi.patch(`/admin/admins/${id}/reactivate`);
    return ok("Account reactivated.");
  } catch (err) {
    return fail(toApiError(err).message);
  }
}
