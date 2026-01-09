import React from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { ArrowLeft, CreditCard, Save } from "lucide-react";

// Page components
import Sidebar from "../../../components/admincomponents/adminsidebar";
import Header from "../../../components/admincomponents/adminheader";
import { OrganizationProfile } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationProfile";
import { OrganizationStats } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationStats";
import { PlatformUsageChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationPlatformUse";
import { ProgramEngagementChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/programEngagementChart";
import { RecentActivity } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/recentActivity";
import { useNavigate } from "react-router-dom";

export function OrganizationDetails() {
  // A navigation function.
  const navigate = useNavigate();

  return (
    // Root layout: sidebar + main content
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content column */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable page content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Page container */}
          <Container fluid="xl">
            {/* ================= HEADER SECTION ================= */}
            <Row className="align-items-center mb-4">
              <Col>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="light"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                  >
                    <ArrowLeft size={20} />
                  </Button>

                  <h1 className="h4 mb-0 fw-bold">Wellness Center Inc.</h1>
                </Stack>
              </Col>

              <Col xs="auto">
                <Stack direction="horizontal" gap={2}>
                  <Button variant="outline-primary">
                    <CreditCard size={16} />
                    Manage Subscription
                  </Button>

                  <Button variant="primary">
                    <Save size={16} />
                    Save Changes
                  </Button>
                </Stack>
              </Col>
            </Row>

            {/* ================= MAIN CONTENT ================= */}
            <Row>
              {/* Left profile column */}
              <Col lg={3} className="mb-4">
                <OrganizationProfile
                  name="Wellness Center Inc."
                  id="ORG-001"
                  subscriptionPlan="Premium"
                  status="Active"
                  region="West"
                  lastActive="2 hours ago"
                />
              </Col>

              {/* Right content column */}
              <Col lg={9}>
                <OrganizationStats />

                <Row className="mt-4">
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <PlatformUsageChart />
                  </Col>

                  <Col lg={6}>
                    <ProgramEngagementChart />
                  </Col>
                </Row>

                <div className="mt-4">
                  <RecentActivity />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
