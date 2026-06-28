export type TicketType =
  | "Technical"
  | "Billing"
  | "Account"
  | "Assessment"
  | "General";

export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type SubmitterType = "candidate" | "employer";
export type MessageAuthorRole = "candidate" | "employer" | "admin";

export type TicketMessage = {
  id: string;
  authorName: string;
  authorRole: MessageAuthorRole;
  body: string;
  sentAt: string;
};

export type SupportTicket = {
  id: string;
  ticketNumber: string;
  submittedBy: string;
  submitterType: SubmitterType;
  type: TicketType;
  subject: string;
  status: TicketStatus;
  dateSubmitted: string;
  assignedAdmin: string | null;
  thread: TicketMessage[];
};
