import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

/**
 * Type definition for a single stat card.
 * Helps enforce structure and catch type errors.
 */
export type StatCard = {
  title: string;
  value: number | string;
  change?: number; // Optional percentage change
};

/**
 * Props interface for OrganizationStats component.
 * Accepts an array of stat cards.
 */
interface OrganizationStatsProps {
  stats: StatCard[];
}

/**
 * OrganizationStats component displays top-level metrics.
 * Now receives data via props instead of hardcoding.
 */
const OrganizationStats: React.FC<OrganizationStatsProps> = ({ stats }) => {
  return (
    <section className="mb-4">
      {/* Header row with title and action button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold text-dark">Organizations</h4>
        <Button variant="success" size="sm">
          + Add Organization
        </Button>
      </div>

      {/* Responsive grid of stat cards */}
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                {/* Title and value */}
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">
                    {stat.title}
                  </Card.Title>
                  <Card.Text className="fs-3 fw-bold text-success mb-0">
                    {stat.value.toLocaleString()}
                  </Card.Text>
                </div>

                {/* Optional percentage change */}
                {stat.change !== undefined && (
                  <div className="text-muted small mt-2">
                    <span className="text-success">+{stat.change}%</span> this month
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OrganizationStats;