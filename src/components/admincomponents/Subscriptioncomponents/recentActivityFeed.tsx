// src/components/admincomponents/subscriptioncomponents/RecentActivityFeed.tsx

import React from "react";

interface Activity {
  organization: string;
  icon: "person" | "refresh" | "alert" | "check";
  iconColor: string;
  description: string;
  time: string;
}

interface Props {
  activities: Activity[];
}

const RecentActivityFeed: React.FC<Props> = ({ activities }) => {
  const getIcon = (iconType: string, color: string) => {
    switch (iconType) {
      case "person":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="7"
              r="3"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "refresh":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10a7 7 0 1 1-7-7M17 3v4h-4M3 10a7 7 0 1 0 7 7M3 17v-4h4"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "alert":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "check":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M6 10l2 2 4-4"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {activities.map((activity, index) => (
        <div
          key={index}
          style={{
            padding: "1rem",
            borderBottom:
              index !== activities.length - 1 ? "1px solid #e9ecef" : "none",
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              marginTop: "0.125rem",
            }}
          >
            {getIcon(activity.icon, activity.iconColor)}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#1a1a1a",
                marginBottom: "0.25rem",
              }}
            >
              {activity.organization}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6c757d",
                marginBottom: "0.25rem",
              }}
            >
              {activity.description}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#adb5bd",
              }}
            >
              {activity.time}
            </div>
          </div>
        </div>
      ))}
      {/* View all link */}
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <a
          href="#"
          style={{
            color: "#3CB371",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("View all activities");
          }}
        >
          View all
        </a>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
