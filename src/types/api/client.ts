import type { InternalAxiosRequestConfig } from "axios";

export type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type SetCookieHeaders = {
  get?: (name: string) => unknown;
  getSetCookie?: () => string[];
  ["set-cookie"]?: unknown;
};
