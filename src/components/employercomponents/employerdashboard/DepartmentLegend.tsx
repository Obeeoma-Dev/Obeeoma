import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DepartmentData {
  name: string;
  percentage: number;
  color: string;
}

interface DepartmentLegendProps {
  departments: DepartmentData[];
}

const DepartmentLegend: React.FC<DepartmentLegendProps> = ({ departments }) => {
  // Prepare data for the doughnut chart
  const data = {
    labels: departments.map(dept => dept.name),
    datasets: [
      {
        data: departments.map(dept => dept.percentage),
        backgroundColor: departments.map(dept => dept.color),
        borderColor: departments.map(dept => dept.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff',
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      },
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="department-legend-container">
      <div style={{ height: '300px', width: '100%' }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* Additional legend with percentages */}
      <div className="mt-3">
        {departments.map((dept, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle me-2"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: dept.color,
                  flexShrink: 0
                }}
              />
              <span className="small fw-medium text-dark">{dept.name}</span>
            </div>
            <span className="small text-muted fw-semibold">{dept.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentLegend;