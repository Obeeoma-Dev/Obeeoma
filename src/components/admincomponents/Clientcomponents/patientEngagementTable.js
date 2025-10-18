import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Badge } from "react-bootstrap";
import { FaFire, FaExclamationTriangle, FaSnowflake } from "react-icons/fa";
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
        engagementRate: 45,
        pointsRedeemed: 1100,
        lastActivity: "1h ago",
    },
];
// Helper function to determine engagement level icon
const getEngagementIcon = (rate) => {
    if (rate >= 80)
        return _jsx(FaFire, { className: "text-danger me-1", title: "High Engagement" });
    if (rate >= 50)
        return _jsx(FaExclamationTriangle, { className: "text-warning me-1", title: "Medium Engagement" });
    return _jsx(FaSnowflake, { className: "text-info me-1", title: "Low Engagement" });
};
// Helper function to determine status badge
const getStatusBadge = (rate) => {
    return rate >= 50 ? (_jsx(Badge, { bg: "success", children: "Active" })) : (_jsx(Badge, { bg: "secondary", children: "Low Engagement" }));
};
// Main component
const PatientEngagementTable = () => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { className: "mb-3", children: "Client Engagement Table" }), _jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, className: "align-middle", children: [_jsx("thead", { className: "table-light", children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Organization" }), _jsx("th", { children: "Engagement" }), _jsx("th", { children: "Engagement Rate (%)" }), _jsx("th", { children: "Points Redeemed" }), _jsx("th", { children: "Last Activity" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: patients.map((patient) => (_jsxs("tr", { children: [_jsx("td", { children: patient.name }), _jsx("td", { children: patient.organization }), _jsxs("td", { children: [getEngagementIcon(patient.engagementRate), patient.engagementRate >= 80
                                            ? "High"
                                            : patient.engagementRate >= 50
                                                ? "Medium"
                                                : "Low"] }), _jsxs("td", { children: [patient.engagementRate, "%"] }), _jsx("td", { children: patient.pointsRedeemed.toLocaleString() }), _jsx("td", { children: patient.lastActivity }), _jsx("td", { children: getStatusBadge(patient.engagementRate) })] }, patient.name))) })] })] }));
};
export default PatientEngagementTable;
