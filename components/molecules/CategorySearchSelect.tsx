import * as React from "react";
import { SimpleOption } from "@/lib/lists";
import { cn } from "@/lib/utils";

type CategorySearchSelectProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categoryLabel: string;
  categoryQuery: string;
  setCategoryQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredCategories: SimpleOption[];
  categoryOpen: boolean;
  setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
};

const CategorySearchSelect = ({
  category,
  setCategory,
  categoryLabel,
  categoryQuery,
  setCategoryQuery,
  filteredCategories,
  categoryOpen,
  setCategoryOpen,
  handleControlKeyDown,
}: CategorySearchSelectProps) => {
  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-slate-800">
        Category{" "}
        <span className="text-xs font-normal text-slate-500">
          (Frontend Search)
        </span>
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setCategoryOpen((open) => !open)}
        onKeyDown={handleControlKeyDown}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm outline-none transition",
          categoryOpen
            ? "border-primary-500 ring-2 ring-primary-100"
            : "border-slate-200 hover:border-primary-500"
        )}
      >
        <span className={category ? "text-slate-900" : "text-slate-400"}>
          {category ? categoryLabel : "Select category"}
        </span>
        <svg
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform",
            categoryOpen && "rotate-180"
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

      {categoryOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 rounded-lg border border-slate-200 bg-white text-sm shadow-lg">
          {/* search input is inside the dropdown now */}
          <div className="border-b border-slate-100 p-2">
            <input
              type="text"
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
            />
          </div>
          {/* filtered list follows the query letter-for-letter */}
          <div className="max-h-56 overflow-auto py-1">
            {filteredCategories.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setCategory(opt.value);
                  setCategoryOpen(false);
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left hover:bg-primary-50",
                  category === opt.value && "bg-primary-50 font-medium"
                )}
              >
                {opt.label}
              </button>
            ))}
            {filteredCategories.length === 0 && (
              <p className="px-3 py-2 text-center text-xs text-slate-500">
                No categories match that search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySearchSelect;
