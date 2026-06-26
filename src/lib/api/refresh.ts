import type { InternalAxiosRequestConfig } from "axios";

import {
  getServerCookieHeader,
  mergeCookieHeader,
  parseSetCookieHeader,
  persistServerCookies,
  setCookieHeadersFrom,
} from "./cookies";
import type { StoredCookie } from "@/types/api/cookies";

let refreshRequest: Promise<string | undefined> | null = null;

export function isAuthRefreshRequest(
  config: InternalAxiosRequestConfig | undefined,
): boolean {
  return config?.url?.includes("/auth/refresh") ?? false;
}

export async function refreshAuthCookies(): Promise<string | undefined> {
  const refresh = async () => {
    const { publicApi } = await import("./clients");
    const cookie = await getServerCookieHeader();
    const response = await publicApi.post(
      "/auth/refresh",
      undefined,
      cookie ? { headers: { Cookie: cookie } } : undefined,
    );
    const storedCookies = setCookieHeadersFrom(response.headers)
      .map(parseSetCookieHeader)
      .filter((storedCookie): storedCookie is StoredCookie =>
        Boolean(storedCookie),
      );

    await persistServerCookies(storedCookies);
    return mergeCookieHeader(cookie, storedCookies);
  };

  if (typeof window === "undefined") {
    return refresh();
  }

  refreshRequest ??= refresh().finally(() => {
    refreshRequest = null;
  });
  return refreshRequest;
}
