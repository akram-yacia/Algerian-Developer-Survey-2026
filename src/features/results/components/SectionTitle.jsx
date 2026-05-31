import React from "react";
import { BarChart3, Users } from "lucide-react";

function SectionTitle() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4">
      <h2 className="font-bebas text-4xl tracking-wide uppercase">
        &lt;AVERAGE SALARY /&gt;
      </h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-sm font-medium">
          <BarChart3 size={16} />
          <span>2</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-sm font-medium">
          <Users size={16} />
          <span>2,433</span>
        </div>
      </div>
    </div>
  );
}

export default SectionTitle;
