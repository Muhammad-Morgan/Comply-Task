import { NextResponse } from "next/server";
import { COUNTRY_OPTIONS } from "@/lib/lists";

type CountryResponse = {
  options: { label: string; value: string }[];
  hasMore: boolean;
  page: number;
};

function chunkCountries(query: string, page: number, pageSize: number) {
  const filtered = COUNTRY_OPTIONS.filter((country) =>
    country.label.toLowerCase().includes(query.toLowerCase())
  );
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    options: data,
    hasMore: start + pageSize < filtered.length,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "5");
  const { options, hasMore } = chunkCountries(query, page, pageSize);
  const body: CountryResponse = { options, hasMore, page };

  return NextResponse.json(body);
}
