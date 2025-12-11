import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ComplianceTable from "../organisms/ComplianceTable";
import { type ComplianceItem } from "@/lib/actions";
import { Input } from "../ui/input";
import { Column, Props as ComplianceWrapperProps } from "@/lib/types";

// simple generic debounce function
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

type ComplianceWrapperExtra = {
  columns?: Column<ComplianceItem>[];
  onRowSelect?: (row: ComplianceItem) => void;
  searchPlaceholder?: string;
  searchLabel?: string;
  debounceMs?: number;
  className?: string;
  searchClassName?: string;
};

const defaultColumns: Column<ComplianceItem>[] = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
  { key: "jurisdiction", header: "Jurisdiction" },
];

const ComplianceWrapper = ({
  initialData,
  page,
  pageCount,
  initialSearch = "",
  status = "idle",
  statusMessage = "Loading Result",
  columns = defaultColumns,
  onRowSelect,
  searchPlaceholder = "Search by name…",
  searchLabel = "Search compliance items",
  debounceMs = 300,
  className = "",
  searchClassName = "",
}: ComplianceWrapperProps & ComplianceWrapperExtra) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(initialSearch);
  const debouncedSearch = useDebouncedValue(search, debounceMs);
  const prevSearchRef = React.useRef(debouncedSearch);
  // memoizing the input to avoid unnessecary re-renders
  const updateQuery = React.useCallback(
    (nextPage: number, nextSearch = debouncedSearch) => {
      const params = new URLSearchParams(searchParams.toString());
      // adding next page
      params.set("page", String(nextPage));
      // adding search query if exists
      if (nextSearch) params.set("search", nextSearch);
      else params.delete("search");
      // navigate to the new url after checking that the new constructed url doesn't match the old one
      const next = `?${params.toString()}`;
      const current = `?${searchParams.toString()}`;
      if (next !== current) {
        router.push(next);
      }
    },
    [debouncedSearch, router, searchParams]
  );

  // reseting to page 1 after search changes
  React.useEffect(() => {
    if (prevSearchRef.current === debouncedSearch) return;
    prevSearchRef.current = debouncedSearch;
    updateQuery(1, debouncedSearch);
  }, [debouncedSearch, updateQuery]);

  const handlePageChange = (nextPage: number) => {
    updateQuery(nextPage);
  };

  return (
    <div className={className}>
      <form
        className={searchClassName}
        aria-label={searchLabel}
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="sr-only" htmlFor="compliance-search">
          {searchLabel}
        </label>
        <Input
          id="compliance-search"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {status === "loading" && (
        <div role="status" className="text-sm text-muted-foreground">
          {statusMessage}
        </div>
      )}
      <ComplianceTable<ComplianceItem>
        columns={columns}
        onPageChange={handlePageChange}
        data={initialData}
        page={page}
        pageCount={pageCount}
        onRowSelect={onRowSelect}
      />
    </div>
  );
};

export default ComplianceWrapper;
