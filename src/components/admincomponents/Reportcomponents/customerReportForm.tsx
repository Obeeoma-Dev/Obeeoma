// src/components/admincomponents/reportcomponents/CustomReportForm.tsx

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CustomReportForm: React.FC = () => {
    // Local state for form fields
    const [reportType, setReportType] = useState('Platform Usage');
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [format, setFormat] = useState('PDF');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder logic for report generation
        alert(`Generating ${reportType} report for ${dateRange} in ${format} format`);
    };

    return (
        <Card>
            <Card.Header>Generate Custom Report</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Report Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date Range</Form.Label>
                        <Form.Control
                            type="text"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Format</Form.Label>
                        <Form.Select value={format} onChange={(e) => setFormat(e.target.value)}>
                            <option>PDF</option>
                            <option>CSV</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Generate Report
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CustomReportForm;