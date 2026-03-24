import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import PlatformUsageChart from "../../../components/admincomponents/Reportcomponents/platformUsageChart";
import FeedbacknTestimonies from "../../../components/admincomponents/Reportcomponents/organizationFeedback";
import { AvailableReports } from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container, Spinner, Alert, Modal, Form, Button, ProgressBar } from "react-bootstrap";
import UserEngagement from "../../../components/admincomponents/Reportcomponents/userEngagement";
import { adminAPI } from "../../../api/apiConfig";
import { Upload, X } from "lucide-react";
const ReportPage = () => {
    const [activeTab, setActiveTab] = useState("Platform Usage");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    // Upload modal state
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [reportTitle, setReportTitle] = useState("");
    const [reportType, setReportType] = useState("Platform Usage");
    // State for generated reports from CustomReportForm
    const [generatedReports, setGeneratedReports] = useState([]);
    // Handle report generation from CustomReportForm
    const handleReportGenerated = (generatedReport) => {
        // Add to generated reports list
        const newReport = {
            id: generatedReport.id,
            title: generatedReport.title,
            type: generatedReport.type,
            date: new Date().toLocaleDateString(),
            size: `${Math.floor(Math.random() * 5 + 1)} MB` // Simulated file size
        };
        setGeneratedReports(prev => [...prev, newReport]);
        // Also add to main data state to show in AvailableReports
        setData(prev => ({
            ...prev,
            available_reports: [...(prev?.available_reports || []), newReport]
        }));
    };
    const tabs = ["Platform Usage", "User Engagement", "Feedback & Testimonies"];
    // Handle file upload
    const handleFileUpload = async () => {
        if (!uploadFile || !reportTitle.trim()) {
            alert("Please select a file and enter a report title");
            return;
        }
        setUploading(true);
        setUploadProgress(0);
        try {
            const formData = new FormData();
            formData.append("file", uploadFile);
            formData.append("title", reportTitle);
            formData.append("type", reportType);
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);
            // Here you would make actual API call
            // const response = await adminAPI.uploadReport(formData);
            setTimeout(() => {
                clearInterval(progressInterval);
                setUploadProgress(100);
                setTimeout(() => {
                    setUploading(false);
                    setShowUploadModal(false);
                    setUploadFile(null);
                    setUploadProgress(0);
                    setReportTitle("");
                    // Add the new report to the available reports
                    const newReport = {
                        id: Date.now().toString(),
                        title: reportTitle,
                        type: reportType,
                        date: new Date().toLocaleDateString(),
                        size: `${(uploadFile.size / 1024 / 1024).toFixed(2)} MB`
                    };
                    setData(prev => ({
                        ...prev,
                        available_reports: [...(prev?.available_reports || []), newReport]
                    }));
                    alert("Report uploaded successfully!");
                }, 500);
            }, 2000);
        }
        catch (err) {
            console.error("Upload error:", err);
            alert("Failed to upload report");
            setUploading(false);
        }
    };
    // Handle report deletion
    const handleDeleteReport = async (reportId) => {
        if (!confirm("Are you sure you want to delete this report?")) {
            return;
        }
        try {
            // Here you would make actual API call
            // await adminAPI.deleteReport(reportId);
            // Remove the report from the list
            setData(prev => ({
                ...prev,
                available_reports: prev?.available_reports?.filter(report => report.id !== reportId) || []
            }));
            alert("Report deleted successfully!");
        }
        catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete report");
        }
    };
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await adminAPI.getReports();
                if (!cancelled)
                    setData(res?.data ?? res ?? null);
            }
            catch (e) {
                if (!cancelled)
                    setError(e instanceof Error ? e.message : "Failed to load reports data");
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    if (loading) {
        return (_jsx(SystemAdminLayout, { title: "Reports", children: _jsx(Container, { fluid: true, className: "py-4 d-flex justify-content-center align-items-center min-vh-50", children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    if (error) {
        return (_jsx(SystemAdminLayout, { title: "Reports", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Alert, { variant: "danger", children: error }), _jsx("div", { className: "d-flex justify-content-between align-items-center mb-4", children: _jsxs("div", { className: "d-flex gap-3", children: [_jsxs("button", { className: "btn", style: {
                                        border: "1px solid #dee2e6",
                                        backgroundColor: "#ffffff",
                                        color: "#495057",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "6px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        fontFamily: "body",
                                    }, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M2 4h12M2 8h12M2 12h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) }), "Filter Data"] }), _jsx("button", { className: "btn", style: {
                                        backgroundColor: "#3CB371",
                                        color: "#ffffff",
                                        padding: "0.5rem 1.5rem",
                                        borderRadius: "6px",
                                        border: "none",
                                        fontFamily: "body",
                                    }, onClick: () => setShowUploadModal(true), children: "Generate New Report" })] }) }), _jsx(PlatformUsageChart, {}), _jsx(AvailableReports, { reports: [] }), _jsx(CustomReportForm, {})] }) }));
    }
    return (_jsxs(SystemAdminLayout, { title: "Reports", children: [_jsx("div", { className: "d-flex justify-content-between align-items-center mb-4", children: _jsxs("div", { className: "d-flex gap-3", children: [_jsxs("button", { className: "btn", style: {
                                border: "1px solid #dee2e6",
                                backgroundColor: "#ffffff",
                                color: "#495057",
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontFamily: "body",
                            }, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M2 4h12M2 8h12M2 12h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) }), "Filter Data"] }), _jsx("button", { className: "btn", style: {
                                backgroundColor: "#3CB371",
                                color: "#ffffff",
                                padding: "0.5rem 1.5rem",
                                borderRadius: "6px",
                                border: "none",
                                fontFamily: "body",
                            }, onClick: () => setShowUploadModal(true), children: "Generate New Report" })] }) }), _jsx("div", { className: "d-flex gap-4 mb-4", style: { borderBottom: "1px solid #e9ecef", fontFamily: "body" }, children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), style: {
                        background: "none",
                        border: "none",
                        padding: "0.75rem 0",
                        marginRight: "1rem",
                        fontSize: "1rem",
                        color: activeTab === tab ? "#3CB371" : "#6c757d",
                        fontWeight: activeTab === tab ? "600" : "400",
                        borderBottom: activeTab === tab
                            ? "2px solid #3CB371"
                            : "2px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }, children: tab }, tab))) }), _jsxs(Container, { fluid: true, className: "px-0", children: [activeTab === "Platform Usage" && (_jsx("div", { className: "mb-5", children: _jsx(PlatformUsageChart, { data: data?.platform_usage }) })), activeTab === "User Engagement" && (_jsx("div", { className: "mb-5", children: _jsx(UserEngagement, { data: data?.user_engagement }) })), activeTab === "Feedback & Testimonies" && (_jsx("div", { className: "mb-5", children: _jsx(FeedbacknTestimonies, { feedbackData: data?.feedback_testimonies }) })), _jsx("div", { className: "mb-5", children: _jsx(AvailableReports, { reports: [
                                ...(data?.available_reports || []),
                                ...generatedReports
                            ], onDeleteReport: handleDeleteReport, onUploadReport: () => setShowUploadModal(true) }) }), _jsx("div", { children: _jsx(CustomReportForm, { onReportGenerated: handleReportGenerated, data: data || undefined }) })] }), _jsxs(Modal, { show: showUploadModal, onHide: () => setShowUploadModal(false), centered: true, size: "lg", children: [_jsx(Modal.Header, { closeButton: true, children: _jsxs(Modal.Title, { className: "d-flex align-items-center gap-2", children: [_jsx(Upload, { size: 20 }), "Upload Report"] }) }), _jsx(Modal.Body, { children: _jsxs(Form, { children: [_jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Report Title" }), _jsx(Form.Control, { type: "text", value: reportTitle, onChange: (e) => setReportTitle(e.target.value), placeholder: "Enter report title", required: true })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Report Type" }), _jsxs(Form.Select, { value: reportType, onChange: (e) => setReportType(e.target.value), children: [_jsx("option", { value: "Platform Usage", children: "Platform Usage" }), _jsx("option", { value: "User Engagement", children: "User Engagement" }), _jsx("option", { value: "Feedback & Testimonies", children: "Feedback & Testimonies" }), _jsx("option", { value: "Health Conditions", children: "Health Conditions" }), _jsx("option", { value: "Treatment Outcomes", children: "Treatment Outcomes" }), _jsx("option", { value: "Organization Performance", children: "Organization Performance" })] })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Select File" }), _jsx(Form.Control, { type: "file", onChange: (e) => setUploadFile(e.target.files?.[0] || null), accept: ".pdf,.xlsx,.csv,.doc,.docx", required: true }), _jsx(Form.Text, { className: "text-muted", children: "Supported formats: PDF, Excel, CSV, Word documents (Max 10MB)" })] }), uploading && (_jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "d-flex justify-content-between mb-1", children: [_jsx("span", { children: "Uploading..." }), _jsxs("span", { children: [uploadProgress, "%"] })] }), _jsx(ProgressBar, { now: uploadProgress, variant: "success" })] }))] }) }), _jsxs(Modal.Footer, { children: [_jsxs(Button, { variant: "secondary", onClick: () => setShowUploadModal(false), children: [_jsx(X, { size: 16, className: "me-2" }), "Cancel"] }), _jsx(Button, { variant: "success", onClick: handleFileUpload, disabled: uploading || !uploadFile || !reportTitle.trim(), children: uploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "spinner-border spinner-border-sm me-2", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { size: 16, className: "me-2" }), "Upload Report"] })) })] })] })] }));
};
export default ReportPage;
