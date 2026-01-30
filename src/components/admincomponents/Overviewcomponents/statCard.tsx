// src/components/admincomponents/Overviewcomponents/dashboardstats.tsx
import React from "react";
import { Col } from "react-bootstrap";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard"; // import your reusable card
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
            subtitle={stat.subtitle ?? ""} // safe default if not provided
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
