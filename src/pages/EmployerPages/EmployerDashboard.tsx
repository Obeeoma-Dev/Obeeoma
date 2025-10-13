import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const statsData = [
    {
      title: "Total Employees",
      value: "4",
      description: "Active employees in the system",
      icon: Users,
      iconBg: "var(--obeeoma-primary)",
    },
    {
      title: "Total Tests",
      value: "6",
      description: "Tests completed",
      icon: FileCheck,
      iconBg: "#3b82f6",
    },
    {
      title: "Average Score",
      value: "61%",
      description: "Average wellness score",
      icon: TrendingUp,
      iconBg: "#f59e0b",
    },
    {
      title: "At Risk",
      value: "0",
      description: "Departments with risk factors",
      icon: AlertTriangle,
      iconBg: "#ef4444",
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
    { icon: Settings, label: "Settings", path: "/settings", active: false },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f9fafb' }}>
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: 'white',
          borderRight: '1px solid var(--obeeoma-border)',
          width: '256px',
          zIndex: 1050,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
        className="d-lg-block"
      >
        <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>O</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--obeeoma-primary)' }}>
              Obeeoma
            </span>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 mt-4">
          <p style={{ fontSize: '12px', color: 'var(--obeeoma-text-muted)', marginBottom: '16px', paddingLeft: '12px' }}>
            Menu
          </p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="btn w-100 d-flex align-items-center gap-3 mb-2 text-start"
              style={{
                backgroundColor: item.active ? 'var(--obeeoma-mint-dark)' : 'transparent',
                color: item.active ? 'var(--obeeoma-primary)' : 'var(--obeeoma-text-dark)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '500',
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: 0 }} className="d-lg-flex">
        <div style={{ width: '256px' }} className="d-none d-lg-block"></div>
        
        <div className="flex-grow-1">
          {/* Top Bar */}
          <header className="bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center justify-content-between sticky-top">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-link d-lg-none p-2"
            >
              <Menu size={24} />
            </button>

            <div className="flex-grow-1 mx-4" style={{ maxWidth: '600px' }}>
              <div className="position-relative">
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--obeeoma-text-muted)',
                  }}
                />
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control"
                  style={{
                    paddingLeft: '40px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid var(--obeeoma-border)',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>

            <button className="btn btn-link position-relative p-2">
              <Bell size={20} />
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--obeeoma-primary)',
                  borderRadius: '50%',
                }}
              ></span>
            </button>
          </header>

          {/* Dashboard Content */}
          <main className="p-3 p-sm-4 p-lg-5">
            <h1 className="mb-4" style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Organization Overview
            </h1>

            {/* Stats Grid */}
            <div className="row g-3 g-sm-4 mb-4">
              {statsData.map((stat) => (
                <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start gap-3">
                        <div
                          style={{
                            backgroundColor: stat.iconBg,
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <stat.icon size={24} color="white" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-1" style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                            {stat.title}
                          </p>
                          <p className="mb-1" style={{ fontSize: '32px', fontWeight: 'bold' }}>
                            {stat.value}
                          </p>
                          <p className="mb-0" style={{ fontSize: '12px', color: 'var(--obeeoma-text-muted)' }}>
                            {stat.description}
                          </p>
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
                  <div className="card-body p-4">
                    <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
                      Tests by Type
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={testsByType}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Bar dataKey="value" fill="var(--obeeoma-primary)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
                      Tests by Department
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={testsByDepartment}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
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
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="mb-0" style={{ fontSize: '18px', fontWeight: '600' }}>
                    Recent Activity
                  </h3>
                  <button
                    className="btn btn-link"
                    style={{ color: 'var(--obeeoma-primary)', textDecoration: 'none' }}
                  >
                    View All
                  </button>
                </div>
                <div>
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-start gap-3 py-3"
                      style={{ borderBottom: index < recentActivity.length - 1 ? '1px solid var(--obeeoma-border)' : 'none' }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--obeeoma-primary)',
                          marginTop: '8px',
                          flexShrink: 0,
                        }}
                      ></div>
                      <div className="flex-grow-1">
                        <p className="mb-0" style={{ fontSize: '14px' }}>
                          {activity.text}{" "}
                          {activity.department && (
                            <span style={{ fontWeight: '500' }}>{activity.department}</span>
                          )}
                        </p>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--obeeoma-text-muted)', whiteSpace: 'nowrap' }}>
                        {activity.time}
                      </span>
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

export default Dashboard;
