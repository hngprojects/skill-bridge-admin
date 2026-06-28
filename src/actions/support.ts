"use server";

import { MOCK_TICKETS } from "@/mocks/support";
import type { SupportTicket } from "@/types/api/support";

export async function getTickets(): Promise<SupportTicket[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_TICKETS;
}
