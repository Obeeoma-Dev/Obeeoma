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
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="m-0 mb-2 text-gray-800">Mood Trend</h2>
      <p className="m-0 mb-5 text-gray-600 text-sm">Automated from aggregated data</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={moodData}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* XAxis with dates */}
            <XAxis
              dataKey="date"
              tick={{ fill: '#666' }}
              axisLine={{ stroke: '#ccc' }}
            />

            {/* YAxis with emojis */}
            <YAxis
              tick={renderEmojiTick}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              axisLine={{ stroke: '#ccc' }}
              tickLine={false}
              label={{
                value: 'Mood',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                style: { fill: '#666' }
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Mood line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WellnessTrends;