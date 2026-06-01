import React, { useState } from "react";
import ResultsLayout from "../features/results/ResultsLayout";
import ResultsHeader from "../features/results/ResultsHeader";
import SectionTitle from "../features/results/SectionTitle";
import QuestionBanner from "../features/results/QuestionBanner";
import ControlsBar from "../features/results/ControlsBar";
import ChartRenderer from "../features/results/ChartRenderer";

export default function ResultsPage() {
  const [activeSection, setActiveSection] = useState("career");
  const [isMinimized, setIsMinimized] = useState(false);

  // Helper to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "technologies":
        return (
          <>
            <div className="mb-12">
              <h1 className="font-bebas mb-4 flex flex-col text-6xl leading-none tracking-wide uppercase md:text-7xl">
                <span>Technologies</span>
              </h1>
              <p className="text-lg text-gray-500 md:text-xl">
                Most used programming languages, frameworks, tools, etc.
              </p>
            </div>

            <div
              id="languages"
              className="mt-8 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;LANGUAGES /&gt;
                </h2>
              </div>
              <QuestionBanner />
              <ControlsBar />
              <ChartRenderer />
            </div>

            <div
              id="frameworks"
              className="mt-16 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;FRAMEWORKS /&gt;
                </h2>
              </div>
              <QuestionBanner />
              <ControlsBar />
              <ChartRenderer />
            </div>
          </>
        );

      case "demographics":
        return (
          <>
            <div className="mb-12">
              <h1 className="font-bebas mb-4 flex flex-col text-6xl leading-none tracking-wide uppercase md:text-7xl">
                <span>Demographics</span>
              </h1>
              <p className="text-lg text-gray-500 md:text-xl">
                Gender distribution, age, education.
              </p>
            </div>

            <div
              id="gender-dist"
              className="mt-8 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;GENDER DISTRIBUTION /&gt;
                </h2>
              </div>
              <ChartRenderer />
            </div>

            <div
              id="dominant-age"
              className="mt-16 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;DOMINANT AGE /&gt;
                </h2>
              </div>
              <ChartRenderer />
            </div>

            <div
              id="education"
              className="mt-16 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;EDUCATION /&gt;
                </h2>
              </div>
              <ChartRenderer />
            </div>
          </>
        );

      case "career":
      default:
        // Default to career
        return (
          <>
            <ResultsHeader />
            <div
              id="average-salary"
              className="mt-8 border-t border-dashed border-gray-200 pt-8"
            >
              <SectionTitle />
              <QuestionBanner />
              <ControlsBar />
              <ChartRenderer />
            </div>
            <div
              id="bonuses"
              className="mt-16 border-t border-dashed border-gray-200 pt-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <h2 className="font-bebas text-4xl tracking-wide uppercase">
                  &lt;BONUSES /&gt;
                </h2>
              </div>
              <QuestionBanner />
              <ControlsBar />
              <ChartRenderer />
            </div>
          </>
        );
    }
  };

  return (
    <ResultsLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      isMinimized={isMinimized}
      setIsMinimized={setIsMinimized}
    >
      <div className="mx-auto w-full max-w-5xl">{renderContent()}</div>
    </ResultsLayout>
  );
}
