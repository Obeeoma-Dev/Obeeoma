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
  icon: keyof typeof IconMap; 
  color: string; // Expected to be a Bootstrap color suffix (e.g., 'primary', 'danger')
  onClick?: () => void; // Optional callback for clickable items like "Add Employee"
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {

  return (
    <div className="row g-2 mb-4">
      {stats.map((stat) => {
        const IconComponent = getIconComponent(stat.icon.toString());
    
        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
            <div 
              className="card h-100 border-0 shadow-sm"
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
              <div className="card-body">
                <div className="d-flex align-items-start gap-3">
                  <div 
                    className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} 
                    style={{ 
                      width: "48px", 
                      height: "48px", 
                      fontFamily: "body",
                    }} >

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