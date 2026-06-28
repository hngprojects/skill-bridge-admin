"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { Table } from "@/components/ui/table";
import { DataTableBody } from "./data-table-body";
import { DataTableHeader } from "./data-table-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  id: string;
  label: string;
  options: FilterOption[];
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  pageSize?: number;
  className?: string;
};

const exactFilter: FilterFn<unknown> = (row, columnId, value: string) =>
  String(row.getValue(columnId)) === value;
exactFilter.autoRemove = (val: string) => !val;

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  emptyTitle = "No results",
  emptyMessage = "No data to display.",
  onRowClick,
  searchPlaceholder = "Search…",
  filters = [],
  pageSize = DEFAULT_PAGE_SIZE,
  className,
}: DataTableProps<TData>) {
  "use no memo";
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, string>
  >({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  const debouncedSearch = useDebounce(searchInput, 300);

  const columnFilters = React.useMemo<ColumnFiltersState>(
    () =>
      Object.entries(activeFilters)
        .filter(([, v]) => v !== "")
        .map(([id, value]) => ({ id, value })),
    [activeFilters],
  );

  React.useEffect(() => {
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }));
  }, [debouncedSearch, activeFilters]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    filterFns: { exact: exactFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedSearch,
      pagination,
    },
    globalFilterFn: "includesString",
  });

  const rows = table.getRowModel().rows;
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DataTableToolbar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={(id, value) =>
          setActiveFilters((prev) => ({ ...prev, [id]: value }))
        }
        onFilterRemove={(id) =>
          setActiveFilters((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          })
        }
        onClearAllFilters={() => setActiveFilters({})}
      />

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
          currentPage={currentPage}
          totalPages={totalPages}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
        />
      )}
    </div>
  );
}
