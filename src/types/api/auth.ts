export type AdminRole = "super_admin" | "admin" | "reviewer";

export type LoginErrorCode =
  | "INVALID_CREDENTIALS"
  | "NO_ACCOUNT"
  | "ACCOUNT_DEACTIVATED";

export type AdminAuthUser = {
  id: string;
  email: string;
  fullname: string;
  role: AdminRole;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: AdminAuthUser;
  tokens: AuthTokens;
};

export type LoginResult =
  | { ok: true; data: LoginResponseData }
  | { ok: false; code: LoginErrorCode; message: string };
