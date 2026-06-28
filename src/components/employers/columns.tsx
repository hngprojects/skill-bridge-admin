import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

import { StatusPill } from "@/components/shared/status-pill";
import type { EmployerListItem } from "@/types/api/employers";
import { formatAccountAge } from "./account-age";
import { verificationVariantMap } from "./detail-helpers";

export const employerColumns: ColumnDef<EmployerListItem>[] = [
  {
    accessorKey: "companyName",
    header: "Company Name",
    enableSorting: true,
  },
  {
    accessorKey: "verificationStatus",
    header: "Verification",
    enableSorting: true,
    cell: ({ row }) => (
      <StatusPill
        status={row.original.verificationStatus}
        variant={verificationVariantMap[row.original.verificationStatus]}
      />
    ),
  },
  {
    accessorKey: "packageTier",
    header: "Package Tier",
    enableSorting: true,
  },
  {
    accessorKey: "hireCount",
    header: "Hire Count",
    enableSorting: true,
  },
  {
    accessorKey: "offersSent",
    header: "Offers Sent",
    enableSorting: true,
  },
  {
    accessorKey: "rolesCreated",
    header: "Roles Created",
    enableSorting: true,
  },
  {
    accessorKey: "signupDate",
    header: "Account Age",
    enableSorting: true,
    cell: ({ row }) => formatAccountAge(row.original.signupDate),
  },
  {
    accessorKey: "lastActivityDate",
    header: "Last Activity",
    enableSorting: true,
    cell: ({ row }) =>
      format(new Date(row.original.lastActivityDate), "MMM d, yyyy"),
  },
];
