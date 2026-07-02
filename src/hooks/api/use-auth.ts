import { useMutation } from "@tanstack/react-query";

import { login, refreshTokens } from "@/actions/auth";
import type { LoginInput } from "@/types/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginInput) => login(body),
  });
}

export function useRefresh() {
  return useMutation({
    mutationFn: () => refreshTokens(),
  });
}
