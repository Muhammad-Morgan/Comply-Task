"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export type CountryOption = {
  label: string;
  value: string;
};

type CountryResponse = {
  options: CountryOption[];
  hasMore: boolean;
  page: number;
};

const PAGE_SIZE = 5;

export function useCountries(query: string) {
  return useInfiniteQuery<CountryResponse>({
    queryKey: ["countries", query],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        query,
        page: String(pageParam),
        pageSize: String(PAGE_SIZE),
      });

      const res = await fetch(`/api/countries?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load countries");
      }
      return res.json();
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    staleTime: 60 * 1000,
  });
}
