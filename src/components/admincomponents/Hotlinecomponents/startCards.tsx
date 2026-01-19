import React from "react";
import { Card, Badge } from "react-bootstrap";
import { LucideIcon } from "lucide-react";
import "./hotline.css";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  icon: LucideIcon;
  color: "emerald" | "blue" | "amber" | "rose";
}


export function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color,
}: StatCardProps) {
 
  const colorStyles = {
    emerald: {
      bg: "bg-success bg-opacity-10",
      text: "text-success",
      badge: "success",
    },
    blue: {
      bg: "bg-primary bg-opacity-10",
      text: "text-primary",
      badge: "primary",
    },
    amber: {
      bg: "bg-warning bg-opacity-10",
      text: "text-warning",
      badge: "warning",
    },
    rose: {
      bg: "bg-danger bg-opacity-10",
      text: "text-danger",
      badge: "danger",
    },
  } as const;


  const styles = colorStyles[color];

  return (
   
    <Card className="h-100 shadow-sm stat-card">
      {/* Card body wraps all main content */}
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Top row: icon on the left, trend badge on the right */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          {/* Icon container */}
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle ${styles.bg} ${styles.text}`}
            style={{ width: 48, height: 48 }}
          >
            {/* Lucide icon */}
            <Icon size={24} />
          </div>

          {/* Optional trend badge (only shown if trend exists) */}
          {trend && (
            <Badge bg={styles.badge} pill>
              {trend}
            </Badge>
          )}
        </div>

        {/* Bottom section: value, title, and subtitle */}
        <div>
          {/* Main statistic value */}
          <h3 className="fw-bold mb-1">{value}</h3>

          {/* Title text */}
          <div className="fw-semibold text-dark mb-1">{title}</div>

          {/* Subtitle / helper text */}
          <small className="text-muted">{subtitle}</small>
        </div>
      </Card.Body>
    </Card>
  );
}
