import React from "react";
import { BarChart3, Users } from "lucide-react";

export default function SectionTitle({ title, count, index }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4">
      <h2 className="font-bebas text-2xl tracking-wide text-black uppercase md:text-3xl">
        &lt;{title} /&gt;
      </h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-sm font-medium text-black">
          <BarChart3 size={16} />
          <span>{index}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-sm font-medium text-black">
          <Users size={16} />
          <span>{count?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
