import { useContext } from "react";
import { ResultsContext } from "./ResulltsContext";

export function useResults() {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
}
