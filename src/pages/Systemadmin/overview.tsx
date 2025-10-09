import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const chartData = [
  { week: "Week 1", usage: 3000 },
  { week: "Week 2", usage: 3200 },
  { week: "Week 3", usage: 3400 },
  { week: "Week 4", usage: 3600 },
  { week: "Week 5", usage: 3800 },
  { week: "Week 6", usage: 4200 },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        System Admin Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Organizations</p>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Clients</p>
          <p className="text-2xl font-bold">1,284</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold">$25,800</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Hotline Calls Today</p>
          <p className="text-2xl font-bold">42</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Weekly Platform Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
