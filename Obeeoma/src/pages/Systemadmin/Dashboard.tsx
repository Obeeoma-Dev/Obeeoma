// Main Dashboard component that assembles all sections

import React from 'react';
import Sidebar from '../../components/admincomponents/sidebar';
import Header from '../../components/admincomponents/header';
import DashboardStats from '../../components/admincomponents/dashboardstats';
import PlatformUsageChart from '../../components/admincomponents/platformusagechart';
import RecentActivities from '../../components/admincomponents/recentactivities';
import BottomMetrics from '../../components/admincomponents/bottommetrics';

// import { StatCardData } from '../../types/admindashboard';
// import { BottomMetricCard } from '../../types/admindashboard';
import { ActivityItem } from '../../types/admindashboard';

const recentActivityData: ActivityItem[] = [
    {
        id: '1',
        type: 'New Organization',
        details: 'Wellness Centre Inc. joined the platform',
        time: '2 hours ago',
        icon: 'Building2',
        iconColor: 'bg-emerald-50',
    },
    // ...add the rest of your activities here
];

import { BottomMetricCard } from '../../types/admindashboard';

const bottomMetricData: BottomMetricCard[] = [
    {
        id: '1',
        title: 'Organizations',
        value: '42',
        subtitle: 'Active organizations',
        linkText: 'View all organizations',
        icon: 'Building2',
        color: 'emerald',
    },
    // ...add the rest
];

import { StatCardData } from '../../types/admindashboard';

const dashboardStatsData: StatCardData[] = [
    {
        id: '1',
        title: 'Total Organizations',
        value: '42',
        change: '+3 this month',
        icon: 'Building2',
        iconColor: 'bg-emerald-50',
    },
    // ...add the rest
];


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
                        <DashboardStats stats={dashboardStatsData} />

                        {/* Chart section showing weekly platform usage trends */}
                        <PlatformUsageChart />

                        {/* Recent activities list with timeline */}
                        <RecentActivities activities={recentActivityData} />

                        {/* Bottom metrics section with 4 detailed metric cards */}
                        <BottomMetrics metrics={bottomMetricData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
