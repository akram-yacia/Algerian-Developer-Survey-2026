import React from "react";

export default function ResultsHeader({ title = "", intro = "" }) {
  return (
    <div className="mb-12">
      <h1 className="font-bebas mb-4 text-6xl leading-none tracking-wide text-indigo-900 uppercase md:text-7xl">
        {title}
      </h1>
      <p className="text-sm text-slate-600 md:text-base">{intro}</p>
    </div>
  );
}
