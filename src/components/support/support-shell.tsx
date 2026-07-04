"use client";

import * as React from "react";

import type { TicketListItem } from "@/types/api/support";
import { SupportTickets } from "./support-tickets";
import { TicketDetailPanel } from "./ticket-detail-panel";

export function SupportShell() {
  const [selectedTicket, setSelectedTicket] =
    React.useState<TicketListItem | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleOpenPanel(ticket: TicketListItem) {
    setSelectedTicket(ticket);
    setPanelOpen(true);
  }

  function handleClosePanel() {
    setPanelOpen(false);
  }

  return (
    <>
      <React.Suspense
        fallback={<div className="h-64 animate-pulse rounded-2xl bg-muted" />}
      >
        <SupportTickets onOpenPanel={handleOpenPanel} />
      </React.Suspense>

      <TicketDetailPanel
        ticket={selectedTicket}
        open={panelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}
