import * as React from "react";
import { SimpleOption, TAG_OPTIONS } from "@/lib/lists";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type TagsMultiSelectProps = {
  tagValues: string[];
  toggleTag: (value: string) => void;
  tagsOpen: boolean;
  setTagsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  tagQuery: string;
  setTagQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredTags: SimpleOption[];
  getLabel: (options: SimpleOption[], value: string) => string;
};

const TagsMultiSelect = ({
  tagValues,
  toggleTag,
  tagsOpen,
  setTagsOpen,
  handleControlKeyDown,
  tagQuery,
  setTagQuery,
  filteredTags,
  getLabel,
}: TagsMultiSelectProps) => {
  return (
    <div className="relative">
      {/* Same relative shell for the tags dropdown so it renders right below the trigger. */}
      <label className="mb-1 block text-sm font-medium text-slate-800">
        Tags{" "}
        <span className="text-xs font-normal text-slate-500">
          (Multi-select with Search)
        </span>
      </label>

      {/* shell is a div with role=button (no nested real button issue) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setTagsOpen((open) => !open)}
        onKeyDown={handleControlKeyDown}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm outline-none transition",
          tagsOpen
            ? "border-emerald-500 ring-2 ring-emerald-100"
            : "border-slate-200 hover:border-emerald-500"
        )}
      >
        <div className="flex flex-wrap gap-1 text-left">
          {tagValues.length === 0 ? (
            <span className="text-slate-400">Select tags</span>
          ) : (
            tagValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
              >
                {getLabel(TAG_OPTIONS, value)}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTag(value);
                  }}
                  className="rounded-full p-0.5 hover:bg-emerald-100"
                >
                  <X className="h-3 w-3" /> {/* quick remove button for each chip */}
                </button>
              </span>
            ))
          )}
        </div>
        <svg
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform",
            tagsOpen && "rotate-180"
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

      {tagsOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 rounded-lg border border-slate-200 bg-white text-sm shadow-lg">
          <div className="border-b border-slate-100 p-2">
            <input
              type="text"
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
            />
          </div>
          {/* filter results update as user types */}
          <div className="max-h-56 overflow-auto py-1">
            {filteredTags.map((tag) => {
              const isSelected = tagValues.includes(tag.value);
              return (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => toggleTag(tag.value)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-emerald-50",
                    isSelected && "bg-emerald-50 font-medium"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border",
                      isSelected
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300 bg-white"
                    )}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 20 20" className="h-3 w-3 text-white">
                        <path
                          d="M6 10.5 8.5 13 14 7.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span>{tag.label}</span>
                </button>
              );
            })}
            {filteredTags.length === 0 && (
              <p className="px-3 py-2 text-center text-xs text-slate-500">
                No tags match that search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsMultiSelect;
