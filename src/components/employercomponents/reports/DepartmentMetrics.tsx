import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const DepartmentMetrics = () => {
  // TODO: Replace with API data
  const departmentMetrics = [
    { department: "Engineering", wellness: 82, participation: 95, risk: 8 },
    { department: "Marketing", wellness: 75, participation: 88, risk: 15 },
    { department: "HR", wellness: 80, participation: 92, risk: 10 },
    { department: "Finance", wellness: 78, participation: 85, risk: 12 },
    { department: "Sales", wellness: 72, participation: 80, risk: 18 },
  ];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-4">Department Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wellness" fill="#9bb6adff" name="Wellness Score" />
                <Bar dataKey="participation" fill="#22C55E" name="Participation %" />
                <Bar dataKey="risk" fill="#0d86366b"  name="Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMetrics;