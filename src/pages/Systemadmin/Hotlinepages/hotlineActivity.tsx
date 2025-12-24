// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Importing shared layout components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";

// Importing dashboard modules
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallReasonsChart from "../../../components/admincomponents/Hotlinecomponents/callsResourcesChart";
import CallLogTable from "../../../components/admincomponents/Hotlinecomponents/callLogTable";
import CriticalCases from "../../../components/admincomponents/Hotlinecomponents/criticalCases";
import OperatorPerformance from "../../../components/admincomponents/Hotlinecomponents/operatorPerformance";

// Define the main HotlineActivity page component
const HotlineActivity: React.FC = () => {
  return (
    // Main wrapper to hold sidebar, header, and content
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar stays fixed on the left */}
      <AdminSidebar />

      {/* Right section holds header and scrollable content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header stays fixed at the top */}
        <AdminHeader />

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Container ensures Bootstrap spacing and responsiveness */}
          <Container fluid>
            {/* Top summary metrics */}
            <TopMetrics totalCalls={42} avgCallTime="9:22" missedCalls={3} />

            {/* Row for charts: Hourly volume and Call reasons */}
            <Row>
              <Col md={6}>
                <HourlyCallChart />
              </Col>
              <Col md={6}>
                <CallReasonsChart />
              </Col>
            </Row>

            {/* Critical cases section */}
            <CriticalCases />

            {/* Operator performance section */}
            <OperatorPerformance />

            {/* Call log table */}
            <CallLogTable />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HotlineActivity;
