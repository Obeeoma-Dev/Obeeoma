import React from "react"
import { Row, Col } from "react-bootstrap"
import { Phone, Clock, XCircle } from "lucide-react"
import { HoverStatCard } from "./hoverCard";

interface TopMetricsProps {
  totalCalls: number;
  avgCallTime: string;
  missedCalls: number;
}

const TopMetrics: React.FC<TopMetricsProps> = ({
  totalCalls,
  avgCallTime,
  missedCalls,
}) => {
  return (
    <>
      {/* Top Stats Row */}
      <Row className="mb-4" style={{ fontFamily: "body", fontWeight: "600px" }}>
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <HoverStatCard
            title="Today's Calls"
            value={String(totalCalls)}
            subtitle="Total incoming calls"
            trend="+8% vs yesterday"
            icon={Phone}
            color="emerald"
          />
        </Col>
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <HoverStatCard
            title="Avg. Call Time"
            value={avgCallTime}
            subtitle="Average duration"
            trend="-0:05 vs last week"
            icon={Clock}
            color="emerald"
          />
        </Col>
        <Col xs={12} md={4}>
          <HoverStatCard
            title="Missed Calls"
            value={String(missedCalls)}
            subtitle="Calls not answered"
            trend="+1 vs yesterday"
            icon={XCircle}
            color="rose"
          />
        </Col>
      </Row>
    </>
  );
};

export default TopMetrics;
