// Component displaying recent system activities

import React from 'react';
import ActivityItem from './activityitem';
import { ActivityItem as ActivityItemType } from '../../types/admindashboard';

/**
 * RecentActivities component displays a list of recent system activities
 * Shows various types of events with timestamps and details
 */
interface RecentActivitiesProps {
    activities: ActivityItemType[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {

    return (
        // Main container with white background and shadow
        <section className="bg-white rounded-lg p-6 shadow-sm mb-8">
            {/* Section header with title */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>

            {/* Table header row */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
                {/* Left column header */}
                <div className="flex-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">Activity Type</span>
                </div>
                {/* Center column header */}
                <div className="flex-1">
                    <span className="text-xs font-medium text-gray-500 uppercase">Details</span>
                </div>
                {/* Right column header */}
                <div className="w-32 text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase">Time</span>
                </div>
            </div>

            {/* Activities list */}
            <div className="divide-y divide-gray-100">
                {/* Map through activities and render each one using ActivityItem component */}
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} data={activity} />
                ))}
            </div>
        </section>
    );
};

export default RecentActivities;
