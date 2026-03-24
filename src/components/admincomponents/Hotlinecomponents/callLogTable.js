import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Card, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Search, Filter, MoreVertical } from "lucide-react";
const defaultCallLogs = [
    {
        time: "11:00 AM",
        date: "12/04/2023",
        reason: "Anxiety",
        operator: "John Smith",
        status: "Missed",
    },
    {
        time: "12:30 PM",
        date: "12/04/2023",
        reason: "Depression",
        operator: "Emily Brown",
        status: "Completed",
    },
    {
        time: "2:00 PM",
        date: "12/04/2023",
        reason: "Grief",
        operator: "Michael Jones",
        status: "Ongoing",
    },
];
const CallLogTable = ({ logs }) => {
    const callLogs = Array.isArray(logs) && logs.length > 0 ? logs : defaultCallLogs;
    return (_jsxs(Card, { className: "p-4 mb-4", children: [_jsxs("div", { className: "d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mb-4", children: [_jsxs(InputGroup, { style: { maxWidth: "320px" }, children: [_jsx(InputGroup.Text, { children: _jsx(Search, { size: 16 }) }), _jsx(Form.Control, { type: "text", placeholder: "Search by reason or operator..." })] }), _jsxs(Button, { variant: "outline-secondary", size: "sm", className: "d-flex align-items-center gap-2", children: [_jsx(Filter, { size: 16 }), "Filter"] })] }), _jsx("div", { className: "table-responsive", children: _jsxs(Table, { hover: true, borderless: true, className: "align-middle", children: [_jsx("thead", { className: "text-uppercase text-muted small", children: _jsxs("tr", { children: [_jsx("th", { children: "Time" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Reason" }), _jsx("th", { children: "Operator" }), _jsx("th", { children: "Status" }), _jsx("th", { className: "text-end", children: "Actions" })] }) }), _jsx("tbody", { children: callLogs.map((log, index) => (_jsxs("tr", { children: [_jsx("td", { className: "fw-semibold", children: log.time }), _jsx("td", { className: "text-muted", children: log.date }), _jsx("td", { children: log.reason }), _jsx("td", { className: "text-muted", children: log.operator }), _jsx("td", { children: _jsx(Badge, { bg: log.status === "Completed"
                                                ? "success"
                                                : log.status === "Ongoing"
                                                    ? "warning"
                                                    : "secondary", children: log.status }) }), _jsx("td", { className: "text-end", children: _jsx(Button, { variant: "link", className: "text-muted p-0", "aria-label": "More actions", children: _jsx(MoreVertical, { size: 18 }) }) })] }, index))) })] }) })] }));
};
export default CallLogTable;
