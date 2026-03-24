import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { FileText, Download, Trash2, Upload } from "lucide-react";
import { DownloadPopup } from "./dowloadpopup";
export function AvailableReports({ reports, onDeleteReport, onUploadReport }) {
    const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const reportsData = reports || [];
    // Handles clicking the download button
    const handleDownloadClick = (report) => {
        // Set selected report
        setSelectedReport(report);
        // Open popup
        setDownloadPopupOpen(true);
    };
    // Handles clicking the delete button
    const handleDeleteClick = async (reportId) => {
        if (onDeleteReport) {
            await onDeleteReport(reportId);
        }
    };
    if (!reportsData.length) {
        return (_jsx(Card, { className: "p-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "mb-4", style: { fontFamily: "heading" }, children: "Available Reports" }), _jsxs("div", { className: "text-center text-muted py-4", children: [_jsx(FileText, { size: 48, className: "mb-3" }), _jsx("h5", { children: "No reports available" }), _jsx("p", { children: "Generated reports will appear here" })] })] }) }));
    }
    return (_jsx(Card, { className: "p-3", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-4", children: [_jsx(Card.Title, { className: "mb-0", style: { fontFamily: "heading" }, children: "Available Reports" }), onUploadReport && (_jsxs(Button, { variant: "success", onClick: onUploadReport, className: "d-flex align-items-center gap-2", children: [_jsx(Upload, { size: 16 }), "Upload Report"] }))] }), _jsx(Stack, { gap: 3, children: reportsData.map((report) => (
                    // Individual report card
                    _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { children: _jsx(FileText, { size: 20 }) }), _jsxs("div", { style: { fontFamily: "body" }, children: [_jsx("div", { className: "fw-medium", children: report.title }), _jsxs("small", { className: "text-muted", children: [report.type, " \u2022 ", report.date, " \u2022 ", report.size] })] })] }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx(Button, { variant: "outline-success", onClick: () => handleDownloadClick(report), children: _jsx(Download, { size: 18 }) }), onDeleteReport && (_jsx(Button, { variant: "outline-danger", onClick: () => handleDeleteClick(report.id), title: "Delete report", children: _jsx(Trash2, { size: 18 }) }))] })] }) }) }, report.id))) }), selectedReport && (_jsx(DownloadPopup, { isOpen: downloadPopupOpen, onClose: () => setDownloadPopupOpen(false), reportTitle: selectedReport.title, reportType: selectedReport.type, reportDate: selectedReport.date, reportSize: selectedReport.size }))] }) }));
}
