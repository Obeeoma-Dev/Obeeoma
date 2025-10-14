import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LayoutDashboard, Users as UsersIcon, CreditCard, Settings as SettingsIcon, Search, Bell, Menu, X, Building, Mail, Phone, MapPin, Save, } from "lucide-react";
import { useNavigate } from "react-router-dom";
const EmployerAccountSettings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/employeemanagement", active: false },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
        { icon: SettingsIcon, label: "Settings", path: "/employeraccountsettings", active: true },
    ];
    return (_jsxs("div", { className: "min-vh-100", style: { backgroundColor: '#f9fafb' }, children: [isSidebarOpen && (_jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1040,
                }, onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { style: {
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
                }, className: "d-lg-block", children: [_jsxs("div", { className: "p-4 d-flex align-items-center justify-content-between border-bottom", children: [_jsxs("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: [_jsx("div", { style: {
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: _jsx("span", { style: { color: 'white', fontWeight: 'bold', fontSize: '20px' }, children: "O" }) }), _jsx("span", { style: { fontSize: '20px', fontWeight: 'bold', color: 'var(--obeeoma-primary)' }, children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)', marginBottom: '16px', paddingLeft: '12px' }, children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: "btn w-100 d-flex align-items-center gap-3 mb-2 text-start", style: {
                                    backgroundColor: item.active ? 'var(--obeeoma-mint-dark)' : 'transparent',
                                    color: item.active ? 'var(--obeeoma-primary)' : 'var(--obeeoma-text-dark)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontWeight: '500',
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { children: item.label })] }, item.label)))] })] }), _jsxs("div", { style: { marginLeft: 0 }, className: "d-lg-flex", children: [_jsx("div", { style: { width: '256px' }, className: "d-none d-lg-block" }), _jsxs("div", { className: "flex-grow-1", children: [_jsxs("header", { className: "bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center justify-content-between sticky-top", children: [_jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link d-lg-none p-2", children: _jsx(Menu, { size: 24 }) }), _jsx("div", { className: "flex-grow-1 mx-4", style: { maxWidth: '600px' }, children: _jsxs("div", { className: "position-relative", children: [_jsx(Search, { size: 16, style: {
                                                        position: 'absolute',
                                                        left: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: 'var(--obeeoma-text-muted)',
                                                    } }), _jsx("input", { type: "search", placeholder: "Search...", className: "form-control", style: {
                                                        paddingLeft: '40px',
                                                        backgroundColor: '#f3f4f6',
                                                        border: '1px solid var(--obeeoma-border)',
                                                        borderRadius: '8px',
                                                    } })] }) }), _jsxs("button", { className: "btn btn-link position-relative p-2", children: [_jsx(Bell, { size: 20 }), _jsx("span", { style: {
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: 'var(--obeeoma-primary)',
                                                    borderRadius: '50%',
                                                } })] })] }), _jsxs("main", { className: "p-3 p-sm-4 p-lg-5", children: [_jsx("h1", { className: "mb-4", style: { fontSize: '28px', fontWeight: 'bold' }, children: "Organization Settings" }), _jsxs("div", { className: "row g-4", children: [_jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "mb-4", style: { fontSize: '20px', fontWeight: '600' }, children: "Organization Profile" }), _jsx("form", { children: _jsxs("div", { className: "row g-3", children: [_jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label", style: { fontWeight: '500', fontSize: '14px' }, children: "Organization Name" }), _jsxs("div", { className: "position-relative", children: [_jsx(Building, { size: 16, style: {
                                                                                                position: 'absolute',
                                                                                                left: '12px',
                                                                                                top: '50%',
                                                                                                transform: 'translateY(-50%)',
                                                                                                color: 'var(--obeeoma-text-muted)',
                                                                                            } }), _jsx("input", { type: "text", className: "form-control", placeholder: "Company Name", defaultValue: "Acme Corporation", style: {
                                                                                                paddingLeft: '40px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid var(--obeeoma-border)',
                                                                                            } })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label", style: { fontWeight: '500', fontSize: '14px' }, children: "Industry" }), _jsxs("select", { className: "form-select", style: {
                                                                                        borderRadius: '8px',
                                                                                        border: '1px solid var(--obeeoma-border)',
                                                                                    }, children: [_jsx("option", { children: "Technology" }), _jsx("option", { children: "Healthcare" }), _jsx("option", { children: "Finance" }), _jsx("option", { children: "Education" }), _jsx("option", { children: "Other" })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label", style: { fontWeight: '500', fontSize: '14px' }, children: "Email" }), _jsxs("div", { className: "position-relative", children: [_jsx(Mail, { size: 16, style: {
                                                                                                position: 'absolute',
                                                                                                left: '12px',
                                                                                                top: '50%',
                                                                                                transform: 'translateY(-50%)',
                                                                                                color: 'var(--obeeoma-text-muted)',
                                                                                            } }), _jsx("input", { type: "email", className: "form-control", placeholder: "contact@company.com", defaultValue: "contact@acmecorp.com", style: {
                                                                                                paddingLeft: '40px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid var(--obeeoma-border)',
                                                                                            } })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label", style: { fontWeight: '500', fontSize: '14px' }, children: "Phone" }), _jsxs("div", { className: "position-relative", children: [_jsx(Phone, { size: 16, style: {
                                                                                                position: 'absolute',
                                                                                                left: '12px',
                                                                                                top: '50%',
                                                                                                transform: 'translateY(-50%)',
                                                                                                color: 'var(--obeeoma-text-muted)',
                                                                                            } }), _jsx("input", { type: "tel", className: "form-control", placeholder: "+1 (555) 000-0000", defaultValue: "+1 (555) 123-4567", style: {
                                                                                                paddingLeft: '40px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid var(--obeeoma-border)',
                                                                                            } })] })] }), _jsxs("div", { className: "col-12", children: [_jsx("label", { className: "form-label", style: { fontWeight: '500', fontSize: '14px' }, children: "Address" }), _jsxs("div", { className: "position-relative", children: [_jsx(MapPin, { size: 16, style: {
                                                                                                position: 'absolute',
                                                                                                left: '12px',
                                                                                                top: '16px',
                                                                                                color: 'var(--obeeoma-text-muted)',
                                                                                            } }), _jsx("textarea", { className: "form-control", rows: 3, placeholder: "123 Main St, City, State, ZIP", defaultValue: "123 Business Blvd, San Francisco, CA 94105", style: {
                                                                                                paddingLeft: '40px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid var(--obeeoma-border)',
                                                                                            } })] })] })] }) })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm h-100", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "mb-4", style: { fontSize: '20px', fontWeight: '600' }, children: "Notification Preferences" }), _jsxs("div", { className: "d-flex flex-column gap-3", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', marginBottom: '4px' }, children: "Email Notifications" }), _jsx("div", { style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Receive updates via email" })] }), _jsx("div", { className: "form-check form-switch", children: _jsx("input", { className: "form-check-input", type: "checkbox", defaultChecked: true, style: { cursor: 'pointer', width: '48px', height: '24px' } }) })] }), _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', marginBottom: '4px' }, children: "Weekly Reports" }), _jsx("div", { style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Get weekly wellness summaries" })] }), _jsx("div", { className: "form-check form-switch", children: _jsx("input", { className: "form-check-input", type: "checkbox", defaultChecked: true, style: { cursor: 'pointer', width: '48px', height: '24px' } }) })] }), _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', marginBottom: '4px' }, children: "Alert Notifications" }), _jsx("div", { style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Get notified of critical alerts" })] }), _jsx("div", { className: "form-check form-switch", children: _jsx("input", { className: "form-check-input", type: "checkbox", defaultChecked: true, style: { cursor: 'pointer', width: '48px', height: '24px' } }) })] })] })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm h-100", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "mb-4", style: { fontSize: '20px', fontWeight: '600' }, children: "Security" }), _jsxs("div", { className: "d-flex flex-column gap-3", children: [_jsx("button", { className: "btn btn-outline-secondary text-start", style: {
                                                                            borderRadius: '8px',
                                                                            padding: '12px 16px',
                                                                            border: '1px solid var(--obeeoma-border)',
                                                                        }, children: "Change Password" }), _jsx("button", { className: "btn btn-outline-secondary text-start", style: {
                                                                            borderRadius: '8px',
                                                                            padding: '12px 16px',
                                                                            border: '1px solid var(--obeeoma-border)',
                                                                        }, children: "Two-Factor Authentication" }), _jsx("button", { className: "btn btn-outline-secondary text-start", style: {
                                                                            borderRadius: '8px',
                                                                            padding: '12px 16px',
                                                                            border: '1px solid var(--obeeoma-border)',
                                                                        }, children: "Session Management" })] })] }) }) }), _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-end gap-3", children: [_jsx("button", { className: "btn btn-outline-secondary", style: {
                                                                borderRadius: '8px',
                                                                padding: '10px 24px',
                                                                border: '1px solid var(--obeeoma-border)',
                                                            }, children: "Cancel" }), _jsxs("button", { className: "btn text-white d-flex align-items-center gap-2", style: {
                                                                backgroundColor: 'var(--obeeoma-primary)',
                                                                borderRadius: '8px',
                                                                padding: '10px 24px',
                                                                border: 'none',
                                                            }, children: [_jsx(Save, { size: 18 }), "Save Changes"] })] }) })] })] })] })] })] }));
};
export default EmployerAccountSettings;
