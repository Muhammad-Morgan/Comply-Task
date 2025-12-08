import * as React from "react";
import { useRouter } from "next/navigation";
import ComplianceTable, { Column } from "../organisms/ComplianceTable";
import { type ComplianceItem } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { Input } from "../atoms/input";
type Props = {
  initialData: ComplianceItem[];
  page: number;
  pageCount: number;
  initialSearch: string;
};
// simple generic debounce function
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

const ComplianceWrapper = ({
  initialData,
  page,
  pageCount,
  initialSearch = "",
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(initialSearch);
  const debouncedSearch = useDebouncedValue(search, 300);
  const prevSearchRef = React.useRef(debouncedSearch);

  const columns: Column<ComplianceItem>[] = [
    { key: "name", header: "Name" },
    { key: "status", header: "Status" },
    { key: "jurisdiction", header: "Jurisdiction" },
  ] as const;
  const updateQuery = React.useCallback(
    (pageValue: number) => {
      const params = new URLSearchParams(searchParams.toString());
      // adding next page
      params.set("page", String(pageValue));
      if (debouncedSearch) params.set("search", debouncedSearch);
      else params.delete("search");
      // navigate to the new url
      const next = `?${params.toString()}`;
      const current = `?${searchParams.toString()}`;
      if (next !== current) {
        router.push(next);
      }
    },
    [debouncedSearch, router, searchParams]
  );

  const handlePageChange = (nextPage: number) => {
    updateQuery(nextPage);
  };
  // reseting to page 1 after search changes
  React.useEffect(() => {
    if (prevSearchRef.current === debouncedSearch) return;
    prevSearchRef.current = debouncedSearch;
    updateQuery(1);
  }, [debouncedSearch, updateQuery]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <label className="flex-1 text-sm">
          <span className="sr-only">Search compliance items</span>
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </label>
      </div>
      <ComplianceTable<ComplianceItem>
        columns={columns}
        onPageChange={handlePageChange}
        data={initialData}
        page={page}
        pageCount={pageCount}
        onRowSelect={(item) => console.log(item.id)}
      />
    </div>
  );
};

export default ComplianceWrapper;
