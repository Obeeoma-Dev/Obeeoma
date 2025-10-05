// Main Dashboard component that assembles all sections

import React from 'react';
import Sidebar from '../../components/admincomponents/sidebar';
import Header from '../../components/admincomponents/header';
import DashboardStats from '../../components/admincomponents/dashboardstats';
import PlatformUsageChart from '../../components/admincomponents/platformusagechart';
import RecentActivities from '../../components/admincomponents/platformusagechart';
import BottomMetrics from '../../components/admincomponents/bottommetrics';

/**
 * Dashboard component is the main container for the entire admin dashboard
 * It combines all child components into a cohesive layout with sidebar, header, and content area
 */
const Dashboard: React.FC = () => {
  return (
    // Main container with flex layout for sidebar and content
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar navigation - fixed width */}
      <Sidebar />

      {/* Right side content area - takes remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar - fixed at top */}
        <Header />

        {/* Main scrollable content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Content container with padding */}
          <div className="p-8">
            {/* Top stats section with 4 metric cards */}
            <DashboardStats />

            {/* Chart section showing weekly platform usage trends */}
            <PlatformUsageChart />

            {/* Recent activities list with timeline */}
            <RecentActivities />

            {/* Bottom metrics section with 4 detailed metric cards */}
            <BottomMetrics />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
