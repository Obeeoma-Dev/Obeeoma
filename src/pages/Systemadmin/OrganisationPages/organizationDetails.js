import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, ListGroup } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";
// Mock data for demonstration
const organizationData = {
    "1": {
        name: "Wellness Center Inc.",
        admin: "Sarah Paul",
        clients: 284,
        programs: 12,
        lastActive: "2 hours ago",
        id: "000-001",
        subscription: "Premium",
        status: "Active",
        created: "2 years ago",
        engagement: {
            anxiety: 78,
            stress: 65,
            crisis: 52,
        },
        activity: [
            "Subscription Renewed (2 hours ago)",
            "Monthly Report Generated (2 hours ago)",
        ],
    },
    // Add more organizations here if needed
};
const OrganizationDetails = () => {
    // Extract the organization ID from the route
    const { id } = useParams();
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // Validate the ID and fetch organization data
    if (!id || !organizationData[id]) {
        return _jsx("p", { className: "text-danger", children: "Organization not found." });
    }
    // Access the organization object
    const org = organizationData[id];
    return (
    // Root container with full viewport height and horizontal layout
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsxs(Container, { fluid: true, className: "p-4", children: [_jsx(Button, { variant: "outline-secondary", onClick: () => navigate("/system-admin/organizations"), className: "mb-3", children: "\u2190 Return to Overview" }), _jsxs("h3", { className: "text-success mb-4", children: ["Organization: ", org.name] }), _jsx(Card, { className: "mb-4", children: _jsx(Card.Body, { children: _jsxs(Row, { children: [_jsxs(Col, { children: [_jsx("strong", { children: "Admin:" }), " ", org.admin] }), _jsxs(Col, { children: [_jsx("strong", { children: "Clients:" }), " ", org.clients] }), _jsxs(Col, { children: [_jsx("strong", { children: "Programs:" }), " ", org.programs] }), _jsxs(Col, { children: [_jsx("strong", { children: "Last Active:" }), " ", org.lastActive] })] }) }) }), _jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: "Wellness Center Inc. Details" }), _jsxs(Card.Body, { children: [_jsxs(Row, { children: [_jsxs(Col, { children: [_jsx("strong", { children: "ID:" }), " ", org.id] }), _jsxs(Col, { children: [_jsx("strong", { children: "Subscription Plan:" }), " ", org.subscription] }), _jsxs(Col, { children: [_jsx("strong", { children: "Status:" }), " ", org.status] }), _jsxs(Col, { children: [_jsx("strong", { children: "Created:" }), " ", org.created] })] }), _jsx(Row, { className: "mt-3", children: _jsxs(Col, { children: [_jsx(Button, { variant: "outline-success", size: "sm", children: "Program Settings" }), " ", _jsx(Button, { variant: "outline-danger", size: "sm", children: "Delete Organization" })] }) })] })] }), _jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: "Program Engagement (%)" }), _jsx(Card.Body, { children: _jsxs("ul", { children: [_jsxs("li", { children: ["Anxiety Management Series: ", org.engagement.anxiety, "%"] }), _jsxs("li", { children: ["Stress Reduction: ", org.engagement.stress, "%"] }), _jsxs("li", { children: ["Crisis Support: ", org.engagement.crisis, "%"] })] }) })] }), _jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: "Platform Usage & Distribution" }), _jsx(Card.Body, { children: _jsx(OrganizationCharts, {}) })] }), _jsxs(Card, { children: [_jsx(Card.Header, { children: "Recent Activity" }), _jsx(Card.Body, { children: _jsx(ListGroup, { variant: "flush", children: org.activity.map((event, index) => (_jsx(ListGroup.Item, { children: event }, index))) }) })] })] })] })] }));
};
export default OrganizationDetails;
