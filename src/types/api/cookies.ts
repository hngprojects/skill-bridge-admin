export type StoredCookie = {
  name: string;
  value: string;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
};

export type CookieSameSite = NonNullable<StoredCookie["sameSite"]>;
