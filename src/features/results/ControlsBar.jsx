import React from "react";
import { ChevronDown, Share } from "lucide-react";

function ControlsBar() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <button className="flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 font-medium transition-colors hover:bg-stone-50">
        <span>All Respondents</span>
        <ChevronDown size={18} />
      </button>

      <button className="flex items-center gap-2 rounded-lg bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800">
        <Share size={18} />
        <span>Share</span>
      </button>
    </div>
  );
}

export default ControlsBar;
