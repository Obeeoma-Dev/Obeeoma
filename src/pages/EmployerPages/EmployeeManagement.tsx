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
  Plus,
  MessageCircle,
} from "lucide-react";

const EmployeeManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      department: "Marketing",
      status: "Active",
      avatar: "J",
    },
    {
      id: 2,
      name: "Alex Johnson",
      email: "alex@example.com",
      department: "HR",
      status: "Active",
      avatar: "A",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam@example.com",
      department: "Finance",
      status: "Active",
      avatar: "S",
    },
    {
      id: 4,
      name: "Orena",
      email: "orenagedion2020@gmail.com",
      department: "Engineering",
      status: "Active",
      avatar: "O",
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/management", active: true },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
    { icon: FileText, label: "Reports", path: "/reports", active: false },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <h1 className="h4 fw-bold mb-0">Employee Management</h1>
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

          {/* Employee Management Content */}
          <main className="container-fluid py-4">
            {/* Header Section */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h5 fw-semibold mb-0">Employees</h2>
                  <button className="btn btn-primary d-flex align-items-center gap-2">
                    <Plus size={16} />
                    Add Employee
                  </button>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="row mb-4">
              <div className="col-12 col-md-6">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                  <input
                    type="search"
                    placeholder="Search employees..."
                    className="form-control ps-5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Employees Table */}
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0 ps-4 py-3 text-muted fw-normal">Name</th>
                            <th className="border-0 py-3 text-muted fw-normal">Email</th>
                            <th className="border-0 py-3 text-muted fw-normal">Department</th>
                            <th className="border-0 py-3 text-muted fw-normal">Status</th>
                            <th className="border-0 pe-4 py-3 text-muted fw-normal text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                              <td className="ps-4 py-3">
                                <div className="d-flex align-items-center gap-3">
                                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                    <span className="fw-bold text-primary">{employee.avatar}</span>
                                  </div>
                                  <span className="fw-medium">{employee.name}</span>
                                </div>
                              </td>
                              <td className="py-3 text-muted">{employee.email}</td>
                              <td className="py-3 text-muted">{employee.department}</td>
                              <td className="py-3">
                                <span className="badge bg-success bg-opacity-10 text-success">
                                  {employee.status}
                                </span>
                              </td>
                              <td className="pe-4 py-3 text-end">
                                <button className="btn btn-link p-0 text-muted">
                                  <MessageCircle size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Employee Section */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold mb-4">Add Employee</h3>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-medium">Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter employee name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-medium">Department</label>
                          <select className="form-select">
                            <option>Select department</option>
                            <option>Marketing</option>
                            <option>HR</option>
                            <option>Finance</option>
                            <option>Engineering</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-medium">Reports</label>
                          <select className="form-select">
                            <option>Select report type</option>
                            <option>Wellness Report</option>
                            <option>Performance Report</option>
                            <option>Attendance Report</option>
                          </select>
                        </div>
                        <button className="btn btn-primary">
                          Add Employee
                        </button>
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

export default EmployeeManagement;