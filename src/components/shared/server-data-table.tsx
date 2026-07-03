"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { Table } from "@/components/ui/table";
import { DataTableBody } from "./data-table-body";
import { DataTableHeader } from "./data-table-header";
import { DataTablePagination } from "./data-table-pagination";

type ServerDataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageIndex: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  pageSize?: number;
  className?: string;
};

export function ServerDataTable<TData>({
  columns,
  data,
  pageIndex,
  pageCount,
  onPageChange,
  isLoading = false,
  emptyTitle = "No results",
  emptyMessage = "No data to display.",
  onRowClick,
  pageSize = DEFAULT_PAGE_SIZE,
  className,
}: ServerDataTableProps<TData>) {
  "use no memo";

  const [sorting, setSorting] = React.useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    filterFns: { exact: () => true },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount,
    onSortingChange: setSorting,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      if (next.pageIndex !== pageIndex) onPageChange(next.pageIndex);
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-foreground/10">
        <Table>
          <DataTableHeader table={table} />

          <DataTableBody
            rows={rows}
            columns={columns}
            isLoading={isLoading}
            pageSize={pageSize}
            emptyTitle={emptyTitle}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
          />
        </Table>
      </div>

      {!isLoading && rows.length > 0 && (
        <DataTablePagination
          currentPage={pageIndex}
          totalPages={pageCount}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
        />
      )}
    </div>
  );
}
