"use client";

import * as React from "react";

import type { SupportTicket } from "@/types/api/support";
import { SupportTickets } from "./support-tickets";
import { TicketDetailPanel } from "./ticket-detail-panel";

export function SupportShell() {
  const [selectedTicket, setSelectedTicket] =
    React.useState<SupportTicket | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleOpenPanel(ticket: SupportTicket) {
    setSelectedTicket(ticket);
    setPanelOpen(true);
  }

  function handleClosePanel() {
    setPanelOpen(false);
  }

  return (
    <>
      <SupportTickets
        selectedTicket={selectedTicket}
        onOpenPanel={handleOpenPanel}
      />

      <TicketDetailPanel
        ticket={selectedTicket}
        open={panelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}
