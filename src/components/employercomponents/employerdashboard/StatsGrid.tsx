import { Users, FileCheck, TrendingUp, AlertTriangle, LucideIcon } from "lucide-react";
import React from "react";

// --- 1. Define the Icon Mapping outside the component ---
// This mapping is static and should not be recreated on every render.
const IconMap: { [key: string]: LucideIcon } = {
  Users,
  FileCheck,
  TrendingUp,
  AlertTriangle,
};

// --- 2. Define a Utility Function for Icon Retrieval ---
// This is a clean utility function, eliminating the need for the inefficient
// definition inside the component.
const getIconComponent = (iconName: string): LucideIcon => {
  // Return the specific Lucide icon component, or Users as a default fallback
  return IconMap[iconName] || Users;
};

// --- 3. Update Interfaces ---
interface StatItem {
  title: string;
  value: string | number;
  // icon property is now more specifically typed as a key of the IconMap
  icon: keyof typeof IconMap; 
  color: string; // Expected to be a Bootstrap color suffix (e.g., 'primary', 'danger')
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {

  return (
    <div className="row g-2 mb-4">
      {stats.map((stat) => {
        // Use the utility function to get the correct icon component
        const IconComponent = getIconComponent(stat.icon.toString());
    
        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3">
                  <div 
                    // Use the dynamic Bootstrap background class and standard classes
                    className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} 
                    style={{ 
                      width: "48px", 
                      height: "48px", 
                      fontFamily: "body",
                      // Removed the conflicting 'color: "#3CB371"' inline style
                      // as the icon component handles its color via text-white class.
                    }}
                  >
                    {/* The Icon is correctly styled as white via 'text-white' */}
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted small mb-1" style={{fontFamily:"heading"}}>{stat.title}</p>
                    <h3 className="h4 fw-bold mb-1" style={{fontFamily:"heading"}}>{stat.value}</h3>
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

export default StatsGrid;