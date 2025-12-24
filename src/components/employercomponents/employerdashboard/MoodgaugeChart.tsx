import React from "react";

interface MoodGaugeChartProps {
  moodLabel: string; // The corresponding mood string (e.g., "Good", "Neutral")
}

const MoodGaugeChart: React.FC<MoodGaugeChartProps> = ({ moodLabel }) => {
  // Define the 5 colors: teal, green, yellow, orange, red (flipped for positive to negative)
  const colors = ["#14b8a6", "#22c55e", "#facc15", "#f97316", "#ef4444"];
  // Emojis for each segment
  const emojis = ["😊", "🙂", "😐", "🙁", "😞"];

  // Remove "Needs Attention" from moodLabel if present
  const cleanedMoodLabel =
    moodLabel.replace("Needs Attention", "").trim() || "Neutral";

  // Maps a string mood to a numeric score (0-999) for the gauge.
  const getScoreFromMood = (mood: string): number => {
    const moodMap: { [key: string]: number } = {
      Great: 900,
      Good: 700,
      Neutral: 500,
      Bad: 300,
      Terrible: 100,
    };
    return moodMap[mood] || 500;
  };

  const score = getScoreFromMood(cleanedMoodLabel);
  const clampedScore = Math.min(Math.max(score, 0), 1000);

  // Calculate needle angle: 0 score = 180deg (left), 1000 score = 0deg (right)
  const needleAngle = 180 - (clampedScore / 1000) * 180;

  // SVG parameters - Centered for a 220x110 viewing area
  const centerX = 110;
  const centerY = 100; // The "floor" of our semi-circle
  const radius = 90;
  const segmentAngle = 36; // 180 / 5 segments

  // Function to generate path for each segment
  const getSegmentPath = (startAngle: number, endAngle: number) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    const largeArcFlag = 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${centerX} ${centerY} Z`;
  };

  // Function to get emoji position
  const getEmojiPosition = (angle: number) => {
    const angleRad = (angle * Math.PI) / 180;
    const emojiRadius = radius * 0.7;
    const x = centerX + emojiRadius * Math.cos(angleRad);
    const y = centerY + emojiRadius * Math.sin(angleRad);
    return { x, y };
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
      {/* Title */}
      <h6
        className="fw-bold mb-3 text-center"
        style={{ color: "#000000", fontSize: "0.9rem" }}
      >
        Mood Tracker
      </h6>

      {/* SVG Gauge - Cropped to show only the top half */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <svg
          width=" 400"
          height="300"
          viewBox="0 0 220 110"
          style={{ display: "block" }}
        >
          {/* Group rotates the entire gauge system 180 degrees around the center point */}
          <g transform={`rotate(180 ${centerX} ${centerY})`}>
            {/* Draw segments */}
            {colors.map((color, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              return (
                <path
                  key={index}
                  d={getSegmentPath(startAngle, endAngle)}
                  fill={color}
                />
              );
            })}

            {/* Draw emojis */}
            {emojis.map((emoji, index) => {
              const angle = (index + 0.5) * segmentAngle;
              const { x, y } = getEmojiPosition(angle);
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="20"
                  // Re-rotate text so emojis aren't upside down
                  transform={`rotate(-180 ${x} ${y})`}
                  style={{
                    filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
                    pointerEvents: "none",
                  }}
                >
                  {emoji}
                </text>
              );
            })}

            {/* Needle */}
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + radius * Math.cos((needleAngle * Math.PI) / 180)}
              y2={centerY + radius * Math.sin((needleAngle * Math.PI) / 180)}
              stroke="#374151"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Needle hub */}
            <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
          </g>
        </svg>
      </div>

      {/* Optional: Mood Label Text underneath */}
      <div
        className="mt-2 fw-bold"
        style={{ color: "#374151", fontSize: "0.85rem" }}
      >
        {cleanedMoodLabel}
      </div>
    </div>
  );
};

export default MoodGaugeChart;

// // // src/components/employerdashboard/MoodgaugeChart.tsx
// import React from 'react';

// interface MoodGaugeChartProps {
//   moodLabel: string;
// }

// const MoodGaugeChart: React.FC<MoodGaugeChartProps> = ({ moodLabel }) => {
//   // Define the 5 colors: red, orange, yellow, light green, teal
//   const colors = ['#ef4444', '#f97316', '#facc15', '#84cc16', '#14b8a6'];
//   // Emojis for each segment: very unhappy to very happy
//   const emojis = ['😞', '🙁', '😐', '🙂', '😊'];

//   // Remove "Needs Attention" from moodLabel if present
//   const cleanedMoodLabel = moodLabel.replace("Needs Attention", "").trim() || "Neutral";

//   // Maps a string mood to a numeric score (0-999) for the gauge.
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
//   };

//   // Calculate score from moodLabel
//   const score = getScoreFromMood(cleanedMoodLabel);

//   // Clamp score between 0 and 1000
//   const clampedScore = Math.min(Math.max(score, 0), 1000);

//   // Calculate needle angle: 0 score = 180deg (left), 1000 score = 0deg (right)
//   const needleAngle = 180 - (clampedScore / 1000) * 180;

//   // SVG parameters
//   const centerX = 100;
//   const centerY = 100;
//   const outerRadius = 90;
//   const innerRadius = 70;
//   const segmentAngle = 36; // 180 / 5 = 36 degrees per segment

//   // Function to calculate coordinates on the arc
//   const getCoords = (radius: number, angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const x = centerX + radius * Math.cos(angleRad);
//     const y = centerY + radius * Math.sin(angleRad);
//     return { x, y };
//   };

//   // Function to generate path for each segment
//   const getSegmentPath = (startAngle: number, endAngle: number) => {
//     const start = getCoords(innerRadius, startAngle);
//     const end = getCoords(innerRadius, endAngle);
//     const outerStart = getCoords(outerRadius, startAngle);
//     const outerEnd = getCoords(outerRadius, endAngle);
//     const largeArcFlag = segmentAngle > 180 ? 1 : 0;

//     // Path for the thick arc segment (Colored area)
//     return `M ${outerStart.x} ${outerStart.y}
//             A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
//             L ${end.x} ${end.y}
//             A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${start.x} ${start.y}
//             Z`;
//   };

//   // Function to get emoji position (positioned in the middle of the colored arc)
//   const getEmojiPosition = (angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     // Position the emoji between the inner and outer radius
//     const emojiRadius = (innerRadius + outerRadius) / 2;
//     const x = centerX + emojiRadius * Math.cos(angleRad);
//     const y = centerY + emojiRadius * Math.sin(angleRad);
//     return { x, y };
//   };

//   // Outer boundary path (for the grey rim)
//   const getOuterBoundaryPath = (radius: number) => {
//     const start = getCoords(radius, 180);
//     const end = getCoords(radius, 0);
//     return `M ${start.x} ${start.y}
//             A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100 p-0">

//       {/* Title */}
//       <h6 className="fw-bold mb-1 text-center" style={{ color: '#166534', fontSize: '0.9rem' }}>
//         Mood Tracker
//       </h6>

//       {/* SVG Gauge */}
//       <div style={{ width: '100%', height: '200px', position: 'relative' }}>
//         <svg width="100%" height="200" viewBox="0 0 200 200">

//           {/* 1. Outer Grey Scale (Boundary) */}
//           <path
//             d={getOuterBoundaryPath(outerRadius + 5)} // Use a slightly larger radius for the outer gray boundary
//             fill="none"
//             stroke="#e5e7eb"
//             strokeWidth="10" // Adjust thickness of the border
//             strokeLinecap="round"
//             style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.2))' }}
//           />

//           {/* 2. White Inner Rim (to make the gauge colors contained) */}
//           <path
//             d={getOuterBoundaryPath(outerRadius)}
//             fill="none"
//             stroke="#ffffff"
//             strokeWidth="0" // Thickness of the inner white rim
//             strokeLinecap="round"
//           />

//           {/* 3. Draw colored segments (using the thick arc segment function) */}
//           {colors.map((color, index) => {
//             // Segments run from 180 degrees (left) down to 0 degrees (right)
//             const startAngle = 180 - index * segmentAngle;
//             const endAngle = startAngle - segmentAngle;
//             const path = getSegmentPath(startAngle, endAngle);

//             return (
//               <path
//                 key={index}
//                 d={path}
//                 fill={color}
//                 // Add white stroke between segments for separation line effect
//                 stroke="white"
//                 strokeWidth={index < colors.length - 1 ? 2 : 0}
//               />
//             );
//           })}

//           {/* 4. Draw emojis */}
//           {emojis.map((emoji, index) => {
//             const angle = 180 - (index + 0.5) * segmentAngle;
//             const { x, y } = getEmojiPosition(angle);

//             return (
//               <text
//                 key={index}
//                 x={x}
//                 y={y}
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fontSize="24"
//                 fill="white"
//                 style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
//               >
//                 {emoji}
//               </text>
//             );
//           })}

//           {/* 5. Needle */}
//           <line
//             x1={centerX}
//             x2={centerX + outerRadius * Math.cos((needleAngle * Math.PI) / 180)}
//             y1={centerY}
//             y2={centerY - outerRadius * Math.sin((needleAngle * Math.PI) / 180)}
//             stroke="#374151"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />
//           {/* Needle hub */}
//           <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
//         </svg>
//       </div>

//       {/* Text displayed below the gauge
//       <div className="mt-3">
//         <h5 className="fw-bold mb-0 text-center" style={{ color: '#166534' }}>
//           {cleanedMoodLabel}
//         </h5>
//         <p className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
//           Score: {score}/1000
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default MoodGaugeChart;

// import React from 'react';

// interface MoodGaugeChartProps {
//   moodLabel: string; // The corresponding mood string (e.g., "Good", "Neutral")
// }

// const MoodGaugeChart: React.FC<MoodGaugeChartProps> = ({ moodLabel }) => {
//   // Define the 5 colors: teal, green, yellow, orange, red (flipped)
//   const colors = ['#14b8a6', '#22c55e', '#facc15', '#f97316', '#ef4444'];
//   // Emojis for each segment: great, good, neutral, bad, terrible (flipped)
//   const emojis = ['😊', '🙂', '😐', '🙁', '😞'];

//   // Remove "Needs Attention" from moodLabel if present
//   const cleanedMoodLabel = moodLabel.replace("Needs Attention", "").trim() || "Neutral";

//   // Maps a string mood to a numeric score (0-999) for the gauge.
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
//   };

//   // Calculate score from moodLabel
//   const score = getScoreFromMood(cleanedMoodLabel);

//   // Clamp score between 0 and 1000
//   const clampedScore = Math.min(Math.max(score, 0), 1000);

//   // Calculate needle angle: 0 score = 180deg (left), 1000 score = 0deg (right) - adjusted for upside down
//   const needleAngle = 180 - (clampedScore / 1000) * 180;

//   // SVG parameters
//   const centerX = 80;
//   const centerY = 110;
//   const radius = 90;
//   const segmentAngle = 36; // 180 / 5 = 36 degrees per segment

//   // Function to generate path for each segment
//   const getSegmentPath = (startAngle: number, endAngle: number) => {
//     const startAngleRad = (startAngle * Math.PI) / 180;
//     const endAngleRad = (endAngle * Math.PI) / 180;
//     const x1 = centerX + radius * Math.cos(startAngleRad);
//     const y1 = centerY + radius * Math.sin(startAngleRad);
//     const x2 = centerX + radius * Math.cos(endAngleRad);
//     const y2 = centerY + radius * Math.sin(endAngleRad);
//     const largeArcFlag = segmentAngle > 180 ? 1 : 0;
//     return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${centerX} ${centerY} Z`;
//   };

//   // Function to get emoji position
//   const getEmojiPosition = (angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const emojiRadius = radius * 0.7;
//     const x = centerX + emojiRadius * Math.cos(angleRad);
//     const y = centerY + emojiRadius * Math.sin(angleRad);
//     return { x, y };
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 p-0" style={{ paddingTop: '0px' }}>
//       {/* Title */}
//       <h6 className="fw-bold mb-0 text-center" style={{ color: '#166534', fontSize: '0.9rem' }}>
//         Mood Tracker
//       </h6>

//       {/* SVG Gauge */}
//       <div style={{ width: '100%', height: '300px', position: 'relative', marginTop: '-20px' }}>
//         <svg width="100%" height="300" viewBox="0 0 200 200" transform="rotate(180 100 100)">
//           {/* Draw segments */}
//           {colors.map((color, index) => {
//             const startAngle = index * segmentAngle;
//             const endAngle = startAngle + segmentAngle;
//             const path = getSegmentPath(startAngle, endAngle);
//             return <path key={index} d={path} fill={color} />;
//           })}

//           {/* Draw emojis */}
//           {emojis.map((emoji, index) => {
//             const angle = (index + 0.5) * segmentAngle;
//             const { x, y } = getEmojiPosition(angle);
//             return (
//               <text
//                 key={index}
//                 x={x}
//                 y={y}
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fontSize="20"
//                 fill="white"
//                 transform={`rotate(-180 ${x} ${y})`}
//                 style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
//               >
//                 {emoji}
//               </text>
//             );
//           })}

//           {/* Needle */}
//           <line
//             x1={centerX}
//             y1={centerY}
//             x2={centerX + radius * Math.cos((needleAngle * Math.PI) / 180)}
//             y2={centerY + radius * Math.sin((needleAngle * Math.PI) / 180)}
//             stroke="#374151"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />
//           {/* Needle hub */}
//           <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default MoodGaugeChart;

// import React from 'react';

// interface MoodGaugeChartProps {
//   moodLabel: string; // The corresponding mood string (e.g., "Good", "Neutral")
// }

// const MoodGaugeChart: React.FC<MoodGaugeChartProps> = ({ moodLabel }) => {
//   // Define the 5 colors: teal, green, yellow, orange, red (flipped)
//   const colors = ['#14b8a6', '#22c55e', '#facc15', '#f97316', '#ef4444'];
//   // Emojis for each segment: great, good, neutral, bad, terrible (flipped)
//   const emojis = ['😊', '🙂', '😐', '🙁', '😞'];

//   // Remove "Needs Attention" from moodLabel if present
//   const cleanedMoodLabel = moodLabel.replace("Needs Attention", "").trim() || "Neutral";

//   // Maps a string mood to a numeric score (0-999) for the gauge.
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
//   };

//   // Calculate score from moodLabel
//   const score = getScoreFromMood(cleanedMoodLabel);

//   // Clamp score between 0 and 1000
//   const clampedScore = Math.min(Math.max(score, 0), 1000);

//   // Calculate needle angle: 0 score = 180deg (left), 1000 score = 0deg (right) - adjusted for upside down
//   const needleAngle = 180 - (clampedScore / 1000) * 180;

// //   // SVG parameters
// //   const centerX = 150; // <--- CHANGED: Set to 100 to center the gauge in a 200px wide viewBox
// //   const centerY = 150; // <--- CHANGED: Adjusted to 100 for better vertical centering
// //   const radius = 100;
// //   const segmentAngle = 36; // 180 / 5 = 36 degrees per segment

// //    const centerX = 80;
// //   const centerY = 110;
// //  const radius = 90;
// //   const segmentAngle = 36

//  const centerX = 200;
//  const centerY = 100;
//  const radius = 95; // Increased radius slightly to accommodate the border
// //   const innerRadius = 80; // Radius for the color segments (gauge thickness)
//  const segmentAngle = 36; // 180 / 5 = 36 degrees per segment

//   // Function to generate path for each segment
//   const getSegmentPath = (startAngle: number, endAngle: number) => {
//     const startAngleRad = (startAngle * Math.PI) / 180;
//     const endAngleRad = (endAngle * Math.PI) / 180;
//     const x1 = centerX + radius * Math.cos(startAngleRad);
//     const y1 = centerY + radius * Math.sin(startAngleRad);
//     const x2 = centerX + radius * Math.cos(endAngleRad);
//     const y2 = centerY + radius * Math.sin(endAngleRad);
//     const largeArcFlag = segmentAngle > 180 ? 1 : 0;
//     return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${centerX} ${centerY} Z`;
//   };

//   // Function to get emoji position
//   const getEmojiPosition = (angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const emojiRadius = radius * 0.7;
//     const x = centerX + emojiRadius * Math.cos(angleRad);
//     const y = centerY + emojiRadius * Math.sin(angleRad);
//     return { x, y };
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center h-90 w-100 p-0" style={{ paddingTop: '0px' }}>
//       {/* Title */}
//       <h6 className="fw-bold mb-0 text-center" style={{ color: '#166534', fontSize: '0.9rem' }}>
//         Mood Tracker
//       </h6>

//       {/* SVG Gauge */}
//       <div style={{ width: '100%', height: '300px', position: 'relative' }}>
//         <svg width="100%" height="300" viewBox="0 0 200 200" transform="rotate(180 100 100)">
//           {/* Draw segments */}
//           {colors.map((color, index) => {
//             const startAngle = index * segmentAngle;
//             const endAngle = startAngle + segmentAngle;
//             const path = getSegmentPath(startAngle, endAngle);
//             return <path key={index} d={path} fill={color} />;
//           })}

//           {/* Draw emojis */}
//           {emojis.map((emoji, index) => {
//             const angle = (index + 0.5) * segmentAngle;
//             const { x, y } = getEmojiPosition(angle);
//             return (
//               <text
//                 key={index}
//                 x={x}
//                 y={y}
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fontSize="20"
//                 fill="white"
//                 transform={`rotate(-180 ${x} ${y})`}
//                 style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
//               >
//                 {emoji}
//               </text>
//             );
//           })}

//           {/* Needle */}
//           <line
//             x1={centerX}
//             y1={centerY}
//             x2={centerX + radius * Math.cos((needleAngle * Math.PI) / 180)}
//             y2={centerY + radius * Math.sin((needleAngle * Math.PI) / 180)}
//             stroke="#374151"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />
//           {/* Needle hub */}
//           <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default MoodGaugeChart;
// import React from 'react';

// interface MoodGaugeChartProps {
//   moodLabel: string; // The corresponding mood string (e.g., "Good", "Neutral")
// }

// const MoodGaugeChart: React.FC<MoodGaugeChartProps> = ({ moodLabel }) => {
//   // Define the 5 colors: terrible, bad, neutral, good, great
//   const colors = ['#ef4444', '#f97316', '#facc15', '#84cc16', '#22c55e']; // Updated green to match standard gauge colors
//   // Emojis for each segment: terrible, bad, neutral, good, great
//   const emojis = ['😞', '🙁', '😐', '🙂', '😊'];

//   // Remove "Needs Attention" from moodLabel if present
//   const cleanedMoodLabel = moodLabel.replace("Needs Attention", "").trim() || "Neutral";

//   // Maps a string mood to a numeric score (0-999) for the gauge.
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
//   };

//   // Calculate score from moodLabel
//   const score = getScoreFromMood(cleanedMoodLabel);

//   // Clamp score between 0 and 1000
//   const clampedScore = Math.min(Math.max(score, 0), 1000);

//   // Calculate needle angle: 0 score = 180deg (left), 1000 score = 0deg (right)
//   const needleAngle = 180 - (clampedScore / 1000) * 180;

//   // SVG parameters
//   const centerX = 100;
//   const centerY = 110;
//   const outerRadius = 95; // Increased radius slightly to accommodate the border
//   const innerRadius = 80; // Radius for the color segments (gauge thickness)
//   const segmentAngle = 36; // 180 / 5 = 36 degrees per segment

//   // Function to calculate coordinates on the arc
//   const getCoords = (radius: number, angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const x = centerX + radius * Math.cos(angleRad);
//     const y = centerY + radius * Math.sin(angleRad);
//     return { x, y };
//   };

//   // Function to generate path for each segment
//   const getSegmentPath = (startAngle: number, endAngle: number) => {
//     const start = getCoords(innerRadius, startAngle);
//     const end = getCoords(innerRadius, endAngle);
//     const outerStart = getCoords(outerRadius, startAngle);
//     const outerEnd = getCoords(outerRadius, endAngle);
//     const largeArcFlag = segmentAngle > 180 ? 1 : 0;

//     // Path for the thick arc segment (Colored area)
//     return `M ${outerStart.x} ${outerStart.y}
//             A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
//             L ${end.x} ${end.y}
//             A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${start.x} ${start.y}
//             Z`;
//   };

//   // Function to get emoji position (positioned in the middle of the colored arc)
//   const getEmojiPosition = (angle: number) => {
//     const angleRad = (angle * Math.PI) / 180;
//     // Position the emoji between the inner and outer radius
//     const emojiRadius = (innerRadius + outerRadius) / 2;
//     const x = centerX + emojiRadius * Math.cos(angleRad);
//     const y = centerY + emojiRadius * Math.sin(angleRad);
//     return { x, y };
//   };

//   // Outer boundary path (for the grey rim)
//   const getOuterBoundaryPath = (radius: number) => {
//     const start = getCoords(radius, 180);
//     const end = getCoords(radius, 0);
//     return `M ${start.x} ${start.y}
//             A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100 p-0">

//       {/* Title */}
//       <h6 className="fw-bold mb-1 text-center" style={{ color: '#166534', fontSize: '0.9rem' }}>
//         General Company Mood
//       </h6>

//       {/* SVG Gauge */}
//       <div style={{ width: '100%', height: '180px', position: 'relative' }}>
//         {/* Adjusted viewBox to show the entire arc including the border */}
//         <svg width="100%" height="180" viewBox="0 10 200 160">

//           {/* 1. Outer Grey Scale (Boundary) */}
//           <path
//             d={getOuterBoundaryPath(outerRadius + 5)} // Use a slightly larger radius for the outer gray boundary
//             fill="none"
//             stroke="#e5e7eb"
//             strokeWidth="10" // Adjust thickness of the border
//             strokeLinecap="round"
//             style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.2))' }}
//           />

//           {/* 2. White Inner Rim (to make the gauge colors contained) */}
//           <path
//             d={getOuterBoundaryPath(outerRadius)}
//             fill="none"
//             stroke="#ffffff"
//             strokeWidth="5" // Thickness of the inner white rim
//             strokeLinecap="round"
//           />

//           {/* 3. Draw colored segments (using the thick arc segment function) */}
//           {colors.map((color, index) => {
//             // Segments run from 180 degrees (left) down to 0 degrees (right)
//             const startAngle = 180 - index * segmentAngle;
//             const endAngle = startAngle - segmentAngle;
//             const path = getSegmentPath(startAngle, endAngle);

//             return (
//               <path
//                 key={index}
//                 d={path}
//                 fill={color}
//                 // Add white stroke between segments for separation line effect
//                 stroke="white"
//                 strokeWidth={index < colors.length - 1 ? 2 : 0}
//               />
//             );
//           })}

//           {/* 4. Draw emojis */}
//           {emojis.map((emoji, index) => {
//             const angle = 180 - (index + 0.5) * segmentAngle;
//             const { x, y } = getEmojiPosition(angle);

//             // Adjust emoji position vertically based on index to move them higher/lower
//             let yAdjust = 0;
//             if (index === 0 || index === 4) yAdjust = -5; // Move edges slightly up

//             return (
//               <text
//                 key={index}
//                 x={x}
//                 y={y + yAdjust}
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fontSize="20"
//                 fill="white" // Emojis now white for better contrast
//                 style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
//               >
//                 {emoji}
//               </text>
//             );
//           })}

//           {/* 5. Needle */}
//           <line
//             x1={centerX}
//             y1={centerY}
//             x2={centerX + outerRadius * Math.cos((needleAngle * Math.PI) / 180)}
//             y2={centerY + outerRadius * Math.sin((needleAngle * Math.PI) / 180)}
//             stroke="#374151"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />
//           {/* Needle hub */}
//           <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
//         </svg>
//       </div>

//       {/* Text displayed below the gauge
//       <div className="mt-3">
//         <h5 className="fw-bold mb-0 text-center" style={{ color: '#166534' }}>
//           {cleanedMoodLabel}
//         </h5>
//         <p className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
//           Score: {score}/1000
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default MoodGaugeChart;
