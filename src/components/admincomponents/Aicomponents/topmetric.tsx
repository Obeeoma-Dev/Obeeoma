import React from "react";
import { Row, Col } from "react-bootstrap";
import { BrainCircuit, Activity, ThumbsUp } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";

// Props interface for TopMetrics (all from backend when available)
interface TopMetricsProps {
  totalRecommendations: number;
  engagementRate: number;
  averageTime?: string;
  aiAccuracyScore?: number;
}

const TopMetrics: React.FC<TopMetricsProps> = ({
  totalRecommendations,
  engagementRate,
  averageTime = "—",
  aiAccuracyScore = 0,
}) => {
  return (
    <>
      <Row className="g-4 mb-4">
        <Col xs={12} md={4}>
          <HoverStatCard
            title="Total Recommendations"
            value={totalRecommendations.toLocaleString()}
            subtitle="Generated this month"
            trend="+16.5% this month"
            icon={BrainCircuit}
            color="emerald"
          />
        </Col>
        <Col xs={12} md={4}>
          <HoverStatCard
            title="Avg. Engagement Rate"
            value={`${engagementRate}%`}
            subtitle="User interaction with content"
            trend="+5% this month"
            icon={Activity}
            color="emerald"
          />
        </Col>
        <Col xs={12} md={4}>
          <HoverStatCard
            title="AI Accuracy Score"
            value={typeof aiAccuracyScore === "number" ? `${aiAccuracyScore}%` : "—"}
            subtitle="Based on user feedback"
            trend="+2% this month"
            icon={ThumbsUp}
            color="emerald"
          />
        </Col>
      </Row>
    </>
  );
};

// Export component
export default TopMetrics;
