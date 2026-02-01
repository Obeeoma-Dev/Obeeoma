<<<<<<< HEAD
import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {
    User as UserIcon,
    Bell,
    Menu,
    X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { logoutUserThunk } from "../../../store/slices/authSlice";
import AdminSidebar from "../adminsidebar";

interface SystemAdminLayoutProps {
    children: ReactNode;
    title: string;
    showSearch?: boolean;
    additionalHeaderContent?: ReactNode;
}

const PRIMARY_COLOR = "#22C55E";

const SystemAdminLayout = ({
    children,
    title,
    showSearch = false,
    additionalHeaderContent
}: SystemAdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(
        (state: RootState) => state.auth.user,
    );

    // Try to get user data from localStorage if available
    let localUser = null;
    try {
        const stored = localStorage.getItem("user");
        localUser = stored ? JSON.parse(stored) : null;
    } catch (err) {
        console.warn("Storage recovery failed", err);
        localUser = null;
    }

    console.log("user", user);
    console.log("local-user", localUser);
    console.log("user.date_joined:", user?.date_joined);
    console.log("localUser.date_joined:", localUser?.date_joined);

    // Use system admin email and data
    const adminEmail = user?.email || localUser?.email || "System Admin";

    // Use user creation date or current date as fallback
    const adminJoinDate = user?.date_joined
        ? new Date(user.date_joined)
        : localUser?.date_joined
            ? new Date(localUser.date_joined)
            : new Date();

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

            <div className="d-flex vh-100">
                {/* System Admin Sidebar */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                    {/* Header - System Admin Header */}
                    <header
                        className="bg-white border-bottom sticky-top z-30"
                        style={{
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
                                        onClick={() => navigate("/admin-settings")}
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
                                                {/* 1. Admin Email */}
                                                <span
                                                    className="fw-medium text-dark d-block"
                                                    style={{ fontFamily: "body" }}
                                                    aria-label={`Admin email: ${adminEmail}`}
                                                >
                                                    {adminEmail}
                                                </span>

                                                {/* 2. Admin Since Date */}
                                                <small
                                                    className="text-muted fw-medium d-block"
                                                    style={{ fontFamily: "body", fontSize: "0.7rem" }}
                                                >
                                                    Admin since {formatDate(adminJoinDate)}
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
                                            {/* System Admin Settings */}
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => navigate("/admin-settings")}
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
                                                System Admin Settings
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

                    {/* Main Content */}
                    <main
                        className="flex-grow-1 d-flex justify-content-center"
                        style={{
                            padding: "1rem",
                            overflowY: "auto",
                            backgroundColor: "#f5f7fa",
                        }}
                    >
                        <div className="container-fluid" style={{ maxWidth: "1200px" }}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SystemAdminLayout;
=======
import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { User as UserIcon, Bell, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { logoutUserThunk } from "../../../store/slices/authSlice";
import { EmployerUser } from "../../../../src/types/employer";
import AdminSidebar from "../adminsidebar";

interface SystemAdminLayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
  additionalHeaderContent?: ReactNode;
}

const PRIMARY_COLOR = "#22C55E";

const SystemAdminLayout = ({
  children,
  title,
  showSearch = false,
  additionalHeaderContent,
}: SystemAdminLayoutProps) => {
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
      : "User";

  // Prefer backend for companyJoinDate, fallback to localStorage, then now
  const companyJoinDate = employer?.company?.createdAt
    ? new Date(employer.company.createdAt)
    : localEmployer?.dateJoined
      ? new Date(localEmployer.dateJoined)
      : new Date();

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

      <div className="d-flex vh-100">
        {/* System Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* Header - Using Employer Header Logic */}
          <header
            className="bg-white border-bottom sticky-top z-30"
            style={{
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
                          className="fw-medium text-dark d-block"
                          style={{ fontFamily: "body" }}
                          aria-label={`Organization name: ${organizationNameOrDefault}`}
                        >
                          {organizationNameOrDefault}
                        </span>

                        {/* 2. Member Since Date - Moved up to line 2 */}
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

          {/* Main Content */}
          <main
            className="flex-grow-1 d-flex justify-content-center"
            style={{
              padding: "1rem",
              overflowY: "auto",
              backgroundColor: "#f5f7fa",
            }}
          >
            <div className="container-fluid" style={{ maxWidth: "1200px" }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminLayout;
>>>>>>> 8a1e7612a2f091a591f0a629940ceab12be30301
