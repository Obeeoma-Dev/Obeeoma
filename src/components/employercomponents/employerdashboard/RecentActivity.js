import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RecentActivity = () => {
    // TODO: Replace with API call to fetch recent activities
    // Example: const { data: activities, loading } = useRecentActivities();
    const recentActivity = [
        {
            text: "A new wellness test was completed in",
            department: "Engineering",
            time: "2 hours ago",
        },
        {
            text: "Department Marketing completed monthly assessments",
            department: "",
            time: "1 day ago",
        },
        {
            text: "New wellness resources added to the platform",
            department: "",
            time: "2 days ago",
        },
    ];
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-0", children: "Recent Activity" }), _jsx("button", { className: "btn btn-link text-primary text-decoration-none", children: "View All" })] }), _jsx("div", { className: "list-group list-group-flush", children: recentActivity.map((activity, index) => (_jsx("div", { className: "list-group-item px-0 py-3 border-bottom-0", children: _jsxs("div", { className: "d-flex align-items-start gap-3", children: [_jsx("div", { className: "rounded-circle bg-primary mt-1 flex-shrink-0", style: { width: "8px", height: "8px" } }), _jsx("div", { className: "flex-grow-1", children: _jsxs("p", { className: "mb-0 small", children: [activity.text, " ", activity.department && (_jsx("span", { className: "fw-medium", children: activity.department }))] }) }), _jsx("span", { className: "text-muted small flex-shrink-0", children: activity.time })] }) }, index))) })] }) }));
};
export default RecentActivity;
