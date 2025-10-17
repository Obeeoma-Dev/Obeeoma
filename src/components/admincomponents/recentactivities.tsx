// Import React and required Bootstrap components
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";

// Import the ActivityItem type definition from shared dashboard types
import { ActivityItem as ActivityItemType } from "./admindashboard";

/**
 * Props interface for RecentActivities component
 * Accepts an array of ActivityItemType objects
 */
interface RecentActivitiesProps {
  activities: ActivityItemType[];
}

/**
 * RecentActivities component displays a list of recent system activities
 * Each activity includes an icon, type, details, and timestamp
 */
const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  // Define a mapping of Bootstrap-style color keys to pastel background hex codes
  const bgColorMap: Record<string, string> = {
    "bg-light": "#f0f4f8",     // Default light gray
    "bg-success": "#e6f4ea",   // Soft green
    "bg-info": "#e7f1ff",      // Soft blue
    "bg-warning": "#fff4e5",   // Soft orange
    "bg-danger": "#fde7f3",    // Soft pink
  };

  return (
    // Card container for the Recent Activities section
    <Card className="mb-4 shadow-sm border-0">
      {/* Card header with section title and padding */}
      <Card.Header className="bg-white fw-bold fs-5 px-3 py-3">
        Recent Activities
      </Card.Header>

      {/* Card body with internal padding for content */}
      <Card.Body className="px-3 py-3">
        {/* Loop through each activity and render a row */}
        {activities.map((activity) => {
          // Dynamically select the icon component from lucide-react
          const IconComponent =
            (Icons[activity.icon as keyof typeof Icons] ??
              Icons.Activity) as React.FC<{ size?: number; color?: string }>;

          // Resolve the background color for the icon container
          const iconBgColor = bgColorMap[activity.iconColor] || "#f0f4f8";

          return (
            // Bootstrap row for each activity item
            <Row
              key={activity.id} // Unique key for React rendering
              className="align-items-center mb-3 pb-3 border-bottom"
            >
              {/* Left column: icon container */}
              <Col xs="auto">
                <div
                  className="rounded d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: iconBgColor, // Pastel background
                    width: "48px",                // Icon container width
                    height: "48px",               // Icon container height
                  }}
                  data-testid={`activity-icon-${activity.id}`} // For Jest testing
                >
                  <IconComponent size={24} color="#0d6efd" />
                </div>
              </Col>

              {/* Middle column: activity type and details */}
              <Col>
                <div className="fw-semibold">{activity.type}</div>
                <div className="text-muted small">{activity.details}</div>
              </Col>

              {/* Right column: timestamp */}
              <Col xs="auto" className="text-muted small text-end">
                {activity.time}
              </Col>
            </Row>
          );
        })}
      </Card.Body>
    </Card>
  );
};

// Export the component for use in dashboard layout
export default RecentActivities;