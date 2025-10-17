import React from "react";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col } from "react-bootstrap";

/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 */
const SubscriptionPage: React.FC = () => {
  // 📊 Placeholder metrics — replace with backend data later
  const metrics = {
    totalOrganizations: 12,
    totalSubscriptions: 34,
    coveredEmployees: "4.2k",
    utilizationRate: 68,
  };

  // 📋 Sample subscription records
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

  // 📈 Service utilization percentages
  const services = [
    { name: "Therapy Sessions", percentage: 64 },
    { name: "Mindfulness", percentage: 52 },
    { name: "Stress Management", percentage: 48 },
    { name: "Sleep Resources", percentage: 36 },
    { name: "Nutrition", percentage: 28 },
  ];

  // 🕒 Recent activity log
  const activities = [
    "Acme Corp added subscription for 250 employees",
    "Green Energy Co subscription marked inactive",
  ];

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
              {/* 📊 Top metrics panel */}
              <MetricsPanel {...metrics} />

              {/* 📋 Subscriptions and activity layout */}
              <Row>
                <Col md={8}>
                  <RecentSubscriptionsTable subscriptions={subscriptions} />
                  <ServiceUtilizationChart services={services} />
                </Col>
                <Col md={4}>
                  <RecentActivityFeed activities={activities} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;