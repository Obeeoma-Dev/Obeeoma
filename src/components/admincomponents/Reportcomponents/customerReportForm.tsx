import React, { useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { FileText, Download, Calendar, Filter } from "lucide-react";

interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  dateRange: string;
  format: string;
  generatedAt: string;
  status: "generating" | "completed" | "error";
}

interface ReportData {
  platform_usage?: {
    daily_active_users?: number;
    weekly_active_users?: number;
    monthly_active_users?: number;
    total_sessions?: number;
    average_session_duration?: string;
  };
  user_engagement?: {
    total_users?: number;
    active_users?: number;
    engagement_rate?: number;
    new_signups?: number;
    retention_rate?: number;
    monthly_data?: Array<{
      month: string;
      new_signups: number;
      active_users: number;
    }>;
  };
  feedback_testimonies?: Array<{
    id?: number;
    user_name?: string;
    rating?: number;
    feedback?: string;
    date?: string;
    organization?: string;
  }>;
}

interface CustomReportFormProps {
  onReportGenerated?: (report: GeneratedReport) => void;
  data?: ReportData;
}

const CustomReportForm: React.FC<CustomReportFormProps> = ({
  onReportGenerated,
  data,
}) => {
  // Local state for form fields
  const [reportType, setReportType] = useState("Platform Usage");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [format, setFormat] = useState("PDF");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] =
    useState<GeneratedReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate report content based on actual data
  const generateReportContent = (
    type: string,
    dateRange: string,
    format: string,
  ): string => {
    const today = new Date().toLocaleDateString();

    if (type === "Platform Usage" && data?.platform_usage) {
      const content = [
        "PLATFORM USAGE REPORT",
        `Generated: ${today}`,
        `Date Range: ${dateRange}`,
        `Format: ${format}`,
        "",
        "SUMMARY STATISTICS:",
        `- Daily Active Users: ${data.platform_usage.daily_active_users || 0}`,
        `- Weekly Active Users: ${data.platform_usage.weekly_active_users || 0}`,
        `- Monthly Active Users: ${data.platform_usage.monthly_active_users || 0}`,
        `- Total Sessions: ${data.platform_usage.total_sessions || 0}`,
        `- Average Session Duration: ${data.platform_usage.average_session_duration || "N/A"}`,
        "",
        "DETAILED ANALYSIS:",
        "This report shows platform usage metrics for the specified period. The data reflects user engagement patterns and system utilization.",
      ];
      return content.join("\n");
    }

    if (type === "User Engagement" && data?.user_engagement) {
      const content = [
        "USER ENGAGEMENT REPORT",
        `Generated: ${today}`,
        `Date Range: ${dateRange}`,
        `Format: ${format}`,
        "",
        "SUMMARY STATISTICS:",
        `- Total Users: ${data.user_engagement.total_users || 0}`,
        `- Active Users: ${data.user_engagement.active_users || 0}`,
        `- Engagement Rate: ${((data.user_engagement.engagement_rate || 0) * 100).toFixed(1)}%`,
        `- New Signups: ${data.user_engagement.new_signups || 0}`,
        `- Retention Rate: ${((data.user_engagement.retention_rate || 0) * 100).toFixed(1)}%`,
        "",
        "MONTHLY BREAKDOWN:",
        ...(data.user_engagement.monthly_data?.map((item) => [
          `- ${item.month}: ${item.new_signups} new signups, ${item.active_users} active users`,
        ]) || ["No monthly data available"]),
        "",
        "DETAILED ANALYSIS:",
        "This report provides comprehensive insights into user engagement patterns, retention metrics, and growth trends.",
      ];
      return content.join("\n");
    }

    if (type === "Health Conditions" && data?.feedback_testimonies) {
      const healthData = data.feedback_testimonies.filter(
        (f) =>
          f.feedback?.toLowerCase().includes("health") ||
          f.organization?.toLowerCase().includes("health"),
      );
      const content = [
        "HEALTH CONDITIONS REPORT",
        `Generated: ${today}`,
        `Date Range: ${dateRange}`,
        `Format: ${format}`,
        "",
        "SUMMARY STATISTICS:",
        `- Total Health-related Feedback: ${healthData.length}`,
        `- Average Rating: ${healthData.length > 0 ? (healthData.reduce((sum, f) => sum + (f.rating || 0), 0) / healthData.length).toFixed(1) : "N/A"}`,
        "",
        "CONDITION BREAKDOWN:",
        ...(healthData
          .slice(0, 5)
          .map((f) => [
            `- ${f.user_name || "Anonymous"}: ${f.feedback?.substring(0, 100) || "No feedback"} (Rating: ${f.rating || 0}/5`,
          ]) || []),
        "",
        "DETAILED ANALYSIS:",
        "This report aggregates health-related feedback and conditions reported by users, helping identify common health concerns and user satisfaction levels.",
      ];
      return content.join("\n");
    }

    if (type === "Treatment Outcomes" && data?.feedback_testimonies) {
      const treatmentData = data.feedback_testimonies.filter(
        (f) =>
          f.feedback?.toLowerCase().includes("treatment") ||
          f.feedback?.toLowerCase().includes("outcome"),
      );
      const content = [
        "TREATMENT OUTCOMES REPORT",
        `Generated: ${today}`,
        `Date Range: ${dateRange}`,
        `Format: ${format}`,
        "",
        "SUMMARY STATISTICS:",
        `- Treatment-related Feedback: ${treatmentData.length}`,
        `- Success Rate: ${treatmentData.length > 0 ? Math.round((treatmentData.filter((f) => f.rating && f.rating >= 4).length / treatmentData.length) * 100) : 0}%`,
        "",
        "OUTCOME ANALYSIS:",
        ...(treatmentData
          .slice(0, 5)
          .map((f) => [
            `- ${f.user_name || "Anonymous"}: ${f.feedback?.substring(0, 100) || "No feedback"} (Rating: ${f.rating || 0}/5`,
          ]) || []),
        "",
        "DETAILED ANALYSIS:",
        "This report focuses on treatment effectiveness and patient outcomes, providing insights into care quality and patient satisfaction.",
      ];
      return content.join("\n");
    }

    if (type === "Organization Performance") {
      const orgContent = [
        "ORGANIZATION PERFORMANCE REPORT",
        `Generated: ${today}`,
        `Date Range: ${dateRange}`,
        `Format: ${format}`,
        "",
        "SUMMARY STATISTICS:",
        `- Total Organizations: ${data?.user_engagement?.total_users || 0}`,
        `- Active Organizations: ${data?.user_engagement?.active_users || 0}`,
        `- Engagement Rate: ${((data?.user_engagement?.engagement_rate || 0) * 100).toFixed(1)}%`,
        "",
        "PERFORMANCE METRICS:",
        "This report provides an overview of organizational performance and engagement across the platform.",
        "",
        "DETAILED ANALYSIS:",
        "Platform performance metrics show overall system health and user adoption patterns. Use this data to identify high-performing organizations and areas needing improvement.",
      ];
      return orgContent.join("\n");
    }

    // Default case
    const defaultContent = [
      "GENERAL REPORT",
      `Generated: ${today}`,
      `Date Range: ${dateRange}`,
      `Format: ${format}`,
      "",
      "SUMMARY STATISTICS:",
      "No specific data available for the selected report type.",
      "",
      "DETAILED ANALYSIS:",
      "This is a general report covering platform metrics. Please select a specific report type for detailed insights.",
    ];
    return defaultContent.join("\n");
  };

  // Handle report generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    setError(null);

    try {
      // Create report with real data
      const newReport: GeneratedReport = {
        id: Date.now().toString(),
        title: `${reportType} Report - ${dateRange}`,
        type: reportType,
        dateRange: dateRange,
        format: format,
        generatedAt: new Date().toLocaleString(),
        status: "generating",
      };

      setGeneratedReport(newReport);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update status to completed
      setGeneratedReport((prev) =>
        prev ? { ...prev, status: "completed" } : null,
      );

      // Call callback to notify parent component
      if (onReportGenerated && newReport) {
        onReportGenerated({ ...newReport, status: "completed" });
      }
    } catch (err) {
      console.error("Report generation failed:", err);
      setError("Failed to generate report. Please try again.");
      setGeneratedReport((prev) =>
        prev ? { ...prev, status: "error" } : null,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle download of generated report
  const handleDownload = () => {
    if (generatedReport && generatedReport.status === "completed") {
      // Generate real report content based on data
      const reportContent = generateReportContent(
        generatedReport.type,
        generatedReport.dateRange,
        generatedReport.format,
      );

      // Create and download file
      const blob = new Blob([reportContent], {
        type:
          generatedReport.format === "PDF"
            ? "application/pdf"
            : generatedReport.format === "Excel"
              ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              : "text/csv",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${generatedReport.title.replace(/\s+/g, "_")}.${generatedReport.format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Reset form
  const handleReset = () => {
    setReportType("Platform Usage");
    setDateRange("Last 30 Days");
    setFormat("PDF");
    setGeneratedReport(null);
    setError(null);
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
        <div className="d-flex align-items-center gap-2 mb-3">
          <FileText size={20} className="text-success" />
          <h5
            style={{
              fontFamily: "heading",
              color: "#1a1a1a",
              marginBottom: "0",
              margin: "0",
            }}
          >
            Generate Custom Report
          </h5>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        {/* Generated Report Status */}
        {generatedReport && (
          <div
            className="mb-3 p-3 border rounded"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">{generatedReport.title}</h6>
                <small className="text-muted">
                  Generated: {generatedReport.generatedAt}
                </small>
              </div>
              <div className="d-flex gap-2">
                {generatedReport.status === "generating" && (
                  <Spinner animation="border" size="sm" />
                )}
                {generatedReport.status === "completed" && (
                  <Button variant="success" size="sm" onClick={handleDownload}>
                    <Download size={14} className="me-1" />
                    Download
                  </Button>
                )}
                {generatedReport.status === "error" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleReset}
                  >
                    Retry
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

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
            <div style={{ flex: 1, minWidth: "200px", fontFamily: "body" }}>
              <label
                style={{
                  display: "block",
                  color: "#495057",
                  marginBottom: "0.5rem",
                }}
              >
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                disabled={isGenerating}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                }}
              >
                <option>Platform Usage</option>
                <option>Health Conditions</option>
                <option>Treatment Outcomes</option>
                <option>Organization Performance</option>
              </select>
            </div>

            {/* Date Range Dropdown */}
            <div style={{ flex: 1, minWidth: "200px", fontFamily: "body" }}>
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
                disabled={isGenerating}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: isGenerating ? "not-allowed" : "pointer",
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
            <div style={{ flex: 1, minWidth: "200px", fontFamily: "body" }}>
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
                disabled={isGenerating}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#495057",
                  backgroundColor: "#ffffff",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                }}
              >
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <button
                type="submit"
                disabled={isGenerating}
                style={{
                  backgroundColor: isGenerating ? "#6c757d" : "#3CB371",
                  color: "#ffffff",
                  padding: "0.625rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  fontFamily: "body",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {isGenerating ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Calendar size={16} />
                    Generate Report
                  </>
                )}
              </button>

              {generatedReport && (
                <Button
                  variant="outline-secondary"
                  onClick={handleReset}
                  style={{
                    padding: "0.625rem 1rem",
                    borderRadius: "6px",
                    fontFamily: "body",
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default CustomReportForm;
