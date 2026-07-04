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
  ChangeAdminEmailInput,
  ChangeAdminRoleInput,
} from "@/types/api/admin-management";
import { adminManagementKeys } from "./keys";

export function useAdminAccounts(params: AdminAccountsQueryParams = {}) {
  return useQuery({
    queryKey: adminManagementKeys.list(params),
    queryFn: () => getAdminAccounts(params),
    placeholderData: keepPreviousData,
  });
}

export function useResetAdminPassword(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetAdminPassword,
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
    onError: () => toast.error("Password reset failed. Try again."),
  });
}

export function useChangeAdminEmail(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ChangeAdminEmailInput) => changeAdminEmail(input),
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
    onError: () => toast.error("Email update failed. Try again."),
  });
}

export function useChangeAdminRole(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ChangeAdminRoleInput) => changeAdminRole(input),
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
    onError: () => toast.error("Role update failed. Try again."),
  });
}

export function useDeactivateAdmin(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateAdminAccount,
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
    onError: () => toast.error("Deactivation failed. Try again."),
  });
}

export function useReactivateAdmin(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reactivateAdminAccount,
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
    onError: () => toast.error("Reactivation failed. Try again."),
  });
}
