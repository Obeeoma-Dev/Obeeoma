import React from "react";

interface WellnessIndexProps {
  value: number;
}

const WellnessIndex: React.FC<WellnessIndexProps> = ({ value }) => {
  const getProgressColor = (val: number) => {
    if (val >= 80) return "#10B981"; // Green
    if (val >= 60) return "#F59E0B"; // Yellow
    if (val >= 40) return "#EF4444"; // Red
    return "#6B7280"; // Gray
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Wellness Index</h5>
        <div className="text-center">
          <div className="position-relative d-inline-block mb-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: "120px",
                height: "120px",
                background: `conic-gradient(${getProgressColor(value)} ${value}%, #E5E7EB ${value}%)`,
              }}
            >
              <div
                className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                style={{ width: "100px", height: "100px" }}
              >
                <span
                  className="h3 fw-bold mb-0"
                  style={{ color: getProgressColor(value) }}
                >
                  {value}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted mb-0">Overall employee wellness score</p>
        </div>
      </div>
    </div>
  );
};

export default WellnessIndex;
