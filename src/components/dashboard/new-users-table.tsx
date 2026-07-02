"use client";

import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table";
import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import { useNewUsers } from "@/hooks/api/use-overview";
import type { NewUser, NewUserStatus } from "@/types/api/overview";

const statusVariantMap: Record<NewUserStatus, StatusPillVariant> = {
  Onboarding: "warning",
  Verified: "success",
  "Job Ready": "info",
  Emerging: "muted",
  Unverified: "error",
};

const columns: ColumnDef<NewUser>[] = [
  {
    accessorKey: "name",
    header: "Name / Company",
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    enableSorting: false,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.type === "talent" ? "Talent" : "Employer"}
        variant={row.original.type === "talent" ? "info" : "default"}
      />
    ),
  },
  {
    accessorKey: "signup_date",
    header: "Signup Date",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.signup_date), "MMM d, yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.status}
        variant={statusVariantMap[row.original.status]}
      />
    ),
  },
];

export function NewUsersTable() {
  const { data = [], isLoading } = useNewUsers();

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No new signups"
      emptyMessage="No new signups in this period."
      searchPlaceholder="Search by name…"
    />
  );
}
