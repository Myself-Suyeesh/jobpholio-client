"use client";
import React from "react";
import {
  columnVisibilityFeature,
  createColumnHelper,
  FlexRender,
  tableFeatures,
  useTable,
  type ColumnVisibilityState,
} from "@tanstack/react-table";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ApplicationStatus } from "@/lib/constants/statusTabs";
import { ApplicationListItem } from "@/lib/types/application-details";
import CompanyAvatar from "../applications/CompanyAvatar";

const features = tableFeatures({
  columnVisibilityFeature,
});

const columnWidths: Record<string, string> = {
  company: "50px",
  role: "160px",
  status: "110px",
  updatedAt: "90px",
  actions: "40px",
};
const attentionColumnWidths: Record<string, string> = {
  company: "50px",
  role: "260px",
  status: "160px",
  actions: "40px",
};

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

const columnHelper = createColumnHelper<typeof features, ApplicationListItem>();

const getColumns = (type: string) =>
  columnHelper.columns([
    columnHelper.accessor("company", {
      header: "Company",

      cell: ({ row }) => (
        <div>
          <CompanyAvatar
            companyName={row.original.company.name}
            domain={row.original.company.website}
            size={28}
          />
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
          <p className="truncate text-sm text-sidebar-foreground!">
            {row.original.company.name}
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
            {type !== "attention" ? style.label : row.original.attentionReason}
          </span>
        );
      },
    }),

    ...(type !== "attention"
      ? [
          columnHelper.accessor((row) => row.job.title, {
            id: "latest",

            header: "Latest",

            cell: ({ row }) => (
              <div>
                <p className="truncate font-medium text-sidebar-foreground!">
                  {row.original.latestActivity?.title}
                </p>
              </div>
            ),
          }),
        ]
      : []),
    ...(type !== "attention"
      ? [
          // ------------------------------------------------
          // Updated date
          // ------------------------------------------------
          columnHelper.accessor("updatedAt", {
            id: "updatedAt",

            header: "Last Update",

            cell: ({ row }) => {
              const date = new Date(row.original.updatedAt || "NA");
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
        ]
      : []),

    columnHelper.display({
      id: "actions",

      header: "Actions",

      cell: () => (
        <Button
          className={"disabled:cursor-not-allowed!"}
          variant={"ghost"}
          disabled
        >
          <ChevronRightIcon size={20} />
        </Button>
      ),
    }),
  ]);

export function CardTableComponent({
  data,
  // handleRowClick,
  type,
}: {
  data: ApplicationListItem[];
  type: string;
  // handleRowClick: (id: string) => void;
}) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const columns = getColumns(type);

  const table = useTable({
    features,
    data,
    columns,
    state: {
      columnVisibility,
    },
    getRowId: (row) => row?.id?.toString(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    // <div>Nothing</div>

    <div
      className="
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
        <Table className="table-fixed">
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
                        "updatedAt",
                      ].includes(cell.column.id);

                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: columnWidths[cell.column.id],
                          }}
                          className={clickable ? "cursor-pointer" : ""}
                          // onClick={
                          //   clickable ? () => handleRowClick(row.id) : undefined
                          // }
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default CardTableComponent;
