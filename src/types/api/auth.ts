export type AdminRole = "super_admin" | "admin" | "reviewer";

export type AdminAuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  fullname: string;
  avatar_url: string | null;
  country: string;
  role: AdminRole;
  admin_tier: AdminRole | null;
  is_verified: boolean;
  onboarding_complete: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: AdminAuthUser;
};

export type RefreshResponseData = {
  user: AdminAuthUser;
};
