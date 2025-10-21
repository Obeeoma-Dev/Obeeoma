
 // TODO: Replace with API call to fetch recent activities
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
    { name: "Marketing", value: 25, color: "#10b981" },
    { name: "HR", value: 25, color: "#60a5fa" },
    { name: "Finance", value: 25, color: "#f59e0b" },
    { name: "Engineering", value: 25, color: "#ef4444" },
  ];

  const testsByType = chartData?.testsByType || defaultTestsByType;
  const testsByDepartment = chartData?.testsByDepartment || defaultTestsByDepartment;

  return (
    <div className="row g-4 mb-4">
      {/* Bar Chart - Tests by Type */}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-4">Tests by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testsByType}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="value"
                  fill="var(--bs-primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart - Tests by Department */}
      <div className="col-12 col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-4">Tests by Department</h3>
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
                >
                  {testsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
