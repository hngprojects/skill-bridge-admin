import axios, { type AxiosInstance } from "axios";

import type { RetriableRequestConfig } from "@/types/api/client";

import { getServerCookieHeader } from "./cookies";
import { isAuthRefreshRequest, refreshAuthCookies } from "./refresh";
import { getAuthToken } from "./token";

export function attachAuthRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(async (config) => {
    if (config.headers.get("Authorization")) {
      return config;
    }

    const token = await getAuthToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    // Server-side: withCredentials is browser-only. Forward the incoming
    // request's cookies manually so the API receives the auth/refresh tokens.
    if (typeof window === "undefined" && !config.headers.get("Cookie")) {
      const cookieHeader = await getServerCookieHeader();
      if (cookieHeader) {
        config.headers.set("Cookie", cookieHeader);
      }
    }

    return config;
  });
}

export function attachAuthResponseInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as
        | RetriableRequestConfig
        | undefined;
      const shouldRefresh =
        error.response?.status === 401 &&
        originalRequest != null &&
        !originalRequest._retry &&
        !isAuthRefreshRequest(originalRequest);

      if (!shouldRefresh) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshedCookieHeader = await refreshAuthCookies();
        originalRequest.headers.delete("Authorization");
        if (refreshedCookieHeader) {
          originalRequest.headers.set("Cookie", refreshedCookieHeader);
        }
        return instance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          const { clearPersistedSessionState } =
            await import("@/lib/client-session-cleanup");
          const { signOut } = await import("next-auth/react");
          clearPersistedSessionState();
          await signOut({ callbackUrl: "/login" });
        }
        return Promise.reject(refreshError);
      }
    },
  );
}
