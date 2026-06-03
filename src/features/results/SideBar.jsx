import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Brain,
  Cpu,
  FileText,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    hasSublinks: false,
  },
  {
    id: "demographics",
    label: "Demographics",
    icon: Users,
    hasSublinks: true,
    sublinks: [
      { id: "gender-dist", label: "Gender distribution" },
      { id: "dominant-age", label: "Dominant age" },
      { id: "education", label: "Education" },
    ],
  },
  {
    id: "career",
    label: "Career & opportunities",
    icon: TrendingUp,
    hasSublinks: true,
    sublinks: [
      { id: "average-salary", label: "Average salary" },
      { id: "bonuses", label: "Bonuses" },
    ],
  },
  {
    id: "ai",
    label: "Artificial intelligence",
    icon: Brain,
    hasSublinks: true,
    sublinks: [
      { id: "ai-adoption", label: "AI Adoption Tools" },
      { id: "ai-future", label: "AI Future" },
    ],
  },
  {
    id: "opinions",
    label: "Opinions & Preferences",
    icon: FileText,
    hasSublinks: false,
  },
  { id: "summary", label: "Summary", icon: FileText, hasSublinks: false },
];

function Sidebar({
  isMinimized,
  onToggleMinimize,
  activeSection,
  allSectionsData,
  onSectionChange,
}) {
  const [expandedSections, setExpandedSections] = useState({
    [activeSection]: true,
  });

  const getSectionNavItems = (sectionId) => {
    const sectionData = allSectionsData?.find(
      (section) => section.mappedId === sectionId,
    );
    return (
      sectionData?.navItems?.map((navItem) => ({
        id: navItem.blockId,
        label: navItem.label,
      })) || []
    );
  };

  const handleSectionClick = (item) => {
    onSectionChange(item.id);
    if (item.hasSublinks) {
      setExpandedSections((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      // maybe collapse others if desired, for now leave as is
    }
  };

  const handleSublinkClick = (sublinkId, sectionId) => {
    if (sectionId) {
      onSectionChange(sectionId);
    }

    const element = document.getElementById(sublinkId);
    if (element) {
      const yOffset = -40;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-200">
      {/* Pinned top area (Logo + Toggle) */}
      <div
        className={`flex items-center px-6 pt-6 pb-6 ${
          isMinimized ? "justify-center" : "justify-between"
        }`}
      >
        {!isMinimized && (
          <a className="font-bebas mr-auto flex cursor-pointer items-center text-3xl tracking-wide text-white transition-opacity">
            STATEOFDEV<span className="text-indigo-300">_DZ</span>
          </a>
        )}
        <button
          onClick={onToggleMinimize}
          className={`flex items-center justify-center text-slate-300 transition-transform duration-300 hover:text-white ${isMinimized ? "w-full" : ""}`}
        >
          {isMinimized ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* Scrollable nav items */}
      <div className="scrollbar-hide flex-1 overflow-y-auto pb-8">
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isExpanded = expandedSections[item.id] || false;

            return (
              <div key={item.id} className="space-y-1">
                {item.hasSublinks ? (
                  <button
                    onClick={() => handleSectionClick(item)}
                    className={`relative flex w-full items-center justify-between outline-none ${
                      isMinimized ? "justify-center px-0 py-3" : "px-6 py-2.5"
                    } ${
                      isActive
                        ? "bg-indigo-600 font-bold text-white"
                        : "group rounded-r-full font-semibold text-slate-200 hover:bg-indigo-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        size={20}
                        className={`${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-white"
                        } ${isMinimized ? "mx-auto" : "mr-3"}`}
                      />
                      {!isMinimized && <span>{item.label}</span>}
                    </div>
                    {!isMinimized && (
                      <span className="text-slate-400">
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleSectionClick(item)}
                    className={`flex items-center outline-none ${
                      isMinimized
                        ? "justify-center rounded-none px-0 py-3"
                        : "rounded-r-full px-6 py-2.5"
                    } w-full ${
                      isActive
                        ? "bg-indigo-600 font-bold text-white"
                        : "group font-medium text-slate-200 hover:bg-indigo-800 hover:text-white"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      } ${isMinimized ? "mx-auto" : "mr-3"}`}
                    />
                    {!isMinimized && <span>{item.label}</span>}
                  </button>
                )}

                {/* Sub-items (hidden when minimized) */}
                {item.hasSublinks && isExpanded && !isMinimized && (
                  <div className="relative space-y-1 pl-12 transition-all duration-300">
                    <div className="absolute top-0 bottom-4 left-8 w-px bg-slate-700"></div>

                    {getSectionNavItems(item.id).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSublinkClick(sub.id, item.id)}
                        className="group block w-full rounded-r-full py-2 pr-6 text-left text-sm text-slate-300 transition-colors hover:bg-indigo-900 hover:text-white"
                      >
                        <div className="px-4">{sub.label}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
