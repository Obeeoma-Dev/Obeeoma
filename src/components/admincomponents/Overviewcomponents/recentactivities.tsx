import React from "react";
import { Card } from "react-bootstrap";
import * as Icons from "lucide-react";
import { ActivityItem as ActivityItemType } from "./admindashboard";


interface RecentActivitiesProps {
  activities: ActivityItemType[];
}

const iconColorMap: Record<string, string> = {
  "text-danger": "#dc3545",
  "text-primary": "#0d6efd",
  "text-warning": "#ffc107",
  "text-success": "#198754",
  "text-info": "#0dcaf0",
};


const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {

  return (

    <Card className="mb-4 shadow-sm border-0 h-100">
      {/* Card header */}
      <Card.Header
        className="bg-white fw-bold fs-5 px-4 py-3 border-0"
        style={{ fontFamily: "heading" }}
      >
        Recent Activities
      </Card.Header>

      {/* Card body containing the activity list */}
      <Card.Body className="px-4 py-3">
        {/* Vertical stack of activity rows using flex column and consistent gaps */}
        <div className="d-flex flex-column gap-0">
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
                <div
                  className="py-3 px-2 d-flex justify-content-between align-items-center"
                  style={{
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div className="d-flex align-items-center justify-content-between w-100">
                    {/* Left: Icon */}
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "#f0f5f2",
                        }}
                        data-testid={`activity-icon-${activity.id}`}
                      >
                        <IconComponent size={24} color={iconFgColor} />
                      </div>

                      {/* Middle: Type + Details */}
                      <div>
                        <div
                          className="fw-600 text-dark"
                          style={{ fontSize: "0.95rem", fontFamily: "body" }}
                        >
                          {activity.type}
                        </div>
                        <div
                          className="text-muted small"
                          style={{ fontSize: "0.85rem", fontFamily: "body" }}
                        >
                          {activity.details}
                        </div>
                      </div>
                    </div>

                    {/* Right: Time */}
                    <div
                      className="text-muted small text-nowrap ms-3"
                      style={{ fontSize: "0.8rem", fontFamily: "body" }}
                    >
                      {activity.time}
                    </div>
                  </div>
                </div>

                {/* Divider line below each activity except the last one */}
                {index < activities.length - 1 && (
                  <div
                    className="border-bottom"
                    style={{ borderColor: "#e9ecef" }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};


export default RecentActivities;
