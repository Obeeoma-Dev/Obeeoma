// src/components/admincomponents/subscriptioncomponents/subMetricPannel.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  Building2,
  Layers,
  Users,
  BarChart3,
} from 'lucide-react';

import './subscription.css';

/**
 * Props interface (unchanged for backend compatibility)
 */
interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

/**
 * SubMetricPanel Component
 *
 * Visually aligned with the top stat cards used in the Subscriptions page.
 * Uses icon + change indicator layout for consistency across admin dashboards.
 */
const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalOrganizations,
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  return (
    <Row className="g-4 mb-4">
      {/* Total Organizations */}
      <Col xs={12} md={6} lg={3}>
        <Card className="stat-card h-100">
          <Card.Body>
            <div className="stat-card-header">
              <div className="icon-circle primary">
                <Building2 size={20} />
              </div>
              <span className="stat-change">+12% from last month</span>
            </div>

            <div className="stat-value">{totalOrganizations}</div>
            <div className="stat-label">Total Organizations</div>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Subscriptions */}
      <Col xs={12} md={6} lg={3}>
        <Card className="stat-card h-100">
          <Card.Body>
            <div className="stat-card-header">
              <div className="icon-circle success">
                <Layers size={20} />
              </div>
              <span className="stat-change">+4% from last month</span>
            </div>

            <div className="stat-value">{totalSubscriptions}</div>
            <div className="stat-label">Total Subscriptions</div>
          </Card.Body>
        </Card>
      </Col>

      {/* Covered Employees */}
      <Col xs={12} md={6} lg={3}>
        <Card className="stat-card h-100">
          <Card.Body>
            <div className="stat-card-header">
              <div className="icon-circle purple">
                <Users size={20} />
              </div>
              <span className="stat-change">+5% from last month</span>
            </div>

            <div className="stat-value">{coveredEmployees}</div>
            <div className="stat-label">Covered Employees</div>
          </Card.Body>
        </Card>
      </Col>

      {/* Utilization Rate */}
      <Col xs={12} md={6} lg={3}>
        <Card className="stat-card h-100">
          <Card.Body>
            <div className="stat-card-header">
              <div className="icon-circle success">
                <BarChart3 size={20} />
              </div>
              <span className="stat-change">+5% from last month</span>
            </div>

            <div className="stat-value">{utilizationRate}%</div>
            <div className="stat-label">Utilization Rate</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MetricsPanel;
