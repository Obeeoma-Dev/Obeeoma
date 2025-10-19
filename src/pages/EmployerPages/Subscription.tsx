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
  Check,
  Star,
} from "lucide-react";

const EmployerSubscription = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/management", active: false },
    { icon: CreditCard, label: "EmployerSubscription", path: "/employer-subscription", active: true },
    { icon: FileText, label: "Reports", path: "/reports", active: false },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams",
      features: [
        "Up to 10 employees",
        "Basic wellness assessments",
        "Email support",
        "Monthly reports",
      ],
      current: false,
      recommended: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing organizations",
      features: [
        "Up to 50 employees",
        "Advanced analytics",
        "Priority support",
        "Custom assessments",
        "Weekly reports",
        "API access",
      ],
      current: true,
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited employees",
        "Advanced analytics",
        "24/7 dedicated support",
        "White-label solutions",
        "Custom integrations",
        "SLA guarantee",
      ],
      current: false,
      recommended: false,
    },
  ];

  const billingHistory = [
    { id: 1, date: "Nov 15, 2023", amount: "$79.00", status: "Paid" },
    { id: 2, date: "Oct 15, 2023", amount: "$79.00", status: "Paid" },
    { id: 3, date: "Sep 15, 2023", amount: "$79.00", status: "Paid" },
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
                      placeholder="Search..."
                      className="form-control ps-5 bg-light"
                    />
                  </div>
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

          {/* EmployerSubscription Content */}
          <main className="container-fluid py-4">
            <h1 className="h2 fw-bold mb-4">Subscription Management</h1>

            {/* Current Plan */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold mb-3">Current Plan</h3>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h4 className="h4 fw-bold text-primary mb-1">Professional Plan</h4>
                        <p className="text-muted mb-2">$79 per month • Billed monthly</p>
                        <p className="text-muted small">Next billing date: Dec 15, 2023</p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <button className="btn btn-outline-primary me-2">Change Plan</button>
                        <button className="btn btn-primary">Update Payment Method</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="row mb-5">
              <div className="col-12">
                <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
                <div className="row g-4">
                  {plans.map((plan, index) => (
                    <div key={index} className="col-12 col-md-4">
                      <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-primary' : ''}`}>
                        {plan.recommended && (
                          <div className="card-header bg-primary text-white text-center py-2">
                            <Star size={16} className="me-1" />
                            Recommended
                          </div>
                        )}
                        <div className="card-body p-4 d-flex flex-column">
                          <h5 className="card-title fw-bold">{plan.name}</h5>
                          <div className="my-3">
                            <span className="h2 fw-bold">{plan.price}</span>
                            <span className="text-muted">/{plan.period}</span>
                          </div>
                          <p className="text-muted mb-4">{plan.description}</p>
                          
                          <ul className="list-unstyled mb-4 flex-grow-1">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="mb-2">
                                <Check size={16} className="text-success me-2" />
                                <span className="small">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-auto">
                            {plan.current ? (
                              <button className="btn btn-outline-primary w-100" disabled>
                                Current Plan
                              </button>
                            ) : (
                              <button className={`btn w-100 ${plan.recommended ? 'btn-primary' : 'btn-outline-primary'}`}>
                                Select Plan
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold mb-4">Billing History</h3>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingHistory.map((item) => (
                            <tr key={item.id}>
                              <td>{item.date}</td>
                              <td>{item.amount}</td>
                              <td>
                                <span className="badge bg-success">{item.status}</span>
                              </td>
                              <td>
                                <button className="btn btn-link p-0 text-primary">Download</button>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployerSubscription;