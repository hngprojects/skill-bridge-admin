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
import { DataTablePagination } from "@/components/shared/data-table-pagination";
import type { HealthCell } from "@/types/api/question-bank";

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-16 rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

type HealthTableProps = {
  isLoading: boolean;
  rows: HealthCell[];
  hasRows: boolean;
  page: number;
  pageCount: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export function HealthTable({
  isLoading,
  rows,
  hasRows,
  page,
  pageCount,
  onPrevPage,
  onNextPage,
}: HealthTableProps) {
  return (
    <>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Type</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Live</TableHead>
              <TableHead className="text-right">Flagged</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonRows />
            ) : !hasRows ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No health data available.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((cell) => (
                <TableRow
                  key={`${cell.assessment_type}-${cell.track}-${cell.verified_level}`}
                  className={cell.is_empty ? "opacity-40" : undefined}
                >
                  <TableCell>{snakeToTitle(cell.assessment_type)}</TableCell>
                  <TableCell className="font-medium">
                    {snakeToTitle(cell.track)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {cell.verified_level}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {cell.live_count}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {cell.flagged_count > 0 ? (
                      <span className="text-warning">{cell.flagged_count}</span>
                    ) : (
                      cell.flagged_count
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {cell.total_count}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <DataTablePagination
          currentPage={page}
          totalPages={pageCount}
          canPreviousPage={page > 0}
          canNextPage={page < pageCount - 1}
          onPreviousPage={onPrevPage}
          onNextPage={onNextPage}
        />
      )}
    </>
  );
}
