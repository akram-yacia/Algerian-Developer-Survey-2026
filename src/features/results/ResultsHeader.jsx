import React from "react";

function ResultsHeader() {
  return (
    <div className="mb-12">
      <h1 className="font-bebas mb-4 flex flex-col text-6xl leading-none tracking-wide uppercase md:text-7xl lg:text-8xl">
        <span>Career &</span>
        <span>Opportunities</span>
      </h1>
      <p className="text-lg text-gray-500 md:text-xl">
        Career growth opportunities, average salary, bonuses ..etc.
      </p>
    </div>
  );
}

export default ResultsHeader;
