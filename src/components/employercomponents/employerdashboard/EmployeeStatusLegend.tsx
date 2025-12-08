import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmployeeStatusData {
  activeEmployees: number;
  inactiveEmployees: number;
  totalEmployees: number;
}

interface EmployeeStatusLegendProps {
  employeeStatus: EmployeeStatusData;
}

const EmployeeStatusLegend: React.FC<EmployeeStatusLegendProps> = ({ employeeStatus }) => {
  const { activeEmployees, inactiveEmployees, totalEmployees } = employeeStatus;
 
  const activePercentage = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;
  const inactivePercentage = totalEmployees > 0 ? Math.round((inactiveEmployees / totalEmployees) * 100) : 0;

  // Prepare data for the doughnut chart
  const data = {
    labels: ['Active Employees', 'Inactive Employees'],
    datasets: [
      {
        data: [activeEmployees, inactiveEmployees],
        backgroundColor: ['#10b981', '#9ca3af'], // Green for active, Gray for inactive
        borderColor: ['#10b981', '#9ca3af'],
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
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage = totalEmployees > 0 ? Math.round((value / totalEmployees) * 100) : 0;
               
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: data.datasets[0].pointStyle,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
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
            const percentage = totalEmployees > 0 ? Math.round((value / totalEmployees) * 100) : 0;
            return `${label}: ${value} employees (${percentage}%)`;
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

      {/* Additional summary stats */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
            <div className="text-sm text-gray-600">Active Employees</div>
            <div className="text-xs text-green-500 mt-1">{activePercentage}% of total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-500">{inactiveEmployees}</div>
            <div className="text-sm text-gray-600">Inactive Employees</div>
            <div className="text-xs text-gray-500 mt-1">{inactivePercentage}% of total</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 text-center">
          <div className="text-lg font-semibold text-gray-800">{totalEmployees}</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatusLegend;
