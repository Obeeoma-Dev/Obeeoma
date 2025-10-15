// src/pages/Systemadmin/subscription.tsx

import React from 'react';
import MetricsPanel from '../../../components/admincomponents/Subscriptioncomponents/subMetricPannel';
import RecentSubscriptionsTable from '../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable';
import ServiceUtilizationChart from '../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart';
import RecentActivityFeed from '../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed';
import AdminHeader from '../../../components/admincomponents/adminheader';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import { Container, Row, Col } from 'react-bootstrap';

const SubscriptionPage: React.FC = () => {
  // Placeholder data for backend-ready structure
  const metrics = {
    totalOrganizations: 12,
    totalSubscriptions: 34,
    coveredEmployees: '4.2k',
    utilizationRate: 68,
  };

  const subscriptions = [
    {
      organization: 'Acme Corporation',
      type: 'Enterprise',
      employees: 250,
      startDate: 'Mar 15, 2023',
      endDate: 'Mar 15, 2024',
      status: 'Active' as 'Active',
    },
    {
      organization: 'Green Energy Co',
      type: 'Startup',
      employees: 75,
      startDate: 'Mar 15, 2023',
      endDate: 'Mar 15, 2024',
      status: 'Inactive' as 'Inactive',
    },
  ];

  const services = [
    { name: 'Therapy Sessions', percentage: 64 },
    { name: 'Mindfulness', percentage: 52 },
    { name: 'Stress Management', percentage: 48 },
    { name: 'Sleep Resources', percentage: 36 },
    { name: 'Nutrition', percentage: 28 },
  ];

  const activities = [
    'Acme Corp added subscription for 250 employees',
    'Green Energy Co subscription marked inactive',
  ];

  return (
    <>
      <AdminHeader />
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>
        <Col md={10}>
          <Container fluid className="mt-4">
            <MetricsPanel {...metrics} />
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
        </Col>
      </Row>
    </>
  );
};

export default SubscriptionPage;