import React from "react";
import { ChevronDown, Share } from "lucide-react";

export default function ControlsBar() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <button className="flex items-center gap-2 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-stone-100">
        <span>All Respondents</span>
        <ChevronDown size={18} />
      </button>

      <button className="flex items-center gap-2 rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800">
        <Share size={16} />
        <span>Share</span>
      </button>
    </div>
  );
}
