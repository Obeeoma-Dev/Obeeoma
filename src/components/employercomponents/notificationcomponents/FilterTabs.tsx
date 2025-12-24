import React from "react";
import { NotificationFilter } from "../../../types/employernotification.types";

interface FilterTabsProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  unreadCount: number;
  starredCount: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  unreadCount,
  starredCount,
}) => {
  const filters: { key: NotificationFilter; label: string; badge?: number }[] =
    [
      { key: "all", label: "All" },
      { key: "unread", label: "Unread Notifications", badge: unreadCount },
      { key: "starred", label: "Starred Notifications", badge: starredCount },
    ];

  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`btn position-relative`}
            style={{
              backgroundColor:
                activeFilter === filter.key ? "#22C55E" : undefined,
              borderColor: activeFilter === filter.key ? "#22C55E" : undefined,
              color: activeFilter === filter.key ? "white" : undefined,
            }}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
            {filter.badge !== undefined && filter.badge > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {filter.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
