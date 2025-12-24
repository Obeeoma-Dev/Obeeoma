import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import MonthlyUsageChart from "../../../components/admincomponents/Reportcomponents/monthlyUsageChart";
import AvailableReports from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container } from "react-bootstrap";
/**
 * ReportPage component renders the system admin report dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const ReportPage = () => {
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(MonthlyUsageChart, {}), _jsx(AvailableReports, {}), _jsx(CustomReportForm, {})] }) }) })] })] }));
};
export default ReportPage;
