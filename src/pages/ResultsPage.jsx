import React, { useState, useEffect, useRef } from "react";
import { ResultsProvider } from "../Contexts/ResulltsContext";
import { useResults } from "../Contexts/useResults";

import ResultsLayout from "../features/results/ResultsLayout";
import ResultsHeader from "../features/results/ResultsHeader";
import SectionTitle from "../features/results/SectionTitle";
import QuestionBanner from "../features/results/QuestionBanner";
import ControlsBar from "../features/results/ControlsBar";
import ChartRenderer from "../features/results/ChartRenderer";

function ResultsContent() {
  const { activeSection, setActiveSection, allSectionsData, isLoading, error } =
    useResults();
  const [isMinimized, setIsMinimized] = useState(false);

  // For IntersectionObserver
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mappedId = entry.target.getAttribute("data-section");
            if (mappedId && mappedId !== activeSection) {
              setActiveSection(mappedId);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Trigger when passing the top 20% of the screen
      },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [allSectionsData, activeSection, setActiveSection]);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // Smooth scroll to the specific section
    const el = sectionRefs.current[sectionId];
    if (el) {
      const yOffset = -50; // A bit of padding from top
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <ResultsLayout
      activeSection={activeSection}
      allSectionsData={allSectionsData}
      onSectionChange={handleSectionChange}
      isMinimized={isMinimized}
      setIsMinimized={setIsMinimized}
    >
      <div className="mx-auto w-full max-w-5xl">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center text-stone-500">
            Loading data...
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center text-red-500">
            Error: {error}
          </div>
        ) : allSectionsData?.length > 0 ? (
          <div className="flex flex-col gap-24">
            {allSectionsData.map((sectionData) => (
              <section
                key={sectionData.mappedId}
                data-section={sectionData.mappedId}
                ref={(el) => (sectionRefs.current[sectionData.mappedId] = el)}
                className="scroll-mt-10"
              >
                <ResultsHeader
                  title={sectionData.title}
                  intro={sectionData.intro}
                />

                {sectionData.blocks?.map((block, index) => (
                  <div
                    key={block.blockId}
                    id={block.blockId}
                    className="mt-16 pt-8"
                  >
                    <SectionTitle
                      title={block.title}
                      index={index + 1}
                    />
                    <QuestionBanner question={block.question} />
                    <ControlsBar />
                    <ChartRenderer type={block.chartType} data={block.data} />
                  </div>
                ))}
              </section>
            ))}

            <section
              key="summary"
              data-section="summary"
              ref={(el) => (sectionRefs.current.summary = el)}
              className="scroll-mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-lg"
            >
              <div className="mb-6 rounded-2xl bg-indigo-600/5 p-6 text-indigo-900">
                <h2 className="text-3xl font-semibold text-slate-900">
                  Summary
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
                  The charts collectively tell a consistent story: the Algerian
                  developer community is young, educated, and career-driven,
                  with AI adoption growing fast even as local infrastructure
                  and market challenges shape everyday decisions.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">
                    Demographics
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    Gender, age, and education charts highlight a core group of
                    mid-career developers with strong academic backgrounds and
                    a clear preference for stable roles.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">
                    Career outlook
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    Salary and employment data show momentum toward higher pay,
                    company growth, and a hybrid/remote work mix that matches
                    global developer demand.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">
                    AI & opinions
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    AI charts underscore frequent tool usage, while opinion
                    graphs reveal concerns about local connectivity, career
                    recognition, and the practical impact of AI.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </ResultsLayout>
  );
}

export default function ResultsPage() {
  return (
    <ResultsProvider>
      <ResultsContent />
    </ResultsProvider>
  );
}
