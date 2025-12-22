import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, ProgressBar } from "react-bootstrap";
import { BarChartFill } from "react-bootstrap-icons";
// ✅ Functional component with Bootstrap layout and icons
const EffectivenessChart = ({ data }) => {
    return (_jsxs(Card, { className: "shadow-sm h-100", children: [_jsxs(Card.Header, { className: "fw-semibold d-flex align-items-center", children: [_jsx(BarChartFill, { className: "me-2 text-primary", size: 20 }), "Effectiveness by Resource Type (%)"] }), _jsx(Card.Body, { children: data.map((item) => (_jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: item.label }), _jsx(ProgressBar, { now: item.percentage, label: `${item.percentage}%`, variant: item.percentage >= 80
                                ? "success"
                                : item.percentage >= 60
                                    ? "warning"
                                    : "danger", className: "mt-1" })] }, item.label))) })] }));
};
export default EffectivenessChart;
