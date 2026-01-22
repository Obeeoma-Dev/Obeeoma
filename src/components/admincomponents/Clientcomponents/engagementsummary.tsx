import React from "react";
import { Row, Col } from "react-bootstrap";
import { TrendingUp, Award, Gift, LucideIcon } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard"; // adjust path
import "./engagement.css";

type MetricColor = "emerald" | "blue" | "amber" | "rose";

interface EngagementSummaryProps {
  engagementRate: number;
  activePrograms: number;
  totalPoints: number;
}

const EngagementSummary: React.FC<EngagementSummaryProps> = ({
  engagementRate,
  activePrograms,
  totalPoints,
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
        title: "Engagement Rate",
        value: `${engagementRate}%`,
        subtitle: "Client activity this week",
        trend: "+5% this week",
        icon: TrendingUp,
        color: "emerald",
      },
      {
        title: "Active Reward Programs",
        value: activePrograms,
        subtitle: "Programs currently running",
        trend: "+2 this month",
        icon: Award,
        color: "emerald",
      },
      {
        title: "Rewards Assisted",
        value: totalPoints.toLocaleString(),
        subtitle: "Total points distributed",
        trend: "+15% this month",
        icon: Gift,
        color: "emerald",
      },
    ];

  return (
    <>
      <div className="mb-4" style={{ fontFamily: "heading" }}>
        <h2>Client Engagement & Rewards</h2>
        <p className="text-muted" style={{ fontFamily: "body" }}>
          Monitor client activity and reward program performance.
        </p>
      </div>

      <Row className="mb-4">
        {metrics.map((metric, index) => (
          <Col key={index} md={4}>
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
    </>
  );
};

export default EngagementSummary;