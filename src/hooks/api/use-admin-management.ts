"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminAccounts } from "@/actions/admin-management";
import { adminManagementKeys } from "./keys";

export function useAdminAccounts() {
  return useQuery({
    queryKey: adminManagementKeys.accounts(),
    queryFn: getAdminAccounts,
  });
}
