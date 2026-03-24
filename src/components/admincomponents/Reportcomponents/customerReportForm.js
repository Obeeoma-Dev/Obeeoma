import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { FileText, Download, Calendar } from "lucide-react";
const CustomReportForm = ({ onReportGenerated, data }) => {
    // Local state for form fields
    const [reportType, setReportType] = useState("Platform Usage");
    const [dateRange, setDateRange] = useState("Last 30 Days");
    const [format, setFormat] = useState("PDF");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedReport, setGeneratedReport] = useState(null);
    const [error, setError] = useState(null);
    // Generate report content based on actual data
    const generateReportContent = (type, dateRange, format) => {
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
                `- Average Session Duration: ${data.platform_usage.average_session_duration || 'N/A'}`,
                "",
                "DETAILED ANALYSIS:",
                "This report shows platform usage metrics for the specified period. The data reflects user engagement patterns and system utilization."
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
                ...(data.user_engagement.monthly_data?.map(item => [`- ${item.month}: ${item.new_signups} new signups, ${item.active_users} active users`]) || ["No monthly data available"]),
                "",
                "DETAILED ANALYSIS:",
                "This report provides comprehensive insights into user engagement patterns, retention metrics, and growth trends."
            ];
            return content.join("\n");
        }
        if (type === "Health Conditions" && data?.feedback_testimonies) {
            const healthData = data.feedback_testimonies.filter(f => f.feedback?.toLowerCase().includes('health') || f.organization?.toLowerCase().includes('health'));
            const content = [
                "HEALTH CONDITIONS REPORT",
                `Generated: ${today}`,
                `Date Range: ${dateRange}`,
                `Format: ${format}`,
                "",
                "SUMMARY STATISTICS:",
                `- Total Health-related Feedback: ${healthData.length}`,
                `- Average Rating: ${healthData.length > 0 ? (healthData.reduce((sum, f) => sum + (f.rating || 0), 0) / healthData.length).toFixed(1) : 'N/A'}`,
                "",
                "CONDITION BREAKDOWN:",
                ...(healthData.slice(0, 5).map(f => [`- ${f.user_name || 'Anonymous'}: ${f.feedback?.substring(0, 100) || 'No feedback'} (Rating: ${f.rating || 0}/5`]) || []),
                "",
                "DETAILED ANALYSIS:",
                "This report aggregates health-related feedback and conditions reported by users, helping identify common health concerns and user satisfaction levels."
            ];
            return content.join("\n");
        }
        if (type === "Treatment Outcomes" && data?.feedback_testimonies) {
            const treatmentData = data.feedback_testimonies.filter(f => f.feedback?.toLowerCase().includes('treatment') || f.feedback?.toLowerCase().includes('outcome'));
            const content = [
                "TREATMENT OUTCOMES REPORT",
                `Generated: ${today}`,
                `Date Range: ${dateRange}`,
                `Format: ${format}`,
                "",
                "SUMMARY STATISTICS:",
                `- Treatment-related Feedback: ${treatmentData.length}`,
                `- Success Rate: ${treatmentData.length > 0 ? Math.round((treatmentData.filter(f => f.rating && f.rating >= 4).length / treatmentData.length * 100)) : 0}%`,
                "",
                "OUTCOME ANALYSIS:",
                ...(treatmentData.slice(0, 5).map(f => [`- ${f.user_name || 'Anonymous'}: ${f.feedback?.substring(0, 100) || 'No feedback'} (Rating: ${f.rating || 0}/5`]) || []),
                "",
                "DETAILED ANALYSIS:",
                "This report focuses on treatment effectiveness and patient outcomes, providing insights into care quality and patient satisfaction."
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
                "Platform performance metrics show overall system health and user adoption patterns. Use this data to identify high-performing organizations and areas needing improvement."
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
            "This is a general report covering platform metrics. Please select a specific report type for detailed insights."
        ];
        return defaultContent.join("\n");
    };
    // Handle report generation
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        setError(null);
        try {
            // Create report with real data
            const newReport = {
                id: Date.now().toString(),
                title: `${reportType} Report - ${dateRange}`,
                type: reportType,
                dateRange: dateRange,
                format: format,
                generatedAt: new Date().toLocaleString(),
                status: 'generating'
            };
            setGeneratedReport(newReport);
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Update status to completed
            setGeneratedReport(prev => prev ? { ...prev, status: 'completed' } : null);
            // Call callback to notify parent component
            if (onReportGenerated && newReport) {
                onReportGenerated({ ...newReport, status: 'completed' });
            }
        }
        catch (err) {
            console.error('Report generation failed:', err);
            setError('Failed to generate report. Please try again.');
            setGeneratedReport(prev => prev ? { ...prev, status: 'error' } : null);
        }
        finally {
            setIsGenerating(false);
        }
    };
    // Handle download of generated report
    const handleDownload = () => {
        if (generatedReport && generatedReport.status === 'completed') {
            // Generate real report content based on data
            const reportContent = generateReportContent(generatedReport.type, generatedReport.dateRange, generatedReport.format);
            // Create and download file
            const blob = new Blob([reportContent], {
                type: generatedReport.format === 'PDF' ? 'application/pdf' :
                    generatedReport.format === 'Excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                        'text/csv'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${generatedReport.title.replace(/\s+/g, '_')}.${generatedReport.format.toLowerCase()}`;
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
    return (_jsx(Card, { style: {
            border: "none",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
        }, children: _jsxs(Card.Body, { style: { padding: "1.5rem" }, children: [_jsxs("div", { className: "d-flex align-items-center gap-2 mb-3", children: [_jsx(FileText, { size: 20, className: "text-success" }), _jsx("h5", { style: {
                                fontFamily: "heading",
                                color: "#1a1a1a",
                                marginBottom: "0",
                                margin: "0",
                            }, children: "Generate Custom Report" })] }), error && (_jsx(Alert, { variant: "danger", className: "mb-3", children: error })), generatedReport && (_jsx("div", { className: "mb-3 p-3 border rounded", style: { backgroundColor: "#f8f9fa" }, children: _jsxs("div", { className: "d-flex align-items-center justify-content-between", children: [_jsxs("div", { children: [_jsx("h6", { className: "mb-1", children: generatedReport.title }), _jsxs("small", { className: "text-muted", children: ["Generated: ", generatedReport.generatedAt] })] }), _jsxs("div", { className: "d-flex gap-2", children: [generatedReport.status === 'generating' && (_jsx(Spinner, { animation: "border", size: "sm" })), generatedReport.status === 'completed' && (_jsxs(Button, { variant: "success", size: "sm", onClick: handleDownload, children: [_jsx(Download, { size: 14, className: "me-1" }), "Download"] })), generatedReport.status === 'error' && (_jsx(Button, { variant: "outline-danger", size: "sm", onClick: handleReset, children: "Retry" }))] })] }) })), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { style: {
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-end",
                            flexWrap: "wrap",
                        }, children: [_jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Report Type" }), _jsxs("select", { value: reportType, onChange: (e) => setReportType(e.target.value), disabled: isGenerating, style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: isGenerating ? "not-allowed" : "pointer",
                                        }, children: [_jsx("option", { children: "Platform Usage" }), _jsx("option", { children: "Health Conditions" }), _jsx("option", { children: "Treatment Outcomes" }), _jsx("option", { children: "Organization Performance" })] })] }), _jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Date Range" }), _jsxs("select", { value: dateRange, onChange: (e) => setDateRange(e.target.value), disabled: isGenerating, style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: isGenerating ? "not-allowed" : "pointer",
                                        }, children: [_jsx("option", { children: "Last 7 Days" }), _jsx("option", { children: "Last 30 Days" }), _jsx("option", { children: "Last 90 Days" }), _jsx("option", { children: "Last 6 Months" }), _jsx("option", { children: "Last Year" }), _jsx("option", { children: "Custom Range" })] })] }), _jsxs("div", { style: { flex: 1, minWidth: "200px", fontFamily: "body" }, children: [_jsx("label", { style: {
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                            color: "#495057",
                                            marginBottom: "0.5rem",
                                        }, children: "Format" }), _jsxs("select", { value: format, onChange: (e) => setFormat(e.target.value), disabled: isGenerating, style: {
                                            width: "100%",
                                            padding: "0.625rem 0.75rem",
                                            border: "1px solid #dee2e6",
                                            borderRadius: "6px",
                                            fontSize: "0.9375rem",
                                            color: "#495057",
                                            backgroundColor: "#ffffff",
                                            cursor: isGenerating ? "not-allowed" : "pointer",
                                        }, children: [_jsx("option", { children: "PDF" }), _jsx("option", { children: "Excel" }), _jsx("option", { children: "CSV" })] })] }), _jsxs("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [_jsx("button", { type: "submit", disabled: isGenerating, style: {
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
                                        }, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { animation: "border", size: "sm", className: "me-2" }), "Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Calendar, { size: 16 }), "Generate Report"] })) }), generatedReport && (_jsx(Button, { variant: "outline-secondary", onClick: handleReset, style: {
                                            padding: "0.625rem 1rem",
                                            borderRadius: "6px",
                                            fontFamily: "body",
                                        }, children: "Clear" }))] })] }) })] }) }));
};
export default CustomReportForm;
