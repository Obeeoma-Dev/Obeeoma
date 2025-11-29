// import { Users, FileCheck, TrendingUp, AlertTriangle, LucideIcon, UserRoundMinus, UserRoundPlus, HelpCircle, UsersRound,} from "lucide-react";
// import React from "react";
// // --- 1. Define the Icon Mapping outside the component ---
// // This mapping is static and should not be recreated on every render.
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
// };

// // --- 2. Define a Utility Function for Icon Retrieval ---
// // This is a clean utility function, eliminating the need for the inefficient
// // definition inside the component.
// const getIconComponent = (iconName: string): LucideIcon => {
//   // Return the specific Lucide icon component, or Users as a default fallback
//   return IconMap[iconName] || Users;
// };

// // --- 3. Update Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap; 
//   color: string; 
//   onClick?: () => void;
// }

// interface TopGridProps {
//   stats: StatItem[];
// }

// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {

//   return (
//     <div className="row g-2 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
//         const isMoodCard = stat.value === "ok";
//         // Checking if this is the mood card
    
//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div 
//               className="top-card h-100 border-0 shadow-sm"
//               style={{
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
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
//                   e.currentTarget.style.boxShadow = '';
//                 }
//               }} >
//               <div className="top-card-body">
//                 <div className="d-flex align-items-start gap-3">
//                   <div 
//                     className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} 
//                     style={{ 
//                       width: "48px", 
//                       height: "48px", 
//                       fontFamily: "body",
//                     }} >

//                     <IconComponent className="top-card-icon text-white" size={24} />
//                   </div>
//                   <div className="flex-grow-1">
//                     {isMoodCard ? (
//                       // Special layout for mood card - title and value on same line
//                       <div className="d-flex align-items-baseline">
//                         <p className="text-muted small mb-1 me-2" style={{fontFamily:"heading"}}>
//                           {stat.title}
//                         </p>
//                         <h3 className="h4 fw-bold mb-1" style={{fontFamily:"heading", color:"grey"}}>
//                           {stat.value}
//                         </h3>
//                       </div>
//                     ) : (
//                       // Default layout for other cards
//                       <>
//                         <p className="text-muted small mb-1" style={{fontFamily:"heading"}}>{stat.title}</p>
//                         <h3 className="h4 fw-bold mb-1" style={{fontFamily:"heading"}}>{stat.value}</h3>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TopGrid;

// import { Users, FileCheck, TrendingUp, AlertTriangle, LucideIcon, UserRoundMinus, UserRoundPlus, HelpCircle, UsersRound,} from "lucide-react";
// import React from "react";
// // --- 1. Define the Icon Mapping outside the component ---
// // This mapping is static and should not be recreated on every render.
// const IconMap: { [key: string]: LucideIcon } = {
//   UserRoundPlus,
//   UsersRound,
//   TrendingUp,
//   HelpCircle,
// };

// // --- 2. Define a Utility Function for Icon Retrieval ---
// // This is a clean utility function, eliminating the need for the inefficient
// // definition inside the component.
// const getIconComponent = (iconName: string): LucideIcon => {
//   // Return the specific Lucide icon component, or Users as a default fallback
//   return IconMap[iconName] || Users;
// };

// // --- 3. Update Interfaces ---
// interface StatItem {
//   title: string;
//   value: string | number;
//   icon: keyof typeof IconMap; 
//   color: string; // Expected to be a Bootstrap color suffix (e.g., 'primary', 'danger')
//   onClick?: () => void; // Optional callback for clickable items like "Add Employee"
// }

// interface TopGridProps {
//   stats: StatItem[];
// }
// const isCustomColor = stat.color.startsWith('#');
// const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
  

//   return (
//     <div className="row g-2 mb-4">
//       {stats.map((stat) => {
//         const IconComponent = getIconComponent(stat.icon.toString());
    
//         return (
//           <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
//             <div 
//               className="top-card h-100 border-0 shadow-sm"
//               style={{
//                 cursor: stat.onClick ? 'pointer' : 'default',
//                 transition: stat.onClick ? 'transform 0.2s, box-shadow 0.2s' : 'none',
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
//                   e.currentTarget.style.boxShadow = '';
//                 }
//               }} >
//               <div className="top-card-body">
//                 <div className="d-flex align-items-start gap-3">
//                   <div 
//                     className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} 
//                     style={{ 
//                       width: "48px", 
//                       height: "48px", 
//                       fontFamily: "body",
//                       backgroundColor: isCustomColor ? stat.color : undefined,
//                     }} >

//                     <IconComponent className="top-card-icon text-white" size={24} />
//                   </div>
//                   <div className="flex-grow-1">
//                     <p className="text-muted small mb-1" style={{fontFamily:"heading", fontSize:"13.5px"}}>{stat.title}</p>
//                     <h3 className="h4 fw-bold mb-1" style={{fontFamily:"heading", color:"grey"}}>{stat.value}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
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

// --- 1. Define the Icon Mapping ---
// Add all imported icons that should be available to the StatItem
const IconMap: { [key: string]: LucideIcon } = {
  UserRoundPlus,
  UsersRound,
  TrendingUp,
  HelpCircle,
  Users, // Added Users as a potential icon choice
};

// --- 2. Define a Utility Function for Icon Retrieval ---
const getIconComponent = (iconName: string): LucideIcon => {
  // Return the specific Lucide icon component, or Users as a default fallback
  // The type assertion 'as LucideIcon' handles the case where iconName might not be a keyof typeof IconMap
  return IconMap[iconName] || Users; 
};

// --- 3. Define Interfaces ---
interface StatItem {
  title: string;
  value: string | number;
  // Ensure the icon property correctly references keys in IconMap, allowing 'Users' as well
  icon: keyof typeof IconMap | 'Users'; 
  color: string; // Can be a Bootstrap class (e.g., 'primary') or a hex code (e.g., '#22C55E')
  onClick?: () => void;
}

interface TopGridProps {
  stats: StatItem[];
}

// --- 4. The Main Component ---
const TopGrid: React.FC<TopGridProps> = ({ stats }) => {
  return (
    <div className="row g-2 mb-4">
      {stats.map((stat) => {
        // --- LOGIC MOVED INSIDE THE MAP LOOP ---
        const IconComponent = getIconComponent(stat.icon.toString());
        // Determine if the color property is a custom hex/CSS value
        const isCustomColor = stat.color.startsWith('#');
        // Determine the class name: empty string if custom color, or bg-COLOR if Bootstrap class
        const bgColorClass = isCustomColor ? '' : `bg-${stat.color}`;
        
        // Define inline style for background color, prioritizing custom color
        const iconContainerStyle = {
          width: "48px",
          height: "48px",
          fontFamily: "body",
          backgroundColor: isCustomColor ? stat.color : undefined,
        };
        // --- END LOGIC ---

        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3 top-card-title">
            <div
              className="top-card h-100 border-0 shadow-sm"
              style={{
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
                  e.currentTarget.style.boxShadow = '';
                }
              }}
            >
              <div className="top-card-body">
                <div className="d-flex align-items-start gap-3">
                  <div
                    // Apply common classes plus the dynamically determined background class
                    className={`rounded-circle ${bgColorClass} d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={iconContainerStyle}
                  >
                    <IconComponent className="top-card-icon text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted small mb-1" style={{ fontFamily: "heading", fontSize: "13.5px" }}>
                      {stat.title}
                    </p>
                    <h3 className="h4 fw-bold mb-1" style={{ fontFamily: "heading", color: "grey" }}>
                      {stat.value}
                      {/* You can re-add the conditional (OK) here if needed */}
                      {/* {stat.value === 'ok' && <span className="text-success small ms-2">(OK)</span>} */}
                    </h3>
                  </div>
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