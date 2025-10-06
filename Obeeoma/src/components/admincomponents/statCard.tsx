// Reusable component for displaying statistical metrics

import React from 'react';
import * as Icons from 'lucide-react';
import { StatCardData } from '../../types/admindashboard';

/**
 * Props interface for the StatCard component
 */
interface StatCardProps {
    // Data object containing all stat information
    data: StatCardData;
}

/**
 * StatCard component displays a metric with an icon, value, and percentage change
 * Used throughout the dashboard to show key performance indicators
 */
const StatCard: React.FC<StatCardProps> = ({ data }) => {
    // Dynamically get the icon component from lucide-react based on the icon name
    const IconComponent = (Icons as any)[data.icon] || Icons.Activity;

    // Determine if the change is positive or negative for styling
    const isPositive = data.change.startsWith('+');

    // Set text color based on whether change is positive or negative
    const changeColor = isPositive ? 'text-emerald-500' : 'text-red-500';

    return (
        // Main card container with white background and subtle shadow
        <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Top section with icon and change percentage */}
            <div className="flex items-start justify-between mb-4">
                {/* Icon container with dynamic background color */}
                <div className={`${data.iconColor} p-3 rounded-lg`}>
                    {/* Render the icon with emerald color */}
                    <IconComponent className="w-6 h-6 text-emerald-600" />
                </div>
                {/* Change percentage indicator */}
                <span className={`text-sm font-medium ${changeColor}`}>
                    {data.change}
                </span>
            </div>

            {/* Bottom section with value and title */}
            <div>
                {/* Large display of the metric value */}
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {data.value}
                </div>
                {/* Descriptive title of the metric */}
                <div className="text-sm text-gray-500">
                    {data.title}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
