import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
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
        icon: "Building2",
        name: "Wellness Center Inc.",
        clients: 284,
        programs: 12,
        status: "Active",
        lastActive: "2 hours ago",
        plan: "Premium",
        address: "123 Main St",
    },
    {
        id: "2",
        icon: "Building2",
        name: "Community Mental Health",
        clients: 194,
        programs: 8,
        status: "Active",
        lastActive: "3 hours ago",
        plan: "Enterprise",
        address: "456 Elm Ave",
    },
    {
        id: "3",
        icon: "Building2",
        name: "Urban Outreach",
        clients: 134,
        programs: 6,
        status: "Inactive",
        lastActive: "2 days ago",
        plan: "Freemium",
        address: "789 Oak Blvd",
    },
];
/**
 * Sample stat data for top-level metrics.
 * Moved from OrganizationStats component to here.
 */
const mockStats = [
    {
        id: "1",
        title: "Total Organizations",
        value: "0",
        change: "+3 this month",
        icon: "Building2",
        iconColor: "bg-success-subtle text-success",
        // subtitle: "Active organizations",
        // linkText: "View all organizations",
        // color: "emerald",
    },
    {
        id: "2",
        title: "Total Client",
        value: "0",
        change: "+24 this month",
        icon: "Users",
        iconColor: "bg-primary-subtle text-primary",
        // subtitle: "Active organizations",
        // linkText: "View all organizations",
        // color: "emerald",
    },
    {
        id: "3",
        title: "Active Programs",
        value: "0",
        change: "+5 this month",
        icon: "CircleCheckBig",
        iconColor: "bg-warning-subtle text-primary",
        // subtitle: "Active organizations",
        // linkText: "View all organizations",
        // color: "emerald",
    },
    {
        id: "4",
        title: "Regional Coverage",
        value: "0 regions",
        change: "",
        icon: "Map",
        iconColor: "bg-success-subtle text-success",
        // subtitle: "Active organizations",
        // linkText: "View all organizations",
        // color: "emerald",
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
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: mockStats }) }), _jsx(OrganizationTable, { organizations: mockOrganizations }), _jsx(OrganizationCharts, {})] }) }) })] })] }));
};
export default OrganizationPage;
