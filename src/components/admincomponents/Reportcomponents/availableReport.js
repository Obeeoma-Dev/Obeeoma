import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { FileText, Download } from 'lucide-react';
import { DownloadPopup } from './dowloadpopup';
const reports = [
    {
        id: "1",
        title: "Monthly Usage Report",
        type: "PDF",
        date: "Jan 2026",
        size: "2.3 MB",
    },
];
export function AvailableReports() {
    const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    // Handles clicking the download button
    const handleDownloadClick = (report) => {
        // Set selected report
        setSelectedReport(report);
        // Open popup
        setDownloadPopupOpen(true);
    };
    return (_jsx(Card, { className: "p-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "mb-4", style: { fontFamily: "heading" }, children: "Available Reports" }), _jsx(Stack, { gap: 3, children: reports.map((report) => (
                    // Individual report card
                    _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { children: _jsx(FileText, { size: 20 }) }), _jsxs("div", { style: { fontFamily: "body" }, children: [_jsx("div", { className: "fw-medium", children: report.title }), _jsxs("small", { className: "text-muted", children: [report.type, " \u2022 ", report.date, " \u2022 ", report.size] })] })] }), _jsx(Button, { variant: "outline-success", onClick: () => handleDownloadClick(report), children: _jsx(Download, { size: 18 }) })] }) }) }, report.id))) }), selectedReport && (_jsx(DownloadPopup, { isOpen: downloadPopupOpen, onClose: () => setDownloadPopupOpen(false), reportTitle: selectedReport.title, reportType: selectedReport.type, reportDate: selectedReport.date, reportSize: selectedReport.size }))] }) }));
}
