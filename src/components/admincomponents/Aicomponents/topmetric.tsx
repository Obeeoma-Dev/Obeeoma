import React from "react";
import { Row, Col } from "react-bootstrap";
import { BrainCircuit, Activity, ThumbsUp } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";

// Props interface for TopMetrics
interface TopMetricsProps {
  totalRecommendations: number;
  engagementRate: number;
  averageTime: string;
}

// TopMetrics component
// Renders the top summary cards using the shared StatCard component
const TopMetrics: React.FC<TopMetricsProps> = ({
  totalRecommendations,
  engagementRate,
  averageTime,
}) => {
  return (
    <>
      {/* Stat Cards Section */}
      <Row className="g-4 mb-4">
        {/* Total Recommendations */}
        <Col xs={12} md={4}>
          <HoverStatCard
            title="Recommendations Today"
            value={totalRecommendations.toLocaleString()}
            subtitle="Sent to users"
            trend="+16.5% this month"
            icon={BrainCircuit}
            color="emerald"
          />
        </Col>

        {/* Average Engagement Rate */}
        <Col xs={12} md={4}>
          <HoverStatCard
            title="Hotline Refferrals"
            value={`${engagementRate}`}
            subtitle="This week"
            trend="+5% this month"
            icon={Activity}
            color="emerald"
          />
        </Col>

        <Col xs={12} md={4}>
          <HoverStatCard
            title="Resources Shared"
            value="89"
            subtitle="This month"
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
