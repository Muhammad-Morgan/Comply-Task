"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import ComplianceWrapper from "../layouts/ComplianceWrapper";
import { ComplianceItem, getComplianceItems } from "@/lib/actions";

const ComplianceTablePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["complianceItems", page, search],
    queryFn: () => getComplianceItems(String(page), search),
    placeholderData: (previous) => previous,
  });

  if (isLoading) {
    return <div role="status">Loading…</div>;
  }
  if (isError || !data) {
    return (
      <div role="alert" className="space-y-2">
        <p>Failed to load compliance items.</p>
        <button className="underline" onClick={() => refetch()}>
          Try again
        </button>
        {error instanceof Error ? (
          <p className="text-xs text-muted-foreground">{error.message}</p>
        ) : null}
      </div>
    );
  }
  const { data: rows, pageCount } = data as {
    data: ComplianceItem[];
    pageCount: number;
  };
  return (
    <ComplianceWrapper
      initialData={rows}
      page={Number(page)}
      pageCount={pageCount}
      initialSearch={search}
      onRowSelect={(item) => console.log(item)}
      status={isFetching ? "loading" : "idle"}
    />
  );
};

export default ComplianceTablePage;
