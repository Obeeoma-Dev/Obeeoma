import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "react-bootstrap";
// Placeholder call logs
const callLogs = [
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
const CallLogTable = () => {
    return (_jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, className: "mb-4", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Time" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Reason" }), _jsx("th", { children: "Operator" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: callLogs.map((log, index) => (_jsxs("tr", { children: [_jsx("td", { children: log.time }), _jsx("td", { children: log.date }), _jsx("td", { children: log.reason }), _jsx("td", { children: log.operator }), _jsx("td", { children: log.status })] }, index))) })] }));
};
export default CallLogTable;
