import React from "react";
import { ChevronDown, Share } from "lucide-react";

export default function ControlsBar() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <button className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-900 transition-colors hover:bg-indigo-50">
        <span>All Respondents</span>
        <ChevronDown size={18} />
      </button>

      <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
        <Share size={16} />
        <span>Share</span>
      </button>
    </div>
  );
}
