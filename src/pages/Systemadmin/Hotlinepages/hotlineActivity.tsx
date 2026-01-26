// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Importing shared layout components
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";

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
    <SystemAdminLayout title="Hotline Activity">
      {/* Container ensures Bootstrap spacing and responsiveness */}
      <Container fluid>
        {/* Page Title Section
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold text-dark">Hotline Activity</h1>
            <p className="text-muted small">
              Real-time monitoring of crisis line operations and performance.
            </p>
          </Col>
        </Row> */}

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

        {/* Call log table */}
        <CallLogTable />

        {/* Two-column section */}
        <Row className="g-4">
          {/* Left column */}
          <Col xs={12} lg={6}>
            <CriticalCases />
          </Col>

          {/* Right column */}
          <Col xs={12} lg={6}>
            <OperatorPerformance />
          </Col>
        </Row>
      </Container>
    </SystemAdminLayout>
  );
};

export default HotlineActivity;
