"use client";

import * as React from "react";

import { DataTable } from "@/components/shared/data-table";
import type { FilterConfig } from "@/components/shared/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTickets } from "@/hooks/api/use-support";
import type { SupportTicket } from "@/types/api/support";
import { supportColumns } from "./columns";

type DateRange = "all" | "7d" | "30d" | "90d";

const DATE_RANGE_OPTIONS: { label: string; value: DateRange }[] = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

const FILTERS: FilterConfig[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Open", value: "Open" },
      { label: "In Progress", value: "In Progress" },
      { label: "Resolved", value: "Resolved" },
    ],
  },
  {
    id: "type",
    label: "Type",
    options: [
      { label: "Technical", value: "Technical" },
      { label: "Billing", value: "Billing" },
      { label: "Account", value: "Account" },
      { label: "Assessment", value: "Assessment" },
      { label: "General", value: "General" },
    ],
  },
];

function filterByDateRange(tickets: SupportTicket[], range: DateRange) {
  if (range === "all") return tickets;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return tickets.filter((t) => new Date(t.dateSubmitted) >= cutoff);
}

type SupportTicketsProps = {
  selectedTicket: SupportTicket | null;
  onOpenPanel: (ticket: SupportTicket) => void;
};

export function SupportTickets({ onOpenPanel }: SupportTicketsProps) {
  const { data: tickets = [], isLoading } = useTickets();
  const [dateRange, setDateRange] = React.useState<DateRange>("all");

  const filtered = filterByDateRange(tickets, dateRange);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Select
          value={dateRange}
          onValueChange={(v) => setDateRange(v as DateRange)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={supportColumns}
        data={filtered}
        isLoading={isLoading}
        searchPlaceholder="Search by submitter name…"
        filters={FILTERS}
        pageSize={20}
        emptyTitle="No tickets found"
        emptyMessage="Try adjusting your filters or date range."
        onRowClick={onOpenPanel}
      />
    </div>
  );
}
