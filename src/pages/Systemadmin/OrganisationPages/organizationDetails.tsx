// src/components/admincomponents/organisationcomponents/OrganizationDetails.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ListGroup,
} from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";

// Define the shape of a single organization
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
    crisis: number;
  };
  activity: string[];
}

// Mock data for demonstration
const organizationData: Record<string, OrganizationInfo> = {
  "1": {
    name: "Wellness Center Inc.",
    admin: "Sarah Paul",
    clients: 284,
    programs: 12,
    lastActive: "2 hours ago",
    id: "000-001",
    subscription: "Premium",
    status: "Active",
    created: "2 years ago",
    engagement: {
      anxiety: 78,
      stress: 65,
      crisis: 52,
    },
    activity: [
      "Subscription Renewed (2 hours ago)",
      "Monthly Report Generated (2 hours ago)",
    ],
  },
  // Add more organizations here if needed
};

const OrganizationDetails: React.FC = () => {
  // Extract the organization ID from the route
  const { id } = useParams<Record<string, string | undefined>>();

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Validate the ID and fetch organization data
  if (!id || !organizationData[id]) {
    return <p className="text-danger">Organization not found.</p>;
  }

  // Access the organization object
  const org = organizationData[id];

  return (
    // Root container with full viewport height and horizontal layout
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area (right column) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Main content area */}
        <Container fluid className="p-4">
          {/* Return button to go back to overview */}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/system-admin/organizations")}
            className="mb-3"
          >
            ← Return to Overview
          </Button>

          {/* Page title */}
          <h3 className="text-success mb-4">Organization: {org.name}</h3>

          {/* Organization overview card */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col><strong>Admin:</strong> {org.admin}</Col>
                <Col><strong>Clients:</strong> {org.clients}</Col>
                <Col><strong>Programs:</strong> {org.programs}</Col>
                <Col><strong>Last Active:</strong> {org.lastActive}</Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Metadata card */}
          <Card className="mb-4">
            <Card.Header>Wellness Center Inc. Details</Card.Header>
            <Card.Body>
              <Row>
                <Col><strong>ID:</strong> {org.id}</Col>
                <Col><strong>Subscription Plan:</strong> {org.subscription}</Col>
                <Col><strong>Status:</strong> {org.status}</Col>
                <Col><strong>Created:</strong> {org.created}</Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Button variant="outline-success" size="sm">
                    Program Settings
                  </Button>{" "}
                  <Button variant="outline-danger" size="sm">
                    Delete Organization
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Engagement metrics card */}
          <Card className="mb-4">
            <Card.Header>Program Engagement (%)</Card.Header>
            <Card.Body>
              <ul>
                <li>Anxiety Management Series: {org.engagement.anxiety}%</li>
                <li>Stress Reduction: {org.engagement.stress}%</li>
                <li>Crisis Support: {org.engagement.crisis}%</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Charts section */}
          <Card className="mb-4">
            <Card.Header>Platform Usage & Distribution</Card.Header>
            <Card.Body>
              <OrganizationCharts />
            </Card.Body>
          </Card>

          {/* Recent activity card */}
          <Card>
            <Card.Header>Recent Activity</Card.Header>
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