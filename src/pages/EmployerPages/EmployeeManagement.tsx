import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Plus,
  Mail,
//   Phone,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      department: "Marketing",
      role: "Manager",
      status: "Active",
      testsCompleted: 3,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@company.com",
      department: "Engineering",
      role: "Senior Developer",
      status: "Active",
      testsCompleted: 2,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@company.com",
      department: "HR",
      role: "HR Specialist",
      status: "Active",
      testsCompleted: 1,
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@company.com",
      department: "Finance",
      role: "Analyst",
      status: "Active",
      testsCompleted: 0,
      lastActive: "1 week ago",
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/employeemanagement", active: true },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
    { icon: Settings, label: "Settings", path: "/employeraccountsettings", active: false },
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

          {/* Employee Management Content */}
          <main className="p-3 p-sm-4 p-lg-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
              <div>
                <h1 className="mb-1" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  Employee Management
                </h1>
                <p className="mb-0" style={{ color: 'var(--obeeoma-text-muted)' }}>
                  Manage your organization's employees
                </p>
              </div>
              <button
                className="btn text-white d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'var(--obeeoma-primary)',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  border: 'none',
                }}
              >
                <Plus size={20} />
                Add Employee
              </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <p className="mb-1" style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                      Total Employees
                    </p>
                    <p className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>4</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <p className="mb-1" style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                      Active
                    </p>
                    <p className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>4</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <p className="mb-1" style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                      Departments
                    </p>
                    <p className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>4</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <p className="mb-1" style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                      Avg Tests
                    </p>
                    <p className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>1.5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Name
                        </th>
                        <th className="px-4 py-3 d-none d-md-table-cell" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Department
                        </th>
                        <th className="px-4 py-3 d-none d-lg-table-cell" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Role
                        </th>
                        <th className="px-4 py-3 d-none d-lg-table-cell" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Tests Completed
                        </th>
                        <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Status
                        </th>
                        <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-4 py-3">
                            <div>
                              <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                                {employee.name}
                              </div>
                              <div className="d-flex align-items-center gap-2" style={{ fontSize: '12px', color: 'var(--obeeoma-text-muted)' }}>
                                <Mail size={12} />
                                {employee.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 d-none d-md-table-cell">
                            <span
                              className="badge"
                              style={{
                                backgroundColor: 'var(--obeeoma-mint-dark)',
                                color: 'var(--obeeoma-primary)',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontWeight: '500',
                              }}
                            >
                              {employee.department}
                            </span>
                          </td>
                          <td className="px-4 py-3 d-none d-lg-table-cell" style={{ color: 'var(--obeeoma-text-muted)' }}>
                            {employee.role}
                          </td>
                          <td className="px-4 py-3 d-none d-lg-table-cell">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  width: '40px',
                                  height: '8px',
                                  backgroundColor: '#e5e7eb',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                }}
                              >
                                <div
                                  style={{
                                    width: `${(employee.testsCompleted / 3) * 100}%`,
                                    height: '100%',
                                    backgroundColor: 'var(--obeeoma-primary)',
                                  }}
                                ></div>
                              </div>
                              <span style={{ fontSize: '14px' }}>{employee.testsCompleted}/3</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="badge bg-success"
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontWeight: '500',
                              }}
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="btn btn-link p-1">
                              <MoreVertical size={18} color="var(--obeeoma-text-muted)" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
