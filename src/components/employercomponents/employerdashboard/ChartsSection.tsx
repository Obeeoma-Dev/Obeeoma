
 // TODO: Replace with API call to fetch recent activities and default zero data for newly registered companies
  // Example: const { data: activities, loading } = useRecentActivities();
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartData {
  testsByType: { name: string; value: number }[];
  testsByDepartment: { name: string; value: number; color: string }[];
}

interface ChartsSectionProps {
  chartData: ChartData | null;
}

const ChartsSection = ({ chartData }: ChartsSectionProps) => {
  const defaultTestsByType = [
    { name: "Well-being Check", value: 2 },
    { name: "Burnout Risk", value: 1 },
  ];

  const defaultTestsByDepartment = [
    { name: "Marketing", value: 25, color: "#3CB371" },
    { name: "HR", value: 25, color: "#60a5fa" },
    { name: "Finance", value: 25, color: "#f59e0b" },
    { name: "Engineering", value: 25, color: "#ef4444" },
  ];

  const testsByType = (chartData?.testsByType || defaultTestsByType).map(item => ({
    ...item,
    value: Math.round(item.value)
  }));
  const testsByDepartment = chartData?.testsByDepartment || defaultTestsByDepartment;

  return (
    <div className="row g-4 mb-4">
      {/* Bar Chart - mood trend of employees*/}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-4" style={{fontFamily:"heading"}}>Weekly Mood Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testsByType}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" style={{fontFamily:"heading"}} />
                <XAxis dataKey="name" style={{fontFamily:"heading"}} />
                <YAxis
                  allowDecimals={false}
                  tickFormatter={(value: number) => Math.round(value)}
                  style={{fontFamily:"heading"}} />
                <Bar
                  dataKey="value"
                  fill="#3CB371"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart - Subscribers by Department */}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-4" style={{fontFamily: "heading"}}>Subscribers by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testsByDepartment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  dataKey="value"
                  style={{fontFamily:"heading"}}
                >
                  {testsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend  wrapperStyle={{ fontFamily:"heading", paddingTop: '10px'}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
