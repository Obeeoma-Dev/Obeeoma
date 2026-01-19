import React from "react";
import { Card, Badge } from "react-bootstrap";
import * as Icons from "lucide-react";
import { StatCardData } from "./admindashboard";

interface StatCardProps {
  data: StatCardData;
}


const StatCard: React.FC<StatCardProps> = ({ data }) => {
  
  const isPositive = data.change.startsWith("+");

  
  const IconComponent = (Icons[data.icon as keyof typeof Icons] ??
    Icons.Activity) as React.FC<{ size?: number; color?: string }>;

  // Set icon color based on change direction
  const iconColor = isPositive ? "#3CB371" : "#dc3545"; 

  // Set badge variant and text color
  const badgeVariant = isPositive ? "success" : "danger";

  return (
    
    <Card
      className="shadow-sm border-0"
      role="region"
      aria-label={`Stat card for ${data.title}`}
    >
      <Card.Body>
        {/* Top section: icon and change badge */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          {/* Icon container with background color */}
          <div
            className={`rounded p-2 d-flex align-items-center justify-content-center ${data.iconColor}`}
            style={{
              backgroundColor: "#e6f4ea",
              width: "40px",
              height: "40px",
            }}
          >
            <IconComponent size={20} color={iconColor} />
          </div>

          {/* Change badge with dynamic color */}
          <Badge bg={badgeVariant} className="px-2 py-1 text-uppercase small">
            {data.change}
          </Badge>
        </div>

        {/* Bottom section: value and title */}
        <div>
          <h3 className="fw-bold mb-1">{data.value}</h3>
          <p className="text-muted small mb-0">{data.title}</p>
        </div>
      </Card.Body>
    </Card>
  );
};


export default StatCard;
