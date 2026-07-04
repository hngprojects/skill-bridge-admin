export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketType =
  | "account"
  | "assessment"
  | "employer"
  | "payment"
  | "technical"
  | "other";

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  account: "Account",
  assessment: "Assessment",
  employer: "Employer",
  payment: "Payment",
  technical: "Technical",
  other: "Other",
};

export type TicketSubmitter = {
  id: string;
  name: string;
  email: string;
  role: "talent" | "employer";
};

export type TicketAssignedAdmin = {
  id: string;
  name: string;
  email: string;
};

export type TicketListItem = {
  id: string;
  ticket_id: string;
  submitted_by: TicketSubmitter;
  type: TicketType;
  subject: string;
  status: TicketStatus;
  date_submitted: string;
  assigned_admin: TicketAssignedAdmin | null;
};

export type TicketThreadMessage = {
  id: string;
  author_type: "submitter" | "admin";
  author: { id: string; name: string; email: string };
  body: string;
  created_at: string;
};

export type TicketControls = {
  available_statuses: TicketStatus[];
  assignment_enabled: boolean;
};

export type TicketDetail = TicketListItem & {
  thread: TicketThreadMessage[];
  controls: TicketControls;
};

export type TicketsPage = {
  items: TicketListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TicketsQueryParams = {
  page?: number;
  limit?: number;
  status?: TicketStatus;
  type?: TicketType;
  search?: string;
  date_from?: string;
  date_to?: string;
};

export type AssignableAdmin = {
  id: string;
  name: string;
  email: string;
};

export type UpdateTicketPayload = {
  status?: TicketStatus;
  assigned_admin_id?: string | null;
};
