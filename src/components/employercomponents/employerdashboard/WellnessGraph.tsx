import React from "react";
import { WellnessTrend } from "../../../types/employer";

interface WellnessGraphProps {
  data: WellnessTrend[];
  width?: string | number;
  height?: number;
}

const getMoodEmoji = (score: number): string => {
  const s = Math.round(score);
  if (s <= 1) return "😫";
  if (s === 2) return "☹️";
  if (s === 3) return "😐";
  if (s === 4) return "🙂";
  return "🤩";
};

export default function WellnessGraph({
  data,
  // width = "100%",
  height = 320,
}: WellnessGraphProps): React.JSX.Element {
  const validData = data.filter((pt) => pt && typeof pt.avg_score === "number");

  if (validData.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div
          className="card-body d-flex align-items-center justify-content-center"
          style={{ height }}
        >
          <span className="text-muted">
            No mood data available for this period
          </span>
        </div>
      </div>
    );
  }

  // SVG Calculation Constants
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;
  const viewWidth = 500; // Fixed viewbox width for responsiveness
  const viewHeight = height;
  const chartWidth = viewWidth - paddingLeft - paddingRight;
  const chartHeight = viewHeight - paddingTop - paddingBottom;

  const getCoordinates = (index: number, score: number) => {
    const x =
      paddingLeft + (index / Math.max(1, validData.length - 1)) * chartWidth;
    const y = viewHeight - paddingBottom - (score / 5) * chartHeight;
    return { x, y };
  };

  const linePath = validData
    .map((pt, i) => {
      const { x, y } = getCoordinates(i, pt.avg_score);
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  return (
    <div className="card border-0 shadow-sm overflow-hidden">
      <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0 fw-bold text-dark">Employee Wellness Trend</h6>
          <small className="text-muted">
            Daily mood average based on surveys
          </small>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-light btn-sm rounded-pill px-3 border"
            type="button"
          >
            Last 7 Days
          </button>
        </div>
      </div>

      <div className="card-body px-2">
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height={height}
        >
          {/* Y-Axis Emojis & Gridlines */}
          {[0, 1, 2, 3, 4, 5].map((val) => {
            const y = viewHeight - paddingBottom - (val / 5) * chartHeight;
            return (
              <g key={val}>
                <text
                  x={paddingLeft - 15}
                  y={y + 5}
                  fontSize="18"
                  textAnchor="end"
                >
                  {getMoodEmoji(val)}
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewWidth - paddingRight}
                  y2={y}
                  stroke="#f8f9fa"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Smooth Path */}
          <path
            d={linePath}
            stroke="#6f42c1"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0px 4px 4px rgba(111, 66, 193, 0.2))",
            }}
          />

          {/* Interaction Points */}
          {validData.map((point, index) => {
            const { x, y } = getCoordinates(index, point.avg_score);
            return (
              <g key={index} className="chart-point">
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#6f42c1"
                  stroke="#fff"
                  strokeWidth="3"
                />
                <rect
                  x={x - 15}
                  y={y - 30}
                  width="30"
                  height="20"
                  rx="4"
                  fill="#212529"
                  className="d-none"
                />
                <text
                  x={x}
                  y={y - 15}
                  fontSize="11"
                  fill="#6f42c1"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {point.avg_score.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X-Axis Labels */}
          {validData.map((pt, i) => {
            const { x } = getCoordinates(i, 0);
            const d = new Date(pt.date);
            return (
              <g key={i}>
                <text
                  x={x}
                  y={viewHeight - 35}
                  fontSize="11"
                  fontWeight="600"
                  fill="#212529"
                  textAnchor="middle"
                >
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </text>
                <text
                  x={x}
                  y={viewHeight - 20}
                  fontSize="10"
                  fill="#adb5bd"
                  textAnchor="middle"
                >
                  {d.getDate()}{" "}
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="card-footer bg-light border-0 py-3 px-4">
        <div className="d-flex gap-4">
          <div className="d-flex align-items-center">
            <span
              className="dot bg-primary me-2"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
            <small className="text-muted">Avg Mood</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// // import React from 'react';

// // interface WellnessGraphProps {
// //   data: { date: string; score: number }[];
// //   width?: number;
// //   height?: number;
// // }

// // export default function WellnessGraph({
// //   data,
// //   width = 472, // Match image width
// //   height = 265, // Match image height
// // }: WellnessGraphProps): React.JSX.Element {
// //   // Add debugging
// //   console.log('WellnessGraph received data:', data);

// //   // Handle empty or invalid data
// //   if (!data || data.length === 0) {
// //     return (
// //       <div
// //         className="d-flex align-items-center justify-content-center border rounded bg-light"
// //         style={{ width, height }}
// //       >
// //         <span className="text-muted">No wellness data available</span>
// //       </div>
// //     );
// //   }

// //   // Filter out invalid data points
// //   const validData = data.filter(point =>
// //     point &&
// //     typeof point.score === 'number' &&
// //     !isNaN(point.score) &&
// //     point.score >= 0 &&
// //     point.score <= 100
// //   );

// //   if (validData.length === 0) {
// //     return (
// //       <div
// //         className="d-flex align-items-center justify-content-center border rounded bg-light"
// //         style={{ width, height }}
// //       >
// //         <span className="text-muted">No valid wellness scores</span>
// //       </div>
// //     );
// //   }

// //   const scores = validData.map(point => point.score);
// //   // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// //   // Calculate line path
// //   let linePath = '';
// //   if (scores.length === 1) {
// //     const x = 40 + (width - 80) / 2;
// //     const y = height - 40 - (scores[0] / 100) * (height - 80);
// //     linePath = `M ${x-10},${y} L ${x+10},${y}`;
// //   } else {
// //     linePath = 'M ' + scores.map((value, index) => {
// //       const x = 40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
// //       const y = height - 40 - (value / 100) * (height - 80);
// //       return `${x},${y}`;
// //     }).join(' L ');
// //   }

// //   return (
// //     <div className="wellness-graph" style={{ width, height }}>
// //       {/* Title */}
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <h5 className="mb-0 fw-bold">Mood %</h5>
// //         <div className="text-muted small" style={{fontFamily:'body'}}>
// //           <span className="me-3">0-0</span>
// //           <span>0-0.0</span>
// //         </div>
// //       </div>

// //       {/* Main Graph Container */}
// //       <div className="position-relative">
// //         <svg
// //           width={width}
// //           height={height - 40}
// //           style={{ background: 'transparent' }}
// //         >
// //           {/* Y-axis line */}
// //           <line
// //             x1="40"
// //             y1="20"
// //             x2="40"
// //             y2={height - 60}
// //             stroke="#e0e0e0"
// //             strokeWidth="1"
// //           />

// //           {/* X-axis line */}
// //           <line
// //             x1="40"
// //             y1={height - 60}
// //             x2={width - 40}
// //             y2={height - 60}
// //             stroke="#e0e0e0"
// //             strokeWidth="1"
// //           />

// //           {/* Y-axis labels */}
// //           {[0, 25, 50, 75, 100].map((value, index) => {
// //             const y = 20 + (index / 4) * (height - 100);
// //             return (
// //               <g key={value}>
// //                 <text
// //                   x="30"
// //                   y={y + 4}
// //                   fontSize="10"
// //                   fill="#666"
// //                   textAnchor="end"
// //                   alignmentBaseline="middle"
// //                 >
// //                   {value}
// //                 </text>
// //                 <line
// //                   x1="35"
// //                   y1={y}
// //                   x2={width - 40}
// //                   y2={y}
// //                   stroke="#f0f0f0"
// //                   strokeWidth="1"
// //                 />
// //               </g>
// //             );
// //           })}

// //           {/* Main data line */}
// //           <path
// //             d={linePath}
// //             stroke="#9a6fb0"
// //             fill="none"
// //             strokeWidth={3}
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //           />

// //           {/* Data points */}
// //           {scores.map((value, index) => {
// //             const x = 40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
// //             const y = height - 40 - (value / 100) * (height - 80);
// //             return (
// //               <g key={index}>
// //                 <circle
// //                   cx={x}
// //                   cy={y}
// //                   r={4}
// //                   fill="#9a6fb0"
// //                   stroke="#fff"
// //                   strokeWidth={2}
// //                 />
// //                 {/* Value label above point */}
// //                 <text
// //                   x={x}
// //                   y={y - 10}
// //                   fontSize="10"
// //                   fill="#9a6fb0"
// //                   textAnchor="middle"
// //                   fontWeight="bold"
// //                 >
// //                   {value}%
// //                 </text>
// //               </g>
// //             );
// //           })}
// //         </svg>
// //       </div>

// //       {/* Day labels */}
// //       {/* <div className="d-flex justify-content-between px-4 mt-2">
// //         {days.map((day, index) => (
// //           <span
// //             key={index}
// //             className="small text-muted text-center"
// //             style={{ width: `${(width - 80) / (days.length - 1)}px`, marginLeft: index === 0 ? '0' : `-${(width - 80) / (days.length - 1) / 2}px` }}
// //           >
// //             {day}
// //           </span>
// //         ))}
// //       </div> */}
// //       {dayLabels.map((label, index) => (
// //       <span key={index} className="small text-muted text-center">
// //         {label}
// //       </span>
// //     ))}

// //       {/* Second row of day labels (as shown in image) */}
// //       <div className="d-flex justify-content-between px-4 mt-1">
// //         {/* {days.map((day, index) => (
// //           <span
// //             key={index}
// //             className="small text-muted text-center"
// //             style={{ width: `${(width - 80) / (days.length - 1)}px`, marginLeft: index === 0 ? '0' : `-${(width - 80) / (days.length - 1) / 2}px` }}
// //           >
// //             {day}
// //           </span>
// //         ))} */}

// //       </div>
// //     </div>
// //   );
// // }
// import React from 'react';

// interface WellnessGraphProps {
//   data: { date: string; avg_score: number ; mood_counts: { [key: string]: number } }[];
//   width?: number;
//   height?: number;
// }

// export default function WellnessGraph({
//   data,
//   width = 472,
//   height = 265
// }: WellnessGraphProps): React.JSX.Element {

//   console.log('WellnessGraph received data:', data);

//   // Handle no data
//   if (!data || data.length === 0) {
//     return (
//       <div
//         className="d-flex align-items-center justify-content-center border rounded bg-light"
//         style={{ width, height }}
//       >
//         <span className="text-muted">No wellness data available</span>
//       </div>
//     );
//   }

//   // Filter only valid points
//   const validData = data.filter(
//     point =>
//       point &&
//       typeof point.avg_score === "number" &&
//       !isNaN(point.avg_score) &&
//       point.avg_score >= 0 &&
//       point.avg_score <= 100
//   );

//   if (validData.length === 0) {
//     return (
//       <div
//         className="d-flex align-items-center justify-content-center border rounded bg-light"
//         style={{ width, height }}
//       >
//         <span className="text-muted">No valid wellness scores</span>
//       </div>
//     );
//   }

//   // Extract scores
//   const scores = validData.map(point => point.avg_score);

//   // Convert dates → weekday + day number labels
//   const dayLabels = validData.map(point => {
//     const d = new Date(point.date);
//     return d.toLocaleDateString("en-US", { weekday: "short" });
//   });

//   const dateLabels = validData.map(point => {
//     const d = new Date(point.date);
//     return d.getDate().toString();
//   });

//   // Build line path
//   let linePath = "";
//   if (scores.length === 1) {
//     // When only one point → draw a short horizontal line
//     const x = 40 + (width - 80) / 2;
//     const y = height - 40 - (scores[0] / 100) * (height - 80);
//     linePath = `M ${x - 10},${y} L ${x + 10},${y}`;
//   } else {
//     linePath =
//       "M " +
//       scores
//         .map((value, index) => {
//           const x =
//             40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
//           const y = height - 40 - (value / 100) * (height - 80);
//           return `${x},${y}`;
//         })
//         .join(" L ");
//   }

//   return (
//     <div className="wellness-graph" style={{ width, height }}>
//       {/* Title */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0 fw-bold">Mood %</h5>
//         <div className="text-muted small">
//           <span className="me-3">0-0</span>
//           <span>0-0.0</span>
//         </div>
//       </div>

//       {/* Main Graph */}
//       <div className="position-relative">
//         <svg width={width} height={height - 40} style={{ background: "transparent" }}>

//           {/* Y-axis */}
//           <line
//             x1="40"
//             y1="20"
//             x2="40"
//             y2={height - 60}
//             stroke="#e0e0e0"
//             strokeWidth="1"
//           />

//           {/* X-axis */}
//           <line
//             x1="40"
//             y1={height - 60}
//             x2={width - 40}
//             y2={height - 60}
//             stroke="#e0e0e0"
//             strokeWidth="1"
//           />

//           {/* Y-axis grid + labels */}
//           {[0, 25, 50, 75, 100].map((value, index) => {
//             const y = 20 + (index / 4) * (height - 100);
//             return (
//               <g key={value}>
//                 <text
//                   x="30"
//                   y={y + 4}
//                   fontSize="10"
//                   fill="#666"
//                   textAnchor="end"
//                   alignmentBaseline="middle"
//                 >
//                   {value}
//                 </text>
//                 <line
//                   x1="35"
//                   y1={y}
//                   x2={width - 40}
//                   y2={y}
//                   stroke="#f0f0f0"
//                   strokeWidth="1"
//                 />
//               </g>
//             );
//           })}

//           {/* Line path */}
//           <path
//             d={linePath}
//             stroke="#9a6fb0"
//             fill="none"
//             strokeWidth={3}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />

//           {/* Data points + labels */}
//           {scores.map((value, index) => {
//             const x =
//               40 + (index / Math.max(1, scores.length - 1)) * (width - 80);
//             const y = height - 40 - (value / 100) * (height - 80);

//             return (
//               <g key={index}>
//                 <circle
//                   cx={x}
//                   cy={y}
//                   r={4}
//                   fill="#9a6fb0"
//                   stroke="#fff"
//                   strokeWidth={2}
//                 />

//                 <text
//                   x={x}
//                   y={y - 10}
//                   fontSize="10"
//                   fill="#9a6fb0"
//                   textAnchor="middle"
//                   fontWeight="bold"
//                 >
//                   {value}%
//                 </text>
//               </g>
//             );
//           })}
//         </svg>
//       </div>

//       {/* --- Bottom Labels (Two rows) --- */}

//       {/* Weekday row */}
//       <div className="d-flex justify-content-between px-4 mt-2">
//         {dayLabels.map((label, i) => (
//           <span
//             key={i}
//             className="small text-muted text-center"
//             style={{ width: `${(width - 80) / (dayLabels.length - 1)}px` }}
//           >
//             {label}
//           </span>
//         ))}
//       </div>

//       {/* Numeric date row */}
//       <div className="d-flex justify-content-between px-4 mt-1">
//         {dateLabels.map((label, i) => (
//           <span
//             key={i}
//             className="small text-muted text-center"
//             style={{ width: `${(width - 80) / (dateLabels.length - 1)}px` }}
//           >
//             {label}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
