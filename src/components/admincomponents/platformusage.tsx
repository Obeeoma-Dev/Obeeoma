// Import React and required Bootstrap components
import React, { useState } from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';

// Import chart components from Recharts
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Import the chart data type
import { ChartDataPoint } from './admindashboard';

/**
 * PlatformUsageChart component renders a responsive line chart
 * Includes tab navigation for future expansion (organization growth, subscription revenue)
 */
const PlatformUsageChart: React.FC = () => {
    // Track which tab is currently active
    const [activeTab, setActiveTab] = useState<string>('platform');

    // Define tab options for chart navigation
    const tabs = [
        { id: 'platform', label: 'Platform Usage' },
        { id: 'organization', label: 'Organization Growth' },
        { id: 'subscription', label: 'Subscription Revenue' },
    ];

    // Sample data for platform usage over 6 weeks
    const chartData: ChartDataPoint[] = [
        { week: 'Week 1', value: 1800 },
        { week: 'Week 2', value: 2100 },
        { week: 'Week 3', value: 2600 },
        { week: 'Week 4', value: 2900 },
        { week: 'Week 5', value: 3200 },
        { week: 'Week 6', value: 3500 },
    ];

    return (
        // Bootstrap Card container for chart section
        <Card className="mb-4 shadow-sm border-0">
            {/* Card body contains tab navigation and chart */}
            <Card.Body>
                {/* Tab navigation using ButtonGroup */}
                <ButtonGroup className="mb-4">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? 'success' : 'outline-secondary'}
                            onClick={() => setActiveTab(tab.id)}
                            aria-pressed={activeTab === tab.id}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </ButtonGroup>

                {/* Chart title */}
                <h5 className="fw-semibold mb-4">Weekly Platform Usage</h5>

                {/* Render chart only when 'platform' tab is active */}
                {activeTab === 'platform' && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            {/* Grid lines */}
                            <CartesianGrid strokeDasharray="3 3" />
                            {/* X-axis showing week labels */}
                            <XAxis dataKey="week" />
                            {/* Y-axis showing usage values */}
                            <YAxis />
                            {/* Tooltip on hover */}
                            <Tooltip />
                            {/* Line representing usage trend */}
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}

                {/* Placeholder for future tabs */}
                {activeTab === 'organization' && (
                    <div className="text-muted small">Organization Growth chart coming soon...</div>
                )}
                {activeTab === 'subscription' && (
                    <div className="text-muted small">Subscription Revenue chart coming soon...</div>
                )}
            </Card.Body>
        </Card>
    );
};

// Export the component for use in the dashboard layout
export default PlatformUsageChart;