import React from 'react';

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
    <div className="p-3">
      {services.map((service, index) => (
        <div key={index} className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontFamily: 'body' }}>
            <span className="small fw-medium">{service.name}</span>
            <span className="small text-muted">{service.percentage}%</span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${service.percentage}%` }}
              aria-valuenow={service.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceUtilizationChart;