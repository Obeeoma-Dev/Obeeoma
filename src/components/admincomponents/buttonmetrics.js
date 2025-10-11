import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Button } from "react-bootstrap";
// Import icons from lucide-react
import * as Icons from "lucide-react";
/**
 * BottomMetrics component displays four metric cards at the bottom of the dashboard
 * Each card shows a key metric with a link to view more details
 */
const BottomMetrics = ({ metrics }) => {
  return (
    // Section wrapper with bottom margin
    _jsx("section", {
      className: "mb-4",
      children: _jsx(Row, {
        className: "gy-4",
        children: metrics.map((metric) => {
          // Dynamically get the icon component from lucide-react
          const IconComponent = Icons[metric.icon] ?? Icons.Activity;
          // Define Bootstrap contextual color
          const colorMap = {
            emerald: "#059669",
            blue: "#0d6efd",
            purple: "#6f42c1",
            pink: "#d63384",
          };
          // Fallback to emerald if color not found
          const iconColor = colorMap[metric.color] || colorMap.emerald;
          return (
            // Responsive column for each metric card
            _jsx(
              Col,
              {
                xs: 12,
                md: 6,
                lg: 3,
                children: _jsx(Card, {
                  className: "shadow-sm border-0 h-100",
                  children: _jsxs(Card.Body, {
                    children: [
                      _jsxs("div", {
                        className: "d-flex align-items-start gap-3 mb-3",
                        children: [
                          _jsx("div", {
                            className:
                              "rounded p-2 d-flex align-items-center justify-content-center",
                            style: {
                              backgroundColor: "#e6f4ea",
                              width: "40px",
                              height: "40px",
                            },
                            children: _jsx(IconComponent, {
                              size: 20,
                              color: iconColor,
                            }),
                          }),
                          _jsx("div", {
                            children: _jsx("h6", {
                              className: "text-muted mb-0",
                              children: metric.title,
                            }),
                          }),
                        ],
                      }),
                      _jsx("h3", {
                        className: "fw-bold mb-2",
                        children: metric.value,
                      }),
                      _jsx("p", {
                        className: "text-muted small mb-3",
                        children: metric.subtitle,
                      }),
                      _jsxs(Button, {
                        variant: "link",
                        className:
                          "p-0 text-success d-flex align-items-center gap-2",
                        children: [
                          _jsx("span", { children: metric.linkText }),
                          _jsx(Icons.ArrowRight, { size: 16 }),
                        ],
                      }),
                    ],
                  }),
                }),
              },
              metric.id,
            )
          );
        }),
      }),
    })
  );
};
// Export the component for use in the dashboard layout
export default BottomMetrics;
