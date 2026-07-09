"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  changeAdminEmail,
  changeAdminRole,
  deactivateAdminAccount,
  getAdminAccounts,
  reactivateAdminAccount,
  resetAdminPassword,
} from "@/actions/admin-management";
import type {
  AdminAccountsQueryParams,
  AdminManagementResult,
} from "@/types/api/admin-management";
import { adminManagementKeys } from "./keys";

export function useAdminAccounts(params: AdminAccountsQueryParams = {}) {
  return useQuery({
    queryKey: adminManagementKeys.list(params),
    queryFn: () => getAdminAccounts(params),
    placeholderData: keepPreviousData,
  });
}

function createAdminMutation<TInput>(
  mutationFn: (input: TInput) => Promise<AdminManagementResult>,
  errorMessage: string,
) {
  return function useAdminMutation(onSuccess?: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn,
      onSuccess: async (result) => {
        if (!result.ok) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        onSuccess?.();
        await queryClient.invalidateQueries({
          queryKey: adminManagementKeys.accounts(),
        });
      },
      onError: () => toast.error(errorMessage),
    });
  };
}

export const useResetAdminPassword = createAdminMutation(
  resetAdminPassword,
  "Password reset failed. Try again.",
);

export const useChangeAdminEmail = createAdminMutation(
  changeAdminEmail,
  "Email update failed. Try again.",
);

export const useChangeAdminRole = createAdminMutation(
  changeAdminRole,
  "Role update failed. Try again.",
);

export const useDeactivateAdmin = createAdminMutation(
  deactivateAdminAccount,
  "Deactivation failed. Try again.",
);

export const useReactivateAdmin = createAdminMutation(
  reactivateAdminAccount,
  "Reactivation failed. Try again.",
);
