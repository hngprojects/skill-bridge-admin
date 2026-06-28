"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusPill } from "@/components/shared/status-pill";
import type { StatusPillVariant } from "@/components/shared/status-pill";
import { useHealthRows } from "@/hooks/api/use-question-bank";
import type { HealthRow, HealthStatus } from "@/types/api/question-bank";

function healthVariant(status: HealthStatus): StatusPillVariant {
  if (status === "Critical") return "error";
  if (status === "Warning") return "warning";
  return "success";
}

function HealthIndicator({ row }: { row: HealthRow }) {
  if (row.status === "Healthy") {
    return (
      <StatusPill status={`${row.remaining} remaining`} variant="success" />
    );
  }
  const label =
    row.status === "Critical"
      ? `Critical — ${row.percentage}% remaining`
      : `Low — ${row.percentage}% remaining`;
  return <StatusPill status={label} variant={healthVariant(row.status)} />;
}

function HealthSkeletonRows() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 5 }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-24 rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function QuestionBankHealth() {
  const { data: rows = [], isLoading } = useHealthRows();

  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Track</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">Questions Remaining</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <HealthSkeletonRows />
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No health data available.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={`${row.track}-${row.stage}-${row.level}`}>
                <TableCell className="font-medium">{row.track}</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.remaining} / {row.total}
                </TableCell>
                <TableCell>
                  <HealthIndicator row={row} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
