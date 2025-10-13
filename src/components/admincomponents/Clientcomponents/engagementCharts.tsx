// EngagementCharts.tsx
// Displays line and bar charts for engagement and reward redemption

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Line chart data for weekly engagement
const weeklyEngagementData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Engagement Rate (%)',
      data: [75, 78, 80, 77, 79, 81, 78],
      borderColor: '#007bff',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      fill: true,
    },
  ],
};

// Bar chart data for reward redemptions
const rewardRedemptionData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Points Redeemed',
      data: [42000, 38000, 45000, 47000, 43000, 50000],
      backgroundColor: '#28a745',
    },
  ],
};

// Define the component
const EngagementCharts: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        {/* Line chart for weekly engagement */}
        <div className="mb-4">
          <h5>Weekly Engagement Rate (%)</h5>
          <Line data={weeklyEngagementData} />
        </div>

        {/* Bar chart for reward redemptions */}
        <div>
          <h5>Reward Redemptions (Last 6 Weeks)</h5>
          <Bar data={rewardRedemptionData} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default EngagementCharts;