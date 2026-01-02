import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
/**
 * MetricsPanel Component
 *
 * Displays key subscription metrics in a card layout matching the design specification.
 * Each metric card shows the main value with a percentage change indicator and icon.
 */
const MetricsPanel = ({ totalOrganizations, totalSubscriptions, coveredEmployees, utilizationRate, }) => {
    return (_jsxs(Row, { className: "mb-4 g-3", children: [_jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-2", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-0", children: "Total Organizations" }), _jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: "#3CB371",
                                            borderRadius: "6px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }, children: _jsx("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M3 6h12M3 9h12M3 12h8M15 3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: totalOrganizations }), _jsx("div", { className: "text-success small fw-medium", children: "+12% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-2", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-0", children: "Total Subscriptions" }), _jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: "#3CB371",
                                            borderRadius: "6px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { x: "3", y: "4", width: "12", height: "10", rx: "1", stroke: "white", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M3 7h12M6 4V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1v2", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] }) })] }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: totalSubscriptions }), _jsx("div", { className: "text-success small fw-medium", children: "+8% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-2", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-0", children: "Covered Employees" }), _jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: "#3CB371",
                                            borderRadius: "6px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "9", cy: "6", r: "3", stroke: "white", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] }) })] }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: coveredEmployees }), _jsx("div", { className: "text-success small fw-medium", children: "+5% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-2", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-0", children: "Utilization Rate" }), _jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            backgroundColor: "#3CB371",
                                            borderRadius: "6px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }, children: _jsx("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M3 15L6 9l3 3 6-9", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] }), _jsxs("div", { className: "fw-bold fs-4 mb-1", children: [utilizationRate, "%"] }), _jsx("div", { className: "text-success small fw-medium", children: "+3% from last month" })] }) }) })] }));
};
export default MetricsPanel;
