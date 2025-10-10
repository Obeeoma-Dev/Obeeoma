import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
const chartData = [
  { week: "Week 1", usage: 3000 },
  { week: "Week 2", usage: 3200 },
  { week: "Week 3", usage: 3400 },
  { week: "Week 4", usage: 3600 },
  { week: "Week 5", usage: 3800 },
  { week: "Week 6", usage: 4200 },
];
const Overview = () => {
  return _jsxs("div", {
    className: "space-y-6",
    children: [
      _jsx("h1", {
        className: "text-2xl font-bold text-gray-800",
        children: "System Admin Overview",
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
        children: [
          _jsxs("div", {
            className: "bg-white p-4 rounded shadow",
            children: [
              _jsx("p", {
                className: "text-sm text-gray-500",
                children: "Total Organizations",
              }),
              _jsx("p", { className: "text-2xl font-bold", children: "42" }),
            ],
          }),
          _jsxs("div", {
            className: "bg-white p-4 rounded shadow",
            children: [
              _jsx("p", {
                className: "text-sm text-gray-500",
                children: "Total Clients",
              }),
              _jsx("p", { className: "text-2xl font-bold", children: "1,284" }),
            ],
          }),
          _jsxs("div", {
            className: "bg-white p-4 rounded shadow",
            children: [
              _jsx("p", {
                className: "text-sm text-gray-500",
                children: "Monthly Revenue",
              }),
              _jsx("p", {
                className: "text-2xl font-bold",
                children: "$25,800",
              }),
            ],
          }),
          _jsxs("div", {
            className: "bg-white p-4 rounded shadow",
            children: [
              _jsx("p", {
                className: "text-sm text-gray-500",
                children: "Hotline Calls Today",
              }),
              _jsx("p", { className: "text-2xl font-bold", children: "42" }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "bg-white p-6 rounded shadow",
        children: [
          _jsx("h3", {
            className: "text-lg font-semibold mb-4",
            children: "Weekly Platform Usage",
          }),
          _jsx(ResponsiveContainer, {
            width: "100%",
            height: 300,
            children: _jsxs(LineChart, {
              data: chartData,
              children: [
                _jsx(CartesianGrid, { strokeDasharray: "3 3" }),
                _jsx(XAxis, { dataKey: "week" }),
                _jsx(YAxis, {}),
                _jsx(Tooltip, {}),
                _jsx(Line, {
                  type: "monotone",
                  dataKey: "usage",
                  stroke: "#22c55e",
                  strokeWidth: 2,
                  dot: false,
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
export default Overview;
