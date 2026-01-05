// src/components/admincomponents/reportcomponents/CustomReportForm.tsx

import React, { useState } from "react";
import { Card } from "react-bootstrap";

const CustomReportForm: React.FC = () => {
  // Local state for form fields
  const [reportType, setReportType] = useState("Platform Usage");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [format, setFormat] = useState("PDF");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder logic for report generation
    alert(
      `Generating ${reportType} report for ${dateRange} in ${format} format`,
    );
  };

  return (
    <Card
      style={{
        border: "none",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Card.Body style={{ padding: "1.5rem" }}>
        <h5
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "1.5rem",
          }}
        >
          Generate Custom Report
        </h5>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {/* Report Type Dropdown */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                }}
              >
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <option>Platform Usage</option>
                <option>Health Conditions</option>
                <option>Treatment Outcomes</option>
                <option>Organization Performance</option>
              </select>
            </div>

            {/* Date Range Dropdown */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                }}
              >
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
            </div>

            {/* Format Dropdown */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                }}
              >
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              style={{
                backgroundColor: "#3CB371",
                color: "#ffffff",
                padding: "0.625rem 1.5rem",
                borderRadius: "6px",
                border: "none",
                fontWeight: "500",
                fontSize: "0.9375rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                height: "fit-content",
              }}
            >
              Generate Report
            </button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default CustomReportForm;
