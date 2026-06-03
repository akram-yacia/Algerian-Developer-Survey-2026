import React from "react";
import { BarChart3 } from "lucide-react";

export default function SectionTitle({ title, index }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-bebas text-xl tracking-wide text-indigo-900 uppercase sm:text-2xl md:text-3xl">
        &lt;{title} /&gt;
      </h2>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 w-fit sm:text-sm">
        <BarChart3 size={14} />
        <span>{index}</span>
      </div>
    </div>
  );
}
