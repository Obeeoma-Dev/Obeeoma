import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FilterTabs = ({ activeFilter, onFilterChange, unreadCount, starredCount }) => {
    const filters = [
        { key: 'all', label: 'All' },
        { key: 'unread', label: 'Unread Notifications', badge: unreadCount },
        { key: 'starred', label: 'Starred Notifications', badge: starredCount }
    ];
    return (_jsx("div", { className: "mb-4", children: _jsx("div", { className: "d-flex flex-wrap gap-2", children: filters.map((filter) => (_jsxs("button", { className: `btn ${activeFilter === filter.key
                    ? 'btn-success'
                    : 'btn-outline-secondary'} position-relative`, onClick: () => onFilterChange(filter.key), children: [filter.label, filter.badge !== undefined && filter.badge > 0 && (_jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger", children: filter.badge }))] }, filter.key))) }) }));
};
export default FilterTabs;
