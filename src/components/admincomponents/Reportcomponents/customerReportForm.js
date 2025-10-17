import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/reportcomponents/CustomReportForm.tsx
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
const CustomReportForm = () => {
    // Local state for form fields
    const [reportType, setReportType] = useState('Platform Usage');
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [format, setFormat] = useState('PDF');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder logic for report generation
        alert(`Generating ${reportType} report for ${dateRange} in ${format} format`);
    };
    return (_jsxs(Card, { children: [_jsx(Card.Header, { children: "Generate Custom Report" }), _jsx(Card.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Report Type" }), _jsx(Form.Control, { type: "text", value: reportType, onChange: (e) => setReportType(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Date Range" }), _jsx(Form.Control, { type: "text", value: dateRange, onChange: (e) => setDateRange(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Format" }), _jsxs(Form.Select, { value: format, onChange: (e) => setFormat(e.target.value), children: [_jsx("option", { children: "PDF" }), _jsx("option", { children: "CSV" })] })] }), _jsx(Button, { variant: "success", type: "submit", children: "Generate Report" })] }) })] }));
};
export default CustomReportForm;
