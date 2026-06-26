export { publicApi, authApi } from "./clients";
export {
  ApiError,
  attachErrorInterceptor,
  authFailureMessage,
  isServiceUnavailableError,
  toApiError,
} from "./errors";
export { baseConfig } from "./config";

export type {
  CookieSameSite,
  RetriableRequestConfig,
  SetCookieHeaders,
  StoredCookie,
} from "@/types/api";
