import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const WellnessTrends = () => {
  // TODO: Replace with API data
  const wellnessTrends = [
    { month: "Jan", wellness: 65, stress: 35, engagement: 70 },
    { month: "Feb", wellness: 68, stress: 32, engagement: 72 },
    { month: "Mar", wellness: 72, stress: 28, engagement: 75 },
    { month: "Apr", wellness: 70, stress: 30, engagement: 73 },
    { month: "May", wellness: 75, stress: 25, engagement: 78 },
    { month: "Jun", wellness: 78, stress: 22, engagement: 80 },
  ];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-4">Wellness Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={wellnessTrends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wellness" stroke="#77e7c2ff" strokeWidth={2} />
                <Line type="monotone" dataKey="stress" stroke="#22C55E" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#606968ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTrends;