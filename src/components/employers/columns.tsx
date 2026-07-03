import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerListItem } from "@/types/api/employers";
import { formatAccountAgeDays } from "./account-age";

export const employerColumns: ColumnDef<EmployerListItem>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "is_verified",
    header: "Verification",
    cell: ({ row }) =>
      row.original.is_verified ? (
        <StatusPill status="Verified" variant="success" />
      ) : (
        <StatusPill status="Unverified" variant="error" />
      ),
  },
  {
    accessorKey: "package_tier",
    header: "Package Tier",
  },
  {
    accessorKey: "hire_count",
    header: "Hire Count",
  },
  {
    accessorKey: "offers_sent_count",
    header: "Offers Sent",
  },
  {
    accessorKey: "roles_created_count",
    header: "Roles Created",
  },
  {
    accessorKey: "account_age_days",
    header: "Account Age",
    cell: ({ row }) => formatAccountAgeDays(row.original.account_age_days),
  },
  {
    accessorKey: "last_activity_date",
    header: "Last Activity",
    cell: ({ row }) =>
      format(new Date(row.original.last_activity_date), "MMM d, yyyy"),
  },
];
