import React from 'react';

interface WellnessData {
  date: string;
  score: number;
}

interface WellnessGraphProps {
  data: WellnessData[];
}

const WellnessGraph: React.FC<WellnessGraphProps> = ({ data }) => {
  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { date: 'Jan', score: 65 },
    { date: 'Feb', score: 72 },
    { date: 'Mar', score: 68 },
    { date: 'Apr', score: 75 },
    { date: 'May', score: 70 },
    { date: 'Jun', score: 78 }
  ];

  const maxScore = Math.max(...chartData.map(d => d.score));
  const minScore = Math.min(...chartData.map(d => d.score));

  return (
    <div className="wellness-graph">
      <div className="d-flex align-items-end justify-content-between" style={{ height: '120px' }}>
        {chartData.map((point, index) => {
          const height = ((point.score - minScore) / (maxScore - minScore)) * 80 + 20;
          return (
            <div key={index} className="d-flex flex-column align-items-center">
              <div 
                className="bg-primary rounded-top"
                style={{ 
                  width: '20px', 
                  height: `${height}px`,
                  opacity: 0.7
                }}
              ></div>
              <small className="text-muted mt-1">{point.date}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WellnessGraph;