"use client";
// Solo fighter - Search Only
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, startTransition } from "react";
import { Input } from "../atoms/input";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState<string>(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    // Decided to move it the page where the list is being invoked. So the list container
    // const pageNumber = params.get('page') || 1
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    // params.set('page',pageNumber);
    replace(`?${params.toString()}`);
  }, 300);
  const currentSearchValue = searchParams.get("search");

  useEffect(() => {
    if (currentSearchValue) return;

    startTransition(() => {
      setSearch("");
    });
  }, [currentSearchValue]);
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
};

export default NavSearch;
