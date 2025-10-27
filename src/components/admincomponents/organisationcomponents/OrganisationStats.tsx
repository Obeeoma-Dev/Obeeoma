// Import React and Bootstrap layout components
import React from "react";
import { Row, Col, Button } from "react-bootstrap";

// Import the shared MetricCard component and its type
import MetricCard, { StatCard } from "../Commoncomponents/metricCard";

/**
 * Props interface for OrganizationStats component
 * Accepts an array of StatCard objects
 */
interface OrganizationStatsProps {
  stats: StatCard[]; // Reuse shared 
}

/**
 * OrganizationStats component displays top-level organization metrics
 * Uses MetricCard for consistent layout and styling
 */
const OrganizationStats: React.FC<OrganizationStatsProps> = ({ stats }) => {
  return (
    // Section wrapper with bottom margin
    <section className="mb-4">
      {/* Header row with title and action button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold text-dark">Organizations</h4>
        <Button variant="success" size="sm">
          + Add Organization
        </Button>
      </div>

      {/* Responsive grid of metric cards */}
      <Row>
        {stats.map((stat, index) => (
          // Responsive column for each card
          <Col key={index} xs={12} sm={6} md={3} className="mb-3">
            {/* Render MetricCard with stat data */}
            <MetricCard
              id={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              subtitle={stat.subtitle}
              linkText={stat.linkText}
              icon={stat.icon}
              color={stat.color}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

// Export the component for use in dashboard layout
export default OrganizationStats;