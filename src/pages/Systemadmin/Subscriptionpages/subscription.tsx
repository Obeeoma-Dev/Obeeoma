import React from "react";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed, { Activity } from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
    totalOrganizations: 42,
    totalSubscriptions: 38,
    coveredEmployees: "4,328",
    utilizationRate: 68,
  };

  // Sample subscription records - maintaining existing structure
  const subscriptions = [
    {
      organization: "Acme Corporation",
      plan: "Enterprise",
      employees: 500,
      activeUsers: 423,
      activeUsersPercentage: 85,
      status: "Active" as const,
      expiryDate: "Dec 31, 2023",
    },
    {
      organization: "TechGlobal Inc",
      plan: "Business",
      employees: 250,
      activeUsers: 198,
      activeUsersPercentage: 79,
      status: "Active" as const,
      expiryDate: "Mar 15, 2024",
    },
    {
      organization: "Innovate Solutions",
      plan: "Standard",
      employees: 75,
      activeUsers: 45,
      activeUsersPercentage: 60,
      status: "Active" as const,
      expiryDate: "Feb 28, 2024",
    },
    {
      organization: "Global Enterprises",
      plan: "Enterprise",
      employees: 1200,
      activeUsers: 875,
      activeUsersPercentage: 73,
      status: "Active" as const,
      expiryDate: "Jan 15, 2024",
    },
    {
      organization: "StartUp Co",
      plan: "Starter",
      employees: 25,
      activeUsers: 10,
      activeUsersPercentage: 40,
      status: "Pending" as const,
      expiryDate: "Oct 30, 2023",
    },
  ];

  // Service utilization percentages - maintaining existing structure
  const services = [
    { name: "Therapy Sessions", percentage: 65 },
    { name: "Mindfulness", percentage: 4 },
    { name: "Stress Management", percentage: 8 },
    { name: "Sleep Resources", percentage: 3 },
    { name: "Nutrition", percentage: 25 },
  ];

  // Recent activity log - maintaining existing structure
  const activities: Activity[] = [
    {
      organization: "Acme Corp",
      message: "New subscription activated for 150 employees",
      icon: "person",
      iconColor: "green",
      timeAgo: "2 hours ago",
    },
    {
      organization: "TechGlobal Inc",
      message: "Subscription renewed for another year",
      icon: "refresh",
      iconColor: "blue",
      timeAgo: "5 hours ago",
    },
    {
      organization: "Innovate Solutions",
      message: "Reported login issues for 5 employees",
      icon: "warning",
      iconColor: "red",
      timeAgo: "1 day ago",
    },
    {
      organization: "HealthFirst",
      message: "Achieved 80% employee engagement",
      icon: "check",
      iconColor: "purple",
      timeAgo: "2 days ago",
    },
    {
      organization: "Green Energy Co",
      message: "Trial subscription started for 50 employees",
      icon: "person",
      iconColor: "green",
      timeAgo: "3 days ago",
    },
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

            <div className="mb-5">
              <h5 className="mb-0 fw-bold" style={{ fontFamily: 'heading' }}>Subscriptions</h5>
              <p className="text-muted mb-0 small mt-1" style={{ fontFamily: 'body' }}>
                Manage and monitor all subscription plans.
              </p>
            </div>

            {/* Metrics panel - passing existing metrics data unchanged */}
            <MetricsPanel {...metrics} />

            {/* Recent Subscriptions card */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold" style={{ fontFamily: 'heading' }}>Recent Subscriptions</h5>
                  <p className="text-muted mb-0 small mt-1" style={{ fontFamily: 'body' }}>
                    Overview of organization subscriptions to mental health services
                  </p>
                </div>
                <Button variant="success" className="ms-auto" style={{ fontFamily: 'body' }}>
                  Add Subscription
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                {/* Table component with existing subscriptions data */}
                <RecentSubscriptionsTable subscriptions={subscriptions} />
              </Card.Body>
            </Card>

            {/* Bottom row with Service Utilization and Recent Activity */}
            <Row className="g-4">
              {/* Left column - Service Utilization */}
              <Col lg={6}>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0 fw-bold" style={{ fontFamily: 'heading' }}>Service Utilization</h5>
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
                    <h5 className="mb-0 fw-bold" style={{ fontFamily: 'heading' }}>Recent Activity</h5>
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