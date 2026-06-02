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
                      count={block.totalRespondents}
                      index={index + 1}
                    />
                    <QuestionBanner question={block.question} />
                    <ControlsBar />
                    <ChartRenderer type={block.chartType} data={block.data} />
                  </div>
                ))}
              </section>
            ))}
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
