// Import React and required Bootstrap components
import React from "react";
import { Card, Table } from "react-bootstrap";

// Import all Lucide icons as a dynamic map
import * as Icons from "lucide-react";

// Import the ActivityItem type from shared dashboard types
import { ActivityItem as ActivityItemType } from "./admindashboard";

// Define props interface for the RecentActivities component
interface RecentActivitiesProps {
  activities: ActivityItemType[]; // Array of activity items to display
}

// Define a mapping of Bootstrap-style color keys to pastel hex codes
const bgColorMap: Record<string, string> = {
  "bg-light": "#f0f4f8",     // Neutral gray
  "bg-success": "#e6f4ea",   // Soft green
  "bg-info": "#e7f1ff",      // Soft blue
  "bg-warning": "#fff4e5",   // Soft orange
  "bg-danger": "#fde7f3",    // Soft pink
};

// Define the RecentActivities component
const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    // Card container for the Recent Activities section
    <Card className="mb-4 shadow-sm border-0">
      {/* Card header with section title */}
      <Card.Header className="bg-white fw-bold fs-5 px-3 py-3">
        Recent Activities
      </Card.Header>

      {/* Card body containing the activity table */}
      <Card.Body className="px-3 py-3">
        {/* Responsive, borderless Bootstrap table */}
        <Table responsive borderless className="align-middle table-sm">
          {/* Table header row */}
          <thead className="bg-body-tertiary border-bottom">
            <tr className="text-dark fw-semibold small">
              <th> Activity Type </th>
              <th> Details </th>
              <th> Time </th>
              <th> Action </th>
            </tr>
          </thead>

          {/* Table body with mapped activity rows */}
          <tbody>
            {activities.map((activity) => {
              // Dynamically select icon from Lucide or fallback to generic Activity icon
              const IconComponent =
                (Icons[activity.icon as keyof typeof Icons] ??
                  Icons.Activity) as React.FC<{ size?: number; color?: string }>;

              // Resolve pastel background color for icon container
              const iconBgColor = bgColorMap[activity.iconColor] || "#f0f4f8";

              return (
                // Render a table row for each activity
                <tr key={activity.id}>
                  {/* First column: icon + activity type */}
                  <td>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      {/* Icon container */}
                      <div
                        className="rounded d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: iconBgColor,
                          width: "40px",
                          height: "40px",
                        }}
                        data-testid={`activity-icon-${activity.id}`} // For Jest testing
                      >
                        <IconComponent size={18} color="#3CB371" />
                      </div>

                      {/* Activity type label */}
                      <span className="fw-semibold">{activity.type}</span>
                    </div>
                  </td>

                  {/* Second column: activity details */}
                  <td className="text-muted small">{activity.details}</td>

                  {/* Third column: timestamp, right-aligned */}
                  <td className="text-muted small">{activity.time}</td>

                  {/* Action column — three-dot icon */}
                  <td className="text-center">
                    <Icons.MoreVertical size={18} color="#6c757d" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

// Export the component for use in dashboard layout
export default RecentActivities;