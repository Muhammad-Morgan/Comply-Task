"use client";

import { useQuery } from "@tanstack/react-query";
import ComplianceWrapper from "../layouts/ComplianceWrapper";
import { ComplianceItem, getComplianceItems } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

const ComplianceTablePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const response = useQuery({
    queryKey: ["complianceItems", search],
    queryFn: () => getComplianceItems(page, search),
  });
  if (!response.data) {
    return <div>Loading…</div>;
  }
  const { data, pageCount } = response.data as {
    data: ComplianceItem[];
    pageCount: number;
  };
  return (
    <ComplianceWrapper
      initialData={data}
      page={Number(page)}
      pageCount={pageCount}
      initialSearch={search}
    />
  );
};

export default ComplianceTablePage;
