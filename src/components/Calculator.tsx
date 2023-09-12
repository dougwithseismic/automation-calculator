"use client";
import React, { useState } from "react";
import useCalculator from "@/hooks/useCalculator";
import { Heading, Slider, Text } from "@radix-ui/themes";

const Calculator: React.FC = () => {
  const { results, setParam, recalculate, params } = useCalculator();
  const [currency, setCurrency] = useState<string>("$");
  const [implementationType, _setImplementationType] =
    useState<string>("one-time"); // 'one-time' or 'monthly'
  return (
    <div className="p-4">
      <h1 className="text-4xl">How much should automation save you?</h1>
      <p className="my-4">
        This calculator will help you estimate how much time and money you can
        save by automating a task.
      </p>

      <div className="mb-4">
        {/* Hours Per Task Slider */}
        <div className="input mb-4">
          <label className="block mb-2">
            Hours Per Task: {params.hoursPerTask}
          </label>
          <Slider
          defaultValue={[4]}
            min={1}
            max={40}
            step={1}
            value={[params.hoursPerTask]}
            onValueChange={(e) => {
              setParam("hoursPerTask", e[0]);
              recalculate();
            }}
          />
          <small>Hours spent on a single task</small>
        </div>

        {/* Tasks Per Month Slider */}

        <div className="input mb-4">
          <label className="block mb-2">
            Tasks Per Month: {params.tasksPerMonth}
          </label>
          <Slider
            min={2}
            max={100}
            step={2}
            value={[params.tasksPerMonth]}
            onValueChange={(e) => {
              setParam("tasksPerMonth", e[0]);
              recalculate();
            }}
          />
          <small>Number of tasks per month for one employee</small>
        </div>

        {/* Hourly Wage Slider */}
        <div className="input mb-4">
          <label className="block mb-2">Hourly Rate: {params.hourlyWage}</label>
          <Slider
            min={1}
            max={200}
            step={1}
            value={[params.hourlyWage]}
            onValueChange={(e) => {
              setParam("hourlyWage", e[0]);
              recalculate();
            }}
          />
          <small>An employees average hourly rate</small>
        </div>

        {/* Number of Employees Slider */}
        <div className="input mb-4">
          <label className="block mb-2">
            Number of Employees: {params.numEmployees}
          </label>
          <Slider
            min={1}
            max={50}
            defaultValue={[5]}
            step={1}
            value={[params.numEmployees]}
            onValueChange={(e) => {
              setParam("numEmployees", e[0]);
              recalculate();
            }}
          />{" "}
          <small>Number of employees doing the task monthly</small>
        </div>

        {/* Implementation Cost Slider */}
        <div className="input mb-4">
          <label className="block mb-2">
            Implementation Cost: {currency}
            {parseFloat(params.implementationCost.toFixed(2)).toLocaleString()}
          </label>
          <Slider
            defaultValue={[2500]}
            min={500}
            max={100000}
            step={500}
            value={[params.implementationCost]}
            onValueChange={(e) => {
              setParam("implementationCost", e[0]);
              recalculate();
            }}
          />
          <label className="label flex flex-col">
            <small>
              Cost of implementing the automation (one-time or monthly)
            </small>
            <select
              className="w-fit my-4"
              onChange={(e) => {
                setParam("implementationType", e.target.value);
                recalculate();
              }}
            >
              <option value="one-time">One-Time Cost</option>
              <option value="monthly">Monthly Retainer</option>
            </select>
          </label>
        </div>

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
          <div>Time Saved: {results.timeSaved.toLocaleString()} hrs</div>
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
          </div>
          <div>
            Net Savings: {currency}
            {results.netSavings.toLocaleString()}
          </div>
          <div>ROI: {parseFloat(results.roi.toFixed(2)).toLocaleString()}%</div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
