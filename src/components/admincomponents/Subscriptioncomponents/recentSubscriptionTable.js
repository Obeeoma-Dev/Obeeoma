import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { CheckCircle2 } from 'lucide-react';
/**
 * RecentSubscriptionsTable
 *
 * Renders a subscriptions table visually identical to the reference design.
 * Designed to be placed inside <Card.Body className="p-0" />.
 */
const RecentSubscriptionsTable = ({ subscriptions }) => {
    return (_jsxs(Card, { className: "border-0 rounded-0", children: [_jsxs(Card.Header, { className: "bg-white", children: [_jsx("h5", { className: "mb-1", children: "Recent Subscriptions" }), _jsx("p", { className: "text-muted mb-0", children: "View and manage organization subscriptions in a table below" })] }), _jsxs(Table, { responsive: true, hover: true, className: "mb-0 align-middle", children: [_jsx("thead", { className: "table-light", children: _jsxs("tr", { children: [_jsx("th", { children: "AUTO ORGANIZATION" }), _jsx("th", { children: "ENTERPRISE" }), _jsx("th", { children: "MRR" }), _jsx("th", { children: "SUBSCRIBERS" }), _jsx("th", { children: "STATUS" }), _jsx("th", { children: "RENEWAL DATE" }), _jsx("th", { children: "STATUS" })] }) }), _jsx("tbody", { children: subscriptions.map((sub) => (_jsxs("tr", { children: [_jsx("td", { className: "fw-medium", children: sub.organization }), _jsx("td", { children: sub.plan }), _jsx("td", { className: "fw-semibold", children: sub.mrr }), _jsx("td", { children: sub.subscribers }), _jsx("td", { children: _jsxs(Badge, { bg: "success", className: "d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill", children: [_jsx(CheckCircle2, { size: 12 }), "Active"] }) }), _jsx("td", { children: sub.renewalDate }), _jsx("td", { children: _jsx(Badge, { bg: sub.badgeVariant, className: "px-3 py-1 rounded-pill fw-medium", children: sub.badge }) })] }, `${sub.organization}-${sub.renewalDate}`))) })] }), _jsx(Card.Footer, { className: "bg-white text-center", children: _jsx(Button, { variant: "link", className: "fw-medium text-success", children: "View all \u2192" }) })] }));
};
export default RecentSubscriptionsTable;
