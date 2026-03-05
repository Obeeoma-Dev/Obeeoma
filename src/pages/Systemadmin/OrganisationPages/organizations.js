import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { adminAPI } from "../../../api/apiConfig";
import { OrganizationProvider, useOrganizationContext } from "../../../contexts/OrganizationContext";
import { Building2, Users, CircleCheckBig } from "lucide-react";
import { useAIStatus } from "../../../hooks/useAIStatus";
/**
 * Component that handles dashboard stats (uses original API)
 */
const DashboardStatsSection = () => {
    const [dashboardStats, setDashboardStats] = useState([
        {
            id: "1",
            title: "Total Organizations",
            value: "0",
            trend: "+3 this month",
            icon: Building2,
            color: "emerald",
        },
        {
            id: "2",
            title: "Total Client",
            value: "0",
            trend: "+24 this month",
            icon: Users,
            color: "emerald",
        },
        {
            id: "3",
            title: "Active Programs",
            value: "0",
            trend: "+5 this month",
            icon: CircleCheckBig,
            color: "emerald",
        },
    ]);
    // Use reusable AI status hook
    const aiStatus = useAIStatus();
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await adminAPI.getDashboardOverview();
                const data = response.data;
                // Update stats with real data
                setDashboardStats([
                    {
                        id: "1",
                        title: "Total Organizations",
                        value: data.total_organizations?.toString() || "0",
                        trend: `+${data.organizations_this_month || 0} this month`,
                        icon: Building2,
                        color: "emerald",
                    },
                    {
                        id: "2",
                        title: "Total Client",
                        value: data.total_clients?.toString() || "0",
                        trend: `+${data.clients_this_month || 0} this month`,
                        icon: Users,
                        color: "emerald",
                    },
                    {
                        id: "3",
                        title: "Active Programs",
                        value: "0", // This field wasn't in the API response, keeping as 0 for now
                        trend: "+5 this month",
                        icon: CircleCheckBig,
                        color: "emerald",
                    },
                ]);
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        fetchDashboardData();
    }, []);
    return (_jsx(Row, { className: "gy-4 mb-4", children: _jsx(DashboardStats, { stats: dashboardStats }) }));
};
/**
 * Component that handles table and charts (uses context with conditional API)
 */
const OrganizationContent = () => {
    const { conditionalAPI } = useOrganizationContext();
    return (_jsxs(_Fragment, { children: [_jsx(OrganizationTable, { conditionalAPI: conditionalAPI }), _jsx(OrganizationCharts, { conditionalAPI: conditionalAPI })] }));
};
/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 * Supports switching between Digital Ocean (production) and Neon (development) databases.
 * Uses context for state management to prevent unnecessary refreshing.
 */
const OrganizationPage = () => {
    const aiStatus = useAIStatus();
    return (_jsx(OrganizationProvider, { children: _jsx(SystemAdminLayout, { title: "Organizations", children: _jsxs("div", { className: "p-4", children: [_jsx(DashboardStatsSection, {}), _jsx(OrganizationContent, {}), _jsx(AIAssistant, { isEnabled: aiStatus.admin_ai })] }) }) }));
};
export default OrganizationPage;
