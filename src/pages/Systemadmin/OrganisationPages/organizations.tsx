import React from "react";
import { Container, Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { OrganizationProvider, useOrganizationContext } from "../../../contexts/OrganizationContext";
import { useOrganizationData } from "../../../hooks/useOrganizationData";
import { useAIStatus } from "../../../hooks/useAIStatus";

/**
 * Component that handles dashboard stats using the enhanced hook with caching
 */
const DashboardStatsSection: React.FC = () => {
  const { stats, statsLoading, statsError, refreshStats } = useOrganizationData();

  // Use reusable AI status hook
  const aiStatus = useAIStatus();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <Row className="gy-4 mb-4">
      <DashboardStats stats={stats} />
    </Row>
  );
};

/**
 * Component that handles table and charts using the enhanced hook with caching
 */
const OrganizationContent: React.FC = () => {
  const { conditionalAPI } = useOrganizationContext();
  const {
    organizations,
    organizationsLoading,
    organizationsError,
    hasMore,
    totalCount,
    refreshOrganizations,
    fetchMoreOrganizations,
    searchOrganizations,
    addOrganization,
    updateOrganization,
    deleteOrganization,
  } = useOrganizationData(conditionalAPI);

  return (
    <>
      {/* Organization table with enhanced state management */}
      <OrganizationTable
        organizations={organizations}
        loading={organizationsLoading}
        error={organizationsError}
        hasMore={hasMore}
        totalCount={totalCount}
        onRefresh={refreshOrganizations}
        onFetchMore={fetchMoreOrganizations}
        onSearch={searchOrganizations}
        onAdd={addOrganization}
        onUpdate={updateOrganization}
        onDelete={deleteOrganization}
        conditionalAPI={conditionalAPI}
      />

      {/* Graphs section with conditional API */}
      <OrganizationCharts conditionalAPI={conditionalAPI} />
    </>
  );
};

/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 * Supports switching between Digital Ocean (production) and Neon (development) databases.
 * Uses context for state management to prevent unnecessary refreshing.
 */
const OrganizationPage: React.FC = () => {
  // Use enhanced AI status hook with caching
  const { aiStatus } = useAIStatus();

  return (
    <OrganizationProvider>
      <SystemAdminLayout title="Organizations">
        {/* Main content container with proper spacing */}
        <div className="p-4">
          {/* Stats summary with props */}
          <DashboardStatsSection />

          {/* Table and charts with context-based state management */}
          <OrganizationContent />

          {/* AI Assistant Floating Chat */}
          <AIAssistant isEnabled={aiStatus.admin_ai} />
        </div>
      </SystemAdminLayout>
    </OrganizationProvider>
  );
};

export default OrganizationPage;
