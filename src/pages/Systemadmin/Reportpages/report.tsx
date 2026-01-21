import React, { useState } from "react";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import MentalHealthChart from "../../../components/admincomponents/Reportcomponents/mentalHealthChart";
import PlatformUsageChart from "../../../components/admincomponents/Reportcomponents/platformUsageChart";
import TreatmentOutcomesChart from "../../../components/admincomponents/Reportcomponents/treatmentOutcomesChart";
import OrganizationPerformanceChart from "../../../components/admincomponents/Reportcomponents/organizationPerformanceChart";
import { AvailableReports } from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container } from "react-bootstrap";

/**
 * ReportPage component renders the system admin report dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const ReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Health Conditions");

  const tabs = [
    "Platform Usage",
    "Health Conditions",
    "Treatment Outcomes",
    "Organization Performance",
  ];

  return (
    <div className="d-flex vh-100">
      {/* Fixed sidebar on the left */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main content area (right side) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Fixed header at the top */}
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1
              style={{
                fontFamily: "heading",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Reports & Analytics
            </h1>
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
            {/* Chart Section - Show based on active tab */}
            {activeTab === "Platform Usage" && (
              <div className="mb-5">
                <PlatformUsageChart />
              </div>
            )}
            {activeTab === "Health Conditions" && (
              <div className="mb-5">
                <MentalHealthChart />
              </div>
            )}
            {activeTab === "Treatment Outcomes" && (
              <div className="mb-5">
                <TreatmentOutcomesChart />
              </div>
            )}
            {activeTab === "Organization Performance" && (
              <div className="mb-5">
                <OrganizationPerformanceChart />
              </div>
            )}

            {/* Available Reports Section */}
            <div className="mb-5">
              <AvailableReports />
            </div>

            {/* Generate Custom Report Section */}
            <div>
              <CustomReportForm />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
