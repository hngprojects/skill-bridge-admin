"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getAdminAccounts } from "@/actions/admin-management";
import type { AdminAccountsQueryParams } from "@/types/api/admin-management";
import { adminManagementKeys } from "./keys";

export function useAdminAccounts(params: AdminAccountsQueryParams = {}) {
  return useQuery({
    queryKey: adminManagementKeys.list(params),
    queryFn: () => getAdminAccounts(params),
    placeholderData: keepPreviousData,
  });
}
