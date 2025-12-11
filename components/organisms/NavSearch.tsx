"use client";
// Solo fighter - Search Only
// Main idea. The input gets added to URL and trigger get request

import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, startTransition, type FormEvent } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type NavSearchProps = {
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  inputId?: string;
  hideLabel?: boolean;
};

const NavSearch = ({
  label = "Search Items",
  placeholder = "Search items...",
  inputClassName,
  inputId = "nav-search",
  hideLabel = true,
}: NavSearchProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState<string>(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    // instead of blocking UI. Mark the navigation as non-urgent
    startTransition(() => replace(`?${params.toString()}`));
  }, 300);
  const currentSearchValue = searchParams.get("search");

  useEffect(() => {
    if (currentSearchValue) return;

    startTransition(() => {
      setSearch("");
    });
  }, [currentSearchValue]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch.flush();
  };

  return (
    <form
      role="search"
      aria-label={label}
      onSubmit={handleSubmit}
      className="w-full max-w-md"
    >
      <label
        className={cn(
          hideLabel
            ? "sr-only"
            : "mb-1 block text-sm font-medium text-muted-foreground"
        )}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className="bg-background rounded-md">
        <Input
          id={inputId}
          type="search"
          aria-label={label}
          placeholder={placeholder}
          value={search}
          className={cn("bg-transparent border-none shadow-sm", inputClassName)}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default NavSearch;
