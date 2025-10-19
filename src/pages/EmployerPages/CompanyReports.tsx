import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings as SettingsIcon,
  Search,
  Bell,
  Menu,
  X,
  FileText,
  LogOut,
  Download,
  Filter,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CompanyReports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/management", active: false },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
    { icon: FileText, label: "Reports", path: "/reports", active: true },
  ];

  const wellnessTrends = [
    { month: "Jan", wellness: 65, stress: 35, engagement: 70 },
    { month: "Feb", wellness: 68, stress: 32, engagement: 72 },
    { month: "Mar", wellness: 72, stress: 28, engagement: 75 },
    { month: "Apr", wellness: 70, stress: 30, engagement: 73 },
    { month: "May", wellness: 75, stress: 25, engagement: 78 },
    { month: "Jun", wellness: 78, stress: 22, engagement: 80 },
  ];

  const departmentMetrics = [
    { department: "Engineering", wellness: 82, participation: 95, risk: 8 },
    { department: "Marketing", wellness: 75, participation: 88, risk: 15 },
    { department: "HR", wellness: 80, participation: 92, risk: 10 },
    { department: "Finance", wellness: 78, participation: 85, risk: 12 },
    { department: "Sales", wellness: 72, participation: 80, risk: 18 },
  ];

  const reportTypes = [
    { name: "Wellness Summary", description: "Overall employee wellness metrics", frequency: "Monthly" },
    { name: "Department Analysis", description: "Detailed department-wise breakdown", frequency: "Quarterly" },
    { name: "Risk Assessment", description: "Identified risk factors and trends", frequency: "Weekly" },
    { name: "Engagement Report", description: "Employee engagement and participation", frequency: "Monthly" },
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
          <button
            onClick={() => navigate("/settings")}
            className="w-100 btn d-flex align-items-center gap-3 text-start text-dark"
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <SettingsIcon size={20} />
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
                  <div className="position-relative" style={{ maxWidth: "400px" }}>
                    <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                    <input
                      type="search"
                      placeholder="Search reports..."
                      className="form-control ps-5 bg-light"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary d-flex align-items-center gap-2">
                    <Download size={16} />
                    Export All
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Reports Content */}
          <main className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h2 fw-bold mb-0">Company Reports</h1>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Calendar size={16} />
                  Date Range
                </button>
              </div>
            </div>

            {/* Wellness Trends Chart */}
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
                        <Line type="monotone" dataKey="wellness" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Metrics */}
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
                        <Bar dataKey="wellness" fill="#10b981" name="Wellness Score" />
                        <Bar dataKey="participation" fill="#3b82f6" name="Participation %" />
                        <Bar dataKey="risk" fill="#ef4444" name="Risk %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Reports */}
            <div className="row">
              <div className="col-12">
                <h3 className="h4 fw-semibold mb-4">Available Reports</h3>
                <div className="row g-4">
                  {reportTypes.map((report, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4 d-flex flex-column">
                          <h5 className="card-title fw-bold">{report.name}</h5>
                          <p className="text-muted small flex-grow-1">{report.description}</p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="badge bg-light text-dark">{report.frequency}</span>
                            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                              <Download size={14} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Summary */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold mb-4">Key Metrics Summary</h3>
                    <div className="row text-center">
                      <div className="col-6 col-md-3 mb-3">
                        <div className="p-3">
                          <div className="h4 fw-bold text-primary">78%</div>
                          <div className="text-muted small">Overall Wellness</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="p-3">
                          <div className="h4 fw-bold text-success">92%</div>
                          <div className="text-muted small">Participation Rate</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="p-3">
                          <div className="h4 fw-bold text-warning">12%</div>
                          <div className="text-muted small">At Risk</div>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 mb-3">
                        <div className="p-3">
                          <div className="h4 fw-bold text-info">85%</div>
                          <div className="text-muted small">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompanyReports;