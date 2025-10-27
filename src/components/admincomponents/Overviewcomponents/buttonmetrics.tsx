// Import React and required Bootstrap layout components
import React from "react";
import { Row, Col } from "react-bootstrap";

// Import the shared MetricCard component and its type
import MetricCard, { StatCard } from "../Commoncomponents/metricCard";

/**
 * Props interface for BottomMetrics component
 * Accepts an array of StatCard objects (shared type)
 */
interface BottomMetricsProps {
  metrics: StatCard[]; // Reuse StatCard 
}

/**
 * BottomMetrics component displays a grid of metric cards
 * Each card shows a key metric with icon, value, subtitle, and link
 */
const BottomMetrics: React.FC<BottomMetricsProps> = ({ metrics }) => {
  return (
    // Section wrapper with bottom margin
    <section className="mb-4">
      {/* Bootstrap grid layout with vertical spacing between rows */}
      <Row className="gy-4">
        {metrics.map((metric) => (
          // Responsive column for each metric card
          <Col key={metric.title} xs={12} md={6} lg={3}>
            {/* Render MetricCard with all available props */}
            <MetricCard
              id={metric.id}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              linkText={metric.linkText}
              icon={metric.icon}
              color={metric.color}
              change={metric.change}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

// Export the component for use in dashboard layout
export default BottomMetrics;