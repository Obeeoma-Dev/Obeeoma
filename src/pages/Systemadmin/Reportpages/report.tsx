import React from "react";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import MonthlyUsageChart from "../../../components/admincomponents/Reportcomponents/monthlyUsageChart";
import AvailableReports from "../../../components/admincomponents/Reportcomponents/availableReport";
import CustomReportForm from "../../../components/admincomponents/Reportcomponents/customerReportForm";
import { Container } from "react-bootstrap";

/**
 * ReportPage component renders the system admin report dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const ReportPage: React.FC = () => {
  return (
    <div className="d-flex vh-100">
      {/* 🔒 Fixed sidebar on the left */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* 📦 Main content area (right side) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* 🔒 Fixed header at the top */}
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
          }}
        >

          {/* 🧭 Scrollable content area below header */}
          <div className="flex-grow-1 overflow-auto">
            <Container fluid className="py-4">
              {/* 📈 Monthly usage chart */}
              <MonthlyUsageChart />

              {/* 📁 Available downloadable reports */}
              <AvailableReports />

              {/* 🧾 Custom report generation form */}
              <CustomReportForm />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;