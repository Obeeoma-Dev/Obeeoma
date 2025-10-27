import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationStats from "../../../components/admincomponents/organisationcomponents/OrganisationStats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";
/**
 * Sample organization data for table display.
 * Will be replaced with backend data later.
 */
const mockOrganizations = [
    {
        id: "1",
        name: "Wellness Center Inc.",
        clients: 284,
        programs: 12,
        status: "Active",
        lastActive: "2 hours ago",
    },
    {
        id: "2",
        name: "Community Mental Health",
        clients: 194,
        programs: 8,
        status: "Active",
        lastActive: "3 hours ago",
    },
    {
        id: "3",
        name: "Urban Outreach",
        clients: 134,
        programs: 6,
        status: "Inactive",
        lastActive: "2 days ago",
    },
];
/**
 * Sample stat data for top-level metrics.
 * Moved from OrganizationStats component to here.
 */
const mockStats = [
    {
        id: "1",
        title: "Organizations",
        value: "42",
        subtitle: "Active organizations",
        linkText: "View all organizations",
        icon: "Building2",
        color: "emerald",
    },
    {
        id: "2",
        title: "AI Recommendations",
        value: "1,245",
        subtitle: "Reviewed today",
        linkText: "View recommendations",
        icon: "Brain",
        color: "blue",
    },
    {
        id: "3",
        title: "Hotline",
        value: "324",
        subtitle: "Calls received",
        linkText: "View hotline logs",
        icon: "PhoneCall",
        color: "purple",
    },
    {
        id: "4",
        title: "Subscriptions",
        value: "$25.8K",
        subtitle: "Monthly revenue",
        linkText: "View subscriptions",
        icon: "CreditCard",
        color: "pink",
    },
];
/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 */
const OrganizationPage = () => {
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(OrganizationStats, { stats: mockStats }), _jsx(OrganizationTable, { organizations: mockOrganizations }), _jsx(OrganizationCharts, {})] }) }) })] })] }));
};
export default OrganizationPage;
