import { useState, ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { useScrollAnimation } from "../../../hooks/useScrollAnimtion";

import { logoutUserThunk } from "../../../store/slices/authSlice";
import { EmployerUser } from "../../../../src/types/employer";
import React from "react";

// Removed formatEmployerName as it's replaced by inline logic

interface LayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
  additionalHeaderContent?: ReactNode;
  accountEmail?: ReactNode;
}

const PRIMARY_COLOR = "#22C55E";

const Layout = ({ children, title }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const employer = useSelector(
    (state: RootState) => state.employer.currentEmployer,
  ) as EmployerUser;

  // Try to get employer data from localStorage if available
  let localEmployer = null;

  try {
    const stored = localStorage.getItem("employerAccountData");
    localEmployer = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.warn("Storage recovery failed", err);
    localEmployer = null;
  }

  console.log("employer", employer);
  console.log("local-employer", localEmployer);

  // Prefer localStorage for organizationName, fallback to Redux, then default
  const organizationNameOrDefault = localEmployer?.email
    ? localEmployer?.email
    : employer?.email
      ? employer?.email || employer?.email
      : "Employer";

  const companyJoinDate = employer?.company?.createdAt
    ? new Date(employer.company.createdAt)
    : localEmployer?.dateJoined
      ? new Date(localEmployer.dateJoined)
      : new Date();

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Dashboard",
      path: "/employer-dashboard",
      active: false,
    },
    {
      icon: UsersIcon,
      label: "Employees",
      path: "/employee-management",
      active: false,
    },
    {
      icon: CreditCard,
      label: "Subscription",
      path: "/employer-subscription",
      active: false,
    },
    {
      icon: FileText,
      label: "Reports",
      path: "/organization-reports",
      active: false,
    },
  ].map((item) => ({
    ...item,
    active: location.pathname === item.path,
  }));

  const [logoRef] = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUserThunk());

      alert("You have been successfully logged out.");

      if (
        logoutUserThunk.fulfilled.match(resultAction) ||
        logoutUserThunk.rejected.match(resultAction)
      ) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Logout process failed:", err);
      // Fallback navigation in case of error, ensuring the user is logged out visually
      navigate("/login", { replace: true });
    }
  };

  return (
    <div
      className="min-vh-100 bg-light d-flex flex-column"
      style={{ fontFamily: "body" }}
    >
      <style>
        {`
          .form-check-input:checked {
            background-color: #22C55E !important;
            border-color: #22C55E !important;
          }
          .dropdown-item:hover {
            background-color: #22C55E !important;
            color: white !important;
          }
        `}
      </style>
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header
        className="bg-white border-bottom sticky-top z-30"
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px) ",
          fontFamily: "body",
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto d-lg-none">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="btn btn-link p-2"
                style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
              >
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
              </div>
            </div>

            <div className="col-auto d-flex align-items-center gap-3">
              <button
                className="btn btn-link position-relative p-2"
                style={{ color: PRIMARY_COLOR, fontFamily: "body" }}
                onClick={() => navigate("/employer-notifications")}
              >
                <Bell size={20} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle p-1"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                ></span>
              </button>

              {/* Profile Avatar Dropdown - Single Dropdown, No Chevron */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  id="dropdown-profile-avatar"
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  aria-expanded="false"
                >
                  {/* START: Display Name and User Icon */}
                  <div
                    className="text-end d-none d-md-block"
                    style={{ lineHeight: 1 }}
                  >
                    {/* 1. Organization Name/Fallback */}
                    <span
                      className="fw-medium text-dark d-block mb-3"
                      style={{ fontFamily: "body" }}
                      aria-label={`Organization name: ${organizationNameOrDefault}`}
                    >
                      {organizationNameOrDefault}
                    </span>

                    {/* 2. Contact link*/}
                    <small
                      className="text-muted fw-medium d-block"
                      style={{ fontFamily: "body", fontSize: "0.7rem" }}
                    >
                      Member since {formatDate(companyJoinDate)}
                    </small>
                  </div>

                  {/* 3. User Icon or Uploaded Logo */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center overflow-hidden"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: `${PRIMARY_COLOR}15`,
                    }}
                  >
                    {(() => {
                      const storedLogo = localStorage.getItem(
                        "companyProfileImage",
                      );
                      if (storedLogo) {
                        return (
                          <img
                            src={storedLogo}
                            alt="Logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        );
                      }
                      return (
                        <UserIcon
                          size={24}
                          color={PRIMARY_COLOR}
                          strokeWidth={2}
                        />
                      );
                    })()}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* My Profile settings */}
                  <Dropdown.Item
                    as="button"
                    onClick={() => navigate("/employer-settings")}
                    style={{
                      backgroundColor: "transparent",
                      color: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#22C55E";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    <UserIcon size={16} className="me-2" />
                    My Profile Settings
                  </Dropdown.Item>

                  {/* Divider */}
                  <Dropdown.Divider />

                  <Dropdown.Item
                    as="button"
                    className="text-secondary"
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "transparent",
                      color: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#22C55E";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Keep existing sidebar code */}
      <aside
        className={`position-fixed top-0 start-0 h-100 bg-white border-end z-50 translate-x-n100 d-lg-block ${isSidebarOpen ? "translate-x-0" : ""}`}
        style={{
          width: "240px",
          fontFamily: "body",
          transition: "transform 0.3s ease-in-out",
        }}
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
                //removed spinning effect
                //transform: isLogoVisible ? 'rotate(360deg)' : 'rotate(0deg)',
                // transition: 'transform 0.6s ease-in-out',
                margin: "0.5rem 0",
                padding: "0.75rem 1rem",
                fontFamily: "body",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                  color: "#22C55E",
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
                backgroundColor: item.active
                  ? `${PRIMARY_COLOR}15`
                  : "transparent",
                fontWeight: item.active ? "600" : "400",
                fontFamily: "body",
              }}
            >
              <item.icon
                size={20}
                style={{
                  color: item.active ? PRIMARY_COLOR : "#6c757d",
                  fontFamily: "body",
                }}
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
              location.pathname === "/employer-settings"
                ? "bg-light"
                : "text-dark"
            }`}
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              color:
                location.pathname === "/employer-settings"
                  ? PRIMARY_COLOR
                  : "#6c757d",
              backgroundColor:
                location.pathname === "/employer-settings"
                  ? `${PRIMARY_COLOR}15`
                  : "transparent",
              fontWeight:
                location.pathname === "/employer-settings" ? "600" : "400",
            }}
          >
            <UserIcon
              size={20}
              style={{
                color:
                  location.pathname === "/employer-settings"
                    ? PRIMARY_COLOR
                    : "#6c757d",
              }}
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
