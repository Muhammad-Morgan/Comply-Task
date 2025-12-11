import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ComplianceTableProps } from "@/lib/types";
import { cn } from "@/lib/utils";
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
function ComplianceTable<T extends { id: string | number }>({
  columns,
  data = [],
  page = 1,
  pageCount = 1,
  onPageChange,
  onRowSelect,
  emptyState,
  caption,
  stickyHeader = false,
  paginated = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  paginationClassName,
  footer,
}: ComplianceTableProps<T> & ComplianceTableExtras) {
  const hasRows = data.length > 0;
  return (
    <div
      className="space-y-4"
      role="region"
      aria-label={caption ?? "Compliance table"}
    >
      <div className="overflow-x-auto border rounded-md bg-card">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader
            className={stickyHeader ? "sticky top-0 bg-card" : undefined}
          >
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableHead
                    key={String(column.key)}
                    scope="col"
                    className="text-muted-foreground font-semibold"
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
                  key={String(item.id)}
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
                      ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
                      : undefined
                  }
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(item)
                        : String(item[col.key] ?? "")}
                    </TableCell>
                  ))}
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
      {footer}
      {/* Simple pagination control if required */}
      {paginated && (
        <div
          className={cn(
            "mt-2 flex items-center justify-between gap-4 text-sm",
            paginationClassName
          )}
          role="navigation"
          aria-label="Table pagination"
        >
          <span className="text-muted-foreground">
            Page {page} of {pageCount}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || !onPageChange}
              onClick={() => onPageChange?.(page - 1)}
            >
              {previousLabel}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pageCount || !onPageChange}
              onClick={() => onPageChange?.(page + 1)}
            >
              {nextLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplianceTable;
