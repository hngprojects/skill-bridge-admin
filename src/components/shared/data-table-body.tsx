"use client";

import { flexRender, type Row, type ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

type DataTableBodyProps<TData> = {
  rows: Row<TData>[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  pageSize: number;
  emptyTitle: string;
  emptyMessage: string;
  onRowClick?: (row: TData) => void;
};

export function DataTableBody<TData>({
  rows,
  columns,
  isLoading,
  pageSize,
  emptyTitle,
  emptyMessage,
  onRowClick,
}: DataTableBodyProps<TData>) {
  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: pageSize }).map((_, i) => (
          <TableRow key={i}>
            {columns.map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columns.length} className="h-52 p-0">
            <Empty className="border-0">
              <EmptyHeader>
                <EmptyTitle>{emptyTitle}</EmptyTitle>
                <EmptyDescription>{emptyMessage}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
          onClick={onRowClick ? () => onRowClick(row.original) : undefined}
          className={cn(onRowClick && "cursor-pointer")}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
