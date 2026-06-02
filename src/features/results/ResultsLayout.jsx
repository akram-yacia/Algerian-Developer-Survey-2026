import React from "react";
import Sidebar from "./Sidebar";

function ResultsLayout({
  children,
  activeSection,
  onSectionChange,
  isMinimized,
  setIsMinimized,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100 font-sans text-stone-900 md:flex-row">
      <div className="flex items-center justify-between border-b border-stone-200 bg-stone-100 p-4 md:hidden">
        <div className="font-bebas text-3xl tracking-wide text-stone-900">
          STATEOFDEV<span className="text-stone-500">_DZ</span>
        </div>
        <button className="p-2 text-stone-900">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`sticky top-0 hidden h-screen shrink-0 border-r border-stone-200 transition-all duration-300 ease-in-out md:block ${
          isMinimized ? "w-20" : "w-64"
        }`}
      >
        <Sidebar
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </div>

      <main className="flex min-h-screen min-w-0 flex-1 justify-center bg-[#1a1a1a] p-0 transition-all duration-300 md:p-6 lg:p-8">
        <div className="h-full w-full max-w-5xl scroll-smooth bg-white p-6 shadow-xl md:rounded-2xl md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

export default ResultsLayout;
