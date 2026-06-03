import React, { createContext, useState, useEffect } from "react";

const ResultsContext = createContext(null);

export function ResultsProvider({ children }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [allSectionsData, setAllSectionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const slugs = [
          "background",
          "demographics",
          "career",
          "ai",
          "opinions",
        ];
        const promises = slugs.map((slug) =>
          fetch(`http://localhost:3000/api/sections/${slug}`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${slug}`);
            return res.json();
          }),
        );

        const results = await Promise.all(promises);

        // Map backend slugs to our Sidebar IDs
        const mappedData = results.map((s) => {
          let mappedId = s.slug;
          if (s.slug === "background") mappedId = "overview";
          return { ...s, mappedId };
        });

        setAllSectionsData(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <ResultsContext.Provider
      value={{
        activeSection,
        setActiveSection,
        allSectionsData,
        isLoading,
        error,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export { ResultsContext };
