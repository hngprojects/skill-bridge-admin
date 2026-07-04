"use client";

import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { useHealthGrid } from "@/hooks/api/use-question-bank";
import type { HealthCell } from "@/types/api/question-bank";

const PAGE_SIZE = 10;

function snakeToTitle(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function HealthSkeletonRows() {
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

export function QuestionBankHealth() {
  const { data, isLoading } = useHealthGrid();
  const [assessmentFilter, setAssessmentFilter] = React.useState("all");
  const [trackFilter, setTrackFilter] = React.useState("all");
  const [page, setPage] = React.useState(0);

  const cells = React.useMemo(() => data?.cells ?? [], [data]);

  const assessmentTypes = React.useMemo(
    () => ["all", ...Array.from(new Set(cells.map((c) => c.assessment_type)))],
    [cells],
  );

  const tracks = React.useMemo(
    () => ["all", ...Array.from(new Set(cells.map((c) => c.track))).sort()],
    [cells],
  );

  const filtered = React.useMemo(() => {
    return cells.filter((c: HealthCell) => {
      if (assessmentFilter !== "all" && c.assessment_type !== assessmentFilter)
        return false;
      if (trackFilter !== "all" && c.track !== trackFilter) return false;
      return true;
    });
  }, [cells, assessmentFilter, trackFilter]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={assessmentFilter}
          onValueChange={(v) => {
            setAssessmentFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Assessment type" />
          </SelectTrigger>
          <SelectContent>
            {assessmentTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "all" ? "All types" : snakeToTitle(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={trackFilter}
          onValueChange={(v) => {
            setTrackFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger size="sm" className="w-44">
            <SelectValue placeholder="Track" />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "all" ? "All tracks" : snakeToTitle(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
              <HealthSkeletonRows />
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No health data available.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((cell) => (
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
          onPreviousPage={() => setPage((p) => p - 1)}
          onNextPage={() => setPage((p) => p + 1)}
        />
      )}
    </div>
  );
}
