import React from "react";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col, Card } from "react-bootstrap";

/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 * This version focuses on improved layout and card-based design
 * while maintaining all existing functionality and data structures.
 */
const SubscriptionPage: React.FC = () => {
  // Placeholder metrics — replace with backend data later
  // Keeping existing data structure to avoid breaking changes
  const metrics = {
    totalOrganizations: 12,
    totalSubscriptions: 34,
    coveredEmployees: "4.2k",
    utilizationRate: 68,
  };

  // Sample subscription records - maintaining existing structure
  const subscriptions = [
    {
      organization: "Acme Corporation",
      type: "Enterprise",
      employees: 250,
      startDate: "Mar 15, 2023",
      endDate: "Mar 15, 2024",
      status: "Active" as const,
    },
    {
      organization: "Green Energy Co",
      type: "Startup",
      employees: 75,
      startDate: "Mar 15, 2023",
      endDate: "Mar 15, 2024",
      status: "Inactive" as const,
    },
  ];

  // Service utilization percentages - maintaining existing structure
  const services = [
    { name: "Therapy Sessions", percentage: 64 },
    { name: "Mindfulness", percentage: 52 },
    { name: "Stress Management", percentage: 48 },
    { name: "Sleep Resources", percentage: 36 },
    { name: "Nutrition", percentage: 28 },
  ];

  // Recent activity log - maintaining existing structure
  const activities = [
    "Acme Corp added subscription for 250 employees",
    "Green Energy Co subscription marked inactive",
  ];

  return (
    // Main layout container with full viewport height and light background
    <div className="d-flex vh-100 bg-light">
      {/* Fixed sidebar navigation - remains unchanged */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main content area - takes remaining width */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Fixed header at the top - remains unchanged */}
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Bootstrap container for responsive layout */}
          <Container fluid>
            {/* Page header section with title and search placeholder */}
            <div className="mb-4">
              <h1 className="fw-bold mb-2">Subscriptions</h1>
              <p className="text-muted mb-0">Search...</p>
            </div>

            {/* Metrics panel - passing existing metrics data unchanged */}
            <MetricsPanel {...metrics} />

            {/* Main content grid layout */}
            <Row className="g-4">
              {/* Left column - main content area (2/3 width on medium screens) */}
              <Col lg={8}>
                {/* Recent Subscriptions card with improved styling */}
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0 fw-bold">Recent Subscriptions</h5>
                    <p className="text-muted mb-0 small mt-1">
                      Overview of organization subscriptions to mental health
                      services
                    </p>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {/* Table component with existing subscriptions data */}
                    <RecentSubscriptionsTable subscriptions={subscriptions} />
                  </Card.Body>
                </Card>

                {/* Service Utilization card with improved styling */}
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0 fw-bold">Service Utilization</h5>
                  </Card.Header>
                  <Card.Body>
                    {/* Chart component with existing services data */}
                    <ServiceUtilizationChart services={services} />
                  </Card.Body>
                </Card>
              </Col>

              {/* Right column - sidebar content (1/3 width on medium screens) */}
              <Col lg={4}>
                {/* Recent Activity card with improved styling */}
                <Card className="shadow-sm border-0 h-100">
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0 fw-bold">Recent Activity</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {/* Activity feed component with existing activities data */}
                    <RecentActivityFeed activities={activities} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
