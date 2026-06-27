"use server";

import { LOGIN_ERROR_MESSAGES } from "@/constants/auth";
import type {
  AdminAuthUser,
  AdminRole,
  LoginErrorCode,
  LoginInput,
  LoginResponseData,
  LoginResult,
} from "@/types/api/auth";

type MockAccount = {
  password: string;
  user: AdminAuthUser;
  deactivated?: boolean;
};

const MOCK_ACCOUNTS: Record<string, MockAccount> = {
  "super@skillbridge.test": {
    password: "password",
    user: {
      id: "mock-super-admin",
      email: "super@skillbridge.test",
      fullname: "Super Admin",
      role: "super_admin",
    },
  },
  "admin@skillbridge.test": {
    password: "password",
    user: {
      id: "mock-admin",
      email: "admin@skillbridge.test",
      fullname: "Platform Admin",
      role: "admin",
    },
  },
  "reviewer@skillbridge.test": {
    password: "password",
    user: {
      id: "mock-reviewer",
      email: "reviewer@skillbridge.test",
      fullname: "Question Reviewer",
      role: "reviewer",
    },
  },
  "deactivated@skillbridge.test": {
    password: "password",
    deactivated: true,
    user: {
      id: "mock-deactivated",
      email: "deactivated@skillbridge.test",
      fullname: "Deactivated Admin",
      role: "admin",
    },
  },
};

function mockTokens(role: AdminRole): LoginResponseData["tokens"] {
  return {
    access_token: `mock-access-token-${role}`,
    refresh_token: `mock-refresh-token-${role}`,
  };
}

function fail(code: LoginErrorCode): LoginResult {
  return { ok: false, code, message: LOGIN_ERROR_MESSAGES[code] };
}

export async function login(input: LoginInput): Promise<LoginResult> {
  const email = input.email.trim().toLowerCase();
  const account = MOCK_ACCOUNTS[email];

  if (!account) {
    return fail("NO_ACCOUNT");
  }

  if (account.deactivated) {
    return fail("ACCOUNT_DEACTIVATED");
  }

  if (account.password !== input.password) {
    return fail("INVALID_CREDENTIALS");
  }

  return {
    ok: true,
    data: {
      user: account.user,
      tokens: mockTokens(account.user.role),
    },
  };
}

export async function logout(): Promise<void> {
  // Mock: real API will call POST /auth/logout
}
