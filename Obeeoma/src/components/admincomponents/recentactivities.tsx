// Component displaying recent system activities

import React from 'react';
import ActivityItem from './ActivityItem';
import { ActivityItem as ActivityItemType } from '../types/dashboard';

/**
 * RecentActivities component displays a list of recent system activities
 * Shows various types of events with timestamps and details
 */
const RecentActivities: React.FC = () => {
  // Array of recent activity data
  const activities: ActivityItemType[] = [
    {
      id: '1',
      type: 'New Organization',
      details: 'Wellness Centre Inc. joined the platform',
      time: '2 hours ago',
      icon: 'Building2',
      iconColor: 'bg-emerald-50',
    },
    {
      id: '2',
      type: 'AI Recommendation',
      details: 'New sinfully resource added with 57% effectiveness',
      time: '3 hours ago',
      icon: 'Brain',
      iconColor: 'bg-blue-50',
    },
    {
      id: '3',
      type: 'Hotline Activity',
      details: 'Spike in call volume (32% increase)',
      time: '5 hours ago',
      icon: 'Phone',
      iconColor: 'bg-purple-50',
    },
    {
      id: '4',
      type: 'Patient Engagement',
      details: 'Monthly engagement up by 15%',
      time: '1 day ago',
      icon: 'TrendingUp',
      iconColor: 'bg-orange-50',
    },
    {
      id: '5',
      type: 'Subscription',
      details: 'University Counselling Center upgraded to Premium',
      time: '1 day ago',
      icon: 'CreditCard',
      iconColor: 'bg-pink-50',
    },
  ];

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
