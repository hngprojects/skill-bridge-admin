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

async function callAdminApi(
  request: () => Promise<unknown>,
  successMessage: string,
): Promise<AdminManagementResult> {
  try {
    await request();
    return ok(successMessage);
  } catch (err) {
    return fail(toApiError(err).message);
  }
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
  return callAdminApi(
    () => authApi.post("/admin/admins/invite", { email: input.email }),
    `Invite sent to ${input.email}.`,
  );
}

export async function resetAdminPassword(
  id: string,
): Promise<AdminManagementResult> {
  return callAdminApi(
    () => authApi.post(`/admin/admins/${id}/reset-password`),
    "Password reset email sent.",
  );
}

export async function changeAdminEmail(
  input: ChangeAdminEmailInput,
): Promise<AdminManagementResult> {
  return callAdminApi(
    () =>
      authApi.patch(`/admin/admins/${input.id}/email`, {
        email: input.email,
      }),
    "Email updated successfully.",
  );
}

export async function changeAdminRole(
  input: ChangeAdminRoleInput,
): Promise<AdminManagementResult> {
  return callAdminApi(
    () =>
      authApi.patch(`/admin/admins/${input.id}/role`, {
        role: input.role,
        confirm_downgrade: input.confirm_downgrade,
      }),
    "Role updated successfully.",
  );
}

export async function deactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  return callAdminApi(
    () => authApi.patch(`/admin/admins/${id}/deactivate`),
    "Account deactivated.",
  );
}

export async function reactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  return callAdminApi(
    () => authApi.patch(`/admin/admins/${id}/reactivate`),
    "Account reactivated.",
  );
}
