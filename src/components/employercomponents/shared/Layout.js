import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Home as HomeIcon, Users as UsersIcon, User as UserIcon, CreditCard, FileText, Bell, Menu, X, } from "lucide-react";
import logo from "../../../assets/Images/obeeomalogoword1.png";
import { useSelector, useDispatch } from "react-redux";
import { useScrollAnimation } from "../../../hooks/useScrollAnimtion";
import { logoutUserThunk } from "../../../store/slices/authSlice";
const PRIMARY_COLOR = "#22C55E";
const Layout = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const employer = useSelector((state) => state.employer.currentEmployer);
    // Try to get employer data from localStorage if available
    let localEmployer = null;
    try {
        const stored = localStorage.getItem("employerAccountData");
        localEmployer = stored ? JSON.parse(stored) : null;
    }
    catch (err) {
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
            : "Corporate Admin";
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
    const handleLogout = async () => {
        try {
            const resultAction = await dispatch(logoutUserThunk());
            alert("You have been successfully logged out.");
            if (logoutUserThunk.fulfilled.match(resultAction) ||
                logoutUserThunk.rejected.match(resultAction)) {
                navigate("/login", { replace: true });
            }
        }
        catch (err) {
            console.error("Logout process failed:", err);
            // Fallback navigation in case of error, ensuring the user is logged out visually
            navigate("/login", { replace: true });
        }
    };
    return (_jsxs("div", { className: "min-vh-100 bg-light d-flex flex-column", style: { fontFamily: "body" }, children: [_jsx("style", { children: `
          .form-check-input:checked {
            background-color: #22C55E !important;
            border-color: #22C55E !important;
          }
          .dropdown-item:hover {
            background-color: #22C55E !important;
            color: white !important;
          }
        ` }), isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsx("header", { className: "bg-white border-bottom sticky-top z-30", style: {
                    marginLeft: "240px",
                    width: "calc(100% - 240px) ",
                    fontFamily: "body",
                }, children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsx("div", { className: "d-flex flex-column", children: _jsx("h1", { className: "h4 fw-bold mb-0", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: title }) }) }), _jsxs("div", { className: "col-auto d-flex align-items-center gap-3", children: [_jsxs("button", { className: "btn btn-link position-relative p-2", style: { color: PRIMARY_COLOR, fontFamily: "body" }, onClick: () => navigate("/employer-notifications"), children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle p-1", style: { backgroundColor: PRIMARY_COLOR } })] }), _jsxs(Dropdown, { align: "end", children: [_jsxs(Dropdown.Toggle, { as: "div", id: "dropdown-profile-avatar", className: "d-flex align-items-center gap-2", style: { cursor: "pointer" }, "aria-expanded": "false", children: [_jsxs("div", { className: "text-end d-none d-md-block", style: { lineHeight: 1 }, children: [_jsx("span", { className: "fw-medium text-dark d-block mb-3", style: { fontFamily: "body" }, "aria-label": `Organization name: ${organizationNameOrDefault}`, children: organizationNameOrDefault }), _jsx(Link, { to: "/contact-us", className: "text-muted fw-small d-block", style: { fontFamily: "body", fontSize: "0.7rem" }, children: "Contact Support" })] }), _jsx("div", { className: "rounded-circle d-flex align-items-center justify-content-center overflow-hidden", style: {
                                                            width: "40px",
                                                            height: "40px",
                                                            backgroundColor: `${PRIMARY_COLOR}15`,
                                                        }, children: (() => {
                                                            const storedLogo = localStorage.getItem("companyProfileImage");
                                                            if (storedLogo) {
                                                                return (_jsx("img", { src: storedLogo, alt: "Logo", style: {
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                    } }));
                                                            }
                                                            return (_jsx(UserIcon, { size: 24, color: PRIMARY_COLOR, strokeWidth: 2 }));
                                                        })() })] }), _jsxs(Dropdown.Menu, { children: [_jsxs(Dropdown.Item, { as: "button", onClick: () => navigate("/employer-settings"), style: {
                                                            backgroundColor: "transparent",
                                                            color: "inherit",
                                                        }, onMouseEnter: (e) => {
                                                            e.currentTarget.style.backgroundColor = "#22C55E";
                                                            e.currentTarget.style.color = "white";
                                                        }, onMouseLeave: (e) => {
                                                            e.currentTarget.style.backgroundColor = "transparent";
                                                            e.currentTarget.style.color = "inherit";
                                                        }, children: [_jsx(UserIcon, { size: 16, className: "me-2" }), "My Profile Settings"] }), _jsx(Dropdown.Divider, {}), _jsx(Dropdown.Item, { as: "button", className: "text-secondary", onClick: handleLogout, style: {
                                                            backgroundColor: "transparent",
                                                            color: "inherit",
                                                        }, onMouseEnter: (e) => {
                                                            e.currentTarget.style.backgroundColor = "#22C55E";
                                                            e.currentTarget.style.color = "white";
                                                        }, onMouseLeave: (e) => {
                                                            e.currentTarget.style.backgroundColor = "transparent";
                                                            e.currentTarget.style.color = "inherit";
                                                        }, children: "Logout" })] })] })] })] }) }) }), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 translate-x-n100 d-lg-block ${isSidebarOpen ? "translate-x-0" : ""}`, style: {
                    width: "240px",
                    fontFamily: "body",
                    transition: "transform 0.3s ease-in-out",
                }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsx("button", { onClick: () => navigate("/employer-dashboard"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: _jsx("div", { ref: logoRef, className: "d-flex align-items-center justify-content-center", style: {
                                        //removed spinning effect
                                        //transform: isLogoVisible ? 'rotate(360deg)' : 'rotate(0deg)',
                                        // transition: 'transform 0.6s ease-in-out',
                                        margin: "0.5rem 0",
                                        padding: "0.75rem 1rem",
                                        fontFamily: "body",
                                    }, children: _jsx("img", { src: logo, alt: "logo", style: {
                                            maxWidth: "100%",
                                            height: "auto",
                                            objectFit: "contain",
                                            color: "#22C55E",
                                        } }) }) }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", style: { color: PRIMARY_COLOR }, children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "px-3 mt-4", children: menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light" : "text-dark"}`, style: {
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px",
                                color: item.active ? PRIMARY_COLOR : "#6c757d",
                                backgroundColor: item.active
                                    ? `${PRIMARY_COLOR}15`
                                    : "transparent",
                                fontWeight: item.active ? "600" : "400",
                                fontFamily: "body",
                            }, children: [_jsx(item.icon, { size: 20, style: {
                                        color: item.active ? PRIMARY_COLOR : "#6c757d",
                                        fontFamily: "body",
                                    } }), _jsx("span", { className: "fw-medium", children: item.label })] }, item.label))) }), _jsx("div", { className: "position-absolute bottom-0 start-0 end-0 p-3 border-top", children: _jsxs("button", { onClick: () => navigate("/employer-settings"), className: `w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${location.pathname === "/employer-settings"
                                ? "bg-light"
                                : "text-dark"}`, style: {
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px",
                                color: location.pathname === "/employer-settings"
                                    ? PRIMARY_COLOR
                                    : "#6c757d",
                                backgroundColor: location.pathname === "/employer-settings"
                                    ? `${PRIMARY_COLOR}15`
                                    : "transparent",
                                fontWeight: location.pathname === "/employer-settings" ? "600" : "400",
                            }, children: [_jsx(UserIcon, { size: 20, style: {
                                        color: location.pathname === "/employer-settings"
                                            ? PRIMARY_COLOR
                                            : "#6c757d",
                                    } }), _jsx("span", { className: "fw-medium", children: "My Account" })] }) })] }), _jsx("main", { className: "flex-grow-1 d-flex justify-content-center", style: {
                    marginLeft: "240px",
                    padding: "1rem",
                    transition: "margin-left 0.3s ease",
                    width: "calc(100% - 240px)",
                }, children: _jsx("div", { className: "container-fluid", style: { maxWidth: "1200px" }, children: children }) })] }));
};
export default Layout;
