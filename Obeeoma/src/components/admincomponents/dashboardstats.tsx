// Dashboard statistics section with overview cards

import React from 'react';
import StatCard from './statCard';
import { StatCardData } from '../../types/admindashboard';

/**
 * DashboardStats component displays the top-level metrics in a grid layout
 * Shows key performance indicators like organizations, clients, revenue, and calls
 */
interface DashboardStatsProps {
    stats: StatCardData[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
    return (
        // Container section with title and grid layout
        <section className="mb-8">
            {/* Section header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

            {/* Grid layout for stat cards - 4 columns on large screens, responsive on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Map through stats array and render a StatCard for each */}
                {stats.map((stat) => (
                    <StatCard key={stat.id} data={stat} />
                ))}
            </div>
        </section>
    );
};


export default DashboardStats;
