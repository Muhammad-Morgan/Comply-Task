import * as React from "react";
import { INTEREST_OPTIONS, SimpleOption } from "@/lib/lists";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type InterestsMultiSelectProps = {
  interests: string[];
  selectedInterestCount: string;
  interestsOpen: boolean;
  setInterestsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  getLabel: (options: SimpleOption[], value: string) => string;
  toggleInterest: (value: string) => void;
};

const InterestsMultiSelect = ({
  interests,
  selectedInterestCount,
  interestsOpen,
  setInterestsOpen,
  handleControlKeyDown,
  getLabel,
  toggleInterest,
}: InterestsMultiSelectProps) => {
  const [loading, setLoading] = React.useState(true); // mimic async preload so UI shows skeleton

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer); // clear timer if component unmounts
  }, []);

  return (
    <div className="relative">
      {/* Relative wrapper anchors the dropdown list that uses absolute positioning. */}
      <label className="mb-1 block text-sm font-medium text-slate-800">
        Interests{" "}
        <span className="text-xs font-normal text-slate-500">
          (Multi-select with max 5)
        </span>
      </label>
      <div
        role="button" // acts like a button so keyboard users can toggle dropdown
        tabIndex={0}
        onClick={() => setInterestsOpen((open) => !open)}
        onKeyDown={handleControlKeyDown}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm outline-none transition",
          interestsOpen
            ? "border-primary-500 ring-2 ring-primary-100"
            : "border-slate-200 hover:border-primary-500"
        )}
      >
        <div className="flex flex-wrap gap-1 text-left">
          {loading ? (
            <span className="flex items-center gap-2 text-slate-400">
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary-500"
                aria-hidden="true"
              />
              Loading interests…
            </span>
          ) : interests.length === 0 ? (
            <span className="text-slate-400">Select interests</span>
          ) : (
            interests.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
              >
                {getLabel(INTEREST_OPTIONS, value)}
                {/* inner button prevents nested button semantics */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleInterest(value);
                  }}
                  className="rounded-full p-0.5 hover:bg-primary-100"
                  aria-label="Remove interest"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <div className="ml-2 flex items-center text-slate-400">
          <svg
            className={cn(
              "h-4 w-4 transition-transform",
              interestsOpen && "rotate-180"
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
      </div>

      {/* dropdown menu – all options live inside here */}
      {interestsOpen && (
        <div className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg">
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = interests.includes(opt.value);
            const disabled = !isSelected && interests.length >= 5;

            return (
              <button
                key={opt.value}
                type="button"
                disabled={disabled}
                onClick={() => toggleInterest(opt.value)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-primary-50",
                  isSelected && "bg-primary-50",
                  disabled &&
                    "cursor-not-allowed text-slate-300 hover:bg-white"
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border",
                    isSelected
                      ? "border-primary-600 bg-primary-600"
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
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-1 text-xs text-slate-500">
        Selected: {selectedInterestCount}
      </p>
    </div>
  );
};

export default InterestsMultiSelect;
