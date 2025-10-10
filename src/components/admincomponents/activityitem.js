import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Icons from "lucide-react";
/**
 * ActivityItem component displays a single activity entry with icon, description, and timestamp
 * Used in the Recent Activities list to show system events
 */
const ActivityItem = ({ data }) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = Icons[data.icon] || Icons.Activity;
  return (
    // Container for the activity item with hover effect
    _jsxs("div", {
      className:
        "flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors group",
      children: [
        _jsxs("div", {
          className: "flex items-center gap-4 flex-1",
          children: [
            _jsx("div", {
              className: `${data.iconColor} p-2.5 rounded-lg`,
              children: _jsx(IconComponent, {
                className: "w-5 h-5 text-emerald-600",
              }),
            }),
            _jsxs("div", {
              className: "flex-1",
              children: [
                _jsx("div", {
                  className: "text-sm font-medium text-gray-900 mb-0.5",
                  children: data.type,
                }),
                _jsx("div", {
                  className: "text-sm text-gray-500",
                  children: data.details,
                }),
              ],
            }),
          ],
        }),
        _jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            _jsx("span", {
              className: "text-sm text-gray-500 whitespace-nowrap",
              children: data.time,
            }),
            _jsx("button", {
              className:
                "text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity",
              children: _jsx(Icons.ArrowRight, { className: "w-5 h-5" }),
            }),
            _jsx("button", {
              className: "text-gray-400 hover:text-gray-600",
              children: _jsx(Icons.MoreVertical, { className: "w-5 h-5" }),
            }),
          ],
        }),
      ],
    })
  );
};
export default ActivityItem;
