import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import MentalHealthChart from "../../../components/admincomponents/Reportcomponents/mentalHealthChart";
import PlatformUsageChart from "../../../components/admincomponents/Reportcomponents/platformUsageChart";
import TreatmentOutcomesChart from "../../../components/admincomponents/Reportcomponents/treatmentOutcomesChart";
import OrganizationPerformanceChart from "../../../components/admincomponents/Reportcomponents/organizationPerformanceChart";
import { AvailableReports } from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container } from "react-bootstrap";
/**
 * ReportPage component renders the system admin report dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const ReportPage = () => {
    const [activeTab, setActiveTab] = useState("Health Conditions");
    const tabs = [
        "Platform Usage",
        "Health Conditions",
        "Treatment Outcomes",
        "Organization Performance",
    ];
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsxs("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "2rem",
                            backgroundColor: "#ffffff",
                        }, children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-4", children: [_jsx("h1", { style: {
                                            fontSize: "2rem",
                                            fontWeight: "bold",
                                            color: "#1a1a1a",
                                            margin: 0,
                                        }, children: "Reports & Analytics" }), _jsxs("div", { className: "d-flex gap-3", children: [_jsxs("button", { className: "btn", style: {
                                                    border: "1px solid #dee2e6",
                                                    backgroundColor: "#ffffff",
                                                    color: "#495057",
                                                    padding: "0.5rem 1rem",
                                                    borderRadius: "6px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                }, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M2 4h12M2 8h12M2 12h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) }), "Filter Data"] }), _jsx("button", { className: "btn", style: {
                                                    backgroundColor: "#3CB371",
                                                    color: "#ffffff",
                                                    padding: "0.5rem 1.5rem",
                                                    borderRadius: "6px",
                                                    border: "none",
                                                    fontWeight: "500",
                                                }, children: "Generate New Report" })] })] }), _jsx("div", { className: "d-flex gap-4 mb-4", style: { borderBottom: "1px solid #e9ecef" }, children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), style: {
                                        background: "none",
                                        border: "none",
                                        padding: "0.75rem 0",
                                        marginRight: "1rem",
                                        fontSize: "1rem",
                                        color: activeTab === tab ? "#3CB371" : "#6c757d",
                                        fontWeight: activeTab === tab ? "600" : "400",
                                        borderBottom: activeTab === tab ? "2px solid #3CB371" : "2px solid transparent",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }, children: tab }, tab))) }), _jsxs(Container, { fluid: true, className: "px-0", children: [activeTab === "Platform Usage" && (_jsx("div", { className: "mb-5", children: _jsx(PlatformUsageChart, {}) })), activeTab === "Health Conditions" && (_jsx("div", { className: "mb-5", children: _jsx(MentalHealthChart, {}) })), activeTab === "Treatment Outcomes" && (_jsx("div", { className: "mb-5", children: _jsx(TreatmentOutcomesChart, {}) })), activeTab === "Organization Performance" && (_jsx("div", { className: "mb-5", children: _jsx(OrganizationPerformanceChart, {}) })), _jsx("div", { className: "mb-5", children: _jsx(AvailableReports, {}) }), _jsx("div", { children: _jsx(CustomReportForm, {}) })] })] })] })] }));
};
export default ReportPage;
