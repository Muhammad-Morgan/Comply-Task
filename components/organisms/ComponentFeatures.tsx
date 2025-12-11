"use client";
import * as React from "react";
import { features } from "@/lib/lists";
export const ComponentFeatures = () => {
  return (
    <section className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 px-6 py-5">
      <h2 className="mb-4 text-lg font-semibold text-primary-700">
        Component Features
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-primary-100 bg-white px-5 py-4 shadow-sm"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50">
              {item.icon}
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-xs text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
