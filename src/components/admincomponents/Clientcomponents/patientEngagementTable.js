import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "react-bootstrap";
// Sample patient data (can be replaced with props or API)
const patients = [
    {
        name: "Madison Carano",
        organization: "HealthOne",
        engagementRate: 92,
        pointsRedeemed: 1200,
        lastActivity: "2h ago",
    },
    {
        name: "William Johnson",
        organization: "MediCare",
        engagementRate: 88,
        pointsRedeemed: 980,
        lastActivity: "3h ago",
    },
    {
        name: "Vanessa Jefferson",
        organization: "HealthOne",
        engagementRate: 85,
        pointsRedeemed: 1100,
        lastActivity: "1h ago",
    },
];
// Define the component
const PatientEngagementTable = () => {
    return (_jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Organization" }), _jsx("th", { children: "Engagement Rate (%)" }), _jsx("th", { children: "Points Redeemed" }), _jsx("th", { children: "Last Activity" })] }) }), _jsx("tbody", { children: patients.map((patient) => (_jsxs("tr", { children: [_jsx("td", { children: patient.name }), _jsx("td", { children: patient.organization }), _jsx("td", { children: patient.engagementRate }), _jsx("td", { children: patient.pointsRedeemed }), _jsx("td", { children: patient.lastActivity })] }, patient.name))) })] }));
};
export default PatientEngagementTable;
