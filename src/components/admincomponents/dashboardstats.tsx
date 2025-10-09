// Import React and required Bootstrap layout components
import React from "react";
import { Row, Col } from "react-bootstrap";

// Import the StatCard component and its data type
import StatCard from "./statCard";
import { StatCardData } from "./admindashboard";

/**
 * Props interface for DashboardStats component
 * Accepts an array of StatCardData objects
 */
interface DashboardStatsProps {
  stats: StatCardData[];
}

/**
 * DashboardStats component displays top-level metrics
 * Uses React Bootstrap grid layout to render StatCard components
 */
const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    // Section wrapper for dashboard overview
    <section className="mb-4">
      {/* Section heading */}
      <h2 className="fw-bold fs-4 text-dark mb-4">Dashboard Overview</h2>

      {/* Bootstrap grid layout for stat cards */}
      <Row className="gy-4">
        {/* Map through stats array and render each StatCard inside a responsive column */}
        {stats.map((stat) => (
          <Col key={stat.id} xs={12} md={6} lg={3}>
            <StatCard data={stat} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

// Export the component for use in the dashboard layout
export default DashboardStats;
