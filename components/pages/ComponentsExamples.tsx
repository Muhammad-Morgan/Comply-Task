"use client";
import * as React from "react";
const ComponentsExamples = () => {
  return (
    <section className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Component Examples
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Example Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              Example Card
            </span>
            <span className="h-4 w-4 rounded-full bg-primary-500" />
          </div>

          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-900">
              <span>Sample Card</span>
              <span className="text-xs text-slate-500">Example</span>
            </div>
            <p className="text-xs text-slate-500">
              This shows how components look with a white background.
            </p>
          </div>

          <button className="mb-3 w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            Primary Button
          </button>

          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            placeholder="Input field"
          />
        </div>

        {/* Form Example */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              Form Example
            </span>
            <span className="h-4 w-4 rounded-full bg-primary-500" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                defaultValue="••••••••"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300"
              />
              <span>Remember me</span>
            </label>

            <button className="mt-1 w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentsExamples;
