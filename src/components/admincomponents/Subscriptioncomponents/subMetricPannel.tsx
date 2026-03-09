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
  // Add optional trend data
  revenueGrowth?: number;
  organizationsGrowth?: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
  revenueGrowth = 0,
  organizationsGrowth = 0,
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
      trend: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}% from last month`,
      icon: Calendar,
      color: revenueGrowth >= 0 ? "emerald" : "rose",
    },
    {
      title: "Covered Employees",
      value: coveredEmployees,
      subtitle: "Employees covered",
      trend: `${organizationsGrowth >= 0 ? "+" : ""}${organizationsGrowth.toFixed(1)}% from last month`,
      icon: Users,
      color: organizationsGrowth >= 0 ? "emerald" : "rose",
    },
    {
      title: "Utilization Rate",
      value: `${utilizationRate}%`,
      subtitle: "Platform usage",
      trend:
        utilizationRate >= 70 ? "+3% from last month" : "-2% from last month",
      icon: TrendingUp,
      color: utilizationRate >= 70 ? "emerald" : "amber",
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
