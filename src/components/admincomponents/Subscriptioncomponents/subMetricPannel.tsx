import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";

type MetricColor = "emerald" | "blue" | "amber" | "rose";

interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  const metrics: {
    title: string;
    value: string | number;
    subtitle: string;
    trend: string;
    icon: LucideIcon;
    color: MetricColor;
  }[] = [
    {
      title: "Total Subscriptions",
      value: totalSubscriptions,
      subtitle: "Active subscription plans",
      trend: "+8% from last month",
      icon: Calendar,
      color: "emerald",
    },
    {
      title: "Covered Employees",
      value: coveredEmployees,
      subtitle: "Employees covered",
      trend: "+5% from last month",
      icon: Users,
      color: "emerald",
    },
    {
      title: "Utilization Rate",
      value: `${utilizationRate}%`,
      subtitle: "Platform usage",
      trend: "+3% from last month",
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  return (
    <Row className="mb-4 g-3">
      {metrics.map((metric, index) => (
        <Col key={index} md={4} className="d-flex">
          <HoverStatCard
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MetricsPanel;
