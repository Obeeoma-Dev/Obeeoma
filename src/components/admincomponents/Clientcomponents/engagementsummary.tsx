import React from "react";
import { Row, Col } from "react-bootstrap";
import { TrendingUp, LucideIcon } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";
import "./engagement.css";

type MetricColor = "emerald" | "blue" | "amber" | "rose";

interface EngagementSummaryProps {
  engagementRate: number;
}

const EngagementSummary: React.FC<EngagementSummaryProps> = ({
  engagementRate = 0,
}) => {
  const metric = {
    title: "Engagement Rate",
    value: `${engagementRate != null ? Number(engagementRate) : 0}%`,
    subtitle: "Client activity this week",
    trend: "+5% this week",
    icon: TrendingUp as LucideIcon,
    color: "emerald" as MetricColor,
  };

  return (
    <Row className="mb-4">
      <Col md={12} lg={4}>
        <HoverStatCard
          title={metric.title}
          value={metric.value}
          subtitle={metric.subtitle}
          trend={metric.trend}
          icon={metric.icon}
          color={metric.color}
        />
      </Col>
    </Row>
  );
};

export default EngagementSummary;
