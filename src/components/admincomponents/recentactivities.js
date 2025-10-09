import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Table } from "react-bootstrap";
// Import the ActivityItem component and its type
import ActivityItem from "./activityitem";
/**
 * RecentActivities component displays a list of recent system activities
 * Uses React Bootstrap Card and Table layout
 */
const RecentActivities = ({ activities }) => {
  return (
    // Card container for the section
    _jsxs(Card, {
      className: "mb-4 shadow-sm border-0",
      children: [
        _jsx(Card.Header, {
          className: "bg-white fw-bold fs-5",
          children: "Recent Activities",
        }),
        _jsxs(Card.Body, {
          children: [
            _jsx(Table, {
              borderless: true,
              responsive: true,
              className: "mb-0",
              children: _jsx("thead", {
                children: _jsxs("tr", {
                  children: [
                    _jsx("th", {
                      className: "text-muted text-uppercase small",
                      children: "Activity Type",
                    }),
                    _jsx("th", {
                      className: "text-muted text-uppercase small",
                      children: "Details",
                    }),
                    _jsx("th", {
                      className: "text-muted text-uppercase small text-end",
                      children: "Time",
                    }),
                  ],
                }),
              }),
            }),
            _jsx("div", {
              children: activities.map((activity) =>
                _jsx(ActivityItem, { data: activity }, activity.id),
              ),
            }),
          ],
        }),
      ],
    })
  );
};
// Export the component for use in the dashboard layout
export default RecentActivities;
