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
