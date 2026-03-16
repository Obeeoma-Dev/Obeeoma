import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Phone } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BAR_COLORS = ["#9DD3AF", "#00A859", "#3CB371", "#0B6E45"];

const PhoneIcon = Phone;

const categoryStyles = {
  "Crisis": "hotline-recommendations-category-crisis",
  "Support": "hotline-recommendations-category-support",
  "Information": "hotline-recommendations-category-information",
  "Emergency": "hotline-recommendations-category-emergency"
};

const hotlines = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    category: "Crisis",
    timesRecommended: 245,
    status: "Active"
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    category: "Crisis",
    timesRecommended: 189,
    status: "Active"
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    category: "Support",
    timesRecommended: 156,
    status: "Active"
  },
  {
    name: "National Domestic Violence Hotline",
    number: "1-800-799-7233",
    category: "Emergency",
    timesRecommended: 134,
    status: "Active"
  }
];

const defaultData = {
  labels: ["Videos", "Articles", "Audio", "Interactive"],
  datasets: [
    {
      label: "Effectiveness (%)",
      data: [85, 70, 60, 50],
      backgroundColor: BAR_COLORS,
      borderRadius: 6,
      maxBarThickness: 30,
    },
  ],
};

// Horizontal bars
const options = {
  indexAxis: "y" as const,
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: { display: false },
    },
    y: {
      grid: { display: false },
    },
  },
};

interface EffectivenessChartProps {
  effectivenessByType?: Array<{
    resource_type?: string;
    avg_effectiveness?: number;
  }>;
}

const EffectivenessChart: React.FC<EffectivenessChartProps> = ({
  effectivenessByType,
}) => {
  const labels = effectivenessByType?.length
    ? effectivenessByType
      .map((t) => (t.resource_type || "").replace(/_/g, " "))
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    : defaultData.labels;
  const values = effectivenessByType?.length
    ? effectivenessByType.map((t) => Number(t.avg_effectiveness) || 0)
    : defaultData.datasets[0].data;
  const data = {
    labels,
    datasets: [
      {
        label: "Effectiveness (%)",
        data: values,
        backgroundColor: values.map(
          (_, i) => BAR_COLORS[i % BAR_COLORS.length],
        ),
        borderRadius: 6,
        maxBarThickness: 30,
      },
    ],
  };
  return (
    <Card className="hotline-recommendations-card">
      <Card.Body className="hotline-recommendations-body">
        <div className="hotline-recommendations-header">
          <h3 className="hotline-recommendations-title">
            Hotline Recommendations
          </h3>
          <p className="hotline-recommendations-subtitle">
            Numbers the AI is currently recommending to users in crisis
          </p>
        </div>

        <div className="hotline-recommendations-content">
          {/* Header */}
          <div className="hotline-recommendations-grid-header">
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-name">
              Hotline
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-category">
              Category
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-times">
              Times
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-status">
              Status
            </span>
          </div>

          <div className="hotline-recommendations-list">
            {hotlines.map((hotline) => (
              <div
                key={hotline.name}
                className="hotline-recommendations-row"
              >
                {/* Name + Number */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-name">
                  <p className="hotline-recommendations-name">
                    {hotline.name}
                  </p>
                  <div className="hotline-recommendations-number-wrapper">
                    <PhoneIcon
                      size={11}
                      className="hotline-recommendations-phone-icon"
                    />
                    <span className="hotline-recommendations-number">
                      {hotline.number}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-category">
                  <span
                    className={`hotline-recommendations-category ${categoryStyles[hotline.category as keyof typeof categoryStyles]}`}
                  >
                    {hotline.category}
                  </span>
                </div>

                {/* Times */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-times">
                  <span className="hotline-recommendations-times-count">
                    {hotline.timesRecommended}
                  </span>
                  <span className="hotline-recommendations-times-multiply">
                    ×
                  </span>
                </div>

                {/* Status */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-status">
                  <span
                    className={`hotline-recommendations-status ${hotline.status === 'Active' ? 'hotline-recommendations-status-active' : 'hotline-recommendations-status-paused'}`}
                  >
                    <span
                      className={`hotline-recommendations-status-indicator ${hotline.status === 'Active' ? 'hotline-recommendations-indicator-active' : 'hotline-recommendations-indicator-paused'}`}
                    />
                    {hotline.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default EffectivenessChart;
