import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import type { OfferListItem, OfferStatus } from "@/types/api/offers";

export const offerStatusVariantMap: Record<OfferStatus, StatusPillVariant> = {
  Pending: "muted",
  "Assessment Unlocked": "info",
  "Assessment Completed": "info",
  Passed: "success",
  Failed: "error",
  Accepted: "success",
  Declined: "error",
  Expired: "warning",
  Hired: "success",
  Withdrawn: "muted",
};

export const offerColumns: ColumnDef<OfferListItem>[] = [
  {
    accessorKey: "candidateName",
    header: "Candidate Name",
    enableSorting: true,
  },
  {
    accessorKey: "employerName",
    header: "Employer Name",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.status}
        variant={offerStatusVariantMap[row.original.status]}
      />
    ),
  },
  {
    accessorKey: "dateSent",
    header: "Date Sent",
    enableSorting: true,
    cell: ({ row }) => format(new Date(row.original.dateSent), "MMM d, yyyy"),
  },
  {
    accessorKey: "dateResolved",
    header: "Date Resolved",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.dateResolved ? (
        format(new Date(row.original.dateResolved), "MMM d, yyyy")
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
