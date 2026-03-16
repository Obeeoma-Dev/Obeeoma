import React, { useEffect } from "react";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
// import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed, {
  Activity,
} from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { Container, Row, Col, Card, Button, Alert, Spinner } from "react-bootstrap";
// import { useSubscriptionData, calculateMetrics } from "../../../hooks/useSubscriptionData";
import { useSimpleSubscriptionCount } from "../../../hooks/useSimpleSubscriptionCount";
// import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";

import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { useAIStatus } from "../../../hooks/useAIStatus";

/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 * This version focuses on improved layout and card-based design
 * while maintaining all existing functionality and data structures.
 */
const SubscriptionPage: React.FC = () => {
  // Start simple - just get subscription count first
  const {
    count: totalSubscriptions,
    coveredEmployees,
    utilizationRate,
    subscriptions,
    loading: countLoading,
    error: countError,
    refetch: refetchCount,
  } = useSimpleSubscriptionCount();

  // Debug logging to see what data we're getting
  console.log("Raw subscriptions data:", subscriptions);
  console.log("First subscription structure:", subscriptions[0]);

  // Use placeholder data for other metrics for now
  const metrics = {
    totalOrganizations: 42, // Placeholder
    totalSubscriptions: totalSubscriptions, // Real data from backend
    coveredEmployees: coveredEmployees.toLocaleString(), // Real data with formatting
    utilizationRate: utilizationRate,
  };

  const transformedSubscriptions = subscriptions.slice(0, 8).map((sub) => {
    console.log("Processing subscription:", sub);
    return {
      id: sub.id,
      organization:
        sub.employer?.name ||
        (typeof sub.employer === "string"
          ? sub.employer
          : `Org ${sub.employer}`) ||
        "Unknown Organization",
      plan: sub.plan
        ? sub.plan.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
        : "N/A",
      employees: sub.seats || 0,
      activeUsers: sub.used_seats || 0,
      activeUsersPercentage:
        sub.seats > 0 ? Math.round((sub.used_seats / sub.seats) * 100) : 0,
      status:
        sub.is_active !== undefined
          ? sub.is_active
            ? ("Active" as const)
            : ("Pending" as const)
          : ("Pending" as const),
      expiryDate: sub.end_date
        ? new Date(sub.end_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "N/A",
    };
  });

  // Service utilization percentages - maintaining existing structure
  const services = [
    { name: "Therapy Sessions", percentage: 65 },
    { name: "Mindfulness", percentage: 4 },
    { name: "Stress Management", percentage: 8 },
    { name: "Sleep Resources", percentage: 3 },
    { name: "Nutrition", percentage: 25 },
  ];

  // Placeholder data for subscription plans
  const subscriptionPlans = [
    {
      id: "1",
      name: "Freemium",
      organization: "Acme Corp",
      monthlyPrice: 0,
      annualPrice: 0,
      employeeLimit: 10,
      features: [
        "Access to basic resources",
        "Monthly check-ins",
        "Email support",
      ],
    },
    {
      id: "2",
      name: "Premium",
      organization: "TechStart Inc",
      monthlyPrice: 24.99,
      annualPrice: 251.99,
      employeeLimit: 0,
      features: [
        "Access to basic resources",
        "Monthly check-ins",
        "Email support",
        "Access to live webinars",
        "Client engagement tools",
        "Dedicated support team",
      ],
      isPopular: true,
    },
  ];

  // Use reusable AI status hook with caching
  const { aiStatus } = useAIStatus();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <SystemAdminLayout title="Subscription Management">
      <Container fluid>
        {/* Loading State for subscription count */}
        {countLoading && (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">
                Loading subscription count...
              </span>
            </Spinner>
            <p className="mt-2 text-muted">Loading subscription data...</p>
          </div>
        )}

        {/* Error State for subscription count */}
        {countError && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error Loading Subscription Count</Alert.Heading>
            <p>{countError}</p>
            <Button variant="outline-danger" onClick={refetchCount}>
              Try Again
            </Button>
          </Alert>
        )}

        {/* Content - Show when not loading */}
        {!countLoading && !countError && (
          <>
            {/* Metrics panel - now with real subscription count */}
            <MetricsPanel {...metrics} />

            {/* Recent Subscriptions card */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <h5
                    className="mb-0 fw-bold"
                    style={{ fontFamily: "heading" }}
                  >
                    Recent Subscriptions
                  </h5>
                  <p
                    className="text-muted mb-0 small mt-1"
                    style={{ fontFamily: "body" }}
                  >
                    Overview of organization subscriptions to mental health
                    services
                  </p>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {/* Table component with placeholder subscription data */}
                <RecentSubscriptionsTable
                  subscriptions={transformedSubscriptions}
                />
              </Card.Body>
            </Card>

            {/* Subscription cards grid */}
            {/* <SubscriptionSettingsComp plans={subscriptionPlans} /> */}

            {/* AI Assistant Floating Chat */}
            <AIAssistant isEnabled={aiStatus.admin_ai} />
          </>
        )}
      </Container>
    </SystemAdminLayout>
  );
};

export default SubscriptionPage;
