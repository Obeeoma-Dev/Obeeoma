import React from 'react';

interface WellnessData {
  date: string;
  score: number;
}

interface WellnessGraphProps {
  data: WellnessData[];
  moodData?: any[];
}

const WellnessGraph: React.FC<WellnessGraphProps> = ({ data, moodData }) => {
  // Helper: try to normalize incoming moodData into {date, score}
  const normalizeMoodData = (m: any): WellnessData | null => {
    if (!m) return null;
    if (typeof m.score === 'number' && m.date) return { date: m.date, score: m.score };
    if (typeof m.moodLevel === 'number' && m.date) {
      const dateStr = new Date(m.date).toLocaleDateString('en-US', { month: 'short' });
      return { date: dateStr, score: m.moodLevel };
    }
    // fallback for other shapes
    if (typeof m.value === 'number' && m.date) return { date: m.date, score: m.value };
    return null;
  };

  // Default data if none provided
  const chartData = (moodData && moodData.length > 0)
    ? moodData.map(normalizeMoodData).filter((x): x is WellnessData => x !== null)
    : (data.length > 0 ? data : [
      { date: 'Jan', score: 65 },
      { date: 'Feb', score: 72 },
      { date: 'Mar', score: 68 },
      { date: 'Apr', score: 75 },
      { date: 'May', score: 70 },
      { date: 'Jun', score: 78 }
    ]);

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