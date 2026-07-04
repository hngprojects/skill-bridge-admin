"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  TicketsPage,
  TicketDetail,
  TicketsQueryParams,
  AssignableAdmin,
  UpdateTicketPayload,
} from "@/types/api/support";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

export async function getTickets(
  params: TicketsQueryParams = {},
): Promise<TicketsPage> {
  const res = await authApi.get<ApiEnvelope<TicketsPage>>(
    "/admin/support/tickets",
    { params },
  );
  return unwrapData(res);
}

export async function getTicketDetail(id: string): Promise<TicketDetail> {
  const res = await authApi.get<ApiEnvelope<TicketDetail>>(
    `/admin/support/tickets/${id}`,
  );
  return unwrapData(res);
}

export async function updateTicket(
  id: string,
  body: UpdateTicketPayload,
): Promise<TicketDetail> {
  const res = await authApi.patch<ApiEnvelope<TicketDetail>>(
    `/admin/support/tickets/${id}`,
    body,
  );
  return unwrapData(res);
}

export async function getAssignableAdmins(): Promise<AssignableAdmin[]> {
  // NOTE: /admin/admins double-wraps: envelope.data = { status, data: { items } }
  const res = await authApi.get<
    ApiEnvelope<{ status: string; data: { items: AssignableAdmin[] } }>
  >("/admin/admins", { params: { status: "active", limit: 100 } });
  return unwrapData(res).data?.items ?? [];
}
