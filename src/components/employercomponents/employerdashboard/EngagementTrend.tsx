import React from 'react';

interface DonutChartProps {
  active: number;
  pending: number;
  total: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ active, pending, total }) => {
  const inactive = total - active - pending;
  const activePercentage = (active / total) * 100;
  const pendingPercentage = (pending / total) * 100;
  const inactivePercentage = (inactive / total) * 100;
  
  // Donut chart dimensions
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke offsets for each segment
  const activeOffset = circumference * (1 - activePercentage / 100);
  const pendingOffset = circumference * (1 - (activePercentage + pendingPercentage) / 100);
  
  return (
    <div className="d-flex justify-content-center align-items-center">
      <svg width={size} height={size} className="position-relative">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f8f9fa"
          strokeWidth={strokeWidth}
        />
        
        {/* Inactive segment (bottom) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#dee2e6"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * (inactivePercentage / 100)} ${circumference}`}
          strokeDashoffset={circumference * 0.25} // Start from bottom
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Pending segment (middle) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#ffc107"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * (pendingPercentage / 100)} ${circumference}`}
          strokeDashoffset={pendingOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Active segment (top) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#28a745"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * (activePercentage / 100)} ${circumference}`}
          strokeDashoffset={activeOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fw-bold text-dark"
          fontSize="14"
        >
          {total}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-muted"
          fontSize="10"
        >
          Total
        </text>
      </svg>
    </div>
  );
};

const EngagementTrend: React.FC = () => {
  const engagementData = {
    total: 345,
    active: 289,
    pending: 56
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Engagement Trend</h5>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-medium">Total</span>
            <span className="fw-bold text-primary">{engagementData.total}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="text-center p-3 bg-success bg-opacity-10 rounded">
              <div className="h5 fw-bold text-success mb-1">{engagementData.active}</div>
              <div className="text-muted small">Active</div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center p-3 bg-warning bg-opacity-10 rounded">
              <div className="h5 fw-bold text-warning mb-1">{engagementData.pending}</div>
              <div className="text-muted small">Pending</div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <DonutChart 
            active={engagementData.active}
            pending={engagementData.pending}
            total={engagementData.total}
          />
        </div>
      </div>
    </div>
  );
};

export default EngagementTrend;