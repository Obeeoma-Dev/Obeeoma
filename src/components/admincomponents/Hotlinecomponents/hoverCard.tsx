import React from "react";
import { Card, Badge } from "react-bootstrap";
import { LucideIcon } from "lucide-react";
import "./hotline.css";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  icon: LucideIcon; // Reverted back to LucideIcon
  color: "emerald" | "blue" | "amber" | "rose";
}

export function HoverStatCard({
  title,
  value,
  subtitle,
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
    <Card className="shadow-sm stat-card w-100 h-100">
      {/* Card body wraps all main content */}
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Top row: icon on the left, value and title on the right */}
        <div className="d-flex align-items-center mb-3">
          {/* Icon container */}
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle ${styles.bg} ${styles.text}`}
            style={{ width: 48, height: 48 }}
          >
            <Icon size={24} />
          </div>

          {/* Spacer */}
          <div style={{ width: 16 }} />

          {/* Value and title stacked vertically */}
          <div className="d-flex flex-column" style={{ fontFamily: "body" }}>
            <div className="fw-semibold text-dark">{title}</div>
            <small className="text-muted">{subtitle}</small>
            <h3 className="fw-bold mb-1">{value}</h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
