<<<<<<< HEAD
// src/components/admincomponents/subscriptioncomponents/subMetricPannel.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// Define the props interface for flexibility and backend readiness
// Keeping the same interface to maintain compatibility with existing code
interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

/**
 * MetricsPanel Component
 * 
 * Displays key subscription metrics in a card layout matching the design specification.
 * Each metric card shows the main value with a percentage change indicator.
 * Maintains backward compatibility with existing props interface.
 * 
 * @param totalOrganizations - Number of total organizations
 * @param totalSubscriptions - Number of total subscriptions  
 * @param coveredEmployees - String representation of covered employees (e.g., "4.2k")
 * @param utilizationRate - Percentage value for utilization rate
 * @returns React functional component with styled metric cards
 */
const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalOrganizations,
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  return (
    // Main container row with bottom margin for spacing
    <Row className="mb-4 g-3">
      {/* Total Organizations Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title with muted text color */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Total Organizations
            </Card.Title>
            {/* Main metric value with large bold styling */}
            <div className="fw-bold fs-4 mb-1">
              {totalOrganizations}
            </div>
            {/* Percentage change indicator with positive styling */}
            <div className="text-success small fw-medium">
              +12% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Subscriptions Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title with consistent styling */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Total Subscriptions
            </Card.Title>
            {/* Main metric value */}
            <div className="fw-bold fs-4 mb-1">
              {totalSubscriptions}
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +4% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Covered Employees Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Covered Employees
            </Card.Title>
            {/* Main metric value - using the coveredEmployees prop directly */}
            <div className="fw-bold fs-4 mb-1">
              {coveredEmployees}
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +5% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Utilization Rate Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Utilization Rate
            </Card.Title>
            {/* Main metric value with percentage symbol */}
            <div className="fw-bold fs-4 mb-1">
              {utilizationRate}%
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +5% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

=======
// src/components/admincomponents/subscriptioncomponents/subMetricPannel.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// Define the props interface for flexibility and backend readiness
// Keeping the same interface to maintain compatibility with existing code
interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

/**
 * MetricsPanel Component
 * 
 * Displays key subscription metrics in a card layout matching the design specification.
 * Each metric card shows the main value with a percentage change indicator.
 * Maintains backward compatibility with existing props interface.
 * 
 * @param totalOrganizations - Number of total organizations
 * @param totalSubscriptions - Number of total subscriptions  
 * @param coveredEmployees - String representation of covered employees (e.g., "4.2k")
 * @param utilizationRate - Percentage value for utilization rate
 * @returns React functional component with styled metric cards
 */
const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalOrganizations,
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  return (
    // Main container row with bottom margin for spacing
    <Row className="mb-4 g-3">
      {/* Total Organizations Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title with muted text color */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Total Organizations
            </Card.Title>
            {/* Main metric value with large bold styling */}
            <div className="fw-bold fs-4 mb-1">
              {totalOrganizations}
            </div>
            {/* Percentage change indicator with positive styling */}
            <div className="text-success small fw-medium">
              +12% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Subscriptions Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title with consistent styling */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Total Subscriptions
            </Card.Title>
            {/* Main metric value */}
            <div className="fw-bold fs-4 mb-1">
              {totalSubscriptions}
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +4% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Covered Employees Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Covered Employees
            </Card.Title>
            {/* Main metric value - using the coveredEmployees prop directly */}
            <div className="fw-bold fs-4 mb-1">
              {coveredEmployees}
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +5% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Utilization Rate Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            {/* Metric title */}
            <Card.Title className="text-muted small fw-normal mb-1">
              Utilization Rate
            </Card.Title>
            {/* Main metric value with percentage symbol */}
            <div className="fw-bold fs-4 mb-1">
              {utilizationRate}%
            </div>
            {/* Percentage change indicator */}
            <div className="text-success small fw-medium">
              +5% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

>>>>>>> syda
export default MetricsPanel;