// src/components/admincomponents/subscriptioncomponents/ServiceUtilizationChart.tsx

import React from "react";

// Define props for each service usage
interface ServiceUsage {
  name: string;
  percentage: number;
}

interface Props {
  services: ServiceUsage[];
}

const ServiceUtilizationChart: React.FC<Props> = ({ services }) => {
  return (
    <div>
      {services.map((service, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: "500",
                color: "#1a1a1a",
              }}
            >
              {service.name}
            </span>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              {service.percentage}%
            </span>
          </div>
          {/* Progress bar container */}
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Progress bar fill */}
            <div
              style={{
                width: `${service.percentage}%`,
                height: "100%",
                backgroundColor: "#3CB371",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceUtilizationChart;
