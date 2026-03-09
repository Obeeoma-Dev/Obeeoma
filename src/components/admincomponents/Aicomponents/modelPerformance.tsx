import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './modelPerformance.css'

const data = [
  {
    week: 'Week 1',
    value: 250,
  },
  {
    week: 'Week 2',
    value: 310,
  },
  {
    week: 'Week 3',
    value: 290,
  },
  {
    week: 'Week 4',
    value: 340,
  },
  {
    week: 'Week 5',
    value: 300,
  },
  {
    week: 'Week 6',
    value: 360,
  },
]

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{
    value: number
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="weekly-activity-tooltip">
        <p className="weekly-activity-tooltip-label">{label}</p>
        <p className="weekly-activity-tooltip-value">
          {payload[0].value} recommendations
        </p>
      </div>
    )
  }
  return null
}

export function WeeklyActivityChart() {
  return (
    <div className="weekly-activity-chart-container">
      <div className="weekly-activity-header">
        <h3 className="weekly-activity-title">
          Weekly AI Activity
        </h3>
        <p className="weekly-activity-subtitle">
          Volume of AI recommendations over the last 6 weeks
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{
              fontSize: 12,
              fill: '#9ca3af',
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: 12,
              fill: '#9ca3af',
            }}
            axisLine={false}
            tickLine={false}
            domain={[0, 400]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#e5e7eb',
              strokeWidth: 1,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{
              fill: '#ffffff',
              stroke: '#16a34a',
              strokeWidth: 2.5,
              r: 4,
            }}
            activeDot={{
              fill: '#16a34a',
              stroke: '#ffffff',
              strokeWidth: 2,
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyActivityChart
