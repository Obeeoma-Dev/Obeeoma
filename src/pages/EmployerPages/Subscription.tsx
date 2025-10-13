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
  Download,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentDialog from "@/components/employerscomponents/PaymentDialog";

const Subscription = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/management", active: false },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: true },
    { icon: Settings, label: "Settings", path: "/settings", active: false },
  ];

  const billingHistory = [
    { date: "September 15, 2023", amount: "$9.99", invoice: "#INV-2023-09", status: "Paid" },
    { date: "August 15, 2023", amount: "$9.99", invoice: "#INV-2023-08", status: "Paid" },
    { date: "July 15, 2023", amount: "$9.99", invoice: "#INV-2023-07", status: "Paid" },
  ];

  const addOns = [
    { name: "Premium Analytics", price: "$19/month", active: true },
    { name: "Advanced Reporting", price: "$29/month", active: false },
  ];

  const discounts = [
    { code: "ANNUAL2024", discount: "20% off", validUntil: "2024-12-31" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`position-fixed top-0 start-0 h-100 bg-white border-end ${
          isSidebarOpen ? "translate-x-0" : ""
        } d-lg-block`}
        style={{
          width: "256px",
          zIndex: 1050,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s",
        }}
      >
        <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div
              className="rounded-circle d-flex align-items-center justify-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--obeeoma-primary)",
              }}
            >
              <span className="text-white fw-bold fs-5">O</span>
            </div>
            <span className="fs-4 fw-bold" style={{ color: "var(--obeeoma-primary)" }}>
              Obeeoma
            </span>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 mt-4">
          <p className="text-muted small mb-3 px-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`btn w-100 d-flex align-items-center gap-3 px-3 py-3 mb-2 text-start ${
                item.active
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                backgroundColor: item.active ? "var(--obeeoma-primary)" : "transparent",
                border: "none",
              }}
            >
              <item.icon size={20} />
              <span className="fw-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: "256px" }} className="d-none d-lg-block">
        <div className="d-lg-none">
          <div style={{ marginLeft: 0 }}>
            {/* Mobile content */}
          </div>
        </div>
      </div>

      <div className="d-lg-none">
        <div style={{ marginLeft: 0 }}>
          {/* Top Bar - Mobile */}
          <header className="bg-white border-bottom px-3 py-3 d-flex align-items-center justify-content-between sticky-top">
            <button onClick={() => setIsSidebarOpen(true)} className="btn btn-link p-2">
              <Menu size={24} />
            </button>

            <div className="flex-grow-1 mx-3" style={{ maxWidth: "400px" }}>
              <div className="position-relative">
                <Search className="position-absolute start-0 top-50 translate-middle-y ms-3" size={16} style={{ color: "#6b7280" }} />
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control ps-5"
                  style={{ backgroundColor: "#f9fafb" }}
                />
              </div>
            </div>

            <button className="btn btn-link position-relative p-2">
              <Bell size={20} />
              <span
                className="position-absolute top-0 end-0 rounded-circle"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--obeeoma-primary)",
                }}
              ></span>
            </button>
          </header>
        </div>
      </div>

      <div style={{ marginLeft: "256px" }}>
        {/* Top Bar - Desktop */}
        <header className="bg-white border-bottom px-4 py-3 align-items-center justify-content-between sticky-top d-none d-lg-flex">
          <div className="flex-grow-1 mx-4" style={{ maxWidth: "500px" }}>
            <div className="position-relative">
              <Search className="position-absolute start-0 top-50 translate-middle-y ms-3" size={16} style={{ color: "#6b7280" }} />
              <input
                type="search"
                placeholder="Search resources, programs..."
                className="form-control ps-5"
                style={{ backgroundColor: "#f9fafb" }}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link position-relative p-2">
              <Bell size={20} />
              <span
                className="position-absolute top-0 end-0 rounded-circle"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--obeeoma-primary)",
                }}
              ></span>
            </button>
            <div className="text-end">
              <div className="fw-semibold">Emma Wilson</div>
              <div className="small text-muted">Member since Oct 2022</div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 p-lg-5">
          <h1 className="fs-2 fw-bold mb-4">My Subscription</h1>

          {/* Tabs */}
          <div className="mb-4">
            <ul className="nav nav-tabs border-bottom">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                  style={{
                    color: activeTab === "overview" ? "var(--obeeoma-primary)" : "#6b7280",
                    borderBottom: activeTab === "overview" ? "2px solid var(--obeeoma-primary)" : "none",
                  }}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "plans" ? "active" : ""}`}
                  onClick={() => setActiveTab("plans")}
                  style={{
                    color: activeTab === "plans" ? "var(--obeeoma-primary)" : "#6b7280",
                    borderBottom: activeTab === "plans" ? "2px solid var(--obeeoma-primary)" : "none",
                  }}
                >
                  Plans
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "billing" ? "active" : ""}`}
                  onClick={() => setActiveTab("billing")}
                  style={{
                    color: activeTab === "billing" ? "var(--obeeoma-primary)" : "#6b7280",
                    borderBottom: activeTab === "billing" ? "2px solid var(--obeeoma-primary)" : "none",
                  }}
                >
                  Billing History
                </button>
              </li>
            </ul>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="row g-4">
              {/* Current Subscription */}
              <div className="col-lg-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Current Subscription</h5>
                    <div className="p-3 rounded mb-3" style={{ backgroundColor: "var(--obeeoma-mint)" }}>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <CreditCard size={20} style={{ color: "var(--obeeoma-primary)" }} />
                        <h6 className="mb-0 fw-bold">Enterprise Plan</h6>
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="small text-muted">Seats</div>
                          <div className="fw-semibold">10</div>
                        </div>
                        <div className="col-6">
                          <div className="small text-muted">Used Seats</div>
                          <div className="fw-semibold">5</div>
                        </div>
                        <div className="col-6">
                          <div className="small text-muted">Available Seats</div>
                          <div className="fw-semibold">5</div>
                        </div>
                        <div className="col-6">
                          <div className="small text-muted">Renewal Date</div>
                          <div className="fw-semibold">2023-12-31</div>
                        </div>
                        <div className="col-12">
                          <div className="small text-muted mb-2">Monthly Amount</div>
                          <div className="fs-4 fw-bold">$499</div>
                        </div>
                      </div>
                      <div className="progress mt-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar"
                          style={{ width: "50%", backgroundColor: "var(--obeeoma-primary)" }}
                        ></div>
                      </div>
                    </div>
                    <button
                      className="btn w-100 text-white"
                      style={{ backgroundColor: "var(--obeeoma-primary)" }}
                    >
                      Manage Payment Method
                    </button>
                  </div>
                </div>
              </div>

              {/* Add-Ons */}
              <div className="col-lg-6">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="card-title mb-0">Add-Ons</h5>
                      <button
                        className="btn btn-sm"
                        style={{ color: "var(--obeeoma-primary)" }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      {addOns.map((addon, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center p-3 border rounded">
                          <div>
                            <div className="fw-semibold">{addon.name}</div>
                            <div className="small text-muted">{addon.price}</div>
                          </div>
                          <div className="d-flex gap-2">
                            {addon.active ? (
                              <span className="badge" style={{ backgroundColor: "var(--obeeoma-mint)", color: "var(--obeeoma-primary)" }}>
                                Active
                              </span>
                            ) : (
                              <button
                                className="btn btn-sm"
                                style={{ color: "var(--obeeoma-primary)" }}
                              >
                                Enable
                              </button>
                            )}
                            <button className="btn btn-sm btn-outline-secondary">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discounts */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Active Discounts</h5>
                    {discounts.map((discount, index) => (
                      <div key={index} className="p-3 border rounded mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-bold">{discount.code}</div>
                            <div className="text-muted small">Valid until {discount.validUntil}</div>
                          </div>
                          <span className="badge bg-success">{discount.discount}</span>
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn btn-outline-secondary w-100"
                    >
                      Apply New Discount Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Upgrade Management */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Upgrade Management</h5>
                    <div className="p-3 border rounded mb-3">
                      <div className="fw-semibold mb-2">Need more seats?</div>
                      <div className="text-muted small mb-3">
                        Upgrade to Enterprise Plus for up to 25 employees
                      </div>
                      <button
                        className="btn btn-sm text-white"
                        style={{ backgroundColor: "var(--obeeoma-primary)" }}
                        onClick={() => setShowPaymentDialog(true)}
                      >
                        View Upgrade Options
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Renewals */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Auto-Renewal Settings</h5>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="autoRenewal"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="autoRenewal">
                        Enable auto-renewal
                      </label>
                    </div>
                    <div className="small text-muted">
                      Your subscription will automatically renew on 2023-12-31
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Subscription */}
              <div className="col-lg-6">
                <div className="card border-danger">
                  <div className="card-body">
                    <h5 className="card-title text-danger mb-4">Cancel Subscription</h5>
                    <div className="text-muted small mb-3">
                      Canceling your subscription will disable access to all features at the end of the billing period.
                    </div>
                    <button className="btn btn-outline-danger">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === "plans" && (
            <div>
              <h4 className="mb-4">Available Plans</h4>
              <div className="row g-4">
                {/* Starter Plan */}
                <div className="col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Starter</h5>
                      <div className="mb-3">
                        <span className="fs-2 fw-bold">$19</span>
                        <span className="text-muted">/month</span>
                      </div>
                      <p className="text-muted small mb-4">For small teams up to 5 employees</p>
                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          5 employee accounts
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Basic analytics
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Standard assessments
                        </li>
                      </ul>
                      <button className="btn btn-outline-secondary w-100">
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="col-lg-4">
                  <div className="card h-100 border-success position-relative">
                    <span
                      className="position-absolute top-0 end-0 badge text-white m-3"
                      style={{ backgroundColor: "var(--obeeoma-primary)" }}
                    >
                      CURRENT
                    </span>
                    <div className="card-body">
                      <h5 className="card-title">Enterprise</h5>
                      <div className="mb-3">
                        <span className="fs-2 fw-bold">$49</span>
                        <span className="text-muted">/month</span>
                      </div>
                      <p className="text-muted small mb-4">For growing organizations up to 10 employees</p>
                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          10 employee accounts
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Advanced analytics
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Premium assessments
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Department insights
                        </li>
                      </ul>
                      <button className="btn btn-secondary w-100" disabled>
                        Current Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enterprise Plus Plan */}
                <div className="col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Enterprise Plus</h5>
                      <div className="mb-3">
                        <span className="fs-2 fw-bold">$99</span>
                        <span className="text-muted">/month</span>
                      </div>
                      <p className="text-muted small mb-4">For large organizations up to 25 employees</p>
                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          25 employee accounts
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Enterprise analytics
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          All assessments
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Dedicated support
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} style={{ color: "var(--obeeoma-primary)" }} className="me-2" />
                          Custom reporting
                        </li>
                      </ul>
                      <button
                        className="btn text-white w-100"
                        style={{ backgroundColor: "var(--obeeoma-primary)" }}
                        onClick={() => setShowPaymentDialog(true)}
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing History Tab */}
          {activeTab === "billing" && (
            <div>
              <h4 className="mb-4">Billing History</h4>
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Invoice</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingHistory.map((bill, index) => (
                          <tr key={index}>
                            <td>{bill.date}</td>
                            <td className="fw-semibold">{bill.amount}</td>
                            <td>{bill.invoice}</td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: "var(--obeeoma-mint)",
                                  color: "var(--obeeoma-primary)",
                                }}
                              >
                                {bill.status}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-link"
                                style={{ color: "var(--obeeoma-primary)" }}
                              >
                                <Download size={16} className="me-1" />
                                Receipt
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-4 rounded" style={{ backgroundColor: "#f9fafb" }}>
                    <h6 className="fw-semibold mb-2">Need Help with Billing?</h6>
                    <p className="text-muted small mb-3">
                      If you have any questions about your billing or need help with payment issues,
                      our support team is here to help.
                    </p>
                    <button
                      className="btn btn-sm"
                      style={{ color: "var(--obeeoma-primary)" }}
                    >
                      Contact Billing Support →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        show={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
      />
    </div>
  );
};

export default Subscription;
