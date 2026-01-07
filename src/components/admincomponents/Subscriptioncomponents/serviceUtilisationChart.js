import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ServiceUtilizationChart = ({ services }) => {
    return (_jsx("div", { className: "p-3", children: services.map((service, index) => (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-2", style: { fontFamily: "body" }, children: [_jsx("span", { className: "small fw-medium", children: service.name }), _jsxs("span", { className: "small text-muted", children: [service.percentage, "%"] })] }), _jsx("div", { className: "progress", style: { height: "8px" }, children: _jsx("div", { className: "progress-bar bg-success", role: "progressbar", style: { width: `${service.percentage}%` }, "aria-valuenow": service.percentage, "aria-valuemin": 0, "aria-valuemax": 100 }) })] }, index))) }));
};
export default ServiceUtilizationChart;
