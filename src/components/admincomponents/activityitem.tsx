// Import React and required icon set
import React from "react";
import * as Icons from "lucide-react";
import { ActivityItem as ActivityItemType } from "./admindashboard";

/**
 * Props interface for the ActivityItem component
 * Accepts a single activity object
 */
interface ActivityItemProps {
  data: ActivityItemType;
}

/**
 * ActivityItem component displays a single activity entry
 * Includes icon, type, details, and timestamp
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ data }) => {
  // Dynamically select icon from lucide-react
  const IconComponent =
    (Icons[data.icon as keyof typeof Icons] ?? Icons.Activity) as React.FC<{
      size?: number;
      color?: string;
    }>;

  // Map iconColor to pastel background colors
  const bgColorMap: Record<string, string> = {
    "bg-light": "#f0f4f8",
    "bg-success": "#e6f4ea",
    "bg-info": "#e7f1ff",
    "bg-warning": "#fff4e5",
    "bg-danger": "#fde7f3",
  };

  const iconBgColor = bgColorMap[data.iconColor] || "#f0f4f8";

  return (
    // Main container with spacing and hover effect
    <div className="d-flex align-items-start justify-content-between py-3 px-2 border-bottom hover-shadow">
      {/* Left section: icon and text */}
      <div className="d-flex align-items-start gap-3 flex-grow-1">
        {/* Icon container with background */}
        <div
          className="rounded d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: iconBgColor,
            width: "40px",
            height: "40px",
          }}
        >
          <IconComponent size={20} color="#0d6efd" />
        </div>

        {/* Text content */}
        <div>
          <div className="fw-semibold mb-1">{data.type}</div>
          <div className="text-muted small">{data.details}</div>
        </div>
      </div>

      {/* Right section: timestamp */}
      <div className="text-muted small text-end">{data.time}</div>
    </div>
  );
};

export default ActivityItem;