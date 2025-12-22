// src/components/admincomponents/dashboardstats.tsx

import React from "react";
import { Card, Col } from "react-bootstrap";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { StatCardData } from "./admindashboard";

/**
 * Props for the DashboardStats component
 * Accepts an array of stat cards to render
 */
interface DashboardStatsProps {
  stats: StatCardData[];
}

/**
 * DashboardStats renders a responsive row of stat cards
 * Each card displays an icon, title, value, and change indicator
 * Styled to match modern dashboard layout
 */
const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <>
      {stats.map((stat) => {
        const IconComponent = Icons[
          stat.icon as keyof typeof Icons
        ] as LucideIcon;

        // Split the stat.change string into numeric value and rest of the text
        // Example: "+8% vs yesterday" => value = "+8%", restText = "vs yesterday"
        // const [...rest] = stat.change.split(" ");
        // const restText = rest.join(" ");

        return (
          <Col key={stat.id} xs={12} sm={6} md={3} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-between p-3">
                {/* Top section: icon and change badge */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className={`d-flex align-items-center justify-content-center rounded-circle p-3 ${stat.iconColor}`}
                    style={{ width: "50px", height: "50px" }}
                  >
                    <IconComponent size={25} className="icon-color" />
                  </div>

                  {/* Change indicator styled like a badge */}
                  <span
                    className="fw-medium"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.4em 0.6em",
                      color: stat.change.startsWith("+")
                        ? "#3CB371"
                        : "#dc3545",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    {stat.id === "4" ? (
                      // Make whole change text red
                      <span style={{ color: "red" }}>{stat.change}</span>
                    ) : (
                      // Default for all other cards
                      <>{stat.change}</>
                    )}
                  </span>
                </div>

                {/* Bottom section: title and value */}
                <div>
                  <div className="fs-3 fw-bold text-dark">{stat.value}</div>
                  <div className="text-muted small">{stat.title}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

export default DashboardStats;
