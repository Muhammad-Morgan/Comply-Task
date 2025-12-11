"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ComplianceTableProps } from "@/lib/types";
import React from "react";
// In the page where the comp is being used, you will need:
// import { Column } from "@/lib/types";
// import { Edit, Eye, Trash2 } from "lucide-react";
// type TableItem = {
//   name: string;
//   email: string;
//   age: string;
//   status: "active" | "verified";
//   actions: JSX.Element[];
// };
// const defaultColumns: Column<TableItem>[] = [
//   { key: "name", header: "Name" },
//   { key: "email", header: "Email" },
//   { key: "age", header: "Age" },
//   { key: "status", header: "Status" },
//   { key: "actions", header: "Actions" },
// ];

// const defaultData: TableItem[] = [
//   {
//     name: "Mohamed Ahmed",
//     email: "mo.ahmed@example.com",
//     age: "30",
//     status: "active",
//     actions: [
//       <Eye key={1} className="size-4" />,
//       <Edit key={2} className="size-4" />,
//       <Trash2 key={3} className="size-4" />,
//     ],
//   },
//   {
//     name: "Nada Ali",
//     email: "nada.ali@example.com",
//     age: "28",
//     status: "verified",
//     actions: [
//       <Eye key={1} className="size-4" />,
//       <Edit key={2} className="size-4" />,
//       <Trash2 key={3} className="size-4" />,
//     ],
//   },
// ];

type TableItem = {
  name: string;
  email: string;
  age: string;
  status: React.ReactNode;
  actions: React.JSX.Element[];
};

type ComplianceTableExtras = {
  emptyState?: React.ReactNode;
  caption?: string;
  stickyHeader?: boolean;
  paginated?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  paginationClassName?: string;
  footer?: React.ReactNode;
};

// Just a helper for the intial
function getInitials(name: string): string {
  if (!name.trim()) return "";

  const parts = name.trim().split(/\s+/); // split by spaces

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
}

const TableComponent = <T extends TableItem>({
  columns,
  data = [],
  onRowSelect,
  emptyState,
  caption,
  stickyHeader = false,
}: ComplianceTableProps<T> & ComplianceTableExtras) => {
  const hasRows = data.length > 0;
  return (
    <section className=" w-10/12 mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-6 mx-auto max-w-[800px]">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Table</h2>

      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        <Table className="text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader
            className={
              stickyHeader ? "bg-primary-50 sticky top-0" : "bg-primary-50"
            }
          >
            <TableRow className="text-xs font-semibold uppercase text-slate-500">
              {columns.map((column) => {
                return (
                  <TableHead
                    key={String(column.key)}
                    scope="col"
                    className={`px-6 py-3 ${
                      column.header.toLowerCase() === "age"
                        ? "w-16"
                        : column.header.toLowerCase() === "status"
                        ? "w-32"
                        : column.header.toLowerCase() === "actions"
                        ? "w-32 text-right"
                        : ""
                    }`}
                  >
                    {column.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasRows ? (
              data.map((item) => (
                <TableRow
                  key={String(item.name)}
                  tabIndex={onRowSelect ? 0 : -1}
                  onClick={onRowSelect ? () => onRowSelect(item) : undefined}
                  onKeyDown={
                    onRowSelect
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onRowSelect(item);
                          }
                        }
                      : undefined
                  }
                  className={
                    onRowSelect
                      ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring border-slate-100"
                      : "border-slate-100"
                  }
                >
                  {columns.map((col) => {
                    const content = (() => {
                      if (col.render) return col.render(item);

                      if (col.key === "name") {
                        return (
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                              {getInitials(item.name)}
                            </span>
                            <span className="text-sm text-slate-900">
                              {item.name}
                            </span>
                          </div>
                        );
                      }

                      if (col.key === "status") {
                        return (
                          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                            {item.status}
                          </span>
                        );
                      }

                      if (col.key === "actions") {
                        return (
                          <div className="flex items-center justify-end gap-2">
                            {item.actions?.map((action, index) => (
                              <button
                                className={`h-4 w-4
                                 ${
                                   index === 0
                                     ? "mx-1 text-slate-500 hover:text-slate-800"
                                     : index === 1
                                     ? '"mx-1 text-slate-500 hover:text-slate-800'
                                     : index === 2
                                     ? "mx-1 text-red-500 hover:text-red-700"
                                     : index < 2
                                     ? ""
                                     : ""
                                 }
                                `}
                                key={index}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        );
                      }

                      const cellValue = item[col.key as keyof T];
                      return cellValue !== undefined ? String(cellValue) : "";
                    })();

                    return (
                      <TableCell
                        className={`px-6 py-3 ${
                          col.key === "email"
                            ? "text-slate-700"
                            : col.key === "actions"
                            ? "text-right"
                            : ""
                        }`}
                        key={String(col.key)}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground"
                >
                  {emptyState ?? "No records found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default TableComponent;
