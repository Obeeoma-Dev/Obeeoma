// src/components/admincomponents/subscriptioncomponents/subMetricPannel.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Building2, Calendar, Users, TrendingUp } from 'lucide-react';

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
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="flex-grow-1">
                {/* Metric title with muted text color */}
                <Card.Title className="text-muted small fw-normal mb-1" style={{ fontFamily: 'heading' }}>
                  Total Organizations
                </Card.Title>
                {/* Main metric value with large bold styling */}
                <div className="fw-bold fs-4 mb-1" style={{ fontFamily: 'body' }}>
                  {totalOrganizations}
                </div>
                {/* Percentage change indicator with positive styling */}
                <div className="text-success small fw-medium d-flex align-items-center" style={{ fontFamily: 'body' }}>
                  <span className="me-1">↑</span>
                  +12% from last month
                </div>
              </div>
              <Building2 size={24} className="text-success" />
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Subscriptions Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="flex-grow-1">
                {/* Metric title with consistent styling */}
                <Card.Title className="text-muted small fw-normal mb-1" style={{ fontFamily: 'heading' }}>
                  Total Subscriptions
                </Card.Title>
                {/* Main metric value */}
                <div className="fw-bold fs-4 mb-1" style={{ fontFamily: 'body' }}>
                  {totalSubscriptions}
                </div>
                {/* Percentage change indicator */}
                <div className="text-success small fw-medium d-flex align-items-center" style={{ fontFamily: 'body' }}>
                  <span className="me-1">↑</span>
                  +8% from last month
                </div>
              </div>
              <Calendar size={24} className="text-success" />
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Covered Employees Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="flex-grow-1">
                {/* Metric title */}
                <Card.Title className="text-muted small fw-normal mb-1" style={{ fontFamily: 'heading' }}>
                  Covered Employees
                </Card.Title>
                {/* Main metric value - using the coveredEmployees prop directly */}
                <div className="fw-bold fs-4 mb-1" style={{ fontFamily: 'body' }}>
                  {coveredEmployees}
                </div>
                {/* Percentage change indicator */}
                <div className="text-success small fw-medium d-flex align-items-center" style={{ fontFamily: 'body' }}>
                  <span className="me-1">↑</span>
                  +5% from last month
                </div>
              </div>
              <Users size={24} className="text-success" />
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Utilization Rate Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="flex-grow-1">
                {/* Metric title */}
                <Card.Title className="text-muted small fw-normal mb-1" style={{ fontFamily: 'heading' }}>
                  Utilization Rate
                </Card.Title>
                {/* Main metric value with percentage symbol */}
                <div className="fw-bold fs-4 mb-1" style={{ fontFamily: 'body' }}>
                  {utilizationRate}%
                </div>
                {/* Percentage change indicator */}
                <div className="text-success small fw-medium d-flex align-items-center" style={{ fontFamily: 'body' }}>
                  <span className="me-1">↑</span>
                  +3% from last month
                </div>
              </div>
              <TrendingUp size={24} className="text-success" />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MetricsPanel;