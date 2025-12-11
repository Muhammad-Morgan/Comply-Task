"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useCountries } from "@/lib/hooks/useCountries";

type CountryAsyncSelectProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (value: string, label: string) => void;
  selectedLabel?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
};

const CountryAsyncSelect = ({
  query,
  onQueryChange,
  onSelect,
  selectedLabel,
  open,
  setOpen,
  handleControlKeyDown,
}: CountryAsyncSelectProps) => {
  const listRef = React.useRef<HTMLDivElement | null>(null); // keep handle on scrollable list
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useCountries(query); // react-query hook handles caching + pagination

  const countries = data?.pages.flatMap((page) => page.options) ?? [];

  React.useEffect(() => {
    if (!open) return;
    const el = listRef.current!;
    if (!el) return;

    function handleScroll() {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      if (atBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [open, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-800">
        <Filter className="h-4 w-4 text-primary-600" />
        <span>
          Country{" "}
          <span className="text-xs font-normal text-slate-500">
            (Async API with Pagination)
          </span>
        </span>
      </label>

      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={handleControlKeyDown}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm outline-none transition",
            open
              ? "border-primary-500 ring-2 ring-primary-100"
              : "border-slate-200 hover:border-primary-500"
          )}
        >
          <span className={selectedLabel ? "text-slate-900" : "text-slate-400"}>
            {selectedLabel || "Select country"}
          </span>
          <svg
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform",
              open && "rotate-180"
            )}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-slate-200 bg-white text-sm shadow-lg">
            <div className="border-b border-slate-100 p-2">
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search countries..."
                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
              />
            </div>
            {/* Virtualized-ish list with manual infinite scroll. */}
            <div ref={listRef} className="max-h-56 overflow-y-auto">
              {isLoading && countries.length === 0 && (
                <p className="px-3 py-2 text-center text-xs text-slate-500">
                  Loading…
                </p>
              )}

              {isError && (
                <p className="px-3 py-2 text-center text-xs text-red-500">
                  Failed to load countries.
                </p>
              )}

              {countries.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSelect(opt.value, opt.label);
                    setOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-left hover:bg-emerald-50"
                >
                  {opt.label}
                </button>
              ))}

              {countries.length === 0 && !isLoading && !isError && (
                <p className="px-3 py-2 text-center text-xs text-slate-500">
                  No countries match that search.
                </p>
              )}

              {isFetchingNextPage && (
                <p className="px-3 py-2 text-center text-xs text-slate-500">
                  Loading more…
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">Scroll to load more countries</p>
    </div>
  );
};

export default CountryAsyncSelect;
