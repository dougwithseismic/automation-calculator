"use client";

import React, { useEffect, useState, useCallback, ReactNode } from "react";
import CalculatorContext from "./CalculatorContext";
import { CalculatorResults } from "./types";

type CalculatorProviderProps = {
  children: ReactNode;
};

const CalculatorProvider: React.FC<CalculatorProviderProps> = ({
  children,
}) => {
  const [params, setParams] = useState({
    hoursPerTask: 1,
    tasksPerMonth: 30,
    hourlyWage: 20,
    numEmployees: 5,
    implementationCost: 1000,
    implementationType: "one-time",
  });

  const [results, setResults] = useState<CalculatorResults>({
    timeSaved: 0,
    wageCost: 0,
    savings: 0,
    annualSavings: 0,
    netSavings: 0,
    roi: 0,
  });

  const recalculate = useCallback(() => {
    const {
      hoursPerTask,
      tasksPerMonth,
      hourlyWage,
      numEmployees,
      implementationCost,
      implementationType,
    } = params;

    const timeSaved = hoursPerTask * tasksPerMonth;
    const wageCost = hourlyWage * timeSaved;
    const savings = wageCost * numEmployees;
    const annualSavings = savings * 12;
    const totalImplementationCost =
      implementationCost * (implementationType === "one-time" ? 1 : 12);
    const netSavings = annualSavings - totalImplementationCost;
    const roi = (netSavings / implementationCost) * 100;

    setResults({
      timeSaved,
      wageCost,
      savings,
      annualSavings,
      netSavings,
      roi,
    });
  }, [params]);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  const setParam = (key: keyof typeof params, value: number | string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CalculatorContext.Provider
      value={{ results, params, setParam, recalculate }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
