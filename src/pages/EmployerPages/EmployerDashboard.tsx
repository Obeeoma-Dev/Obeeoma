import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  FileText,
  LogOut,
} from "lucide-react";
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

const EmployerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const statsData = [
    {
      title: "Total Employees",
      value: "4",
      description: "Active employees in the system",
      icon: Users,
      color: "primary",
    },
    {
      title: "Total Tests",
      value: "6",
      description: "Tests completed",
      icon: FileCheck,
      color: "info",
    },
    {
      title: "Average Score",
      value: "61%",
      description: "Average wellness score",
      icon: TrendingUp,
      color: "warning",
    },
    {
      title: "At Risk",
      value: "0",
      description: "Departments with risk factors",
      icon: AlertTriangle,
      color: "danger",
    },
  ];

  const testsByType = [
    { name: "Well-being Check", value: 2 },
    { name: "Burnout Risk", value: 1 },
  ];

  const testsByDepartment = [
    { name: "Marketing", value: 25, color: "#10b981" },
    { name: "HR", value: 25, color: "#60a5fa" },
    { name: "Finance", value: 25, color: "#f59e0b" },
    { name: "Engineering", value: 25, color: "#ef4444" },
  ];

  const recentActivity = [
    {
      text: "A new wellness test was completed in",
      department: "Engineering",
      time: "2 hours ago",
    },
    {
      text: "Department Marketing completed monthly assessments",
      department: "",
      time: "1 day ago",
    },
    {
      text: "New wellness resources added to the platform",
      department: "",
      time: "2 days ago",
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: true },
    { icon: UsersIcon, label: "Employees", path: "/management", active: false },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
    { icon: FileText, label: "Reports", path: "/reports", active: false },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`}
        style={{ width: "240px" }}
      >
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <span className="text-white fw-bold">O</span>
            </div>
            <span className="fw-bold text-dark">Obeeoma</span>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 mt-4">
          <p className="text-muted small mb-3 ps-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light text-primary" : "text-dark"}`}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <item.icon size={20} />
              <span className="fw-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top">
          <div className="d-flex align-items-center gap-3 px-3 py-2 mb-2">
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
              <span className="text-white fw-bold">E</span>
            </div>
            <div>
              <div className="fw-medium small">Emma Wilson</div>
              <div className="text-muted small">Member since Oct 2022</div>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/settings")}
            className="w-100 btn d-flex align-items-center gap-3 text-start text-dark"
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button
            className="w-100 btn d-flex align-items-center gap-3 text-start text-dark"
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="d-lg-flex">
        <div className="d-none d-lg-block" style={{ width: "240px" }}></div>
        
        <div className="flex-grow-1">
          {/* Top Bar */}
          <header className="bg-white border-bottom sticky-top z-30">
            <div className="container-fluid">
              <div className="row align-items-center py-3">
                <div className="col-auto d-lg-none">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="btn btn-link p-2"
                  >
                    <Menu size={24} />
                  </button>
                </div>
                <div className="col">
                  <h1 className="h4 fw-bold mb-0">Organization Overview</h1>
                </div>
                <div className="col-auto">
                  <button className="btn btn-link position-relative p-2 text-dark">
                    <Bell size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1"></span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="container-fluid py-4">
            {/* Stats Grid */}
            <div className="row g-3 mb-4">
              {statsData.map((stat) => (
                <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-start gap-3">
                        <div className={`rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: "48px", height: "48px" }}>
                          <stat.icon className="text-white" size={24} />
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted small mb-1">{stat.title}</p>
                          <h3 className="h4 fw-bold mb-1">{stat.value}</h3>
                          <p className="text-muted small mb-0">{stat.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="row g-4 mb-4">
              {/* Bar Chart */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 fw-semibold mb-4">Tests by Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={testsByType}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="var(--bs-primary)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
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

            {/* Recent Activity */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 fw-semibold mb-0">Recent Activity</h3>
                  <button className="btn btn-link text-primary text-decoration-none">
                    View All
                  </button>
                </div>
                <div className="list-group list-group-flush">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="list-group-item px-0 py-3 border-bottom-0">
                      <div className="d-flex align-items-start gap-3">
                        <div className="rounded-circle bg-primary mt-1 flex-shrink-0" style={{ width: "8px", height: "8px" }}></div>
                        <div className="flex-grow-1">
                          <p className="mb-0 small">
                            {activity.text}{" "}
                            {activity.department && (
                              <span className="fw-medium">{activity.department}</span>
                            )}
                          </p>
                        </div>
                        <span className="text-muted small flex-shrink-0">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;