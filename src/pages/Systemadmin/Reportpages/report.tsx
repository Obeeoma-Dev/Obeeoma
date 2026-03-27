import React, { useState, useEffect } from "react";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import PlatformUsageChart from "../../../components/admincomponents/Reportcomponents/platformUsageChart";
import FeedbacknTestimonies from "../../../components/admincomponents/Reportcomponents/organizationFeedback";
import { AvailableReports } from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container, Spinner, Alert, Modal, Form, Button, ProgressBar } from "react-bootstrap";
import UserEngagement from "../../../components/admincomponents/Reportcomponents/userEngagement";
import { adminAPI } from "../../../api/apiConfig";
import { Upload, X } from "lucide-react";

interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  dateRange: string;
  format: string;
  generatedAt: string;
  status: 'generating' | 'completed' | 'error';
}

interface ReportsApiResponse {
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
  available_reports?: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    size: string;
  }>;
}

const ReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Platform Usage");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReportsApiResponse | null>(null);
  
  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportType, setReportType] = useState("Platform Usage");

  // State for generated reports from CustomReportForm
  const [generatedReports, setGeneratedReports] = useState<Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    size: string;
  }>>([]);

  // Handle report generation from CustomReportForm
  const handleReportGenerated = (generatedReport: GeneratedReport) => {
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
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload report");
      setUploading(false);
    }
  };

  // Handle report deletion
  const handleDeleteReport = async (reportId: string) => {
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
    } catch (err) {
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
        if (!cancelled) setData(res?.data ?? res ?? null);
      } catch (e: unknown) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "Failed to load reports data",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <SystemAdminLayout title="Reports">
        <Container
          fluid
          className="py-4 d-flex justify-content-center align-items-center min-vh-50"
        >
          <Spinner animation="border" />
        </Container>
      </SystemAdminLayout>
    );
  }

  if (error) {
    return (
      <SystemAdminLayout title="Reports">
        <Container fluid className="py-4">
          <Alert variant="danger">{error}</Alert>
          {/* Show static components as fallback */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-3">
              <button
                className="btn"
                style={{
                  border: "1px solid #dee2e6",
                  backgroundColor: "#ffffff",
                  color: "#495057",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "body",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4h12M2 8h12M2 12h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Filter Data
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "#3CB371",
                  color: "#ffffff",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  fontFamily: "body",
                }}
                onClick={() => setShowUploadModal(true)}
              >
                Generate New Report
              </button>
            </div>
          </div>
          <PlatformUsageChart />
          <AvailableReports reports={[]} />
          <CustomReportForm />
        </Container>
      </SystemAdminLayout>
    );
  }

  return (
    <SystemAdminLayout title="Reports">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <button
            className="btn"
            style={{
              border: "1px solid #dee2e6",
              backgroundColor: "#ffffff",
              color: "#495057",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "body",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4h12M2 8h12M2 12h8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Filter Data
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#3CB371",
              color: "#ffffff",
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              fontFamily: "body",
            }}
            onClick={() => setShowUploadModal(true)}
          >
            Generate New Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="d-flex gap-4 mb-4"
        style={{ borderBottom: "1px solid #e9ecef", fontFamily: "body" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "0.75rem 0",
              marginRight: "1rem",
              fontSize: "1rem",
              color: activeTab === tab ? "#3CB371" : "#6c757d",
              fontWeight: activeTab === tab ? "600" : "400",
              borderBottom:
                activeTab === tab
                  ? "2px solid #3CB371"
                  : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <Container fluid className="px-0">
        {activeTab === "Platform Usage" && (
          <div className="mb-5">
            <PlatformUsageChart data={data?.platform_usage} />
          </div>
        )}
        {activeTab === "User Engagement" && (
          <div className="mb-5">
            <UserEngagement data={data?.user_engagement} />
          </div>
        )}
        {activeTab === "Feedback & Testimonies" && (
          <div className="mb-5">
            <FeedbacknTestimonies feedbackData={data?.feedback_testimonies} />
          </div>
        )}

        {/* Available Reports Section */}
        <div className="mb-5">
          <AvailableReports 
            reports={[
              ...(data?.available_reports || []),
              ...generatedReports
            ]} 
            onDeleteReport={handleDeleteReport}
            onUploadReport={() => setShowUploadModal(true)}
          />
        </div>

        <div>
          <CustomReportForm onReportGenerated={handleReportGenerated} data={data || undefined} />
        </div>
      </Container>

      {/* Upload Report Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <Upload size={20} />
            Upload Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Report Title</Form.Label>
              <Form.Control
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter report title"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="Platform Usage">Platform Usage</option>
                <option value="User Engagement">User Engagement</option>
                <option value="Feedback & Testimonies">Feedback & Testimonies</option>
                <option value="Health Conditions">Health Conditions</option>
                <option value="Treatment Outcomes">Treatment Outcomes</option>
                <option value="Organization Performance">Organization Performance</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUploadFile(e.target.files?.[0] || null)}
                accept=".pdf,.xlsx,.csv,.doc,.docx"
                required
              />
              <Form.Text className="text-muted">
                Supported formats: PDF, Excel, CSV, Word documents (Max 10MB)
              </Form.Text>
            </Form.Group>

            {uploading && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <ProgressBar now={uploadProgress} variant="success" />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            <X size={16} className="me-2" />
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleFileUpload}
            disabled={uploading || !uploadFile || !reportTitle.trim()}
          >
            {uploading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} className="me-2" />
                Upload Report
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </SystemAdminLayout>
  );
};

export default ReportPage;
