import axios, { type AxiosError, type AxiosInstance } from "axios";

export class ApiError extends Error {
  constructor(
    public readonly status: number | undefined,
    public readonly data: unknown,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function authFailureMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function isServiceUnavailableError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 503;
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Request failed";
    return new ApiError(
      axiosError.response?.status,
      axiosError.response?.data,
      message,
    );
  }
  if (error instanceof Error) {
    return new ApiError(undefined, undefined, error.message);
  }
  return new ApiError(undefined, undefined, "Unknown error");
}

export function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(toApiError(error)),
  );
  return instance;
}
