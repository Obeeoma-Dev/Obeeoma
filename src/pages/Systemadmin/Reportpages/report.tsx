// src/pages/Systemadmin/Reportpages/report.tsx

import React from 'react';
import AdminHeader from '../../../components/admincomponents/adminheader';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import MonthlyUsageChart from '../../../components/admincomponents/Reportcomponents/monthlyUsageChart';
import AvailableReports from '../../../components/admincomponents/Reportcomponents/availableReport';
import CustomReportForm from '../../../components/admincomponents/Reportcomponents/customerReportForm';

/**
 * ReportPage component renders the full layout for the system admin report dashboard.
 * It includes a fixed header, fixed sidebar, and scrollable main content area.
 */
const ReportPage: React.FC = () => {
  return (
    // Root container for the entire page
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Fixed top header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <AdminHeader />
      </div>

      {/* Body section: sidebar + main content */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          marginTop: '72px', // Height of header
        }}
      >
        {/* Fixed sidebar */}
        <div
          style={{
            position: 'fixed',
            top: '72px', // Below header
            left: 0,
            bottom: 0,
            width: '250px', // Matches AdminSidebar width
            zIndex: 999,
          }}
        >
          <AdminSidebar />
        </div>

        {/* Scrollable main content area */}
        <main
          style={{
            marginLeft: '250px', // Sidebar width
            flexGrow: 1,
            overflowY: 'auto',
            padding: '32px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px', // Space between sections
          }}

        >
          {/* Monthly usage chart section */}
          <MonthlyUsageChart />

          {/* List of downloadable reports */}
          <AvailableReports />

          {/* Form to generate custom report */}
          <CustomReportForm />
        </main>
      </div>
    </div>
  );
};

export default ReportPage;