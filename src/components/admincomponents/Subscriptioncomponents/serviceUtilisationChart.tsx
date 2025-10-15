// src/components/admincomponents/subscriptioncomponents/ServiceUtilizationChart.tsx

import React from 'react';
import { ProgressBar } from 'react-bootstrap';

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
    <div className="mb-4">
      <h5>Service Utilization</h5>
      {services.map((service, index) => (
        <div key={index} className="mb-2">
          <strong>{service.name}</strong>
          <ProgressBar now={service.percentage} label={`${service.percentage}%`} />
        </div>
      ))}
    </div>
  );
};

export default ServiceUtilizationChart;