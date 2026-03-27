import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { OrganizationProvider, useOrganizationContext, } from "../../../contexts/OrganizationContext";
import { useOrganizationData } from "../../../hooks/useOrganizationData";
import { useAIStatus } from "../../../hooks/useAIStatus";
/**
 * Component that handles dashboard stats using the enhanced hook with caching
 */
const DashboardStatsSection = () => {
    const { stats, statsLoading, statsError, refreshStats } = useOrganizationData();
    // Use reusable AI status hook
    const aiStatus = useAIStatus();
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    return (_jsx(Row, { className: "gy-4 mb-4", children: _jsx(DashboardStats, { stats: stats }) }));
};
/**
 * Component that handles table and charts using the enhanced hook with caching
 */
const OrganizationContent = () => {
    const { conditionalAPI } = useOrganizationContext();
    const { organizations, organizationsLoading, organizationsError, hasMore, totalCount, refreshOrganizations, fetchMoreOrganizations, searchOrganizations, addOrganization, updateOrganization, deleteOrganization, } = useOrganizationData(conditionalAPI);
    return (_jsxs(_Fragment, { children: [_jsx(OrganizationTable, { organizations: organizations, loading: organizationsLoading, error: organizationsError, hasMore: hasMore, totalCount: totalCount, onRefresh: refreshOrganizations, onFetchMore: fetchMoreOrganizations, onSearch: searchOrganizations, onAdd: addOrganization, onUpdate: updateOrganization, onDelete: deleteOrganization, conditionalAPI: conditionalAPI }), _jsx(OrganizationCharts, { conditionalAPI: conditionalAPI })] }));
};
/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 * Supports switching between Digital Ocean (production) and Neon (development) databases.
 * Uses context for state management to prevent unnecessary refreshing.
 */
const OrganizationPage = () => {
    // Use enhanced AI status hook with caching
    const { aiStatus } = useAIStatus();
    return (_jsx(OrganizationProvider, { children: _jsx(SystemAdminLayout, { title: "Organizations", children: _jsxs("div", { className: "p-4", children: [_jsx(DashboardStatsSection, {}), _jsx(OrganizationContent, {}), _jsx(AIAssistant, { isEnabled: aiStatus.admin_ai })] }) }) }));
};
export default OrganizationPage;
