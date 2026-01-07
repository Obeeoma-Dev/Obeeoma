import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Badge, Card } from "react-bootstrap";
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
    {
        name: "Preston Corbett",
        organization: "WellnessCo",
        engagementRate: 67,
        pointsRedeemed: 870,
        lastActivity: "5h ago",
    },
];
// Helper function to determine engagement level icon
const getEngagementIcon = (rate) => {
    if (rate >= 80)
        return _jsx(FaFire, { className: "text-danger me-1", title: "High Engagement" });
    if (rate >= 50)
        return (_jsx(FaExclamationTriangle, { className: "text-warning me-1", title: "Medium Engagement" }));
    return _jsx(FaSnowflake, { className: "text-info me-1", title: "Low Engagement" });
};
// Helper function to determine status badge
const getStatusBadge = (rate) => {
    return rate >= 50 ? (_jsx(Badge, { pill: true, bg: "success", children: "Active" })) : (_jsx(Badge, { pill: true, bg: "secondary", children: "Low Engagement" }));
};
// helper for getting initials.
const getInitials = (fullName) => {
    const names = fullName.split(" ");
    return names
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};
// Main component
const PatientEngagementTable = () => {
    return (
    // Card provides visual containment and matches the dashboard layout
    _jsxs(Card, { className: "mb-4 shadow-sm", children: [_jsx(Card.Header, { className: "d-flex justify-content-between align-items-center", style: { fontFamily: "heading" }, children: _jsx("strong", { children: "Client Engagement Table" }) }), _jsx(Card.Body, { className: "p-2", children: _jsxs(Table, { hover: true, responsive: true, className: "align-middle mb-0 table-hover", children: [_jsx("thead", { className: "table-light text-muted small", style: { fontFamily: "heading" }, children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Organization" }), _jsx("th", { children: "Engagement" }), _jsx("th", { children: "Engagement Rate (%)" }), _jsx("th", { children: "Points Redeemed" }), _jsx("th", { children: "Last Activity" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: patients.map((patient) => (
                            // Use stable key (name assumed unique for demo data)
                            _jsxs("tr", { children: [_jsxs("td", { className: "d-flex align-items-center", children: [_jsx("span", { className: "rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center me-2", style: { width: 32, height: 32 }, children: getInitials(patient.name) }), patient.name] }), _jsx("td", { children: patient.organization }), _jsx("td", { className: "fw-medium", children: _jsxs("span", { className: "d-inline-flex align-items-center", children: [getEngagementIcon(patient.engagementRate), patient.engagementRate >= 80
                                                    ? "High"
                                                    : patient.engagementRate >= 50
                                                        ? "Medium"
                                                        : "Low"] }) }), _jsxs("td", { className: "fw-semibold", children: [patient.engagementRate, "%"] }), _jsx("td", { style: { fontFamily: "body" }, children: patient.pointsRedeemed.toLocaleString() }), _jsx("td", { children: patient.lastActivity }), _jsx("td", { children: getStatusBadge(patient.engagementRate) })] }, patient.name))) })] }) })] }));
};
export default PatientEngagementTable;
