// Import React and required Bootstrap components
import React from "react";
import { Card, Table } from "react-bootstrap";

// Import the ActivityItem component and its type
import ActivityItem from "./activityitem";
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
 * Uses React Bootstrap Card and Table layout
 */
const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    // Card container for the section
    <Card className="mb-4 shadow-sm border-0">
      {/* Card header with section title */}
      <Card.Header className="bg-white fw-bold fs-5">
        Recent Activities
      </Card.Header>

      {/* Card body containing the table and activity items */}
      <Card.Body>
        {/* Table header row */}
        <Table borderless responsive className="mb-0">
          <thead>
            <tr>
              {/* Column headers */}
              <th className="text-muted text-uppercase small">Activity Type</th>
              <th className="text-muted text-uppercase small">Details</th>
              <th className="text-muted text-uppercase small text-end">Time</th>
            </tr>
          </thead>
        </Table>

        {/* List of activity items rendered below the header */}
        <div>
          {activities.map((activity) => (
            <ActivityItem key={activity.id} data={activity} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

// Export the component for use in the dashboard layout
export default RecentActivities;
