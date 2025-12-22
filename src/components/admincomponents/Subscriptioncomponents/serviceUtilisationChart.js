import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProgressBar } from "react-bootstrap";
const ServiceUtilizationChart = ({ services }) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "Service Utilization" }), services.map((service, index) => (_jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: service.name }), _jsx(ProgressBar, { now: service.percentage, label: `${service.percentage}%` })] }, index)))] }));
};
export default ServiceUtilizationChart;
