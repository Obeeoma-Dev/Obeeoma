import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
// Import React-Bootstrap components
import { Card, Button, Stack } from "react-bootstrap";
// Import icons
import { Download } from "lucide-react";
// Import popup component
import { DownloadPopup } from "./dowloadpopup";
// Example reports data
const reports = [
    {
        id: "1",
        title: "Monthly Usage Report",
        type: "PDF",
        date: "Jan 2026",
        size: "2.3 MB",
        format: "pdf",
    },
];
/**
 * Helper function to determine icon background color based on format
 */
const getIconColor = (format) => {
    switch (format?.toLowerCase()) {
        case "pdf":
            return "#e44d26"; // Reddish for PDF
        case "csv":
            return "#217346"; // Green for CSV/Excel
        default:
            return "#6c757d"; // Gray default
    }
};
export function AvailableReports() {
    // Controls popup visibility
    const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
    // Stores the selected report
    const [selectedReport, setSelectedReport] = useState(null);
    // Handles clicking the download button
    const handleDownloadClick = (report) => {
        setSelectedReport(report);
        setDownloadPopupOpen(true);
    };
    return (_jsx(Card, { className: "p-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "mb-4", children: "Available Reports" }), _jsx(Stack, { gap: 3 })] }) }));
    {
        reports.map((report) => (
        // Individual report card
        _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { children: _jsx(FileText, { size: 20 }) }), "=======", reports.map((report, index) => (_jsxs("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "1rem 0",
                                        // Corrected: Compare against index to handle the last item properly
                                        borderBottom: index !== reports.length - 1 ? "1px solid #e9ecef" : "none",
                                        gap: "1rem",
                                        justifyContent: "space-between", // Ensures button stays to the right
                                    }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [_jsx("div", { style: {
                                                        width: "40px",
                                                        height: "40px",
                                                        backgroundColor: getIconColor(report.format),
                                                        borderRadius: "6px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M6 2h8l4 4v14H6V2z", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M14 2v4h4", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("line", { x1: "8", y1: "10", x2: "16", y2: "10", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("line", { x1: "8", y1: "13", x2: "16", y2: "13", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("line", { x1: "8", y1: "16", x2: "14", y2: "16", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-medium", children: report.title }), _jsxs("small", { className: "text-muted", children: [report.type, " \u2022 ", report.date, " \u2022 ", report.size] })] })] }), ">>>>>>> 0305418c6bc29903147e41a9f90c7a47ae00e0f2", _jsx(Button, { variant: "outline-success", onClick: () => handleDownloadClick(report), className: "d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px", padding: 0 }, children: _jsx(Download, { size: 18 }) })] }, report.id)))] }), selectedReport && (_jsx(DownloadPopup, { isOpen: downloadPopupOpen, onClose: () => setDownloadPopupOpen(false), reportTitle: selectedReport.title, reportType: selectedReport.type, reportDate: selectedReport.date, reportSize: selectedReport.size }))] }) }) }, report.id)));
    }
}
