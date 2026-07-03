"use client";

import { useQuery } from "@tanstack/react-query";

import { getAccountSettings } from "@/actions/account";
import { accountKeys } from "./keys";

export function useAccountSettings() {
  return useQuery({
    queryKey: accountKeys.me(),
    queryFn: getAccountSettings,
    staleTime: 5 * 60 * 1000,
  });
}
