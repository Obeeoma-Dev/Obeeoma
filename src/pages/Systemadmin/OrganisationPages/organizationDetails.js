import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/organisationcomponents/OrganizationDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, ListGroup, ProgressBar, Spinner, } from 'react-bootstrap';
import Sidebar from '../../../components/admincomponents/adminsidebar';
import Header from '../../../components/admincomponents/adminheader';
import OrganizationCharts from '../../../components/admincomponents/organisationcomponents/organisation.chats';
// ✅ Component: OrganizationDetails
const OrganizationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // ✅ State for organization data and loading
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    // ✅ Simulated backend fetch (replace with real API call)
    useEffect(() => {
        setLoading(true);
        // Simulate async fetch with placeholder data
        setTimeout(() => {
            const placeholder = {
                name: 'Wellness Center Inc.',
                admin: 'Sarah Paul',
                clients: 245,
                programs: 11,
                lastActive: '2 hours ago',
                id: '000-001',
                subscription: 'Premium',
                status: 'Active',
                created: '2 years ago',
                engagement: {
                    anxiety: 78,
                    stress: 65,
                    sleep: 59,
                    mood: 72,
                },
                activity: [
                    'Subscription Renewed (2 days ago)',
                    'Monthly Report Generated (5 days ago)',
                ],
            };
            setOrg(placeholder);
            setLoading(false);
        }, 1000);
    }, [id]);
    // ✅ Loading state
    if (loading) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsxs(Container, { fluid: true, className: "p-5 text-center", children: [_jsx(Spinner, { animation: "border", variant: "primary" }), _jsx("p", { className: "mt-3", children: "Loading organization details..." })] })] })] }));
    }
    // ✅ Error state
    if (!org) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx(Container, { fluid: true, className: "p-5 text-danger", children: "Organization not found." })] })] }));
    }
    // ✅ Main layout
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsxs(Container, { fluid: true, className: "p-4 overflow-auto", children: [_jsx(Button, { variant: "outline-secondary", onClick: () => navigate('/system-admin/organizations'), className: "mb-4", children: "\u2190 Return to Overview" }), _jsxs("h3", { className: "text-success fw-bold mb-4", children: ["Organization Overview: ", org.name] }), _jsx(Card, { className: "shadow-sm mb-4", children: _jsx(Card.Body, { children: _jsxs(Row, { className: "gy-3", children: [_jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Total Clients:" }), " ", org.clients] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Active Programs:" }), " ", org.programs] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Last Active:" }), " ", org.lastActive] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Admin:" }), " ", org.admin] })] }) }) }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Organization Details" }), _jsxs(Card.Body, { children: [_jsxs(Row, { className: "gy-3", children: [_jsxs(Col, { md: 3, children: [_jsx("strong", { children: "ID:" }), " ", org.id] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Subscription:" }), " ", org.subscription] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Status:" }), " ", org.status] }), _jsxs(Col, { md: 3, children: [_jsx("strong", { children: "Created:" }), " ", org.created] })] }), _jsxs("div", { className: "mt-4 d-flex gap-2", children: [_jsx(Button, { variant: "outline-success", size: "sm", children: "Manage Subscription" }), _jsx(Button, { variant: "outline-primary", size: "sm", children: "Save Changes" })] })] })] }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Program Engagement (%)" }), _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Anxiety Management" }), _jsx(ProgressBar, { now: org.engagement.anxiety, label: `${org.engagement.anxiety}%`, variant: "info" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Stress Reduction" }), _jsx(ProgressBar, { now: org.engagement.stress, label: `${org.engagement.stress}%`, variant: "warning" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Sleep Improvement" }), _jsx(ProgressBar, { now: org.engagement.sleep, label: `${org.engagement.sleep}%`, variant: "success" })] }), _jsxs("div", { children: [_jsx("strong", { children: "Mood Enhancement" }), _jsx(ProgressBar, { now: org.engagement.mood, label: `${org.engagement.mood}%`, variant: "danger" })] })] })] }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Platform Usage (Last 6 Weeks)" }), _jsx(Card.Body, { children: _jsx(OrganizationCharts, {}) })] }), _jsxs(Card, { className: "shadow-sm", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Recent Activity" }), _jsx(Card.Body, { children: _jsx(ListGroup, { variant: "flush", children: org.activity.map((event, index) => (_jsx(ListGroup.Item, { children: event }, index))) }) })] })] })] })] }));
};
export default OrganizationDetails;
