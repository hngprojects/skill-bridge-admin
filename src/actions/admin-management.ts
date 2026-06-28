"use server";

import {
  addMockAdmin,
  MOCK_ADMIN_ACCOUNTS,
  updateMockAdminEmail,
  updateMockAdminRole,
  updateMockAdminStatus,
} from "@/mocks/admin-management";
import type {
  AdminManagementResult,
  ChangeAdminEmailInput,
  ChangeAdminRoleInput,
  InviteAdminInput,
  ManagedAdminAccount,
} from "@/types/api/admin-management";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function adminExists(email: string, ignoreId?: string): boolean {
  return MOCK_ADMIN_ACCOUNTS.some(
    (admin) =>
      admin.email.toLowerCase() === email.toLowerCase() &&
      admin.id !== ignoreId,
  );
}

function success(message: string): AdminManagementResult {
  return { ok: true, message };
}

function fail(message: string): AdminManagementResult {
  return { ok: false, message };
}

export async function getAdminAccounts(): Promise<ManagedAdminAccount[]> {
  return MOCK_ADMIN_ACCOUNTS;
}

export async function inviteAdmin(
  input: InviteAdminInput,
): Promise<AdminManagementResult> {
  const email = input.email.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return fail("Enter a valid email address.");
  }

  if (adminExists(email)) {
    return fail("An admin account already exists with this email.");
  }

  addMockAdmin(email);

  return success(`Invite sent to ${email}.`);
}

export async function resetAdminPassword(
  id: string,
): Promise<AdminManagementResult> {
  const admin = MOCK_ADMIN_ACCOUNTS.find((account) => account.id === id);

  if (!admin) {
    return fail("Admin account not found.");
  }

  return success(`Password reset for ${admin.name}.`);
}

export async function changeAdminEmail(
  input: ChangeAdminEmailInput,
): Promise<AdminManagementResult> {
  const email = input.email.trim().toLowerCase();
  const admin = MOCK_ADMIN_ACCOUNTS.find((account) => account.id === input.id);

  if (!admin) {
    return fail("Admin account not found.");
  }

  if (!isValidEmail(email)) {
    return fail("Enter a valid email address.");
  }

  if (adminExists(email, input.id)) {
    return fail("An admin account already exists with this email.");
  }

  updateMockAdminEmail(input.id, email);

  return success(`Email updated for ${admin.name}.`);
}

export async function changeAdminRole(
  input: ChangeAdminRoleInput,
): Promise<AdminManagementResult> {
  const admin = MOCK_ADMIN_ACCOUNTS.find((account) => account.id === input.id);

  if (!admin) {
    return fail("Admin account not found.");
  }

  updateMockAdminRole(input.id, input.role);

  return success(`Role updated for ${admin.name}.`);
}

export async function deactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  const admin = MOCK_ADMIN_ACCOUNTS.find((account) => account.id === id);

  if (!admin) {
    return fail("Admin account not found.");
  }

  updateMockAdminStatus(id, "Deactivated");

  return success("Account deactivated.");
}

export async function reactivateAdminAccount(
  id: string,
): Promise<AdminManagementResult> {
  const admin = MOCK_ADMIN_ACCOUNTS.find((account) => account.id === id);

  if (!admin) {
    return fail("Admin account not found.");
  }

  updateMockAdminStatus(id, "Active");

  return success("Account reactivated.");
}
