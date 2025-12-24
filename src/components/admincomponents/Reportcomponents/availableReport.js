import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListGroup, Card } from "react-bootstrap";
const AvailableReports = () => {
    // Placeholder list of reports
    const reports = [
        "Monthly Platform Usage Statistics",
        "All General Health Trends",
        "All Associated Interventions",
        "All Recommendation Effectiveness",
        "Hotline Activity Analysis",
    ];
    return (_jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: "Available Reports" }), _jsx(ListGroup, { variant: "flush", children: reports.map((report, index) => (_jsxs(ListGroup.Item, { children: ["\uD83D\uDCC4 ", report] }, index))) })] }));
};
export default AvailableReports;
