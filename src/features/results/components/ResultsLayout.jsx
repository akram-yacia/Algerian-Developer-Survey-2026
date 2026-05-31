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
    <div className="flex min-h-screen flex-col bg-stone-100 font-sans text-black md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-stone-100 p-4 md:hidden">
        <div className="font-bebas text-3xl tracking-wide">STATEOFDEV_DZ</div>
        <button className="p-2">
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

      {/* Desktop Sidebar */}
      <div
        className={`sticky top-0 hidden h-screen shrink-0 transition-all duration-300 ease-in-out md:block ${
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

      {/* Main Content Area */}
      <main className="min-h-screen min-w-0 flex-1 rounded-t-3xl bg-white p-0 shadow-sm transition-all duration-300 md:rounded-none md:bg-stone-100 md:p-6 md:shadow-none">
        <div className="h-full scroll-smooth bg-white p-6 md:rounded-xl md:border md:border-stone-200 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export default ResultsLayout;
