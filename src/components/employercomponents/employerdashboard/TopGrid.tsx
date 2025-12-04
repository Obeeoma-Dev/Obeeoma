// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   UsersRound,
//   TrendingUp,
// } from "lucide-react";
// import React from "react";
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// // We need to import annotationPlugin and datalabels for use
// import annotationPlugin from 'chartjs-plugin-annotation';
// import datalabels from 'chartjs-plugin-datalabels';

// // Register Chart.js elements and plugins
// ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, datalabels);


// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
//   Users, 
// };

// // --- Define Constants ---
// const PRIMARY_COLOR = "#22C55E";
// const SECONDARY_COLOR = "#6c757d";
// const DARK_TEXT_COLOR = "#343a40";

// // --- Gauge Configuration Constants ---
// const MAX_SCORE = 999;
// // Colors mapping to the gauge segments (Red, Orange, Yellow, Green, Teal)
// const GAUGE_COLORS = [
//     '#DC3545', // Red (Bad)
//     '#FD7E14', // Orange (Slightly Bad)
//     '#FFC107', // Yellow (Neutral)
//     '#17A2B8', // Teal (Slightly Good) - Used instead of PRIMARY_COLOR for contrast/variety in the gauge arc
//     PRIMARY_COLOR, // Green (Great)
// ];
// // Background color for the unused part of the gauge
// const GAUGE_BACKGROUND = '#e9ecef';


// /**
//  * Maps a score (0-MAX_SCORE) to one of the five color segments.
//  * This determines the color of the score label in the center.
//  */
// const getMoodColorFromScore = (score: number): string => {
//   if (score < MAX_SCORE * 0.2) return GAUGE_COLORS[0];  // Red
//   if (score < MAX_SCORE * 0.4) return GAUGE_COLORS[1];  // Orange
//   if (score < MAX_SCORE * 0.6) return GAUGE_COLORS[2];  // Yellow
//   if (score < MAX_SCORE * 0.8) return GAUGE_COLORS[3];  // Teal
//   return GAUGE_COLORS[4];  // Green
// };


// //  Define a Utility Function for Icon Retrieval ---
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users; 
// };

// // --- 3. Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap | 'Users'; 
//   color: string; 
//   onClick?: () => void;
//   description?: string; 
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// /**
//  * Function to generate Chart.js options for the semi-circle mood gauge.
//  * @param rawValue The current mood score (e.g., "999").
//  */
// const getMoodChartOptions = (rawValue: string) => {
//     const score = parseInt(rawValue) || 0;
//     const color = getMoodColorFromScore(score);

//     // The gauge data is divided into 5 equal color segments and one large grey segment
//     const segmentSize = MAX_SCORE / 5;
//     const segmentData = GAUGE_COLORS.map((_, index) => {
//         // Calculate the slice of the current score that falls into this segment
//         const segmentStart = index * segmentSize;
//         const segmentEnd = (index + 1) * segmentSize;

//         if (score >= segmentEnd) {
//             // Score covers the whole segment
//             return segmentSize;
//         } else if (score > segmentStart) {
//             // Score partially covers the segment
//             return score - segmentStart;
//         }
//         // Score does not reach this segment
//         return 0;
//     });

//     // The total length of the colored arc
//     const coloredArcLength = segmentData.reduce((sum, size) => sum + size, 0);

//     // The remaining uncolored segment (grey)
//     const remainingArc = MAX_SCORE - coloredArcLength;


//     const data = {
//         // We use the 5 colors for the arc and the remaining grey segment
//         labels: ['Red', 'Orange', 'Yellow', 'Teal', 'Green', 'Remaining'], 
//         datasets: [{
//             data: [...segmentData, remainingArc],
//             backgroundColor: [...GAUGE_COLORS, GAUGE_BACKGROUND],
//             borderColor: '#fff', // Border color between segments
//             borderWidth: 1, 
//         }]
//     };

//     return {
//         data: data,
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             // --- Gauge Configuration ---
//             aspectRatio: 2, // Width is twice the height for semi-circle space
//             circumference: 180, // Half a circle
//             rotation: -90, // Start the arc from the bottom left
//             cutout: '80%', // Thin arc
//             plugins: {
//                 legend: { display: false },
//                 tooltip: { enabled: false }, // Tooltip disabled for a clean gauge look
//                 datalabels: { enabled: false }, // Datalabels disabled for a clean gauge look
//                 annotation: {
//                     annotations: {
//                         // --- Custom Doughnut Center Label Annotation ---
//                         moodLabel: {
//                             type: 'label',
//                             content: [
//                                 `${score} OF ${MAX_SCORE}`, // The percentage of the mood
//                                 'YOUR SCORE:', // Subtitle
//                             ],
//                             font: [
//                                 { size: 50, weight: 'bold', family: 'heading', color: color }, // Score
//                                 { size: 16, weight: 'normal', family: 'body', color: DARK_TEXT_COLOR } // Label
//                             ],
//                             // Position in the center of the semi-circle base
//                             position: 'center',
//                             yAdjust: 30, // Adjust vertical position to the center of the arc base
//                             backgroundColor: 'rgba(0,0,0,0)', // No background fill
//                         },
//                          // --- Emojis (Simple annotations are tricky, using a fixed element for clean center text) ---
//                         // To accurately place the emojis like the image, a different library or manual HTML positioning is better.
//                         // For a pure Chart.js annotation, we'll focus on the center text.
//                     }
//                 },
//             } as any, // Cast options to any due to annotation type
//         }
//     };
// };


// // --- 4. The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
//         
//         // Determine color logic
//         const isPrimaryColor = stat.color === PRIMARY_COLOR || stat.color === '#22C55E';
//         const isSecondaryColor = stat.color === 'secondary';

//         // Green for primary, Grey for secondary
//         const iconColor = isPrimaryColor ? PRIMARY_COLOR : (isSecondaryColor ? SECONDARY_COLOR : DARK_TEXT_COLOR);
//         // Very light background shade
//         const iconBgColor = isPrimaryColor ? `${PRIMARY_COLOR}15` : '#e9ecef';

//         // Card Type Logic
//         const isStatCard = stat.title.includes("Total Employees");
//         const isMoodCard = stat.title.includes("mood");
//         
//         // Mood card requires space for the chart, others are smaller
//         const iconSize = isMoodCard ? 150 : 48;

//         const iconContainerStyle = {
//           width: `${iconSize}px`,
//           height: `${iconSize}px`,
//           fontFamily: "body",
//           backgroundColor: isMoodCard ? 'transparent' : iconBgColor, // No background for mood chart
//           color: iconColor,
//         };

//         const chartDataAndOptions = isMoodCard ? getMoodChartOptions(stat.value.toString()) : null;


//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div
//               // Uniform white background, shadow, and border-radius
//               className="card h-100 border-0 shadow-sm p-3 bg-white" 
//               style={{
//                 borderRadius: '10px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 height: isMoodCard ? '220px' : 'auto', // Give mood card more height for the gauge
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               <div className={`card-body p-0 d-flex flex-column align-items-center justify-content-center h-100`}>

//                 {isMoodCard && chartDataAndOptions ? (
//                   <>
//                     {/* The chart wrapper. This needs to be tall enough for the semi-circle */}
//                     <div
//                         className="position-relative d-flex align-items-center justify-content-center"
//                         style={{ width: '100%', height: '100%', minHeight: '180px' }}
//                     >
//                         {/* Emojis positioned manually (simplified) */}
//                         <span 
//                             role="img" 
//                             aria-label="sad" 
//                             style={{ position: 'absolute', left: '10%', bottom: '10%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[0] }}
//                         >
//                             🙁
//                         </span>
//                         <span 
//                             role="img" 
//                             aria-label="bad" 
//                             style={{ position: 'absolute', left: '25%', bottom: '50%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[1] }}
//                         >
//                             🙁
//                         </span>
//                         <span 
//                             role="img" 
//                             aria-label="neutral" 
//                             style={{ position: 'absolute', left: '50%', bottom: '80%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[2] }}
//                         >
//                             😐
//                         </span>
//                         <span 
//                             role="img" 
//                             aria-label="good" 
//                             style={{ position: 'absolute', right: '25%', bottom: '50%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[3] }}
//                         >
//                             🙂
//                         </span>
//                         <span 
//                             role="img" 
//                             aria-label="great" 
//                             style={{ position: 'absolute', right: '10%', bottom: '10%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[4] }}
//                         >
//                             😀
//                         </span>

//                         {/* Doughnut Gauge Chart */}
//                         <Doughnut 
//                           data={chartDataAndOptions.data} 
//                           options={chartDataAndOptions.options as any}
//                         />
//                     </div>
//                      {/* Title below the chart, if needed (It's currently in the annotation) */}
//                   </>
//                 ) : (
//                   <>
//                     {/* Standard Icon/Text Layout (Kept the same) */}
//                     {/* 1. Icon Container */}
//                     <div
//                       className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3`}
//                       style={iconContainerStyle}
//                     >
//                       <IconComponent size={24} color={iconColor} />
//                     </div>

//                     {/* 2. Text Content */}
//                     <div className="flex-grow-1">

//                       {isStatCard ? (
//                         // Layout for Total Employees (Title small, Value big)
//                         <>
//                           <p className="text-muted small mb-0" style={{ fontFamily: "body", fontSize: "14px", fontWeight: 500 }}>
//                             {stat.title}
//                           </p>
//                           <h3 className="h2 fw-bold mb-0" style={{ fontFamily: "heading", color: DARK_TEXT_COLOR }}>
//                             {stat.value}
//                           </h3>
//                         </>
//                       ) : (
//                         // Layout for Action Cards (Title big, Description/Value small)
//                         <>
//                           <h5 className="fw-semibold mb-1" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
//                             {stat.title}
//                           </h5>
//                           <p
//                             className="small mb-0"
//                             style={{
//                               fontFamily: "body",
//                               fontSize: "0.85rem",
//                               // Apply the appropriate color for the secondary text (green for mood, grey for help/add)
//                               color: isPrimaryColor ? PRIMARY_COLOR : SECONDARY_COLOR
//                             }}
//                           >
//                             {stat.description || stat.value}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   UsersRound,
//   TrendingUp,
// } from "lucide-react";
// import React from "react";
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// // We need to import annotationPlugin and datalabels for use
// import annotationPlugin from 'chartjs-plugin-annotation';
// import datalabels from 'chartjs-plugin-datalabels';

// // Register Chart.js elements and plugins
// ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, datalabels);


// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
//   Users, 
// };

// // --- Define Constants ---
// const PRIMARY_COLOR = "#22C55E";
// const SECONDARY_COLOR = "#6c757d";
// const DARK_TEXT_COLOR = "#343a40";

// //  Define a Utility Function for Icon Retrieval ---
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users; 
// };

// // --- 3. Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap | 'Users'; 
//   color: string; 
//   onClick?: () => void;
//   description?: string; 
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // Function to generate Chart.js options including annotations for the mood card
// const getMoodChartOptions = (moodValue: string) => {
//   // Example data for mood segments (should sum to 100 for a full circle doughnut)
//   const moodData = {
//     labels: ['Great', 'Neutral', 'Bad'],
//     datasets: [{
//       data: [80, 15, 5], // Example: 80% Great, 15% Neutral, 5% Bad
//       backgroundColor: [PRIMARY_COLOR, SECONDARY_COLOR, '#e9ecef'], // Green, Dark Grey, Light Grey
//       borderWidth: 0,
//       weight: 1, // Makes all segments equal width
//     }]
//   };

//   // Map mood to percentage
//   const moodPercentages: { [key: string]: number } = {
//     'Great': 80,
//     'Neutral': 15,
//     'Bad': 5
//   };

//   // Function to determine the mood color for the center value
//   const getMoodColor = (mood: string) => {
//     if (mood.toLowerCase() === 'great') return PRIMARY_COLOR;
//     if (mood.toLowerCase() === 'neutral') return '#FFC107';
//     return '#DC3545';
//   };

//   return {
//     data: moodData,
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       cutout: '70%', // Inner circle size
//       rotation: -144, // Rotate to center the largest segment (Great) in the middle
//       plugins: {
//           legend: { display: false },
//           tooltip: {
//             callbacks: {
//               label: (context: any) => `${context.label}: ${context.formattedValue}%`
//             }
//           },
//           datalabels: {
//             // Only show labels for segments > 10%
//             display: (context: any) => context.dataset.data[context.dataIndex] > 10,
//             color: '#fff',
//             font: { size: 12 },
//             formatter: (value: number) => `${value}%`
//           },
//           annotation: {
//             annotations: {
//               // --- Custom Doughnut Center Label Annotation ---
//               moodLabel: {
//                 type: 'label',
//                 content: [
//                   `${moodPercentages[moodValue] || 0}%`, // The percentage of the mood
//                   'Company Mood', // Subtitle
//                 ],
//                 font: [
//                   { size: 24, weight: 'bold', color: getMoodColor(moodValue) },
//                   { size: 12, weight: 'normal', color: SECONDARY_COLOR }
//                 ],
//                 // Positioning options
//                 position: 'center',
//                 // No background fill
//                 backgroundColor: 'rgba(0,0,0,0)',
//               }
//             }
//           }
//         },
//       }
//     };
//   };


// // --- 4. The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
//         
//         // Determine color logic
//         const isPrimaryColor = stat.color === PRIMARY_COLOR || stat.color === '#22C55E';
//         const isSecondaryColor = stat.color === 'secondary';

//         // Green for primary, Grey for secondary
//         const iconColor = isPrimaryColor ? PRIMARY_COLOR : (isSecondaryColor ? SECONDARY_COLOR : DARK_TEXT_COLOR);
//         // Very light background shade
//         const iconBgColor = isPrimaryColor ? `${PRIMARY_COLOR}15` : '#e9ecef';

//         // Card Type Logic
//         const isStatCard = stat.title.includes("Total Employees");
//         const isMoodCard = stat.title.includes("mood");
//         
//         // Mood card requires space for the chart, others are smaller
//         const iconSize = isMoodCard ? 150 : 48;

//         const iconContainerStyle = {
//           width: `${iconSize}px`,
//           height: `${iconSize}px`,
//           fontFamily: "body",
//           backgroundColor: isMoodCard ? 'transparent' : iconBgColor, // No background for mood chart
//           color: iconColor,
//         };

//         const chartDataAndOptions = isMoodCard ? getMoodChartOptions(stat.value.toString()) : null;


//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div
//               // Uniform white background, shadow, and border-radius
//               className="card h-100 border-0 shadow-sm p-3 bg-white" 
//               style={{
//                 borderRadius: '10px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               <div className={`card-body p-0 d-flex ${isMoodCard ? 'flex-column align-items-center justify-content-center' : 'align-items-center'} h-100`}>

//                 {isMoodCard && chartDataAndOptions ? (
//                   <>
//                     {/* Title above the chart */}
//                     <div className="flex-grow-0 text-center mb-3">
//                       <h5 className="fw-semibold mb-0" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
//                         {stat.title}
//                       </h5>
//                     </div>
//                     {/* Doughnut Chart */}
//                     <div
//                         className="d-flex align-items-center justify-content-center"
//                         style={{ width: '100%', height: '100%', maxWidth: '150px', maxHeight: '150px' }}
//                     >
//                         <Doughnut 
//                           data={chartDataAndOptions.data} 
//                           options={chartDataAndOptions.options as any} // Cast options to any due to annotation type
//                         />
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Standard Icon/Text Layout */}
//                     {/* 1. Icon Container */}
//                     <div
//                       className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3`}
//                       style={iconContainerStyle}
//                     >
//                       <IconComponent size={24} color={iconColor} />
//                     </div>

//                     {/* 2. Text Content */}
//                     <div className="flex-grow-1">

//                       {isStatCard ? (
//                         // Layout for Total Employees (Title small, Value big)
//                         <>
//                           <p className="text-muted small mb-0" style={{ fontFamily: "body", fontSize: "14px", fontWeight: 500 }}>
//                             {stat.title}
//                           </p>
//                           <h3 className="h2 fw-bold mb-0" style={{ fontFamily: "heading", color: DARK_TEXT_COLOR }}>
//                             {stat.value}
//                           </h3>
//                         </>
//                       ) : (
//                         // Layout for Action Cards (Title big, Description/Value small)
//                         <>
//                           <h5 className="fw-semibold mb-1" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
//                             {stat.title}
//                           </h5>
//                           <p
//                             className="small mb-0"
//                             style={{
//                               fontFamily: "body",
//                               fontSize: "0.85rem",
//                               // Apply the appropriate color for the secondary text (green for mood, grey for help/add)
//                               color: isPrimaryColor ? PRIMARY_COLOR : SECONDARY_COLOR
//                             }}
//                           >
//                             {stat.description || stat.value}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   UsersRound,
//   TrendingUp,
//   // Assuming you want a different icon for Mood based on the image, 
//   // but sticking to the defined `TrendingUp` for now.
//   // If the image implies a checklist, use 'ClipboardCheck' from lucide-react.
// } from "lucide-react";
// import React from "react";


// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
//   Users, 
// };

// // --- Define Constants ---
// const PRIMARY_COLOR = "#22C55E";
// const SECONDARY_COLOR = "#6c757d";
// const DARK_TEXT_COLOR = "#343a40";

// //  Define a Utility Function for Icon Retrieval ---
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users; 
// };

// // --- 3. Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap | 'Users'; 
//   color: string; 
//   onClick?: () => void;
//   description?: string; 
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // --- 4. The Main Component (Modified for Uniformity) ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
//         
//         // Determine color logic
//         const isPrimaryColor = stat.color === PRIMARY_COLOR || stat.color === '#22C55E';
//         const isSecondaryColor = stat.color === 'secondary';

//         // Green for primary, Grey for secondary
//         const iconColor = isPrimaryColor ? PRIMARY_COLOR : (isSecondaryColor ? SECONDARY_COLOR : DARK_TEXT_COLOR); 
//         // Very light background shade
//         const iconBgColor = isPrimaryColor ? `${PRIMARY_COLOR}15` : '#e9ecef'; 
//         
//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           fontFamily: "body",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         // Card Type Logic
//         const isStatCard = stat.title.includes("Total Employees");
//         const isMoodCard = stat.title.includes("mood");
//         const isActionCard = stat.title.includes("Add Employee") || stat.title.includes("Help & Support");

//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div
//               // Uniform white background, shadow, and border-radius
//               className="card h-100 border-0 shadow-sm p-3 bg-white" 
//               style={{
//                 borderRadius: '10px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               <div className="card-body p-0 d-flex align-items-center h-100">
//                 
//                 {/* 1. Icon Container (Always Left) */}
//                 <div
//                     className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3`}
//                     style={iconContainerStyle}
//                 >
//                     <IconComponent size={24} color={iconColor} />
//                 </div>

//                 {/* 2. Text Content (Always Right of Icon) */}
//                 <div className="flex-grow-1">
//                     
//                     {isStatCard ? (
//                         // Layout for Total Employees (Title small, Value big)
//                         <>  
//                            <p className="text-muted small mb-0" style={{ fontFamily: "body", fontSize: "14px", fontWeight: 500 }}>
//                                {stat.title} 
//                             </p>
//                             <h3 className="h2 fw-bold mb-0" style={{ fontFamily: "heading", color: DARK_TEXT_COLOR }}>
//                                  {stat.value}
//                             </h3>
//                         </>
//                     ) : (
//                         // Layout for Action/Mood Cards (Title big, Description/Value small)
//                         <>
//                             <h5 className="fw-semibold mb-1" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
//                                 {stat.title}
//                             </h5>
//                             <p 
//                                 className="small mb-0" 
//                                 style={{ 
//                                     fontFamily: "body", 
//                                     fontSize: "0.85rem", 
//                                     // Apply the appropriate color for the secondary text (green for mood, grey for help/add)
//                                     color: isPrimaryColor ? PRIMARY_COLOR : SECONDARY_COLOR 
//                                 }}
//                             >
//                                 {stat.description || stat.value}
//                             </p>
//                         </>
//                     )}
//                 </div>

//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;


// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   UsersRound,
//   TrendingUp,
// } from "lucide-react";
// import React from "react";
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// // We need to import annotationPlugin and datalabels for use
// import annotationPlugin from 'chartjs-plugin-annotation';
// import datalabels from 'chartjs-plugin-datalabels';

// // Register Chart.js elements and plugins
// ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, datalabels);


// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
//   Users, 
// };

// // --- Define Constants ---
// const PRIMARY_COLOR = "#22C55E";
// const SECONDARY_COLOR = "#6c757d";
// const DARK_TEXT_COLOR = "#343a40";

// // --- Gauge Configuration Constants ---
// const MAX_SCORE = 999;
// // Colors mapping to the gauge segments (Red, Orange, Yellow, Teal, Green)
// const GAUGE_COLORS = [
//     '#DC3545', // Red (Bad)
//     '#FD7E14', // Orange (Slightly Bad)
//     '#FFC107', // Yellow (Neutral)
//     '#17A2B8', // Teal (Slightly Good)
//     PRIMARY_COLOR, // Green (Great)
// ];
// // Background color for the unused part of the gauge
// const GAUGE_BACKGROUND = '#e9ecef';


// /**
//  * Maps a score (0-MAX_SCORE) to one of the five color segments.
//  * This determines the color of the score label in the center.
//  */
// const getMoodColorFromScore = (score: number): string => {
//   if (score < MAX_SCORE * 0.2) return GAUGE_COLORS[0];  // Red
//   if (score < MAX_SCORE * 0.4) return GAUGE_COLORS[1];  // Orange
//   if (score < MAX_SCORE * 0.6) return GAUGE_COLORS[2];  // Yellow
//   if (score < MAX_SCORE * 0.8) return GAUGE_COLORS[3];  // Teal
//   return GAUGE_COLORS[4];  // Green
// };


// //  Define a Utility Function for Icon Retrieval ---
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users; 
// };

// // --- Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap | 'Users'; 
//   color: string; 
//   onClick?: () => void;
//   description?: string; 
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// /**
//  * Function to generate Chart.js options for the semi-circle mood gauge.
//  * @param rawValue The current mood score (e.g., "999").
//  */
// const getMoodChartOptions = (rawValue: string) => {
//     const score = parseInt(rawValue) || 0;
//     const color = getMoodColorFromScore(score);

//     // The gauge data is divided into 5 equal color segments and one large grey segment
//     const segmentSize = MAX_SCORE / 5;
//     let segmentData: number[] = [];
//     let currentScore = score;
//     
//     // Calculate the length of the colored segments based on the score
//     for (let i = 0; i < GAUGE_COLORS.length; i++) {
//         if (currentScore >= segmentSize) {
//             segmentData.push(segmentSize);
//             currentScore -= segmentSize;
//         } else if (currentScore > 0) {
//             segmentData.push(currentScore);
//             currentScore = 0;
//         } else {
//             segmentData.push(0);
//         }
//     }


//     // The total length of the colored arc
//     const coloredArcLength = segmentData.reduce((sum, size) => sum + size, 0);

//     // The remaining uncolored segment (grey)
//     const remainingArc = MAX_SCORE - coloredArcLength;


//     const data = {
//         // We use the 5 colors for the arc and the remaining grey segment
//         labels: ['Red', 'Orange', 'Yellow', 'Teal', 'Green', 'Remaining'], 
//         datasets: [{
//             data: [...segmentData, remainingArc],
//             backgroundColor: [...GAUGE_COLORS, GAUGE_BACKGROUND],
//             borderColor: '#fff', // Border color between segments
//             borderWidth: 1, 
//         }]
//     };

//     return {
//         data: data,
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             // --- Gauge Configuration ---
//             aspectRatio: 2, // Width is twice the height for semi-circle space
//             circumference: 180, // Half a circle
//             rotation: -90, // Start the arc from the bottom left
//             cutout: '80%', // Thin arc
//             plugins: {
//                 legend: { display: false },
//                 tooltip: { enabled: false }, // Tooltip disabled for a clean gauge look
//                 datalabels: { enabled: false }, // Datalabels disabled for a clean gauge look
//                 annotation: {
//                     annotations: {
//                         // --- Custom Doughnut Center Label Annotation (Updated) ---
//                         moodLabel: {
//                             type: 'label',
//                             content: [
//                                 'YOUR SCORE:', // Top line (smaller)
//                                 `${score}`, // The score value (biggest)
//                                 `OF ${MAX_SCORE}`, // Bottom line (medium)
//                             ],
//                             font: [
//                                 { size: 16, weight: 'normal', family: 'body', color: DARK_TEXT_COLOR }, // YOUR SCORE:
//                                 { size: 60, weight: 'bold', family: 'heading', color: DARK_TEXT_COLOR }, // Score
//                                 { size: 24, weight: 'bold', family: 'heading', color: color } // OF 999
//                             ],
//                             // Position in the center of the semi-circle base
//                             position: 'center',
//                             yAdjust: 30, // Adjust vertical position to the center of the arc base
//                             backgroundColor: 'rgba(0,0,0,0)', // No background fill
//                         },
//                     }
//                 }
//             } as any, // Cast options to any due to annotation type
//         }
//     };
// };


// // --- The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
//         
//         // Determine color logic
//         const isPrimaryColor = stat.color === PRIMARY_COLOR || stat.color === '#22C55E';
//         const isSecondaryColor = stat.color === 'secondary';

//         // Green for primary, Grey for secondary
//         const iconColor = isPrimaryColor ? PRIMARY_COLOR : (isSecondaryColor ? SECONDARY_COLOR : DARK_TEXT_COLOR);
//         // Very light background shade
//         const iconBgColor = isPrimaryColor ? `${PRIMARY_COLOR}15` : '#e9ecef';

//         // Card Type Logic
//         const isStatCard = stat.title.includes("Total Employees");
//         // Check if the title is related to mood
//         const isMoodCard = stat.title.toLowerCase().includes("mood"); 
//         
//         // Mood card requires space for the chart, others are smaller
//         const iconSize = isMoodCard ? 150 : 48;

//         const iconContainerStyle = {
//           width: `${iconSize}px`,
//           height: `${iconSize}px`,
//           fontFamily: "body",
//           backgroundColor: isMoodCard ? 'transparent' : iconBgColor, // No background for mood chart
//           color: iconColor,
//         };

//         const chartDataAndOptions = isMoodCard ? getMoodChartOptions(stat.value.toString()) : null;


//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div
//               // Uniform white background, shadow, and border-radius
//               className="card h-100 border-0 shadow-sm p-3 bg-white" 
//               style={{
//                 borderRadius: '10px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 height: isMoodCard ? '220px' : 'auto', // Give mood card more height for the gauge
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               <div className={`card-body p-0 d-flex flex-column align-items-center justify-content-center h-100`}>

//                 {isMoodCard && chartDataAndOptions ? (
//                   <>
//                     {/* The chart wrapper. This needs to be tall enough for the semi-circle */}
//                     <div
//                         className="position-relative d-flex align-items-center justify-content-center"
//                         style={{ width: '100%', height: '100%', minHeight: '180px' }}
//                     >
//                         {/* Title displayed above the gauge (Moved here for better centering with the card) */}
//                         <div className="position-absolute" style={{ top: '10px' }}>
//                             <p className="small mb-0 fw-semibold text-center" style={{ fontFamily: "body", fontSize: "0.9rem", color: iconColor }}>
//                                 {stat.title}
//                             </p>
//                         </div>

//                         {/* Emojis positioned manually - Aligned with the requested image */}
//                         {/* Extreme Left - Sad (Red) */}
//                         <span 
//                             role="img" 
//                             aria-label="Extremely Sad" 
//                             style={{ position: 'absolute', left: '5%', bottom: '5%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[0] }}
//                         >
//                             😩
//                         </span>
//                         {/* Mid-Left - Not Good (Orange) */}
//                         <span 
//                             role="img" 
//                             aria-label="Unsatisfied" 
//                             style={{ position: 'absolute', left: '15%', top: '35%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[1] }}
//                         >
//                             🙁
//                         </span>
//                         {/* Center Top - Neutral (Yellow) */}
//                         <span 
//                             role="img" 
//                             aria-label="Neutral" 
//                             style={{ position: 'absolute', left: '47%', top: '0%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[2] }}
//                         >
//                             😐
//                         </span>
//                         {/* Mid-Right - Good (Teal) */}
//                         <span 
//                             role="img" 
//                             aria-label="Satisfied" 
//                             style={{ position: 'absolute', right: '15%', top: '35%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[3] }}
//                         >
//                             🙂
//                         </span>
//                         {/* Extreme Right - Great (Green) */}
//                         <span 
//                             role="img" 
//                             aria-label="Extremely Happy" 
//                             style={{ position: 'absolute', right: '5%', bottom: '5%', fontSize: '2rem', zIndex: 10, color: GAUGE_COLORS[4] }}
//                         >
//                             😎
//                         </span>

//                         {/* Doughnut Gauge Chart */}
//                         <Doughnut 
//                           data={chartDataAndOptions.data} 
//                           options={chartDataAndOptions.options as any}
//                         />
//                     </div>
//                     {/* The description is placed below the chart */}
//                     <p
//                             className="small mt-2 mb-0 fw-semibold text-center"
//                             style={{
//                               fontFamily: "body",
//                               fontSize: "0.9rem",
//                               color: iconColor
//                             }}
//                           >
//                             Mood: {stat.description || "N/A"}
//                           </p>
//                   </>
//                 ) : (
//                   <>
//                     {/* Standard Icon/Text Layout */}
//                     {/* 1. Icon Container */}
//                     <div
//                       className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3`}
//                       style={iconContainerStyle}
//                     >
//                       <IconComponent size={24} color={iconColor} />
//                     </div>

//                     {/* 2. Text Content */}
//                     <div className="flex-grow-1">

//                       {isStatCard ? (
//                         // Layout for Total Employees (Title small, Value big)
//                         <>
//                           <p className="fw-bold small mb-0" style={{ fontFamily: "heading", fontSize: "14px", fontWeight: 500 }}>
//                             {stat.title}
//                           </p>
//                           <h3 className="h4 text-muted  mb-0" style={{ fontFamily: "body", color: DARK_TEXT_COLOR }}>
//                             {stat.value}
//                           </h3>
//                         </>
//                       ) : (
//                         // Layout for Action Cards (Title big, Description/Value small)
//                         <>
//                           <h5 className="fw-semibold mb-1" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
//                             {stat.title}
//                           </h5>
//                           <p
//                             className="small mb-0"
//                             style={{
//                               fontFamily: "body",
//                               fontSize: "0.85rem",
//                               // Apply the appropriate color for the secondary text (green for mood, grey for help/add)
//                               color: isPrimaryColor ? PRIMARY_COLOR : SECONDARY_COLOR
//                             }}
//                           >
//                             {stat.description || stat.value}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

import {
  Users,
  LucideIcon,
  UserRoundPlus,
  HelpCircle,
  UsersRound,
  TrendingUp,
} from "lucide-react";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
// We need to import annotationPlugin and datalabels for use
import annotationPlugin from 'chartjs-plugin-annotation';
import datalabels from 'chartjs-plugin-datalabels';

// Register Chart.js elements and plugins
ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, datalabels);

const IconMap: { [key: string]: LucideIcon } = {
  UserRoundPlus,
  UsersRound,
  TrendingUp,
  HelpCircle,
  Users, 
};

// --- Define Constants ---
const PRIMARY_COLOR = "#22C55E";
const SECONDARY_COLOR = "#6c757d";
const DARK_TEXT_COLOR = "#343a40";

// --- Gauge Configuration Constants ---
const MAX_SCORE = 999;
// Colors mapping to the gauge segments (Red, Orange, Yellow, Teal, Green)
const GAUGE_COLORS = [
    '#DC3545', // Red (Bad)
    '#FD7E14', // Orange (Slightly Bad)
    '#FFC107', // Yellow (Neutral)
    '#17A2B8', // Teal (Slightly Good)
    PRIMARY_COLOR, // Green (Great)
];
// Background color for the unused part of the gauge
const GAUGE_BACKGROUND = '#e9ecef';

/**
 * Maps a score (0-MAX_SCORE) to one of the five color segments.
 * This determines the color of the score label in the center.
 */
const getMoodColorFromScore = (score: number): string => {
  if (score < MAX_SCORE * 0.2) return GAUGE_COLORS[0];  // Red
  if (score < MAX_SCORE * 0.4) return GAUGE_COLORS[1];  // Orange
  if (score < MAX_SCORE * 0.6) return GAUGE_COLORS[2];  // Yellow
  if (score < MAX_SCORE * 0.8) return GAUGE_COLORS[3];  // Teal
  return GAUGE_COLORS[4];  // Green
};

/**
 * Maps a score (0-MAX_SCORE) to an appropriate mood emoji.
 */
const getMoodEmojiFromScore = (score: number): string => {
    if (score < MAX_SCORE * 0.2) return '😩';   // Terrible (Red)
    if (score < MAX_SCORE * 0.4) return '🙁';   // Bad (Orange)
    if (score < MAX_SCORE * 0.6) return '😐';   // Neutral (Yellow)
    if (score < MAX_SCORE * 0.8) return '🙂';   // Good (Teal)
    return '😎';   // Great (Green)
};


//  Define a Utility Function for Icon Retrieval ---
const getIconComponent = (iconName: string): LucideIcon => {
  return IconMap[iconName] || Users; 
};

// --- Define Interfaces ---
interface StatItem {
  title: string;
  value: string | number;
  icon: keyof typeof IconMap | 'Users'; 
  color: string; 
  onClick?: () => void;
  description?: string; 
}

interface TopGridProps {
  stats: StatItem[];
}

/**
 * Function to generate Chart.js options for the semi-circle mood gauge.
 * @param rawValue The current mood score (e.g., "999").
 */
const getMoodChartOptions = (stat: StatItem) => {
    const score = parseInt(stat.value.toString()) || 0;
    const color = getMoodColorFromScore(score);
    const emoji = getMoodEmojiFromScore(score); // Get the emoji
    const moodDescription = stat.description || 'N/A'; // Get the mood description

    // The gauge data is divided into 5 equal color segments and one large grey segment
    const segmentSize = MAX_SCORE / 5;
    let segmentData: number[] = [];
    let currentScore = score;
    
    // Calculate the length of the colored segments based on the score
    for (let i = 0; i < GAUGE_COLORS.length; i++) {
        if (currentScore >= segmentSize) {
            segmentData.push(segmentSize);
            currentScore -= segmentSize;
        } else if (currentScore > 0) {
            segmentData.push(currentScore);
            currentScore = 0;
        } else {
            segmentData.push(0);
        }
    }


    // The total length of the colored arc
    const coloredArcLength = segmentData.reduce((sum, size) => sum + size, 0);

    // The remaining uncolored segment (grey)
    const remainingArc = MAX_SCORE - coloredArcLength;


    const data = {
        // We use the 5 colors for the arc and the remaining grey segment
        labels: ['Red', 'Orange', 'Yellow', 'Teal', 'Green', 'Remaining'], 
        datasets: [{
            data: [...segmentData, remainingArc],
            backgroundColor: [...GAUGE_COLORS, GAUGE_BACKGROUND],
            borderColor: '#fff', // Border color between segments
            borderWidth: 1, 
        }]
    };

    return {
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // --- Gauge Configuration ---
            aspectRatio: 2, // Width is twice the height for semi-circle space
            circumference: 180, // Half a circle
            rotation: -90, // Start the arc from the bottom left
            cutout: '80%', // Thin arc
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }, // Tooltip disabled for a clean gauge look
                datalabels: { enabled: false }, // Datalabels disabled for a clean gauge look
                annotation: {
                    annotations: {
                        // --- Custom Doughnut Center Label Annotation (UPDATED FOR EMOJI AND MOOD) ---
                        moodLabel: {
                            type: 'label',
                            content: [
                                moodDescription, // Top line: The Mood Description (e.g., Great)
                                emoji, // Center line: The large emoji
                                `${score} / ${MAX_SCORE}`, // Bottom line: The score
                            ],
                            font: [
                                { size: 16, weight: 'bold', family: 'heading', color: color }, // Mood Description color
                                { size: 72, weight: 'bold', family: 'heading', color: DARK_TEXT_COLOR }, // Emoji size
                                { size: 20, weight: 'bold', family: 'heading', color: DARK_TEXT_COLOR } // Score
                            ],
                            // Position in the center of the semi-circle base
                            position: 'center',
                            yAdjust: 30, // Adjust vertical position to the center of the arc base
                            backgroundColor: 'rgba(0,0,0,0)', // No background fill
                        },
                    }
                } as any, // Cast options to any due to annotation type
            }
        }
    };
};


// --- The Main Component ---
const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
  return (
    <div className="row g-3 mb-4">
      {stats.map((stat) => {
        const IconComponent = getIconComponent(stat.icon.toString());
        
        // Determine color logic
        const isPrimaryColor = stat.color === PRIMARY_COLOR || stat.color === '#22C55E';
        const isSecondaryColor = stat.color === 'secondary';

        // Green for primary, Grey for secondary
        const iconColor = isPrimaryColor ? PRIMARY_COLOR : (isSecondaryColor ? SECONDARY_COLOR : DARK_TEXT_COLOR);
        // Very light background shade
        const iconBgColor = isPrimaryColor ? `${PRIMARY_COLOR}15` : '#e9ecef';

        // Card Type Logic
        const isStatCard = stat.title.includes("Total Employees");
        // Check if the title is related to mood
        const isMoodCard = stat.title.toLowerCase().includes("mood"); 
        
        // Mood card requires space for the chart, others are smaller
        const iconSize = isMoodCard ? 150 : 48;

        const iconContainerStyle = {
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          fontFamily: "body",
          backgroundColor: isMoodCard ? 'transparent' : iconBgColor, // No background for mood chart
          color: iconColor,
        };

        const chartDataAndOptions = isMoodCard ? getMoodChartOptions(stat) : null;


        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
            <div
              // Uniform white background, shadow, and border-radius
              className="card h-100 border-0 shadow-sm p-3 bg-white" 
              style={{
                borderRadius: '10px',
                cursor: stat.onClick ? 'pointer' : 'default',
                transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
                height: isMoodCard ? '220px' : 'auto', // Give mood card more height for the gauge
              }}
              onClick={stat.onClick}
              onMouseEnter={(e) => {
                if (stat.onClick) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (stat.onClick) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }
              }}
            >
              <div className={`card-body p-0 d-flex flex-column align-items-center justify-content-center h-100`}>

{isMoodCard ? (
  <>
    {/* Title above the emoji */}
    <div className="text-center mb-3">
      <p className="small mb-0 fw-semibold" style={{ fontFamily: "body", fontSize: "0.9rem", color: iconColor }}>
        {stat.title}
      </p>
    </div>
    {/* Single large emoji */}
    <div className="d-flex align-items-center justify-content-center h-100">
      <span style={{ fontSize: '4rem' }}>{getMoodEmojiFromScore(parseInt(stat.value.toString()) || 0)}</span>
    </div>
  </>
) : (
                  <>
                    {/* Standard Icon/Text Layout (No changes here) */}
                    {/* 1. Icon Container */}
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3`}
                       style={iconContainerStyle}
                    >
                      <IconComponent size={24} color={iconColor} />
                    </div>

                    {/* 2. Text Content */}
                    <div className="flex-grow-1">

                      {isStatCard ? (
                        // Layout for Total Employees (Title small, Value big)
                        <>
                          <p className="fw-bold small mb-0" style={{ fontFamily: "heading", fontSize: "14px", fontWeight: 500 }}>
                            {stat.title}
                          </p>
                          <h3 className="h4 text-muted  mb-0" style={{ fontFamily: "body", color: DARK_TEXT_COLOR }}>
                            {stat.value}
                          </h3>
                        </>
                      ) : (
                        // Layout for Action Cards (Title big, Description/Value small)
                        <>
                          <h5 className="fw-semibold mb-1" style={{ fontFamily: "body", color: DARK_TEXT_COLOR, fontSize: '1.1rem' }}>
                            {stat.title}
                          </h5>
                          <p
                            className="small mb-0"
                            style={{
                              fontFamily: "body",
                              fontSize: "0.85rem",
                              // Apply the appropriate color for the secondary text (green for mood, grey for help/add)
                              color: isPrimaryColor ? PRIMARY_COLOR : SECONDARY_COLOR
                            }}
                          >
                            {stat.description || stat.value}
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* I'm removing the p tag with the mood description outside the card body, as it's now inside the gauge center. */}
          </div>
        );
      })}
    </div>
  );
};

export default TopGrid;