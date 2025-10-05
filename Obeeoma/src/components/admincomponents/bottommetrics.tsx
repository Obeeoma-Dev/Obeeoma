// Bottom metrics cards component showing key performance indicators

import React from 'react';
import * as Icons from 'lucide-react';
import { BottomMetricCard } from '../../types/dashboard';

/**
 * BottomMetrics component displays four metric cards at the bottom of the dashboard
 * Each card shows a key metric with a link to view more details
 */
interface BottomMetricsProps {
  metrics: BottomMetricCard[];
}

const BottomMetrics: React.FC<BottomMetricsProps> = ({ metrics }) => {
  // ...same layout
};
  // Array of metric card data
  const metrics: BottomMetricCard[] = [
    {
      id: '1',
      title: 'Organizations',
      value: '42',
      subtitle: 'Active organizations',
      linkText: 'View all organizations',
      icon: 'Building2',
      color: 'emerald',
    },
    {
      id: '2',
      title: 'AI Recommendations',
      value: '1,245',
      subtitle: 'Resources recommended',
      linkText: 'View all analytics',
      icon: 'Brain',
      color: 'blue',
    },
    {
      id: '3',
      title: 'Hotline',
      value: '324',
      subtitle: 'Calls this week',
      linkText: 'View hotline activity',
      icon: 'Phone',
      color: 'purple',
    },
    {
      id: '4',
      title: 'Subscriptions',
      value: '$25.8K',
      subtitle: 'Monthly recurring revenue',
      linkText: 'View subscriber details',
      icon: 'CreditCard',
      color: 'pink',
    },
  ];

  /**
   * Returns the appropriate color classes based on the color prop
   * @param color - The color scheme to use
   * @returns Object with icon, text, and link color classes
   */
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { icon: string; text: string; link: string } } = {
      emerald: {
        icon: 'bg-emerald-50 text-emerald-600',
        text: 'text-emerald-600',
        link: 'text-emerald-600 hover:text-emerald-700',
      },
      blue: {
        icon: 'bg-blue-50 text-blue-600',
        text: 'text-blue-600',
        link: 'text-blue-600 hover:text-blue-700',
      },
      purple: {
        icon: 'bg-purple-50 text-purple-600',
        text: 'text-purple-600',
        link: 'text-purple-600 hover:text-purple-700',
      },
      pink: {
        icon: 'bg-pink-50 text-pink-600',
        text: 'text-pink-600',
        link: 'text-pink-600 hover:text-pink-700',
      },
    };

    // Return color classes or default to emerald if color not found
    return colorMap[color] || colorMap.emerald;
  };

  return (
    // Main container section
    <section className="mb-8">
      {/* Grid layout for metric cards - 4 columns on large screens, responsive on smaller */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Map through metrics array and render each card */}
        {metrics.map((metric) => {
          // Get the icon component dynamically from lucide-react
          const IconComponent = (Icons as any)[metric.icon] || Icons.Activity;
          // Get color classes for this metric
          const colors = getColorClasses(metric.color);

          return (
            // Individual metric card with white background and shadow
            <div key={metric.id} className="bg-white rounded-lg p-6 shadow-sm">
              {/* Top section with icon and title */}
              <div className="flex items-start gap-4 mb-4">
                {/* Icon container with dynamic color */}
                <div className={`${colors.icon} p-3 rounded-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                {/* Title */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">{metric.title}</h4>
                </div>
              </div>

              {/* Middle section with main value */}
              <div className="mb-2">
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              </div>

              {/* Subtitle text */}
              <div className="text-sm text-gray-500 mb-4">{metric.subtitle}</div>

              {/* Bottom section with view link */}
              <button className={`flex items-center gap-2 text-sm font-medium ${colors.link} transition-colors`}>
                {/* Link text */}
                <span>{metric.linkText}</span>
                {/* Arrow icon */}
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BottomMetrics;
