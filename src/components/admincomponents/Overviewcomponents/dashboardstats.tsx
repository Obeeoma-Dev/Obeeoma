import React from "react";
import { Col } from "react-bootstrap";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard"; // adjust path if needed
import { StatCardData } from "./admindashboard";

interface DashboardStatsProps {
  stats: StatCardData[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <>
      {stats.map((stat) => (
        <Col key={stat.id} md={3}>
          <HoverStatCard
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle ?? ""}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
          />
        </Col>
      ))}
    </>
  );
};

export default DashboardStats;