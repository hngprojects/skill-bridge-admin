import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTickets,
  getTicketDetail,
  updateTicket,
  getAssignableAdmins,
} from "@/actions/support";
import type {
  TicketsQueryParams,
  UpdateTicketPayload,
} from "@/types/api/support";
import { supportKeys } from "./keys";

export function useTickets(params: TicketsQueryParams = {}) {
  return useQuery({
    queryKey: supportKeys.list(params),
    queryFn: () => getTickets(params),
    placeholderData: (prev) => prev,
  });
}

export function useTicketDetail(id: string | null) {
  return useQuery({
    queryKey: supportKeys.detail(id ?? ""),
    queryFn: () => getTicketDetail(id!),
    enabled: !!id,
  });
}

export function useAssignableAdmins() {
  return useQuery({
    queryKey: supportKeys.assignableAdmins(),
    queryFn: getAssignableAdmins,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateTicket(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTicketPayload) => updateTicket(id, body),
    onSuccess: (updated) => {
      queryClient.setQueryData(supportKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: supportKeys.tickets() });
    },
  });
}
