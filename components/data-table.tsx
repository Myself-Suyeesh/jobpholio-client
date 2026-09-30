"use client";

import * as React from "react";

import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnVisibilityState,
} from "@tanstack/react-table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronDownIcon,
  Search,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
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

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { StatusTabs, type ApplicationStatus } from "@/lib/constants/statusTabs";
import { ApplicationListItem } from "@/lib/types/application-details";

import CompanyAvatar from "./applications/CompanyAvatar";
import {
  sortOptions,
  sourceOptions,
  timeOptions,
} from "@/lib/constants/applicationFilters";

// --------------------------------------------------
// Types
// --------------------------------------------------
type Source = "all" | "linkedin" | "naukri" | "company_site";

type TimeFilter = "all" | "today" | "7_days" | "30_days" | "90_days";

type SortOption = "most_recent" | "oldest" | "company" | "role";

type MetaData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type StatusCounts = Partial<Record<ApplicationStatus, number>>;

// --------------------------------------------------
// TanStack features
// --------------------------------------------------

const features = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
});

// --------------------------------------------------
// Keep your existing column widths
// --------------------------------------------------

const columnWidths: Record<string, string> = {
  select: "30px",
  company: "110px",
  role: "110px",
  status: "80px",
  source: "100px",
  dateApplied: "90px",
  updatedAt: "90px",
  actions: "40px",
};

// --------------------------------------------------
// Status styles
// --------------------------------------------------

const statusStyles: Record<
  Exclude<ApplicationStatus, "all">,
  {
    label: string;
    background: string;
    foreground: string;
  }
> = {
  applied: {
    label: "Applied",
    background: "#e6f1fb",
    foreground: "#0c447c",
  },

  on_hold: {
    label: "On hold",
    background: "#faeeda",
    foreground: "#633806",
  },

  interview: {
    label: "Interview",
    background: "#eaf3de",
    foreground: "#27500a",
  },

  rejected: {
    label: "Rejected",
    background: "#fcebeb",
    foreground: "#501313",
  },

  offer: {
    label: "Offer",
    background: "#639922",
    foreground: "#ffffff",
  },
};

// --------------------------------------------------
// Status tabs
// --------------------------------------------------

const columnHelper = createColumnHelper<typeof features, ApplicationListItem>();

// --------------------------------------------------
// Columns
// --------------------------------------------------

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",

    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className={"border-sidebar-foreground!"}
        />
      </div>
    ),

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className={"border-sidebar-foreground!"}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  // ------------------------------------------------
  // Company
  // ------------------------------------------------

  columnHelper.accessor("company", {
    header: "Company",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CompanyAvatar
          companyName={row.original.company.name}
          domain={row.original.company.website}
          size={24}
        />

        <p className="truncate font-medium">{row.original.company.name}</p>
      </div>
    ),

    enableHiding: false,
  }),

  // ------------------------------------------------
  // Role
  // ------------------------------------------------

  columnHelper.accessor((row) => row.job.title, {
    id: "role",

    header: "Role",

    cell: ({ row }) => (
      <div>
        <p className="truncate font-medium">{row.original.job.title}</p>

        <p className="truncate text-sm text-muted-foreground">
          {row.original.job.location ?? "Location not specified"}
        </p>
      </div>
    ),
  }),

  // ------------------------------------------------
  // Status
  // ------------------------------------------------

  columnHelper.accessor("status", {
    id: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status as Exclude<ApplicationStatus, "all">;

      const style = statusStyles[status];

      if (!style) {
        return null;
      }

      return (
        <span
          className="inline-flex w-fit items-center rounded-md px-3 py-1.5 text-xs font-medium"
          style={{
            backgroundColor: style.background,
            color: style.foreground,
            border: `0.5px solid ${style.foreground}`,
          }}
        >
          {style.label}
        </span>
      );
    },
  }),

  // ------------------------------------------------
  // Source
  // ------------------------------------------------

  columnHelper.accessor("source", {
    id: "source",

    header: "Source",

    cell: ({ row }) => (
      <span className="truncate capitalize">
        {row.original.source.replaceAll("_", " ")}
      </span>
    ),
  }),

  // ------------------------------------------------
  // Applied date
  // ------------------------------------------------

  columnHelper.accessor("dateApplied", {
    id: "dateApplied",

    header: "Applied date",

    cell: ({ row }) => {
      const date = new Date(row.original.dateApplied);

      return (
        <span className="truncate">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  }),

  // ------------------------------------------------
  // Updated date
  // ------------------------------------------------

  columnHelper.accessor("updatedAt", {
    id: "updatedAt",

    header: "Last Update",

    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);

      return (
        <span className="truncate">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  }),

  // ------------------------------------------------
  // Actions
  // ------------------------------------------------

  columnHelper.display({
    id: "actions",

    header: "",

    cell: () => (
      <Button
        className={"disabled:cursor-not-allowed!"}
        variant={"ghost"}
        disabled
      >
        <Trash size={20} className="text-destructive" />
      </Button>
    ),
  }),
]);

// ==================================================
// DATA TABLE
// ==================================================

export function DataTable({
  data,
  handleRowClick,

  // Server-side state
  status,
  search,
  source,
  time,
  sort,

  page,
  limit,
  meta,

  // Loading
  isLoading,

  // Callbacks
  onStatusChange,
  onSearchChange,
  onSourceChange,
  onTimeChange,
  onSortChange,

  onPageChange,
  onLimitChange,

  // Optional tab counts
  statusCounts,
}: {
  data: ApplicationListItem[];
  handleRowClick: (id: string) => void;

  status: ApplicationStatus;
  search: string;
  source: Source;
  time: TimeFilter;
  sort: SortOption;

  page: number;
  limit: number;
  meta: MetaData | null;

  isLoading: boolean;

  onStatusChange: (status: ApplicationStatus) => void;
  onSearchChange: (search: string) => void;
  onSourceChange: (source: Source) => void;
  onTimeChange: (time: TimeFilter) => void;
  onSortChange: (sort: SortOption) => void;

  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;

  statusCounts?: StatusCounts;
}) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  // ------------------------------------------------
  // Debounced search
  // ------------------------------------------------

  const [searchValue, setSearchValue] = React.useState(search);

  React.useEffect(() => {
    setSearchValue(search);
  }, [search]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== search) {
        onSearchChange(searchValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, search, onSearchChange]);

  // ------------------------------------------------
  // Table
  // ------------------------------------------------

  const table = useTable({
    features,

    data,

    columns,

    state: {
      columnVisibility,
      rowSelection,
    },

    getRowId: (row) => row.id.toString(),

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,

    onColumnVisibilityChange: setColumnVisibility,
  });

  // ------------------------------------------------
  // Pagination
  // ------------------------------------------------

  const currentPage = meta?.page ?? page;

  const totalPages = meta?.totalPages ?? 1;

  const totalRows = meta?.total ?? data.length;

  const canGoPrevious = currentPage > 1;

  const canGoNext = currentPage < totalPages;

  // ------------------------------------------------
  // Helpers
  // ------------------------------------------------

  const getStatusCount = (value: ApplicationStatus) => {
    if (statusCounts?.[value] !== undefined) {
      return statusCounts[value];
    }

    if (value === "all") {
      return meta?.total ?? 0;
    }

    return undefined;
  };

  return (
    <Tabs
      value={status}
      onValueChange={(value) => onStatusChange(value as ApplicationStatus)}
      className="w-full flex-col justify-start gap-4"
    >
      {/* ==================================================
          STATUS TABS
          ================================================== */}

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between px-4 lg:px-6 pb-4 bg-white border-b border-sidebar-border rounded-md">
          <TabsList variant="line" className="flex flex-row gap-4">
            {StatusTabs.map((item) => {
              const count = getStatusCount(item.value as ApplicationStatus);

              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="group flex flex-row gap-2 px-2 text-xs after:-bottom-3 after:w-full after:h-[2px] after:bg-blue-400"
                >
                  {item.label}

                  {count !== undefined && (
                    <span
                      className="
                        rounded-md
                        bg-muted
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-muted-foreground!

                        group-data-active:bg-primary-50!
                        group-data-active:text-primary-500!
                      "
                    >
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* ==================================================
            FILTER / SEARCH TOOLBAR
            ================================================== */}

        <div className="px-4 flex items-center gap-2">
          {/* Search */}

          <div className="relative flex-1 max-w-80">
            <Search
              className="
                absolute
                left-3
                top-1/2
                size-3
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by company, role, or keyword..."
              className="text-sm! h-9 pl-9 bg-blue-50! border-sidebar-border!"
            />
          </div>

          {/* Source */}

          <Select
            value={source}
            onValueChange={(value) => onSourceChange(value as Source)}
          >
            <SelectTrigger className="h-9 text-sm! w-[130px]">
              <SelectValue>
                {sourceOptions.find((item) => item.value === source)?.label}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {sourceOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Time */}

          <Select
            value={time}
            onValueChange={(value) => onTimeChange(value as TimeFilter)}
          >
            <SelectTrigger className="h-9 text-sm! w-[130px]">
              <SelectValue>
                {timeOptions.find((item) => item.value === time)?.label}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {timeOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}

          <div className="flex items-center gap-2 ml-auto">
            <span className="whitespace-nowrap text-sm text-muted-foreground">
              Sort by
            </span>

            <Select
              value={sort}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger className="h-9 text-sm! w-[140px]">
                <SelectValue>
                  {sortOptions.find((item) => item.value === sort)?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {sortOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ==================================================
          TABLE
          ================================================== */}

      <div
        className="
          px-4
          relative
          flex
          flex-col
          gap-4
          overflow-auto
        "
      >
        <div
          className="
            min-h-[calc(100vh-378px)]
            max-h-[calc(100vh-378px)]
            flex
            overflow-y-auto
            rounded-md
            relative
          "
        >
          {/* Loading overlay */}

          {isLoading && (
            <div
              className="
                absolute
                inset-0
                z-20
                flex
                items-center
                justify-center
                bg-white/60
                backdrop-blur-[1px]
              "
            >
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          )}

          <Table className="table-fixed">
            {/* Header */}

            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-sidebar-border"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{
                        width: columnWidths[header.id],
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* Body */}

            <TableBody>
              {data.length > 0 ? (
                data.map((item) => {
                  const row = table
                    .getRowModel()
                    .rows.find((row) => row.original.id === item.id);

                  if (!row) return null;

                  return (
                    <TableRow
                      key={row.id}
                      className="
                        border-sidebar-border
                        cursor-pointer
                      "
                    >
                      {row.getVisibleCells().map((cell) => {
                        const clickable = [
                          "company",
                          "role",
                          "status",
                          "source",
                          "dateApplied",
                          "updatedAt",
                        ].includes(cell.column.id);

                        return (
                          <TableCell
                            key={cell.id}
                            style={{
                              width: columnWidths[cell.column.id],
                            }}
                            className={clickable ? "cursor-pointer" : ""}
                            onClick={
                              clickable
                                ? () => handleRowClick(row.id)
                                : undefined
                            }
                          >
                            <FlexRender cell={cell} />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? "Loading..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ==================================================
            PAGINATION
            ================================================== */}

        <div className="flex items-center justify-between px-4">
          {/* Selection */}

          <div
            className="
              hidden
              flex-1
              text-sm
              text-muted-foreground
              lg:flex
            "
          >
            {Object.keys(rowSelection).length} of {data.length} row(s) selected.
          </div>

          <div className="flex w-full items-center gap-8 lg:w-fit">
            {/* Rows per page */}

            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>

              <Select
                value={`${limit}`}
                onValueChange={(value) => onLimitChange(Number(value))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>

                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Page */}

            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>

            {/* Navigation */}

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              {/* First */}

              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange(1)}
                disabled={!canGoPrevious || isLoading}
              >
                <span className="sr-only">Go to first page</span>

                <ChevronsLeftIcon />
              </Button>

              {/* Previous */}

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrevious || isLoading}
              >
                <span className="sr-only">Go to previous page</span>

                <ChevronLeftIcon />
              </Button>

              {/* Next */}

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext || isLoading}
              >
                <span className="sr-only">Go to next page</span>

                <ChevronRightIcon />
              </Button>

              {/* Last */}

              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => onPageChange(totalPages)}
                disabled={!canGoNext || isLoading}
              >
                <span className="sr-only">Go to last page</span>

                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Optional result count */}

        <div className="px-4 text-xs text-muted-foreground">
          Showing {data.length > 0 ? (currentPage - 1) * limit + 1 : 0} –{" "}
          {Math.min(currentPage * limit, totalRows)} of {totalRows} applications
        </div>
      </div>
    </Tabs>
  );
}
