import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Badge } from "react-bootstrap";
import { AlertTriangle, Clock } from "lucide-react";
// Sample data
const cases = [
    {
        id: "04567",
        reason: "Abuse",
        status: "Pending",
        assignedTo: "John Smith",
        type: "critical",
    },
    {
        id: "04568",
        reason: "Urgent Referral",
        status: "Referred",
        assignedTo: "Emily Johnson",
        type: "warning",
    },
];
// Styles for the card and cases
const styles = {
    card: { padding: "1.5rem", height: "100%" },
    caseContainer: (type) => ({
        padding: "1rem",
        borderLeft: `4px solid ${type === "critical" ? "#dc3545" : "#ffc107"}`,
        backgroundColor: type === "critical" ? "#f8d7da" : "#fff3cd",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
    }),
    caseTitle: (type) => ({
        fontSize: "0.875rem",
        fontWeight: "bold",
        color: type === "critical" ? "#842029" : "#664d03",
    }),
    caseDescription: (type) => ({
        fontSize: "0.875rem",
        color: type === "critical" ? "#842029" : "#664d03",
        marginTop: "0.25rem",
    }),
    metaText: { fontSize: "0.75rem", color: "#6c757d" },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1.5rem",
    },
    metaWrapper: { display: "flex", alignItems: "center", gap: "0.25rem" },
};
// Main component
const CriticalCases = () => {
    return (_jsxs(Card, { style: styles.card, className: "mb-4", children: [_jsxs("div", { style: styles.header, children: [_jsx(AlertTriangle, { size: 20, color: "#ffc107" }), _jsx("h5", { style: { margin: 0, fontWeight: 600, fontFamily: "heading" }, children: "Critical Cases" })] }), _jsx("div", { children: cases.map((c) => (_jsx("div", { style: styles.caseContainer(c.type), children: _jsxs("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            fontFamily: "body",
                        }, children: [_jsxs("div", { children: [_jsxs("span", { style: styles.caseTitle(c.type), children: ["Case ID: ", c.id] }), _jsxs("div", { style: styles.metaWrapper, children: [_jsx(Clock, { size: 12, style: { marginRight: "0.25rem" } }), _jsx("span", { style: styles.metaText, children: c.reason }), _jsx("span", { style: { ...styles.metaText, margin: "0 0.25rem" }, children: "\u2022" }), _jsxs("span", { style: styles.metaText, children: ["Assigned to: ", c.assignedTo] })] })] }), _jsx(Badge, { bg: c.type === "critical" ? "danger" : "warning", children: c.status })] }) }, c.id))) })] }));
};
export default CriticalCases;
