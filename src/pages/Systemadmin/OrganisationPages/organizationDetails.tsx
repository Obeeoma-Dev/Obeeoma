// src/components/admincomponents/organisationcomponents/OrganizationDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ListGroup,
  ProgressBar,
  Spinner,
} from 'react-bootstrap';
import Sidebar from '../../../components/admincomponents/adminsidebar';
import Header from '../../../components/admincomponents/adminheader';
import OrganizationCharts from '../../../components/admincomponents/organisationcomponents/organisation.chats';

// ✅ TypeScript interface for backend-ready organization data
interface OrganizationInfo {
  name: string;
  admin: string;
  clients: number;
  programs: number;
  lastActive: string;
  id: string;
  subscription: string;
  status: string;
  created: string;
  engagement: {
    anxiety: number;
    stress: number;
    sleep: number;
    mood: number;
  };
  activity: string[];
}

// ✅ Component: OrganizationDetails
const OrganizationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ State for organization data and loading
  const [org, setOrg] = useState<OrganizationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Simulated backend fetch (replace with real API call)
  useEffect(() => {
    setLoading(true);

    // Simulate async fetch with placeholder data
    setTimeout(() => {
      const placeholder: OrganizationInfo = {
        name: 'Wellness Center Inc.',
        admin: 'Sarah Paul',
        clients: 245,
        programs: 11,
        lastActive: '2 hours ago',
        id: '000-001',
        subscription: 'Premium',
        status: 'Active',
        created: '2 years ago',
        engagement: {
          anxiety: 78,
          stress: 65,
          sleep: 59,
          mood: 72,
        },
        activity: [
          'Subscription Renewed (2 days ago)',
          'Monthly Report Generated (5 days ago)',
        ],
      };
      setOrg(placeholder);
      setLoading(false);
    }, 1000);
  }, [id]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <Header />
          <Container fluid className="p-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading organization details...</p>
          </Container>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (!org) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <Header />
          <Container fluid className="p-5 text-danger">
            Organization not found.
          </Container>
        </div>
      </div>
    );
  }

  // ✅ Main layout
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <Header />
        <Container fluid className="p-4 overflow-auto">
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/system-admin/organizations')}
            className="mb-4"
          >
            ← Return to Overview
          </Button>

          <h3 className="text-success fw-bold mb-4">
            Organization Overview: {org.name}
          </h3>

          {/* ✅ Summary Card */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row className="gy-3">
                <Col md={3}>
                  <strong>Total Clients:</strong> {org.clients}
                </Col>
                <Col md={3}>
                  <strong>Active Programs:</strong> {org.programs}
                </Col>
                <Col md={3}>
                  <strong>Last Active:</strong> {org.lastActive}
                </Col>
                <Col md={3}>
                  <strong>Admin:</strong> {org.admin}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ✅ Metadata Card */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="fw-semibold">Organization Details</Card.Header>
            <Card.Body>
              <Row className="gy-3">
                <Col md={3}>
                  <strong>ID:</strong> {org.id}
                </Col>
                <Col md={3}>
                  <strong>Subscription:</strong> {org.subscription}
                </Col>
                <Col md={3}>
                  <strong>Status:</strong> {org.status}
                </Col>
                <Col md={3}>
                  <strong>Created:</strong> {org.created}
                </Col>
              </Row>
              <div className="mt-4 d-flex gap-2">
                <Button variant="outline-success" size="sm">
                  Manage Subscription
                </Button>
                <Button variant="outline-primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* ✅ Engagement Metrics */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="fw-semibold">Program Engagement (%)</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Anxiety Management</strong>
                <ProgressBar now={org.engagement.anxiety} label={`${org.engagement.anxiety}%`} variant="info" />
              </div>
              <div className="mb-3">
                <strong>Stress Reduction</strong>
                <ProgressBar now={org.engagement.stress} label={`${org.engagement.stress}%`} variant="warning" />
              </div>
              <div className="mb-3">
                <strong>Sleep Improvement</strong>
                <ProgressBar now={org.engagement.sleep} label={`${org.engagement.sleep}%`} variant="success" />
              </div>
              <div>
                <strong>Mood Enhancement</strong>
                <ProgressBar now={org.engagement.mood} label={`${org.engagement.mood}%`} variant="danger" />
              </div>
            </Card.Body>
          </Card>

          {/* ✅ Charts Section */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="fw-semibold">Platform Usage (Last 6 Weeks)</Card.Header>
            <Card.Body>
              <OrganizationCharts />
            </Card.Body>
          </Card>

          {/* ✅ Recent Activity */}
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Recent Activity</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {org.activity.map((event, index) => (
                  <ListGroup.Item key={index}>{event}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default OrganizationDetails;