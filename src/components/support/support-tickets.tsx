"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { ServerDataTable } from "@/components/shared/server-data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTickets } from "@/hooks/api/use-support";
import type {
  TicketListItem,
  TicketStatus,
  TicketType,
} from "@/types/api/support";
import { TICKET_STATUS_LABELS, TICKET_TYPE_LABELS } from "@/types/api/support";
import { supportColumns } from "./columns";

// URL param prefix to avoid clashes with other pages sharing query state
const P = "sup_";

type DateRange = "all" | "7d" | "30d" | "90d";

const DATE_RANGE_OPTIONS: { label: string; value: DateRange }[] = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

function dateRangeToParams(range: DateRange): {
  date_from?: string;
  date_to?: string;
} {
  if (range === "all") return {};
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const from = new Date();
  from.setDate(from.getDate() - days);
  return { date_from: from.toISOString().split("T")[0] };
}

function setParam(key: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  window.history.replaceState(null, "", `?${params.toString()}`);
}

type SupportTicketsProps = {
  onOpenPanel: (ticket: TicketListItem) => void;
};

export function SupportTickets({ onOpenPanel }: SupportTicketsProps) {
  const searchParams = useSearchParams();

  const rawPage = searchParams.get(`${P}page`);
  const rawSearch = searchParams.get(`${P}search`) ?? "";
  const rawStatus = searchParams.get(`${P}status`) ?? "";
  const rawType = searchParams.get(`${P}type`) ?? "";
  const rawRange = (searchParams.get(`${P}range`) ?? "all") as DateRange;

  const page = rawPage ? Math.max(1, parseInt(rawPage, 10)) : 1;

  const [searchInput, setSearchInput] = React.useState(rawSearch);

  // Debounce search → URL
  React.useEffect(() => {
    const id = setTimeout(() => {
      setParam(`${P}search`, searchInput);
      if (searchInput !== rawSearch) setParam(`${P}page`, "");
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const dateParams = dateRangeToParams(rawRange);

  const queryParams = {
    page,
    limit: 20,
    ...(rawSearch ? { search: rawSearch } : {}),
    ...(rawStatus ? { status: rawStatus as TicketStatus } : {}),
    ...(rawType ? { type: rawType as TicketType } : {}),
    ...dateParams,
  };

  const { data, isLoading } = useTickets(queryParams);

  const tickets = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  function handlePageChange(pageIndex: number) {
    setParam(`${P}page`, pageIndex === 0 ? "" : String(pageIndex + 1));
  }

  function handleStatusChange(v: string) {
    setParam(`${P}status`, v === "all" ? "" : v);
    setParam(`${P}page`, "");
  }

  function handleTypeChange(v: string) {
    setParam(`${P}type`, v === "all" ? "" : v);
    setParam(`${P}page`, "");
  }

  function handleRangeChange(v: string) {
    setParam(`${P}range`, v === "all" ? "" : v);
    setParam(`${P}page`, "");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="h-9 w-56"
          placeholder="Search by submitter name…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select value={rawStatus || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {(Object.keys(TICKET_STATUS_LABELS) as TicketStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {TICKET_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={rawType || "all"} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {(Object.keys(TICKET_TYPE_LABELS) as TicketType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {TICKET_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={rawRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="h-9 w-40">
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

        {!isLoading && data && (
          <span className="ml-auto text-sm text-muted-foreground">
            {data.total.toLocaleString()} tickets
          </span>
        )}
      </div>

      <ServerDataTable
        columns={supportColumns}
        data={tickets}
        pageIndex={page - 1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        emptyTitle="No tickets found"
        emptyMessage="Try adjusting your filters or date range."
        onRowClick={onOpenPanel}
      />
    </div>
  );
}
