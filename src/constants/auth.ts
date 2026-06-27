import type { LoginErrorCode } from "@/types/api/auth";

export const LOGIN_ERROR_MESSAGES: Record<LoginErrorCode, string> = {
  INVALID_CREDENTIALS: "Incorrect email or password.",
  NO_ACCOUNT: "No account found with this email.",
  ACCOUNT_DEACTIVATED:
    "This account has been deactivated. Contact a Super Admin for access.",
};
