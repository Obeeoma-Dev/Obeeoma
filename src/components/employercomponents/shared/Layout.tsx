import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Users as UsersIcon,
  User as UserIcon,
  CreditCard,
  FileText,
  Bell,
  Menu,
  X,
} from "lucide-react";
import logo from "../../../assets/Images/obeeomalogoword1.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
interface LayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
  additionalHeaderContent?: ReactNode;
}

const PRIMARY_COLOR = "#3CB371";

const Layout = ({ children, title }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get employer data from Redux store
  const employer = useSelector((state: RootState) => state.employer.currentEmployer);
  const companyJoinDate = employer?.company?.createdAt 
    ? new Date(employer.company.createdAt) 
    : new Date(); // Fallback to current date

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/employer-dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/employee-management", active: false },
    { icon: CreditCard, label: "Subscription", path: "/employer-subscription", active: false },
    { icon: FileText, label: "Reports", path: "/organization-reports", active: false },
  ].map(item => ({
    ...item,
    active: location.pathname === item.path
  }));

  const [logoRef, isLogoVisible] = useScrollAnimation({
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
});

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {isSidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none"
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Header */}
      <header className="bg-white border-bottom sticky-top z-30" style={{ marginLeft: "240px", width: "calc(100% - 240px)" }}>
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto d-lg-none">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="btn btn-link p-2"
                style={{ fontFamily: "heading", color: PRIMARY_COLOR }} >
                <Menu size={24} />
              </button>
            </div>

            <div className="col">
              <div className="d-flex flex-column">
                <h1 
                  className="h4 fw-bold mb-0" 
                  style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
                >
                  {title}
                </h1>
                <small className="text-muted">
                  Member since {formatDate(companyJoinDate)}
                </small>
              </div>
            </div>

            <div className="col-auto d-flex align-items-center gap-3">
              <button 
                className="btn btn-link position-relative p-2"
                style={{ color: PRIMARY_COLOR }}
                onClick={() => navigate("/employer-notifications")} >
                <Bell size={20} />
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle p-1"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                ></span>
              </button>
              
              {/* Profile Avatar */}
              <div className="dropdown">
                <button 
                  className="btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div 
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: "40px", height: "40px", fontSize: "16px" }}
                  >
                    {employer?.firstName?.charAt(0) || 'U'}
                    {employer?.lastName?.charAt(0) || ''}
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => navigate("/employer-settings")} >
                      <UserIcon size={16} className="me-2" />
                      My Account
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => navigate("/create-profile")} >
                      <UserIcon size={16} className="me-2" />
                      Create Profile
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger"
                      onClick={async () => {
                        try {
                          const { authAPI } = await import("../../../api/apiConfig");
                          await authAPI.logout();
                          localStorage.removeItem("token");
                          localStorage.removeItem("refresh");
                          navigate("/login");
                        } catch (err) {
                          // Optionally show error toast
                        }
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Keep existing sidebar code */}
      <aside
        className={`position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`}
        style={{ width: "240px" }}
      >
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div 
              ref={logoRef}
              className="d-flex align-items-center justify-content-center"
              style={{
                transform: isLogoVisible ? 'rotate(360deg)' : 'rotate(0deg)',
                transition: 'transform 0.6s ease-in-out',
                margin: '0.5rem 0',
                padding: '0.75rem 1rem'
              }}
            >
              <img 
                src={logo} 
                alt="logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </button>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="btn btn-link d-lg-none p-0"
            style={{ color: PRIMARY_COLOR }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="px-3 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${
                item.active ? "bg-light" : "text-dark"
              }`}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                color: item.active ? PRIMARY_COLOR : "#6c757d",
                backgroundColor: item.active ? `${PRIMARY_COLOR}15` : "transparent",
                fontWeight: item.active ? "600" : "400",
              }}
            >
              <item.icon 
                size={20} 
                style={{ color: item.active ? PRIMARY_COLOR : "#6c757d" }}
              />
              <span className="fw-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top">
          <button
            onClick={() => navigate("/employer-settings")}
            className={`w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${
              location.pathname === "/employer-settings" ? "bg-light" : "text-dark"
            }`}
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              color: location.pathname === "/employer-settings" ? PRIMARY_COLOR : "#6c757d",
              backgroundColor: location.pathname === "/employer-settings" ? `${PRIMARY_COLOR}15` : "transparent",
              fontWeight: location.pathname === "/employer-settings" ? "600" : "400",
            }}
          >
            <UserIcon 
              size={20} 
              style={{ color: location.pathname === "/employer-settings" ? PRIMARY_COLOR : "#6c757d" }}
            />
            <span className="fw-medium">My Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-grow-1 d-flex justify-content-center"
        style={{
          marginLeft: "240px",
          padding: "1rem",
          transition: "margin-left 0.3s ease",
          width: "calc(100% - 240px)",
        }}
      >
        <div className="container-fluid" style={{ maxWidth: "1200px" }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;