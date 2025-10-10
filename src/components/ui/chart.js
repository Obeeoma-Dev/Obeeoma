import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
/* -------------------------------------------
   CustomTooltip component
   - Renders the hover tooltip for Recharts
   - Shows label (x-axis value) and series data
------------------------------------------- */
export const CustomTooltip = ({ active, label, payload = [] }) => {
  if (!active || !payload.length) return null;
  return _jsxs("div", {
    className: "rounded-md border bg-white p-2 shadow-sm",
    children: [
      label && _jsx("p", { className: "text-sm font-medium", children: label }),
      payload.map((item, index) =>
        _jsxs(
          "p",
          {
            className: "text-xs",
            style: { color: item.color ?? "#000" },
            children: [item.name, ": ", item.value],
          },
          index,
        ),
      ),
    ],
  });
};
/* -------------------------------------------
   ChartContainer
   - Wraps charts in a responsive container
   - Ensures auto-sizing (100% width, fixed height)
------------------------------------------- */
export const ChartContainer = ({ children }) => {
  return _jsx(ResponsiveContainer, {
    width: "100%",
    height: 300,
    children: children,
  });
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
export const ExampleChart = () =>
  _jsx(ChartContainer, {
    children: _jsxs(LineChart, {
      data: sampleData,
      children: [
        _jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        _jsx(XAxis, { dataKey: "name" }),
        _jsx(YAxis, {}),
        _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }),
        _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#8884d8" }),
      ],
    }),
  });
