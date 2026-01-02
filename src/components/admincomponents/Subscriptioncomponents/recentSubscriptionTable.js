import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table } from "react-bootstrap";
const RecentSubscriptionsTable = ({ subscriptions }) => {
    return (_jsx("div", { style: { overflowX: "auto" }, children: _jsxs(Table, { hover: true, style: { marginBottom: 0 }, children: [_jsx("thead", { style: { backgroundColor: "#f8f9fa" }, children: _jsxs("tr", { children: [_jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Organization" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Plan" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Employees" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Active Users" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Status" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Expiry Date" }), _jsx("th", { style: { padding: "1rem", fontWeight: "600", color: "#495057" }, children: "Actions" })] }) }), _jsx("tbody", { children: subscriptions.map((sub, index) => (_jsxs("tr", { style: { borderBottom: "1px solid #e9ecef" }, children: [_jsx("td", { style: { padding: "1rem", color: "#1a1a1a" }, children: sub.organization }), _jsx("td", { style: { padding: "1rem", color: "#6c757d" }, children: sub.plan }), _jsx("td", { style: { padding: "1rem", color: "#1a1a1a" }, children: sub.employees.toLocaleString() }), _jsxs("td", { style: { padding: "1rem", color: "#1a1a1a" }, children: [sub.activeUsers.toLocaleString(), " (", sub.activeUsersPercent, "%)"] }), _jsx("td", { style: { padding: "1rem" }, children: _jsx("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }, children: sub.status === "Active" ? (_jsxs(_Fragment, { children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "8", cy: "8", r: "6", stroke: "#3CB371", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M5 8l2 2 4-4", stroke: "#3CB371", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }), _jsx("span", { style: { color: "#3CB371", fontWeight: "500" }, children: "Active" })] })) : (_jsxs(_Fragment, { children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "8", cy: "8", r: "6", stroke: "#ff9800", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M8 4v4l3 2", stroke: "#ff9800", strokeWidth: "1.5", strokeLinecap: "round" })] }), _jsx("span", { style: { color: "#ff9800", fontWeight: "500" }, children: "Pending" })] })) }) }), _jsx("td", { style: { padding: "1rem", color: "#6c757d" }, children: sub.expiryDate }), _jsx("td", { style: { padding: "1rem" }, children: _jsxs("div", { style: { display: "flex", gap: "0.75rem" }, children: [_jsx("a", { href: "#", style: {
                                                color: "#3CB371",
                                                textDecoration: "none",
                                                fontSize: "0.875rem",
                                            }, onClick: (e) => {
                                                e.preventDefault();
                                                console.log(`View ${sub.organization}`);
                                            }, children: "View" }), _jsx("a", { href: "#", style: {
                                                color: "#3CB371",
                                                textDecoration: "none",
                                                fontSize: "0.875rem",
                                            }, onClick: (e) => {
                                                e.preventDefault();
                                                console.log(`Edit ${sub.organization}`);
                                            }, children: "Edit" }), _jsx("a", { href: "#", style: {
                                                color: "#dc3545",
                                                textDecoration: "none",
                                                fontSize: "0.875rem",
                                            }, onClick: (e) => {
                                                e.preventDefault();
                                                console.log(`Deactivate ${sub.organization}`);
                                            }, children: "Deactivate" })] }) })] }, index))) })] }) }));
};
export default RecentSubscriptionsTable;
