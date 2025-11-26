import React from 'react';

interface DepartmentData {
  name: string;
  percentage: number;
  color: string;
}

interface DepartmentLegendProps {
  departments: DepartmentData[];
}

const DepartmentLegend: React.FC<DepartmentLegendProps> = ({ departments }) => {
  const defaultDepartments: DepartmentData[] = [
    { name: 'HR', percentage: 25, color: '#3B82F6' },
    { name: 'Marketing', percentage: 25, color: '#10B981' },
    { name: 'Finance', percentage: 25, color: '#F59E0B' },
    { name: 'Engineering', percentage: 25, color: '#EF4444' }
  ];

  const data = departments.length > 0 ? departments : defaultDepartments;

  return (
    <div className="department-legend">
      {data.map((dept, index) => (
        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <div 
              className="rounded-circle me-2"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: dept.color
              }}
            ></div>
            <span className="text-muted small">{dept.name}</span>
          </div>
          <span className="fw-semibold small">{dept.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default DepartmentLegend;