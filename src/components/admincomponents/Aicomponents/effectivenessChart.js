import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProgressBar } from 'react-bootstrap';
const EffectivenessChart = ({ data }) => (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "Effectiveness by Resource Type" }), data.map((item) => (_jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: item.label }), _jsx(ProgressBar, { now: item.percentage, label: `${item.percentage}%` })] }, item.label)))] }));
export default EffectivenessChart;
