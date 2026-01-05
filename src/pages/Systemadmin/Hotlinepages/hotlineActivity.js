import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from "react-bootstrap";
// Importing shared layout components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
// Importing dashboard modules
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallReasonsChart from "../../../components/admincomponents/Hotlinecomponents/callsResourcesChart";
import CallLogTable from "../../../components/admincomponents/Hotlinecomponents/callLogTable";
import CriticalCases from "../../../components/admincomponents/Hotlinecomponents/criticalCases";
import OperatorPerformance from "../../../components/admincomponents/Hotlinecomponents/operatorPerformance";
// Define the main HotlineActivity page component
const HotlineActivity = () => {
    return (
    // Main wrapper to hold sidebar, header, and content
    _jsxs("div", { style: { display: "flex", height: "100vh", overflow: "hidden" }, children: [_jsx(AdminSidebar, {}), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsx(AdminHeader, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Container, { fluid: true, children: [_jsx(TopMetrics, { totalCalls: 42, avgCallTime: "9:22", missedCalls: 3 }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsx(HourlyCallChart, {}) }), _jsx(Col, { md: 6, children: _jsx(CallReasonsChart, {}) })] }), _jsx(CallLogTable, {}), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { xs: 12, lg: 6, children: _jsx(CriticalCases, {}) }), _jsx(Col, { xs: 12, lg: 6, children: _jsx(OperatorPerformance, {}) })] })] }) })] })] }));
};
export default HotlineActivity;
