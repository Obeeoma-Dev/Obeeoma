import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const PRIMARY_COLOR = "#3CB371"; // Defined the custom color
const RecentActivity = ({ activities }) => {
    const defaultActivities = [
        {
            text: "A new invitee has joined the platform",
            department: "Engineering",
            time: "2 hours ago",
        },
        {
            text: "Marketing Department has completed monthly catch up",
            department: "",
            time: "1 day ago",
        },
        {
            text: "New wellness resources added to the platform",
            department: "",
            time: "2 days ago",
        },
    ];
    const recentActivity = activities?.length ? activities : defaultActivities;
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4", children: [_jsxs("h3", { className: "h5 fw-semibold mb-0", style: { fontFamily: "heading" }, children: [" ", "Recent Activity"] }), _jsx("button", { className: "btn btn-link text-decoration-none", style: {
                                fontFamily: "body", // FONT CHANGE 2: Body font
                                color: PRIMARY_COLOR, // COLOR CHANGE 1: View All text
                            }, children: "View All" })] }), _jsxs("div", { className: "list-group list-group-flush", style: { fontFamily: "body" }, children: [" ", recentActivity.map((activity, index) => (_jsx("div", { className: "list-group-item px-0 py-3 border-bottom-0", children: _jsxs("div", { className: "d-flex align-items-start gap-3", children: [_jsx("div", { className: "rounded-circle mt-1 flex-shrink-0", 
                                        // Removed bg-primary class, ensured PRIMARY_COLOR style is used
                                        style: { width: "8px", height: "8px", backgroundColor: PRIMARY_COLOR } }), _jsx("div", { className: "flex-grow-1", children: _jsxs("p", { className: "mb-0 small", children: [activity.text, " ", activity.department && (_jsx("span", { className: "fw-medium", children: activity.department }))] }) }), _jsx("span", { className: "text-muted small flex-shrink-0", children: activity.time })] }) }, index)))] })] }) }));
};
export default RecentActivity;
