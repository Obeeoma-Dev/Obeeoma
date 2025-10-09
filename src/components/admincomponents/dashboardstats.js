import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
// Import the StatCard component and its data type
import StatCard from "./statCard";
/**
 * DashboardStats component displays top-level metrics
 * Uses React Bootstrap grid layout to render StatCard components
 */
const DashboardStats = ({ stats }) => {
  return (
    // Section wrapper for dashboard overview
    _jsxs("section", {
      className: "mb-4",
      children: [
        _jsx("h2", {
          className: "fw-bold fs-4 text-dark mb-4",
          children: "Dashboard Overview",
        }),
        _jsx(Row, {
          className: "gy-4",
          children: stats.map((stat) =>
            _jsx(
              Col,
              {
                xs: 12,
                md: 6,
                lg: 3,
                children: _jsx(StatCard, { data: stat }),
              },
              stat.id,
            ),
          ),
        }),
      ],
    })
  );
};
// Export the component for use in the dashboard layout
export default DashboardStats;
