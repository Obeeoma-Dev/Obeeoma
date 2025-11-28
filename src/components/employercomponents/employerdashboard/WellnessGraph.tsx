import React from 'react';

interface WellnessGraphProps {
  data: { date: string; score: number }[];
  width?: number;
  height?: number;
}

export default function WellnessGraph({
  data,
  width = 472, // Match image width
  height = 265, // Match image height
}: WellnessGraphProps): React.JSX.Element {
  // Add debugging
  console.log('WellnessGraph received data:', data);
  
  // Handle empty or invalid data
  if (!data || data.length === 0) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center border rounded bg-light"
        style={{ width, height }}
      >
        <span className="text-muted">No wellness data available</span>
      </div>
    );
  }

  // Filter out invalid data points
  const validData = data.filter(point => 
    point && 
    typeof point.score === 'number' && 
    !isNaN(point.score) &&
    point.score >= 0 &&
    point.score <= 100
  );

  if (validData.length === 0) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center border rounded bg-light"
        style={{ width, height }}
      >
        <span className="text-muted">No valid wellness scores</span>
      </div>
    );
  }

  const scores = validData.map(point => point.score);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  // Calculate line path
  let linePath = '';
  if (scores.length === 1) {
    const x = 40 + (width - 80) / 2;
    const y = height - 40 - (scores[0] / 100) * (height - 80);
    linePath = `M ${x-10},${y} L ${x+10},${y}`;
  } else {
    linePath = 'M ' + scores.map((value, index) => {
      const x = 40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
      const y = height - 40 - (value / 100) * (height - 80);
      return `${x},${y}`;
    }).join(' L ');
  }

  return (
    <div className="wellness-graph" style={{ width, height }}>
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Mood %</h5>
        <div className="text-muted small">
          <span className="me-3">0-0</span>
          <span>0-0.0</span>
        </div>
      </div>

      {/* Main Graph Container */}
      <div className="position-relative">
        <svg 
          width={width} 
          height={height - 40} 
          style={{ background: 'transparent' }}
        >
          {/* Y-axis line */}
          <line 
            x1="40" 
            y1="20" 
            x2="40" 
            y2={height - 60} 
            stroke="#e0e0e0" 
            strokeWidth="1"
          />
          
          {/* X-axis line */}
          <line 
            x1="40" 
            y1={height - 60} 
            x2={width - 40} 
            y2={height - 60} 
            stroke="#e0e0e0" 
            strokeWidth="1"
          />

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((value, index) => {
            const y = 20 + (index / 4) * (height - 100);
            return (
              <g key={value}>
                <text 
                  x="30" 
                  y={y + 4} 
                  fontSize="10" 
                  fill="#666" 
                  textAnchor="end"
                  alignmentBaseline="middle"
                >
                  {value}
                </text>
                <line 
                  x1="35" 
                  y1={y} 
                  x2={width - 40} 
                  y2={y} 
                  stroke="#f0f0f0" 
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Main data line */}
          <path
            d={linePath}
            stroke="#9a6fb0"
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {scores.map((value, index) => {
            const x = 40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
            const y = height - 40 - (value / 100) * (height - 80);
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#9a6fb0"
                  stroke="#fff"
                  strokeWidth={2}
                />
                {/* Value label above point */}
                <text
                  x={x}
                  y={y - 10}
                  fontSize="10"
                  fill="#9a6fb0"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Day labels */}
      <div className="d-flex justify-content-between px-4 mt-2">
        {days.map((day, index) => (
          <span 
            key={index} 
            className="small text-muted text-center"
            style={{ width: `${(width - 80) / (days.length - 1)}px`, marginLeft: index === 0 ? '0' : `-${(width - 80) / (days.length - 1) / 2}px` }}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Second row of day labels (as shown in image) */}
      <div className="d-flex justify-content-between px-4 mt-1">
        {days.map((day, index) => (
          <span 
            key={index} 
            className="small text-muted text-center"
            style={{ width: `${(width - 80) / (days.length - 1)}px`, marginLeft: index === 0 ? '0' : `-${(width - 80) / (days.length - 1) / 2}px` }}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}