"use client";
import React, { useState, useMemo } from "react";
import useCalculator from "@/hooks/useCalculator";
import { Slider } from "@radix-ui/themes";

const Calculator: React.FC = () => {
  const { results, setParam, recalculate, params } = useCalculator();
  const [currency, setCurrency] = useState<string>("$");

  const sliderParams = useMemo(
    () => [
      {
        label: "Hours Per Task",
        min: 1,
        max: 40,
        step: 1,
        value: params.hoursPerTask,
        description: "Hours spent on a single task",
        key: "hoursPerTask",
      },
      {
        label: "Tasks Per Month",
        min: 2,
        max: 100,
        step: 2,
        value: params.tasksPerMonth,
        description: "Number of tasks per month for one employee",
        key: "tasksPerMonth",
      },
      {
        label: "Hourly Rate",
        min: 1,
        max: 200,
        step: 1,
        value: params.hourlyWage,
        description: "An employees average hourly rate",
        key: "hourlyWage",
      },
      {
        label: "Number of Employees",
        min: 1,
        max: 50,
        step: 1,
        value: params.numEmployees,
        description: "Number of employees doing the task monthly",
        key: "numEmployees",
      },
      {
        label: `Implementation Cost: ${currency}${parseFloat(
          params.implementationCost.toFixed(2)
        ).toLocaleString()}`,
        min: 500,
        max: 100000,
        step: 500,
        value: params.implementationCost,
        description:
          "Cost of implementing the automation (one-time or monthly)",
        key: "implementationCost",
      },
    ],
    [params, currency]
  );

  return (
    <div className="p-4">
      <h1 className="text-4xl">How much should automation save you?</h1>
      <p className="my-4">
        This calculator will help you estimate how much time and money you can
        save by automating a task.
      </p>

      <div className="mb-4">
        {/* Hours Per Task Slider */}
        {sliderParams.map((param, index) => (
          <div className="input mb-4" key={index}>
            <label className="block mb-2">
              {param.label}: {param.value}
            </label>
            <Slider
              min={param.min}
              max={param.max}
              step={param.step}
              value={[param.value]}
              onValueChange={(e) => {
                setParam(param.key as any, e[0]);
                recalculate();
              }}
            />
            <small>{param.description}</small>
          </div>
        ))}
        {/* Results */}
        {/* Results */}
        {/* Currency Dropdown */}
        <div className="mb-4">
          <label className="block mb-2">Select Currency: </label>
          <select onChange={(e) => setCurrency(e.target.value)}>
            <option value="$">USD ($)</option>
            <option value="£">GBP (£)</option>
            <option value="€">EUR (€)</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-3">Results</h2>
          <div>
            Time Saved: {results.timeSaved.toLocaleString()} hrs
            <span className="text-sm text-gray-500">
              — enough time for {Math.floor(results.timeSaved / 0.5)} more sales
              calls.
            </span>
          </div>
          <div>
            Wage Cost: {currency}
            {results.wageCost.toLocaleString()}
          </div>
          <div>
            Savings: {currency}
            {results.savings.toLocaleString()}
          </div>
          <div>
            Annual Savings: {currency}
            {results.annualSavings.toLocaleString()}
            <span className="text-sm text-gray-500">
              — roughly equal to {Math.floor(results.annualSavings / 5000)}{" "}
              months of an entry-level salary.
            </span>
          </div>
          <div>
            Net Savings: {currency}
            {results.netSavings.toLocaleString()}
            <span className="text-sm text-gray-500">
              — thats like getting {Math.floor(results.netSavings / 100)} new
              laptops.
            </span>
          </div>
          <div>
            ROI: {parseFloat(results.roi.toFixed(2)).toLocaleString()}%
            <span className="text-sm text-gray-500">
              — a ROI of {Math.floor(results.roi)}% is{" "}
              {results.roi > 100 ? "excellent" : "good"}.
            </span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Calculator;
