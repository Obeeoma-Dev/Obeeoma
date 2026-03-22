import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import "./modelPerformance.css";
const data = [
    {
        week: "Week 1",
        value: 250,
    },
    {
        week: "Week 2",
        value: 310,
    },
    {
        week: "Week 3",
        value: 290,
    },
    {
        week: "Week 4",
        value: 340,
    },
    {
        week: "Week 5",
        value: 300,
    },
    {
        week: "Week 6",
        value: 360,
    },
];
function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (_jsxs("div", { className: "weekly-activity-tooltip", children: [_jsx("p", { className: "weekly-activity-tooltip-label", children: label }), _jsxs("p", { className: "weekly-activity-tooltip-value", children: [payload[0].value, " recommendations"] })] }));
    }
    return null;
}
export function WeeklyActivityChart() {
    return (_jsxs("div", { className: "weekly-activity-chart-container", children: [_jsxs("div", { className: "weekly-activity-header", children: [_jsx("h3", { className: "weekly-activity-title", children: "Weekly AI Activity" }), _jsx("p", { className: "weekly-activity-subtitle", children: "Volume of AI recommendations over the last 6 weeks" })] }), _jsx(ResponsiveContainer, { width: "100%", height: 220, children: _jsxs(LineChart, { data: data, margin: {
                        top: 5,
                        right: 10,
                        left: -10,
                        bottom: 5,
                    }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: {
                                fontSize: 12,
                                fill: "#9ca3af",
                            }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: {
                                fontSize: 12,
                                fill: "#9ca3af",
                            }, axisLine: false, tickLine: false, domain: [0, 400] }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}), cursor: {
                                stroke: "#e5e7eb",
                                strokeWidth: 1,
                            } }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#16a34a", strokeWidth: 2.5, dot: {
                                fill: "#ffffff",
                                stroke: "#16a34a",
                                strokeWidth: 2.5,
                                r: 4,
                            }, activeDot: {
                                fill: "#16a34a",
                                stroke: "#ffffff",
                                strokeWidth: 2,
                                r: 6,
                            } })] }) })] }));
}
export default WeeklyActivityChart;
