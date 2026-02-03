import React from "react";
import * as Icons from "lucide-react";
import { Card } from "react-bootstrap";
import { ActivityItem as ActivityItemType } from "./admindashboard";

interface ActivityItemProps {
  data: ActivityItemType;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ data }) => {
  // Dynamically select icon from lucide-react based on string name
  const IconComponent = (Icons[data.icon as keyof typeof Icons] ??
    Icons.Activity) as React.FC<{
    size?: number;
    color?: string;
  }>;

  // Map iconColor to pastel background colors
  const bgColorMap: Record<string, string> = {
    "bg-light": "#9DD3AF",
    "bg-success": "#9DD3AF",
    "bg-info": "#9DD3AF",
    "bg-warning": "#9DD3AF",
    "bg-danger": "#9DD3AF",
  };

  // Fallback to light gray if no match
  const iconBgColor = bgColorMap[data.iconColor] || "#f0f4f8";

  return (
    <Card className="border-0 shadow-sm mb-3">
      <Card.Body className="d-flex align-items-start justify-content-between px-2 py-3">
        {/* Left section: icon and text */}
        <div className="d-flex align-items-start gap-3 flex-grow-1">
          <div
            className="rounded d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: iconBgColor,
              width: "40px",
              height: "40px",
            }}
          >
            <IconComponent size={20} color="#0B6E45" />
          </div>

          {/* Text content: type and details */}
          <div>
            <div className="fw-semibold mb-1">{data.type}</div>
            <div className="text-muted small">{data.details}</div>
          </div>
        </div>

        {/* Right section: timestamp */}
        <div className="text-muted small text-end">{data.time}</div>
      </Card.Body>
    </Card>
  );
};

export default ActivityItem;
