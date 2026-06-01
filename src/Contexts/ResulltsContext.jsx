import { createContext } from "react";

const ResultsContext = createContext(null);

function ResultsProvider({ children }) {
  return (
    <ResultsContext.Provider value={{}}>{children}</ResultsContext.Provider>
  );
}

export { ResultsContext, ResultsProvider };
