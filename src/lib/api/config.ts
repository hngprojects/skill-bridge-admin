import type { CreateAxiosDefaults } from "axios";

export const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  /** Send cookies for refresh / logout / cookie-based session with the API. */
  withCredentials: true,
  /**
   * Safety net for hung requests. Generous because AI-backed endpoints
   * (e.g. skill assessment generation) can legitimately take ~2 min.
   */
  timeout: 180_000,
  headers: {
    Accept: "application/json, multipart/form-data",
  },
} satisfies CreateAxiosDefaults;
