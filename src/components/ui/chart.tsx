// src/components/ui/chart.tsx
// ---------------------------------------------------------
// Chart utility components for Recharts
// - Strong TypeScript types (no implicit any)
// - Prettier + ESLint friendly
// - Jest-testable (pure functions + simple props)
// ---------------------------------------------------------

import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

/* -------------------------------------------
   Type for each data item inside Tooltip payload
   (Recharts passes an array of these objects)
------------------------------------------- */
type CustomTooltipItem = {
  value: number | string; // Value of the data point
  name?: string; // Series name
  color?: string; // Line/bar color
  dataKey?: string | number; // Key used in chart data
};

/* -------------------------------------------
   Props for our CustomTooltip
   Extends Recharts TooltipProps but with stricter typing
------------------------------------------- */
interface CustomTooltipProps extends TooltipProps<number, string> {
  label?: string;
  payload?: CustomTooltipItem[];
}

/* -------------------------------------------
   CustomTooltip component
   - Renders the hover tooltip for Recharts
   - Shows label (x-axis value) and series data
------------------------------------------- */
export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  label,
  payload = [],
}) => {
  if (!active || !payload.length) return null;

  return (
    <div className="rounded-md border bg-white p-2 shadow-sm">
      {/* Tooltip label (usually x-axis value) */}
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Render each item in the payload array */}
      {payload.map((item: CustomTooltipItem, index: number) => (
        <p
          key={index}
          className="text-xs"
          style={{ color: item.color ?? "#000" }}
        >
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};

/* -------------------------------------------
   ChartContainer
   - Wraps charts in a responsive container
   - Ensures auto-sizing (100% width, fixed height)
------------------------------------------- */
export const ChartContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {/* Cast children to ReactElement because ResponsiveContainer requires it */}
      {children as React.ReactElement}
    </ResponsiveContainer>
  );
};

/* -------------------------------------------
   ExampleChart
   - A sample chart using the above utilities
   - Demonstrates how to use CustomTooltip + ChartContainer
   - Replace with your own charts as needed
------------------------------------------- */
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

export const ExampleChart: React.FC = () => (
  <ChartContainer>
    <LineChart data={sampleData}>
      {/* Grid lines for better readability */}
      <CartesianGrid strokeDasharray="3 3" />

      {/* X and Y axis */}
      <XAxis dataKey="name" />
      <YAxis />

      {/* Tooltip with our custom renderer */}
      <Tooltip content={<CustomTooltip />} />

      {/* Line showing the data */}
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  </ChartContainer>
);
