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
  // Metrics matching the design
  const metrics = {
    totalOrganizations: 42,
    totalSubscriptions: 38,
    coveredEmployees: "4,328",
    utilizationRate: 68,
  };

  // Subscription records matching the design
  const subscriptions = [
    {
      organization: "Acme Corporation",
      plan: "Enterprise",
      employees: 500,
      activeUsers: 423,
      activeUsersPercent: 85,
      status: "Active" as const,
      expiryDate: "Dec 31, 2023",
    },
    {
      organization: "TechGlobal Inc",
      plan: "Business",
      employees: 250,
      activeUsers: 198,
      activeUsersPercent: 79,
      status: "Active" as const,
      expiryDate: "Mar 15, 2024",
    },
    {
      organization: "Innovate Solutions",
      plan: "Standard",
      employees: 75,
      activeUsers: 45,
      activeUsersPercent: 60,
      status: "Active" as const,
      expiryDate: "Feb 28, 2024",
    },
    {
      organization: "Global Enterprises",
      plan: "Enterprise",
      employees: 1200,
      activeUsers: 875,
      activeUsersPercent: 73,
      status: "Active" as const,
      expiryDate: "Jan 15, 2024",
    },
    {
      organization: "StartUp Co",
      plan: "Starter",
      employees: 25,
      activeUsers: 10,
      activeUsersPercent: 40,
      status: "Pending" as const,
      expiryDate: "Oct 30, 2023",
    },
  ];

  // Service utilization percentages matching the design
  const services = [
    { name: "Therapy Sessions", percentage: 65 },
    { name: "Mindfulness", percentage: 4 },
    { name: "Stress Management", percentage: 8 },
    { name: "Sleep Resources", percentage: 3 },
    { name: "Nutrition", percentage: 25 },
  ];

  // Recent activity log matching the design
  const activities: Array<{
    organization: string;
    icon: "person" | "refresh" | "alert" | "check";
    iconColor: string;
    description: string;
    time: string;
  }> = [
    {
      organization: "Acme Corp",
      icon: "person" as const,
      iconColor: "#3CB371",
      description: "New subscription activated for 150 employees",
      time: "2 hours ago",
    },
    {
      organization: "TechGlobal Inc",
      icon: "refresh" as const,
      iconColor: "#007bff",
      description: "Subscription renewed for another year",
      time: "5 hours ago",
    },
    {
      organization: "Innovate Solutions",
      icon: "alert" as const,
      iconColor: "#dc3545",
      description: "Reported login issues for 5 employees",
      time: "1 day ago",
    },
    {
      organization: "HealthFirst",
      icon: "check" as const,
      iconColor: "#6f42c1",
      description: "Achieved 80% employee engagement",
      time: "2 days ago",
    },
    {
      organization: "Green Energy Co",
      icon: "person" as const,
      iconColor: "#3CB371",
      description: "Trial subscription started for 50 employees",
      time: "3 days ago",
    },
  ];

  return (
    // Main layout container with full viewport height
    <div className="d-flex vh-100">
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
            padding: "2rem",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Bootstrap container for responsive layout */}
          <Container fluid>
            {/* Page header section - removed as header is in AdminHeader */}

            {/* Metrics panel - passing existing metrics data unchanged */}
            <MetricsPanel {...metrics} />

            {/* Recent Subscriptions - Full width */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">Recent Subscriptions</h5>
                  <p className="text-muted mb-0 small mt-1">
                    Overview of organization subscriptions to mental health
                    services
                  </p>
                </div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#3CB371",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                >
                  Add Subscription
                </button>
              </Card.Header>
              <Card.Body className="p-0">
                {/* Table component with existing subscriptions data */}
                <RecentSubscriptionsTable subscriptions={subscriptions} />
              </Card.Body>
            </Card>

            {/* Service Utilization and Recent Activity - Same row with equal widths */}
            <Row className="g-4">
              {/* Left column - Service Utilization */}
              <Col lg={6}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0 fw-bold">Service Utilization</h5>
                  </Card.Header>
                  <Card.Body>
                    {/* Chart component with existing services data */}
                    <ServiceUtilizationChart services={services} />
                  </Card.Body>
                </Card>
              </Col>

              {/* Right column - Recent Activity */}
              <Col lg={6}>
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
