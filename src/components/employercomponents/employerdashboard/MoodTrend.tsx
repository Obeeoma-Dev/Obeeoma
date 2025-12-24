import React from "react";

interface MoodTrendProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

// const MoodTrend: React.FC<MoodTrendProps> = ({ data = [] }) => {

const MoodTrend: React.FC<MoodTrendProps> = () => {
  // Sample data matching the design
  const moodData = [
    { week: 1, mood: 75 },
    { week: 2, mood: 82 },
    { week: 3, mood: 68 },
    { week: 4, mood: 90 },
    { week: 5, mood: 78 },
    { week: 6, mood: 85 },
    { week: 7, mood: 72 },
    { week: 8, mood: 88 },
    { week: 9, mood: 65 },
    { week: 10, mood: 80 },
    { week: 11, mood: 92 },
    { week: 12, mood: 76 },
  ];

  const maxMood = Math.max(...moodData.map((d) => d.mood));
  const minMood = Math.min(...moodData.map((d) => d.mood));

  const getBarHeight = (mood: number) => {
    const range = maxMood - minMood;
    return ((mood - minMood) / range) * 100;
  };

  const getBarColor = (mood: number) => {
    if (mood >= 80) return "#10B981"; // Green
    if (mood >= 60) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Mood Trend</h5>
        <p className="text-muted small mb-3">Automated from aggregated data</p>

        <div
          className="d-flex align-items-end"
          style={{ height: "200px", gap: "8px" }}
        >
          {/* Y-axis labels */}
          <div
            className="d-flex flex-column justify-content-between me-2 text-muted small"
            style={{ height: "100%" }}
          >
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span>0%</span>
          </div>

          {/* Chart bars */}
          <div
            className="d-flex justify-content-between align-end flex-grow-1"
            style={{ height: "100%" }}
          >
            {moodData.map((item, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center"
                style={{ width: "24px" }}
              >
                <div
                  className="rounded-top"
                  style={{
                    height: `${getBarHeight(item.mood)}%`,
                    backgroundColor: getBarColor(item.mood),
                    width: "16px",
                    minHeight: "4px",
                  }}
                ></div>
                <span className="text-muted small mt-1">{item.week}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-2">
          <span className="text-muted small">Week</span>
        </div>

        {/* Legend */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#10B981",
                borderRadius: "2px",
              }}
            ></div>
            <span className="text-muted small">High</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#F59E0B",
                borderRadius: "2px",
              }}
            ></div>
            <span className="text-muted small">Medium</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#EF4444",
                borderRadius: "2px",
              }}
            ></div>
            <span className="text-muted small">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrend;
