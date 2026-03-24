import React, { useState, useEffect } from "react";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import PlatformUsageChart from "../../../components/admincomponents/Reportcomponents/platformUsageChart";
import FeedbacknTestimonies from "../../../components/admincomponents/Reportcomponents/organizationFeedback";
import { AvailableReports } from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container, Spinner, Alert } from "react-bootstrap";
import UserEngagement from "../../../components/admincomponents/Reportcomponents/userEngagement";
import { adminAPI } from "../../../api/apiConfig";

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

const ReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Platform Usage");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReportsApiResponse | null>(null);

  const tabs = ["Platform Usage", "User Engagement", "Feedback & Testimonies"];

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
              >
                Generate New Report
              </button>
            </div>
          </div>
          <PlatformUsageChart />
          <AvailableReports />
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
          <AvailableReports />
        </div>

        <div>
          <CustomReportForm />
        </div>
      </Container>
    </SystemAdminLayout>
  );
};

export default ReportPage;
