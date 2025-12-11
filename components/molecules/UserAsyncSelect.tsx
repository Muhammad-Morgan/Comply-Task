import * as React from "react";
import { UserOption } from "@/lib/lists";
import { cn } from "@/lib/utils";
import { Check, Users } from "lucide-react";

type UserAsyncSelectProps = {
  userValue: string;
  setUserValue: React.Dispatch<React.SetStateAction<string>>;
  userQuery: string;
  setUserQuery: React.Dispatch<React.SetStateAction<string>>;
  matchingUsers: UserOption[];
  userOpen: boolean;
  setUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  selectedUser?: UserOption;
};

const UserAsyncSelect = ({
  userValue,
  setUserValue,
  userQuery,
  setUserQuery,
  matchingUsers,
  userOpen,
  setUserOpen,
  handleControlKeyDown,
  selectedUser,
}: UserAsyncSelectProps) => {
  return (
    <div>
      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-800">
        <Users className="h-4 w-4 text-emerald-600" />
        <span>
          Assign to User{" "}
          <span className="text-xs font-normal text-slate-500">
            (Async with Email Search)
          </span>
        </span>
      </label>

      <div className="relative">
        {/* Trigger behaves like a button but keeps custom styling. */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setUserOpen((open) => !open)}
          onKeyDown={handleControlKeyDown}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm outline-none transition",
            userOpen
              ? "border-emerald-500 ring-2 ring-emerald-100"
              : "border-slate-200 hover:border-emerald-500"
          )}
        >
          <span className={selectedUser ? "text-slate-900" : "text-slate-400"}>
            {selectedUser
              ? `${selectedUser.label} (${selectedUser.email})`
              : "Select a user"}
          </span>
          <svg
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform",
              userOpen && "rotate-180"
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

        {userOpen && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-slate-200 bg-white text-sm shadow-lg">
            <div className="border-b border-slate-100 p-2">
              {/* Search input filters the list on the fly. */}
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100"
              />
            </div>
            {/* Show matches or fallback message if nothing found. */}
            <div className="max-h-56 overflow-auto">
              {matchingUsers.length > 0 ? (
                matchingUsers.map((user) => (
                  <button
                    key={user.value}
                    type="button"
                    onClick={() => {
                      setUserValue(user.value);
                      setUserOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-left hover:bg-emerald-50",
                      userValue === user.value && "bg-emerald-50 font-medium"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{user.label}</span>
                      <span className="text-xs text-slate-500">
                        {user.email}
                      </span>
                    </div>

                    {/* ✔ checkmark at right when selected */}
                    {userValue === user.value && (
                      <Check className="h-4 w-4 text-emerald-600" />
                    )}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-center text-xs text-slate-500">
                  No users match that search.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Selected: {selectedUser ? selectedUser.label : "None"}
      </p>
    </div>
  );
};

export default UserAsyncSelect;
