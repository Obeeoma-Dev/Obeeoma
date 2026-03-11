import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface EngagementChartsProps {
  weeklyEngagement?: number[];
}

const EngagementCharts: React.FC<EngagementChartsProps> = ({
  weeklyEngagement = [],
}) => {
  const weeklyData =
    weeklyEngagement.length === 7 ? weeklyEngagement : [0, 0, 0, 0, 0, 0, 0];

  const weeklyEngagementChart = {
    labels: DAY_LABELS,
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: weeklyData,
        borderColor: "#3CB371",
        backgroundColor: "rgba(11, 110, 69, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="mb-4">
      <Row className="g-4">
        <Col xs={12}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5
                className="mb-3"
                style={{ color: "#00A859", fontFamily: "body" }}
              >
                Weekly Engagement Rate (%)
              </h5>
              <Line data={weeklyEngagementChart} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EngagementCharts;
