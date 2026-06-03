import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

function ResultsLayout({
  children,
  activeSection,
  allSectionsData,
  onSectionChange,
  isMinimized,
  setIsMinimized,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavItems = [
    { id: "overview", label: "Overview" },
    { id: "demographics", label: "Demographics" },
    { id: "career", label: "Career & Opportunities" },
    { id: "ai", label: "Artificial intelligence" },
    { id: "opinions", label: "Opinions & Preferences" },
    { id: "summary", label: "Summary" },
  ];

  const handleMobileSectionClick = (sectionId) => {
    setMobileMenuOpen(false);
    onSectionChange(sectionId);
  };
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-900 md:flex-row">
      <div className="sticky top-0 z-50 w-full bg-slate-100 md:hidden">
        <div className="flex items-center justify-between border-b border-indigo-200 bg-indigo-600 p-4">
          <div className="font-bebas text-3xl tracking-wide text-white">
            STATEOFDEV<span className="text-indigo-200">_DZ</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-white transition hover:bg-indigo-500/90"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-b border-indigo-200 bg-white shadow-sm">
            <div className="space-y-1 px-4 py-4">
              {mobileNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileSectionClick(item.id)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-indigo-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`sticky top-0 hidden h-screen shrink-0 border-r border-indigo-900 transition-all duration-300 ease-in-out md:block ${
          isMinimized ? "w-20" : "w-64"
        }`}
      >
        <Sidebar
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
          activeSection={activeSection}
          allSectionsData={allSectionsData}
          onSectionChange={onSectionChange}
        />
      </div>

      <main className="flex min-h-screen min-w-0 flex-1 justify-center bg-slate-100 p-0 transition-all duration-300 md:p-6 lg:p-8">
        <div className="h-full w-full max-w-5xl scroll-smooth bg-white/95 p-6 shadow-2xl md:rounded-2xl md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

export default ResultsLayout;
