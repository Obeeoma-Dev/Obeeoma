import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralMood } from "../../../store/slices/EmployerSlice";
import { RootState, AppDispatch } from "../../../store/store";

const MoodGaugeChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { gaugeDetails, isLoading } = useSelector((state: RootState) => state.employer);
  const { moodLabel, totalEntries } = gaugeDetails;

  useEffect(() => {
    dispatch(fetchGeneralMood()); 
    const interval = setInterval(() => {
      dispatch(fetchGeneralMood());
    }, 15000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  const colors = ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e"];
  const emojis = ["😞", "😊", "😐", "😕", "😀"];
  
  // Clean label for display
  const cleanedMoodLabel = moodLabel.replace("Needs Attention", "").trim() || "Ecstatic";

  // Logic to find which index the current mood belongs to
  // Matches "Needs Attention", "Neutral", etc., to the 0-4 index
  const moodIndexMap: { [key: string]: number } = {
    "Very Sad": 0,
    "Sad": 1,
    "Neutral": 2,
    "Happy": 3,
    "Ecstatic": 4,
  };
  
  // Default to middle (index 2) if no match found
  const activeIndex = moodIndexMap[cleanedMoodLabel] ?? 2;

  const centerX = 165;
  const centerY = 170;
  const casingRadius = 160;
  const chartRadius = 155;
  const innerRadius = 75;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number,
  ) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const getDonutPath = (
    start: number,
    end: number,
    rOut: number,
    rIn: number,
  ) => {
    const s = polarToCartesian(centerX, centerY, rOut, start);
    const e = polarToCartesian(centerX, centerY, rOut, end);
    const sIn = polarToCartesian(centerX, centerY, rIn, start);
    const eIn = polarToCartesian(centerX, centerY, rIn, end);

    return `M ${s.x} ${s.y} A ${rOut} ${rOut} 0 0 1 ${e.x} ${e.y} L ${eIn.x} ${eIn.y} A ${rIn} ${rIn} 0 0 0 ${sIn.x} ${sIn.y} Z`;
  };

  // Calculate the tip of the needle based on the active index
  // Each segment is 36 degrees. We point to the middle of the segment (+ 18)
  const needleAngle = (activeIndex * 36) + 18;
  const tip = polarToCartesian(centerX, centerY, chartRadius - 15, needleAngle);
  const baseLeft = polarToCartesian(centerX, centerY, 8, needleAngle - 90);
  const baseRight = polarToCartesian(centerX, centerY, 8, needleAngle + 90);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between w-100 mb-2">
        <h6 className="fw-bold m-0" style={{ fontSize: "0.9rem", color: "#000" }}>
          General Company Mood Tracker
        </h6>
        {isLoading && <span className="spinner-border spinner-border-sm text-muted"></span>}
      </div>

      <div style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
        <svg viewBox="0 0 330 200" style={{ display: "block", width: "100%" }}>
          <g>
            <path
              d={`M ${centerX - casingRadius} ${centerY} A ${casingRadius} ${casingRadius} 0 0 1 ${centerX + casingRadius} ${centerY}`}
              fill="none"
              stroke="#e5e7eb"
              // strokeWidth="10"
              // stroke="#e5e7eb"
              strokeWidth="10"
            />

            <g transform={`rotate(180 ${centerX} ${centerY})`}>
              {colors.map((color, i) => (
                <path
                  key={i}
                  d={getDonutPath(
                    i * 36,
                    (i + 1) * 36,
                    chartRadius,
                    innerRadius,
                  )}
                  fill={color}
                />
              ))}

              {emojis.map((emoji, i) => {
                const pos = polarToCartesian(
                  centerX,
                  centerY,
                  (chartRadius + innerRadius) / 2,
                  (i + 0.5) * 36,
                );
                return (
                  <text
                    key={i}
                    x={pos.x}
                    y={pos.y}
                    fontSize="22"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(-180 ${pos.x} ${pos.y})`}
                  >
                    {emoji}
                  </text>
                );
              })}

              {/* The Needle - Coordinate Mapped (No Rotation Style) */}
              <g>
                <path
                  d={`M ${baseLeft.x} ${baseLeft.y} L ${tip.x} ${tip.y} L ${baseRight.x} ${baseRight.y} Z`}
                  fill="#374151"
                />
                <circle cx={centerX} cy={centerY} r="10" fill="#4b5563" />
                <circle cx={centerX} cy={centerY} r="3" fill="white" />
              </g>
            </g>

            <line
              x1={centerX - casingRadius - 5}
              y1={centerY}
              x2={centerX + casingRadius + 5}
              y2={centerY}
              stroke="#e5e7eb"
              strokeWidth="5"
            />
          </g>
        </svg>
      </div>

      <div className="text-center mt-3">
        <div className="fw-bold text-uppercase" style={{ fontSize: "1.2rem", color: "#374151" }}>
          {cleanedMoodLabel}
        </div>
      </div>
    </div>
  );
};

export default MoodGaugeChart;

