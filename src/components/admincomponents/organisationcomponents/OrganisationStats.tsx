import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

/**
 * Type definition for a single stat card.
 * Helps TypeScript enforce structure and catch errors early.
 */
type StatCard = {
  title: string;
  value: number;
};

/**
 * OrganizationStats component displays top-level metrics
 * using placeholder data for now.
 * Includes a header row with title and action button.
 */
const OrganizationStats: React.FC = () => {
  // Placeholder data — replace with props or API data when backend is ready
  const stats: StatCard[] = [
    { title: "Total Organizations", value: 42 },
    { title: "Total Clients", value: 1284 },
    { title: "Active Programs", value: 68 },
    { title: "Regional Coverage", value: 6 },
  ];

  return (
    <section className="mb-4">
      {/* Header row with title and action button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-success fw-semibold">Organizations Overview</h4>
        <Button variant="success" size="sm">
          + Add Organization
        </Button>
      </div>

      {/* Stats grid */}
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-3">
            <Card className="text-center border-success shadow-sm h-100">
              <Card.Body>
                <Card.Title className="text-muted fs-6">{stat.title}</Card.Title>
                <Card.Text className="fs-3 fw-bold text-success">
                  {stat.value.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OrganizationStats;