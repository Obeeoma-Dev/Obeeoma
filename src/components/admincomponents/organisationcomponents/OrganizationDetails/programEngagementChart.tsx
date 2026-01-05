// src/components/ProgramEngagementChart.tsx

// Import React (required for JSX)
import React from 'react'

// Import Card component from react-bootstrap
import { Card } from 'react-bootstrap'

// Import required chart components from Recharts
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

// Import component-specific CSS (NO Tailwind)
import './organizationUse.css'

// Chart data definition
// Each object represents one bar in the chart
const data = [
    { name: 'Anxiety Management', value: 52 },
    { name: 'Stress Reduction', value: 45 },
    { name: 'Sleep Improvement', value: 38 },
    { name: 'Mindfulness', value: 28 },
    { name: 'Crisis Support', value: 18 },
]

// Functional component definition
export function ProgramEngagementChart() {
    // JSX returned by the component
    return (
        // React-Bootstrap Card wrapper
        <Card className="program-card">
            {/* Card body for proper Bootstrap spacing */}
            <Card.Body>
                {/* Chart title */}
                <Card.Title className="program-title">
                    Program Engagement (%)
                </Card.Title>

                {/* Fixed-height container for responsive chart */}
                <div className="program-chart-container">
                    {/* Makes the chart automatically resize */}
                    <ResponsiveContainer width="100%" height="100%">
                        {/* Bar chart definition */}
                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            {/* Background grid lines */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#dee2e6"
                            />

                            {/* X-axis configuration */}
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                angle={-15}
                                textAnchor="end"
                                height={80}
                                tick={{
                                    fill: '#6c757d',
                                    fontSize: 11,
                                }}
                            />

                            {/* Y-axis configuration */}
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: '#6c757d',
                                    fontSize: 12,
                                }}
                            />

                            {/* Tooltip shown on hover */}
                            <Tooltip
                                cursor={{ fill: '#f8f9fa' }}
                                contentStyle={{
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                                }}
                            />

                            {/* Bar configuration */}
                            <Bar
                                dataKey="value"
                                fill="#198754" // Bootstrap "success" green
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    )
}
