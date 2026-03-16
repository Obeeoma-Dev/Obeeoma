import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { CheckCircle2, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptions } from "./../../../store/slices/subscriptionSlice";
const RecentSubscriptionsTable = ({ subscriptions: propSubscriptions }) => {
    const dispatch = useDispatch();
    // Connect to Redux state
    const { items: reduxItems, loading, error } = useSelector((state) => state.Subscription);
    // Fetch data on component mount if no prop is provided
    useEffect(() => {
        if (!propSubscriptions) {
            dispatch(fetchSubscriptions());
        }
    }, [dispatch, propSubscriptions]);
    // Use prop subscriptions if provided, otherwise use Redux data
    const items = propSubscriptions || reduxItems;
    if (loading && !propSubscriptions) {
        return (_jsxs("div", { className: "text-center p-5", children: [_jsx(Spinner, { animation: "border", variant: "success" }), _jsx("p", { className: "mt-2 text-muted", children: "Fetching Paystack subscribers..." })] }));
    }
    if (error && !propSubscriptions) {
        return _jsxs(Alert, { variant: "danger", className: "m-4", children: ["Error: ", error] });
    }
    return (_jsxs(Table, { responsive: true, className: "mb-0", children: [_jsx("thead", { className: "bg-light", style: { fontFamily: "heading" }, children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Organization" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Plan" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Employees" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Active Users" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Status" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Expiry Date" }), _jsx("th", { className: "px-4 py-3 text-muted small fw-semibold", children: "Actions" })] }) }), _jsx("tbody", { children: items.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "text-center py-4", children: "No subscribers found." }) })) : (items.map((sub, index) => (_jsxs("tr", { className: "border-bottom", style: { fontFamily: "body" }, children: [_jsx("td", { className: "px-4 py-3", children: sub.organization }), _jsx("td", { className: "px-4 py-3", children: sub.plan }), _jsx("td", { className: "px-4 py-3", children: sub.employees }), _jsxs("td", { className: "px-4 py-3", children: [sub.activeUsers, " (", sub.activeUsersPercentage, "%)"] }), _jsx("td", { className: "px-4 py-3", children: sub.status === "Active" ? (_jsxs("span", { className: "d-flex align-items-center text-success", children: [_jsx(CheckCircle2, { size: 16, className: "me-1" }), " Active"] })) : (_jsxs("span", { className: "d-flex align-items-center text-warning", children: [_jsx(Clock, { size: 16, className: "me-1" }), " Pending"] })) }), _jsx("td", { className: "px-4 py-3", children: sub.expiryDate }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { className: "btn btn-link p-0 text-success text-decoration-none small", children: "View" }), _jsx("button", { className: "btn btn-link p-0 text-success text-decoration-none small", children: "Edit" }), _jsx("button", { className: "btn btn-link p-0 text-danger text-decoration-none small", children: "Deactivate" })] }) })] }, index)))) })] }));
};
export default RecentSubscriptionsTable;
