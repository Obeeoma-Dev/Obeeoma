import { Users, FileCheck, TrendingUp, AlertTriangle } from "lucide-react";
import React from "react";

interface StatItem {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  // TODO: This mapping can be moved to a utility function
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Users,
      FileCheck,
      TrendingUp,
      AlertTriangle,
    };
    return icons[iconName] || Users;
  };

  return (
    <div className="row g-2 mb-4">
      {stats.map((stat) => {
        const IconComponent = getIcon(stat.icon);
  
        return (
          <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3">
                  <div 
                    className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} 
                    style={{ width: "48px", height: "48px", fontFamily: "body", color: "#3CB371" }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted small mb-1" style={{fontFamily:"heading", }}>{stat.title}</p>
                    <h3 className="h4 fw-bold mb-1"style={{fontFamily:"heading", }} >{stat.value}</h3>
                    <p className="text-muted small mb-0" style={{fontFamily:"heading", }}>{stat.description}</p>
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