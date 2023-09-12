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
        additional: (
          <div className="label flex flex-col">
            <select
              name="implementationType"
              className="w-fit my-4"
              onChange={(e) => {
                setParam("implementationType", e.target.value);
                recalculate();
              }}
            >
              <option value="one-time">One-Time Cost</option>
              <option value="monthly">Monthly Retainer</option>
            </select>
          </div>
        ),
      },
    ],
    [params, currency, recalculate, setParam]
  );

  const kpis = useMemo(
    () => [
      {
        label: "Time Saved",
        value: results.timeSaved,
        unit: "hrs",
        getExamples: (value: number) => [
          `enough time for ${Math.floor(value * 1.5)} more sales calls`,
          `that's ${Math.floor(value / 2)} extra vacation days`,
          `like ${Math.floor(value / 4)} months of work for one employee`,
          `that's ${Math.floor(value / 8)} extra workdays`,
          `that’s ${Math.floor(value / 4)} additional team-building sessions`,

          `enough time to read ${Math.floor(
            value / 2
          )} industry research papers`,
        ],
      },
      {
        label: "Wage Cost",
        value: results.wageCost,
        unit: currency,
        getExamples: (value: number) => [
          `you could hire a temp for ${Math.floor(value / 100)} days`,
          `that’s enough to buy ${Math.floor(value / 30)} office chairs`,
          `like sponsoring a small conference`,
        ],
      },
      {
        label: "Savings",
        value: results.savings,
        unit: currency,
        getExamples: (value: number) => [
          `that's ${Math.floor(value / 50)} team lunches`,
          `or ${Math.floor(value / 1000)} new laptops`,
          `equivalent to ${Math.floor(value / 300)} hours of consultancy`,
        ],
      },
      {
        label: "Annual Savings",
        value: results.annualSavings,
        unit: currency,
        getExamples: (value: number) => [
          `that's like getting a ${Math.floor(value / 12)} monthly bonus`,
          `or funding a ${Math.floor(value / 30000)}-person team for a year`,
          `enough to open a new office location`,
        ],
      },
      {
        label: "Net Savings",
        value: results.netSavings,
        unit: currency,
        getExamples: (value: number) => [
          `you could invest in ${Math.floor(
            value / 500
          )} hours of further automation`,
          `that's ${Math.floor(value / 5000)} months of rent for a new office`,
          `like acquiring a small company`,
        ],
      },
      {
        label: "ROI",
        value: results.roi,
        unit: "%",
        getExamples: (value: number) => [
          `that's a ${Math.floor(value / 10)}x multiplier on your investment`,
          `like getting a ${Math.floor(value / 5)}% annual stock return`,
          `equivalent to doubling your money ${Math.floor(value / 100)} times`,
        ],
      },
    ],
    [results, currency]
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
            {param.additional}
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
          {kpis.map((kpi, index) => (
            <div key={index}>
              <div>
                {kpi.label}: {kpi.unit}
                {kpi.value.toLocaleString()}
              </div>
              <small>
                {
                  kpi.getExamples(kpi.value)[
                    Math.floor(
                      Math.random() * kpi.getExamples(kpi.value).length
                    )
                  ]
                }
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
