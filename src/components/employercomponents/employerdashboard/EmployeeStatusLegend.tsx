import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDashboardData } from "../../../hooks/useDashboardData";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeStatusLegend: React.FC = () => {
  const { stats, loading, error } = useDashboardData();
  const summary = stats;

  if (loading) {
    return (
      <div className="department-legend-container text-center py-4">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading employee status...</p>
      </div>
    );
  }

  if (error && !summary) {
    return (
      <div className="department-legend-container text-center py-4">
        <div className="alert alert-danger" role="alert">
          <h6>Error loading employee status</h6>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Ensure data exists before destructuring
  if (!summary) return null;

  const { activeEmployees, inactiveEmployees, totalEmployees } = summary;

  // Increase each number after the entry
  const displayActive = activeEmployees;
  const displayInactive = inactiveEmployees;
  const displayTotal = totalEmployees;

  // Prepare data for the doughnut chart
  const data = {
    labels: ["Active Employees", "Inactive Employees"],
    datasets: [
      {
        data: [displayActive, displayInactive],
        backgroundColor: ["#10b981", "#9ca3af"], // Green for active, Gray for inactive
        borderColor: ["#10b981", "#9ca3af"],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: "#ffffff",
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
            weight: "normal" as const,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage =
                  displayTotal > 0
                    ? Math.round(
                        (data.datasets[0].data[i] / displayTotal) * 100,
                      )
                    : 0;

                return {
                  text: `${label}`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: data.datasets[0].pointStyle,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage =
              displayTotal > 0 ? Math.round((value / displayTotal) * 100) : 0;
            return `${label}: ${value} employees (${percentage}%)`;
          },
        },
      },
    },
    cutout: "50%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="department-legend-container">
      <div style={{ height: "300px", width: "100%" }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* Additional summary stats */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center"></div>
      </div>
    </div>
  );
};

export default EmployeeStatusLegend;
