// Chart component for displaying weekly platform usage trends

import React, { useState } from 'react';
import { ChartDataPoint } from '../types/dashboard';

/**
 * PlatformUsageChart component displays a line chart showing weekly platform usage
 * Includes tab navigation for different chart views
 */
const PlatformUsageChart: React.FC = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>('platform');

  // Array of tab options for chart navigation
  const tabs = [
    { id: 'platform', label: 'Platform Usage' },
    { id: 'organization', label: 'Organization Growth' },
    { id: 'subscription', label: 'Subscription Revenue' },
  ];

  // Sample data points for the chart (6 weeks of usage data)
  const chartData: ChartDataPoint[] = [
    { week: 'Week 1', value: 1800 },
    { week: 'Week 2', value: 2100 },
    { week: 'Week 3', value: 2600 },
    { week: 'Week 4', value: 2900 },
    { week: 'Week 5', value: 3200 },
    { week: 'Week 6', value: 3500 },
  ];

  // Calculate the maximum value for chart scaling
  const maxValue = Math.max(...chartData.map((d) => d.value));
  // Add 10% padding to the top of the chart
  const chartHeight = 300;
  const padding = maxValue * 0.1;
  const adjustedMax = maxValue + padding;

  /**
   * Converts a data value to Y coordinate on the chart
   * @param value - The data value to convert
   * @returns Y coordinate in pixels
   */
  const getYPosition = (value: number): number => {
    return chartHeight - (value / adjustedMax) * chartHeight;
  };

  /**
   * Generates the SVG path string for the line chart
   * @returns SVG path data string
   */
  const generatePath = (): string => {
    // Calculate width for each data point
    const pointWidth = 100 / (chartData.length - 1);

    // Generate path commands for each point
    return chartData
      .map((point, index) => {
        // Calculate X position as percentage
        const x = index * pointWidth;
        // Calculate Y position based on value
        const y = getYPosition(point.value);
        // First point uses M (move to), subsequent points use L (line to)
        const command = index === 0 ? 'M' : 'L';
        return `${command} ${x}% ${y}`;
      })
      .join(' ');
  };

  return (
    // Main chart container with white background
    <section className="bg-white rounded-lg p-6 shadow-sm mb-8">
      {/* Tab navigation for different chart views */}
      <div className="flex gap-6 mb-6 border-b border-gray-200">
        {/* Map through tabs and render each one */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              pb-3 px-1 text-sm font-medium transition-colors relative
              ${activeTab === tab.id
                ? 'text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {/* Tab label */}
            {tab.label}
            {/* Active indicator line */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
        ))}
      </div>

      {/* Chart title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Platform Usage</h3>

      {/* SVG chart container */}
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        {/* Background gradient for chart area */}
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Define gradient for area fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {/* Light emerald at top */}
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              {/* Transparent at bottom */}
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill under the line */}
          <path
            d={`${generatePath()} L 100% ${chartHeight} L 0% ${chartHeight} Z`}
            fill="url(#chartGradient)"
          />

          {/* Main line chart path */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Data points circles overlay */}
        {chartData.map((point, index) => {
          // Calculate position for each point
          const pointWidth = 100 / (chartData.length - 1);
          const x = index * pointWidth;
          const y = getYPosition(point.value);

          return (
            <div
              key={point.week}
              className="absolute w-3 h-3 bg-emerald-600 rounded-full border-2 border-white shadow-md"
              style={{
                left: `${x}%`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 px-2">
        {/* Map through data points and show week labels */}
        {chartData.map((point) => (
          <span key={point.week} className="text-sm text-gray-500">
            {point.week}
          </span>
        ))}
      </div>

      {/* Y-axis value indicators (optional enhancement) */}
      <div className="absolute left-0 top-0 flex flex-col justify-between h-full py-6 -ml-12 text-xs text-gray-500">
        {/* Show max, mid, and zero values */}
        <span>{Math.round(adjustedMax)}</span>
        <span>{Math.round(adjustedMax / 2)}</span>
        <span>0</span>
      </div>
    </section>
  );
};

export default PlatformUsageChart;
