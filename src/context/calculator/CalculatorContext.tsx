import { createContext, useContext } from "react";
import { CalculatorResults } from "./types";

// CalculatorContext.tsx

type Params = {
  hoursPerTask: number;
  tasksPerMonth: number;
  hourlyWage: number;
  numEmployees: number;
  implementationCost: number;
  implementationType: string;
};

type CalculatorContextType = {
  results: CalculatorResults;
  params: Params;
  setParam: (key: keyof Params, value: number | string) => void;
  recalculate: () => void;
};

const CalculatorContext = createContext<CalculatorContextType | null>(null);

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error(
      "useCalculatorContext must be used within a CalculatorProvider"
    );
  }
  return context;
};

export default CalculatorContext;
