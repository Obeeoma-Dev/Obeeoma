import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/reportcomponents/CustomReportForm.tsx
import { useState } from "react";
import { Card } from "react-bootstrap";
const CustomReportForm = () => {
    // Local state for form fields
    const [reportType, setReportType] = useState("Platform Usage");
    const [dateRange, setDateRange] = useState("Last 30 Days");
    const [format, setFormat] = useState("PDF");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder logic for report generation
        alert(`Generating ${reportType} report for ${dateRange} in ${format} format`);
    };
    return (_jsx(Card, { style: {
            border: "none",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
        }, children: _jsxs(Card.Body, { style: { padding: "1.5rem" }, children: [_jsx("h5", { style: {
                        fontFamily: "heading",
                        color: "#1a1a1a",
                        marginBottom: "1.5rem",
                    }, children: "Generate Custom Report" }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { style: {
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-end",
                            flexWrap: "wrap",
                        }, children: [_jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Report Type" }), _jsxs("select", { value: reportType, onChange: (e) => setReportType(e.target.value), style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                        }, children: [_jsx("option", { children: "Platform Usage" }), _jsx("option", { children: "Health Conditions" }), _jsx("option", { children: "Treatment Outcomes" }), _jsx("option", { children: "Organization Performance" })] })] }), _jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Date Range" }), _jsxs("select", { value: dateRange, onChange: (e) => setDateRange(e.target.value), style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                        }, children: [_jsx("option", { children: "Last 7 Days" }), _jsx("option", { children: "Last 30 Days" }), _jsx("option", { children: "Last 90 Days" }), _jsx("option", { children: "Last 6 Months" }), _jsx("option", { children: "Last Year" }), _jsx("option", { children: "Custom Range" })] })] }), _jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Format" }), _jsxs("select", { value: format, onChange: (e) => setFormat(e.target.value), style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                        }, children: [_jsx("option", { children: "PDF" }), _jsx("option", { children: "Excel" }), _jsx("option", { children: "CSV" })] })] }), _jsx("button", { type: "submit", style: {
                                    backgroundColor: "#3CB371",
                                    color: "#ffffff",
                                    padding: "0.625rem 1.5rem",
                                    borderRadius: "6px",
                                    border: "none",
                                    fontFamily: "body",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    height: "fit-content",
                                }, children: "Generate Report" })] }) })] }) }));
};
export default CustomReportForm;
