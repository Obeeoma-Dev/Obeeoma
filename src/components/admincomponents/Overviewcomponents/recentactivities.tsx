import React from "react";
import { Card } from "react-bootstrap";
import * as Icons from "lucide-react";
import { ActivityItem as ActivityItemType } from "./admindashboard";

// Define props interface for the RecentActivities component (kept as-is)
interface RecentActivitiesProps {
  activities: ActivityItemType[]; // Array of activity items to display
}

const iconColorMap: Record<string, string> = {
  "text-danger": "#dc3545",
  "text-primary": "#0d6efd",
  "text-warning": "#ffc107",
  "text-success": "#198754",
  "text-info": "#0dcaf0",
};

// Define the RecentActivities component (kept name and structure)
const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  // Return the card layout that wraps recent activities
  return (
    // Card container for the Recent Activities section (kept class names)
    <Card className="mb-4 shadow-sm border-0">
      {/* Card header with section title (kept the same) */}
      <Card.Header className="bg-white fw-bold fs-5 px-3 py-3 border-0">
        Recent Activities
      </Card.Header>

      {/* Card body containing the activity list (replaces the Table usage) */}
      <Card.Body className="px-3 py-3">
        {/* Vertical stack of activity rows using flex column and consistent gaps */}
        <div className="d-flex flex-column gap-3">
          {/* Map through the activities to render each item row */}
          {activities.map((activity, index) => {
            const IconComponent = (Icons[activity.icon as keyof typeof Icons] ??
              Icons.Activity) as React.FC<{
              size?: number;
              color?: string;
            }>;

            const iconFgColor = iconColorMap[activity.iconColor] || "#3CB371";

            return (
              <React.Fragment key={activity.id}>
                {/* Activity row */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    {/* Left: Icon */}
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                        data-testid={`activity-icon-${activity.id}`}
                      >
                        <IconComponent size={22} color={iconFgColor} />
                      </div>

                      {/* Middle: Type + Details */}
                      <div>
                        <div className="fw-semibold">{activity.type}</div>
                        <div className="text-muted small">
                          {activity.details}
                        </div>
                      </div>
                    </div>

                    {/* Right: Time */}
                    <div className="text-muted small text-nowrap">
                      {activity.time}
                    </div>
                  </div>

                  <div className="text-end">
                    <Icons.ChevronRight size={20} color="#6c757d" />
                  </div>
                </div>

                {/* Divider line below each activity except the last one */}
                {index < activities.length - 1 && (
                  <div className="border-bottom border-secondary"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

// Export the component for use in dashboard layout (kept as-is)
export default RecentActivities;
