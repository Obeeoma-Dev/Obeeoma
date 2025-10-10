import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Component to display top-level organization stats
const OrganizationStats: React.FC = () => {
  return (
    <Row className="mb-4">
      {/* Each stat is wrapped in a Bootstrap Card */}
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title>Total Organizations</Card.Title>
            <Card.Text className="fs-4 fw-bold text-success">42</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title>Total Clients</Card.Title>
            <Card.Text className="fs-4 fw-bold text-success">1,284</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title>Active Programs</Card.Title>
            <Card.Text className="fs-4 fw-bold text-success">68</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title>Regional Coverage</Card.Title>
            <Card.Text className="fs-4 fw-bold text-success">6</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrganizationStats;