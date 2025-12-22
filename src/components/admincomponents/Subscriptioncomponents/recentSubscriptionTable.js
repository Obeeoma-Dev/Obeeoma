import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button } from "react-bootstrap";
const RecentSubscriptionsTable = ({ subscriptions }) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "Recent Subscriptions" }), _jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Organization" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Employees" }), _jsx("th", { children: "Start Date" }), _jsx("th", { children: "End Date" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: subscriptions.map((sub, index) => (_jsxs("tr", { children: [_jsx("td", { children: sub.organization }), _jsx("td", { children: sub.type }), _jsx("td", { children: sub.employees }), _jsx("td", { children: sub.startDate }), _jsx("td", { children: sub.endDate }), _jsx("td", { children: sub.status }), _jsx("td", { children: _jsx(Button, { variant: "outline-primary", size: "sm", children: "View" }) })] }, index))) })] })] }));
};
export default RecentSubscriptionsTable;
