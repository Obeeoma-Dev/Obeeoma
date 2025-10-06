// Component for displaying individual activity items in the Recent Activities section

import React from 'react';
import * as Icons from 'lucide-react';
import { ActivityItem as ActivityItemType } from '../../types/admindashboard';

/**
 * Props interface for the ActivityItem component
 */
interface ActivityItemProps {
    // Activity data object
    data: ActivityItemType;
}

/**
 * ActivityItem component displays a single activity entry with icon, description, and timestamp
 * Used in the Recent Activities list to show system events
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ data }) => {
    // Dynamically get the icon component from lucide-react
    const IconComponent = (Icons as any)[data.icon] || Icons.Activity;

    return (
        // Container for the activity item with hover effect
        <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors group">
            {/* Left section: icon, type, and details */}
            <div className="flex items-center gap-4 flex-1">
                {/* Icon container with dynamic background color */}
                <div className={`${data.iconColor} p-2.5 rounded-lg`}>
                    {/* Render icon in emerald color */}
                    <IconComponent className="w-5 h-5 text-emerald-600" />
                </div>

                {/* Content section with type and details */}
                <div className="flex-1">
                    {/* Activity type header */}
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                        {data.type}
                    </div>
                    {/* Activity details description */}
                    <div className="text-sm text-gray-500">
                        {data.details}
                    </div>
                </div>
            </div>

            {/* Right section: timestamp and action button */}
            <div className="flex items-center gap-4">
                {/* Time elapsed since activity */}
                <span className="text-sm text-gray-500 whitespace-nowrap">
                    {data.time}
                </span>
                {/* Arrow button that appears on hover */}
                <button className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icons.ArrowRight className="w-5 h-5" />
                </button>
                {/* Three-dot menu button */}
                <button className="text-gray-400 hover:text-gray-600">
                    <Icons.MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ActivityItem;
