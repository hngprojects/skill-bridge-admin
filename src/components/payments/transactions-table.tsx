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
import { useTransactions } from "@/hooks/api/use-payments";
import type { Transaction } from "@/types/api/payments";
import { transactionColumns } from "./transactions-columns";

const FILTERS: FilterConfig[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Successful", value: "Successful" },
      { label: "Failed", value: "Failed" },
      { label: "Refunded", value: "Refunded" },
    ],
  },
];

type DateRange = "all" | "7d" | "30d" | "90d";

const DATE_RANGE_OPTIONS: { label: string; value: DateRange }[] = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

function filterByDateRange(transactions: Transaction[], range: DateRange) {
  if (range === "all") return transactions;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return transactions.filter((t) => new Date(t.date) >= cutoff);
}

export function TransactionsTable() {
  const { data: transactions = [], isLoading } = useTransactions();
  const [dateRange, setDateRange] = React.useState<DateRange>("all");

  const filtered = filterByDateRange(transactions, dateRange);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Transactions</h2>
          <p className="text-xs text-muted-foreground">
            All payment transactions including successful, failed, and refunded.
          </p>
        </div>

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
        columns={transactionColumns}
        data={filtered}
        isLoading={isLoading}
        searchPlaceholder="Search by subscriber name…"
        filters={FILTERS}
        pageSize={20}
        emptyTitle="No transactions found"
        emptyMessage="No transactions in this period."
      />
    </div>
  );
}
