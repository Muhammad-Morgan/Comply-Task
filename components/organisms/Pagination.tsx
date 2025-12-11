"use client";

import * as React from "react";
const Pagination = () => {
  return (
    <section className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Pagination</h2>

      <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left text */}
          <p className="text-xs leading-5 text-slate-600">
            Showing 1
            <br />
            to 10 of 50
            <br />
            results
          </p>

          {/* Right controls */}
          <div className="flex items-center gap-2 text-xs">
            <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-400 cursor-default">
              Previous
            </button>

            <button className="h-8 w-8 rounded-full bg-green-700 text-center text-xs font-semibold text-white">
              1
            </button>

            <button className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              2
            </button>

            <button className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              3
            </button>

            <span className="px-1 text-slate-400">…</span>

            <button className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              10
            </button>

            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
