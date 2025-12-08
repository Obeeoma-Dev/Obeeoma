import React from "react";
import {
  Users,
  LucideIcon,
  UserRoundPlus,
  HelpCircle,
  ClipboardCheck, // Added for the mood card icon
} from "lucide-react";

// Simplified IconMap
const IconMap: { [key: string]: LucideIcon } = {
  UserRoundPlus,
  Users,
  ClipboardCheck,
  HelpCircle,
};

// Define a utility function for icon retrieval
const getIconComponent = (iconName: string): LucideIcon => {
  return IconMap[iconName] || Users;
};

// --- Define Interfaces ---
interface StatItem {
  title: string;
  value: string | number;
  icon: keyof typeof IconMap;
  color: string; // e.g., 'purple', 'green', 'dark'
  onClick?: () => void;
  description?: string;
}

interface TopGridProps {
  stats: StatItem[];
}

// --- The Main Component ---
const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
  return (
    <div className="row g-3 mb-4">
      {stats.map((stat) => {
        const IconComponent = getIconComponent(String(stat.icon));

        // --- Card Type Logic ---
        const isAddEmployee = stat.title.toLowerCase().includes("add employee");
        const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
        const isMoodCard = stat.title.toLowerCase().includes("mood");
        const isHelpCard = stat.title.toLowerCase().includes("help");

        // --- Color and Style Logic based on the image ---
        let iconBgColor = "";
        let iconColor = "";

        if (isAddEmployee || isHelpCard) {
          iconBgColor = "#D4F8E5"; // Light green
          iconColor = "#22C55E"; // Green
        } else if (isTotalEmployees || isMoodCard) {
          iconBgColor = "#D4F8E5"; // Light green
          iconColor = "#22C55E"; // Green
        }

        const iconContainerStyle = {
          width: "48px",
          height: "48px",
          backgroundColor: iconBgColor,
          color: iconColor,
        };

        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
            <div
              className="card h-100 border-0 shadow-sm p-3 bg-white"
              style={{
                borderRadius: '12px',
                cursor: stat.onClick ? 'pointer' : 'default',
                transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
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
              <div className="card-body p-0 d-flex align-items-center">
                {/* Icon Container */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                  style={iconContainerStyle}
                >
                  <IconComponent size={24} />
                </div>

                {/* Text Content */}
                <div className="flex-grow-1">
                  {isTotalEmployees ? (
                    // Layout for "Total Employees"
                    <>
                      <h6 className=" fw-bold mb-2" style={{ color: "#166534", fontSize: '0.8rem' }}>
                        {stat.title}
                      </h6>
                      <h4 className="fw-semibold mb-0" style={{ color: "#166534" }}>
                        {stat.value}
                      </h4>
                    </>
                  ) : isMoodCard ? (
                    // Layout for "General Company Mood"
                    <div>
                      <h6 className="fw-semibold mb-0" style={{ color: "#166534", fontSize: '0.7rem' }}>
                        {stat.title}
                      </h6>
                      <span style={{ fontSize: '1.75rem' }}>🙂</span>
                    </div>
                  ) : (
                    // Default layout for "Add Employee" and "Help & Support"
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: '0.8rem' }}>
                        {stat.title}
                      </h6>
                      {stat.description && (
                        <h6 className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
                          {stat.description}
                        </h6>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopGrid;




// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   ClipboardCheck, 
//   CheckCircle, 
// } from "lucide-react";
// // Import the new Gauge Chart component
// import MoodGaugeChart from '../employerdashboard/MoodgaugeChart'; // Adjust path as necessary

// // Simplified IconMap
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   ClipboardCheck,
//   HelpCircle,
//   CheckCircle,
// };

// // Define a utility function for icon retrieval
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// // --- Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // --- The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         // --- Card Type Logic ---
//         const isAddEmployee = stat.title.toLowerCase().includes("add employee");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
//         // This is the card we are targeting
//         const isMoodCard = stat.title.toLowerCase().includes("mood"); 
//         const isHelpCard = stat.title.toLowerCase().includes("help");

//         // --- Color and Style Logic ---
//         let iconBgColor = "#D4F8E5"; // Light green
//         let iconColor = "#22C55E"; // Green

//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         // Determine if the value is numeric (for the gauge chart)
//         const moodScore = isMoodCard ? (typeof stat.value === 'string' ? parseInt(stat.value) : stat.value) : 0;

//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
//             <div
//               className="card h-100 border-0 shadow-sm p-3 bg-white"
//               style={{
//                 borderRadius: '12px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 // Increase min-height to accommodate the chart
//                 minHeight: isMoodCard ? '180px' : undefined, 
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               {/* Conditional Rendering for the Mood Card */}
//               {isMoodCard ? (
//                 // Renders the Chart.js component as the main card content
//                 <MoodGaugeChart 
//                     score={moodScore as number} 
//                     moodLabel={stat.moodValue || "Neutral"} 
//                 />
//               ) : (
//                 // Renders the standard icon and text content
//                 <div className="card-body p-0 d-flex align-items-center">
//                   {/* Icon Container */}
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={24} />
//                   </div>

//                   {/* Text Content */}
//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       // Layout for "Total Employees"
//                       <>
//                         <h6 className=" fw-bold mb-2" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         <h4 className="fw-semibold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h4>
//                       </>
//                     ) : (
//                       // Default layout for "Add Employee" and "Help & Support"
//                       <div>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <h6 className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
//                             {stat.description}
//                           </h6>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   ClipboardCheck, 
//   CheckCircle, 
// } from "lucide-react";
// // Import the new Gauge Chart component
// import MoodGaugeChart from '../employerdashboard/MoodgaugeChart'; // Ensure path is correct

// // Simplified IconMap
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   ClipboardCheck,
//   HelpCircle,
//   CheckCircle,
// };

// // Define a utility function for icon retrieval
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// // --- Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // --- The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         // --- Card Type Logic ---
//         const isAddEmployee = stat.title.toLowerCase().includes("add employee");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
//         // This is the card we are targeting
//         const isMoodCard = stat.title.toLowerCase().includes("mood"); 
//         const isHelpCard = stat.title.toLowerCase().includes("help");

//         // --- Color and Style Logic ---
//         let iconBgColor = "#D4F8E5"; // Light green
//         let iconColor = "#22C55E"; // Green

//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         // Determine if the value is numeric (for the gauge chart)
//         const moodScore = isMoodCard ? (typeof stat.value === 'string' ? parseInt(stat.value) : stat.value) : 0;

//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
//             <div
//               className="card h-100 border-0 shadow-sm p-3 bg-white"
//               style={{
//                 borderRadius: '12px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 // Increased min-height to ensure the gauge fits well
//                 minHeight: isMoodCard ? '180px' : undefined, 
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               {/* Conditional Rendering for the Mood Card */}
//               {isMoodCard ? (
//                 // Renders the Chart.js component as the main card content
//                 <MoodGaugeChart 
//                     score={moodScore as number} 
//                     moodLabel={stat.moodValue || "Neutral"} 
//                 />
//               ) : (
//                 // Renders the standard icon and text content
//                 <div className="card-body p-0 d-flex align-items-center">
//                   {/* Icon Container */}
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={24} />
//                   </div>

//                   {/* Text Content */}
//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       // Layout for "Total Employees"
//                       <>
//                         <h6 className=" fw-bold mb-2" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         <h4 className="fw-semibold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h4>
//                       </>
//                     ) : (
//                       // Default layout for "Add Employee" and "Help & Support"
//                       <div>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <h6 className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
//                             {stat.description}
//                           </h6>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   ClipboardCheck, 
//   CheckCircle, 
// } from "lucide-react";
// // FIX: Corrected import casing to MoodGaugeChart
// import MoodGaugeChart from '../employerdashboard/MoodgaugeChart';

// // Simplified IconMap
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   ClipboardCheck,
//   HelpCircle,
//   CheckCircle,
// };

// // Define a utility function for icon retrieval
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// // --- Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // --- The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     // Ensure this row uses the grid system to display 3 items evenly (col-lg-4)
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         // --- Card Type Logic ---
//         const isAddEmployee = stat.title.toLowerCase().includes("add employee");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
//         const isMoodCard = stat.title.toLowerCase().includes("mood"); 
        
//         // This check is no longer needed but kept for safety in case other cards are added
//         const isHelpCard = stat.title.toLowerCase().includes("help"); 

//         // --- Color and Style Logic ---
//         let iconBgColor = "#D4F8E5"; // Light green
//         let iconColor = "#22C55E"; // Green

//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         // Determine if the value is numeric (for the gauge chart)
//         const moodScore = isMoodCard ? (typeof stat.value === 'string' ? parseInt(stat.value) : stat.value) : 0;

//         return (
//           // Adjusted class for 3 cards per row on large screens (12 / 3 = 4)
//           // Use col-lg-4 to put exactly 3 items per row, or col-lg-3 for 4 items
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-4"> 
//             <div
//               className="card h-100 border-0 shadow-sm p-3 bg-white"
//               style={{
//                 borderRadius: '12px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 // Removed minHeight here, let content dictate size for better responsiveness
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               {/* Conditional Rendering for the Mood Card */}
//               {isMoodCard ? (
//                 // Renders the Chart.js component as the main card content
//                 <MoodGaugeChart 
//                     score={moodScore as number} 
//                     moodLabel={stat.moodValue || "Neutral"} 
//                 />
//               ) : (
//                 // Renders the standard icon and text content
//                 <div className="card-body p-0 d-flex align-items-center">
//                   {/* Icon Container */}
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={24} />
//                   </div>

//                   {/* Text Content */}
//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       // Layout for "Total Employees"
//                       <>
//                         <h6 className=" fw-bold mb-2" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         <h4 className="fw-semibold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h4>
//                       </>
//                     ) : (
//                       // Default layout for "Add Employee"
//                       <div>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <h6 className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
//                             {stat.description}
//                           </h6>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   ClipboardCheck, 
//   CheckCircle, 
// } from "lucide-react";

// import MoodGaugeChart from '../employerdashboard/MoodgaugeChart';

// // Simplified IconMap
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   ClipboardCheck,
//   HelpCircle,
//   CheckCircle,
// };

// // Define a utility function for icon retrieval
// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// // --- Define Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// // --- The Main Component ---
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         // --- Card Type Logic ---
//         const isAddEmployee = stat.title.toLowerCase().includes("add employee");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
//         const isMoodCard = stat.title.toLowerCase().includes("mood");
//         const isHelpCard = stat.title.toLowerCase().includes("help");

//         // --- Color and Style Logic ---
//         let iconBgColor = "#D4F8E5"; // Light green
//         let iconColor = "#22C55E"; // Green

//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         // Determine if the value is numeric (for the gauge chart)
//         const moodScore = isMoodCard ? (typeof stat.value === 'string' ? parseInt(stat.value) : stat.value) : 0;

//         return (
//           <div key={stat.title} className={`col-12 col-sm-6 ${isMoodCard ? 'col-lg-6' : 'col-lg-3'}`}>
//             <div
//               className="card h-100 border-0 shadow-sm p-3 bg-white"
//               style={{
//                 borderRadius: '12px',
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
//                 minHeight: isMoodCard ? '250px' : undefined,
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
//                 }
//               }}
//             >
//               {/* Conditional Rendering for the Mood Card */}
//               {isMoodCard ? (
//                 // Renders the Chart.js component as the main card content
//                 <MoodGaugeChart
//                     moodLabel={stat.moodValue || "Neutral"}
//                 />
//               ) : (
//                 // Renders the standard icon and text content
//                 <div className="card-body p-0 d-flex align-items-center">
//                   {/* Icon Container */}
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={24} />
//                   </div>

//                   {/* Text Content */}
//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       // Layout for "Total Employees"
//                       <>
//                         <h6 className=" fw-bold mb-2" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         <h4 className="fw-semibold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h4>
//                       </>
//                     ) : (
//                       // Default layout for "Add Employee" and "Help & Support"
//                       <div>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: '0.8rem' }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <h6 className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
//                             {stat.description}
//                           </h6>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };


// export default TopGrid;



// src/components/employercomponents/employerdashboard/TopGrid.tsx
// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   HelpCircle,
//   ClipboardCheck,
//   CheckCircle,
// } from "lucide-react";
// import MoodGaugeChart from './MoodgaugeChart';

// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   ClipboardCheck,
//   HelpCircle,
//   CheckCircle,
// };

// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         const isAddEmployee = stat.title.toLowerCase().includes("add employee");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");
//         const isMoodCard = stat.title.toLowerCase().includes("mood");
//         const isHelpCard = stat.title.toLowerCase().includes("help");

//         let iconBgColor = "#D4F8E5";
//         let iconColor = "#22C55E";

//         const iconContainerStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: iconBgColor,
//           color: iconColor,
//         };

//         return (
//           <div
//             key={stat.title}
//             className={`col-12 col-sm-6 ${isMoodCard ? "col-lg-6" : "col-lg-3"}`}
//           >
//             <div
//               className="card h-100 border-0 shadow-sm bg-white"
//               style={{
//                 borderRadius: "12px",
//                 cursor: stat.onClick ? "pointer" : "default",
//                 minHeight: isMoodCard ? "340px" : "140px", // Ensures mood card has enough height
//                 transition: stat.onClick ? "transform 0.2s, box-shadow 0.2s" : "none",
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = "translateY(-4px)";
//                   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
//                 }
//               }}
//             >
//               {/* Mood Card - Centered Gauge */}
//               {isMoodCard ? (
//                 <div className="h-100 d-flex align-items-center justify-content-center p-4">
//                   <MoodGaugeChart moodLabel={stat.moodValue || "Neutral"} />
//                 </div>
//               ) : (
//                 /* Normal Cards (Total Employees, Add Employee, etc.) */
//                 <div className="card-body p-4 d-flex align-items-center">
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-4"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={26} />
//                   </div>

//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       <>
//                         <h6 className="fw-bold mb-2" style={{ color: "#166534", fontSize: "0.85rem" }}>
//                           {stat.title}
//                         </h6>
//                         <h3 className="fw-bold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h3>
//                       </>
//                     ) : (
//                       <>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: "0.9rem" }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <p className="text-muted mb-0 small" style={{ fontSize: "0.8rem" }}>
//                             {stat.description}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// // src/components/employercomponents/employerdashboard/TopGrid.tsx
// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   CheckCircle,
// } from "lucide-react";
// import MoodGaugeChart from '../employerdashboard/MoodgaugeChart';

// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   CheckCircle,
// };

// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));
//         const isMoodCard = stat.title.toLowerCase().includes("mood");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");

//         const iconStyle = {
//           width: "48px",
//           height: "48px",
//           backgroundColor: "#D4F8E5",
//           color: "#22C55E",
//         };

//         return (
//           <div
//             key={stat.title}
//             className={`col-12 col-sm-6 ${isMoodCard ? "col-lg-6" : "col-lg-3"}`}
//           >
//             <div
//               className="card h-100 border-0 shadow-sm bg-white"
//               style={{
//                 borderRadius: "12px",
//                 cursor: stat.onClick ? "pointer" : "default",
//                 minHeight: isMoodCard ? "340px" : "140px",
//                 transition: "all 0.2s ease",
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => stat.onClick && (e.currentTarget.style.transform = "translateY(-4px)")}
//               onMouseLeave={(e) => stat.onClick && (e.currentTarget.style.transform = "translateY(0)")}
//             >
//               {/* Mood Card - Centered Gauge */}
//               {isMoodCard ? (
//                 <div className="h-100 d-flex align-items-center justify-content-center p-3">
//                   <MoodGaugeChart moodLabel={stat.moodValue || "Neutral"} />
//                 </div>
//               ) : (
//                 /* Other cards */
//                 <div className="card-body p-4 d-flex align-items-center">
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-4"
//                     style={iconStyle}
//                   >
//                     <IconComponent size={26} />
//                   </div>

//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       <>
//                         <h6 className="fw-bold mb-2" style={{ color: "#166534", fontSize: "0.85rem" }}>
//                           {stat.title}
//                         </h6>
//                         <h3 className="fw-bold mb-0" style={{ color: "#166534" }}>
//                           {stat.value}
//                         </h3>
//                       </>
//                     ) : (
//                       <>
//                         <h6 className="fw-bold mb-1" style={{ color: "#166534", fontSize: "0.9rem" }}>
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <p className="text-muted mb-0 small">{stat.description}</p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;


// src/components/employercomponents/employerdashboard/TopGrid.tsx
// import React from "react";
// import {
//   Users,
//   LucideIcon,
//   UserRoundPlus,
//   CheckCircle,
// } from "lucide-react";

// import MoodGaugeChart from "../employerdashboard/MoodgaugeChart";

// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   Users,
//   CheckCircle,
// };

// const getIconComponent = (iconName: string): LucideIcon => {
//   return IconMap[iconName] || Users;
// };

// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap;
//   color: string;
//   onClick?: () => void;
//   description?: string;
//   moodValue?: string;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
//   return (
//     <div className="row g-3 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(String(stat.icon));

//         const isMoodCard = stat.title.toLowerCase().includes("mood");
//         const isTotalEmployees = stat.title.toLowerCase().includes("total employees");

//         const iconContainerStyle = {
//           width: "56px",
//           height: "56px",
//           backgroundColor: "#D4F8E5",
//           color: "#22C55E",
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         };

//         return (
//           <div
//             key={stat.title}
//             className="col-12 col-sm-6 col-lg-4"
//           >
//             <div
//               className="card h-100 border-0 shadow-sm bg-white overflow-hidden"
//               style={{
//                 borderRadius: "16px",
//                 cursor: stat.onClick ? "pointer" : "default",
//                 minHeight: isMoodCard ? "400px" : "160px", // Critical: gives room for the premium gauge
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               }}
//               onClick={stat.onClick}
//               onMouseEnter={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = "translateY(-6px)";
//                   e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (stat.onClick) {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
//                 }
//               }}
//             >
//               {/* Mood Card - Premium Speedometer Gauge */}
//               {isMoodCard ? (
//                 <div className="h-100 d-flex justify-content-start p-4">
//                   <MoodGaugeChart moodLabel={stat.moodValue || "Neutral"} />
//                 </div>
//               ) : (
//                 /* Other Cards: Total Employees, Add Employee, etc. */
//                 <div className="card-body p-4 d-flex align-items-center">
//                   <div
//                     className="d-flex align-items-center justify-content-center flex-shrink-0 me-4"
//                     style={iconContainerStyle}
//                   >
//                     <IconComponent size={28} />
//                   </div>

//                   <div className="flex-grow-1">
//                     {isTotalEmployees ? (
//                       <>
//                         <h6
//                           className="fw-bold mb-2 text-success"
//                           style={{ fontSize: "0.95rem", color: "#166534" }}
//                         >
//                           {stat.title}
//                         </h6>
//                         <h2 className="fw-bold mb-0" style={{ color: "#166534", fontSize: "2.2rem" }}>
//                           {stat.value}
//                         </h2>
//                       </>
//                     ) : (
//                       <>
//                         <h6
//                           className="fw-bold mb-1"
//                           style={{ color: "#166534", fontSize: "1rem" }}
//                         >
//                           {stat.title}
//                         </h6>
//                         {stat.description && (
//                           <p
//                             className="text-muted mb-0 small"
//                             style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
//                           >
//                             {stat.description}
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;
