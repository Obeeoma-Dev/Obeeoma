import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User, Bell, Shield } from "lucide-react";
const SettingsNavigation = ({ activeSection, onSectionChange }) => {
    const settingsSections = [
        { id: "account", label: "Account", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy", icon: Shield },
    ];
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsx("div", { className: "row justify-content-center", children: _jsx("div", { className: "col-12 col-md-8 col-lg-6", children: _jsx("nav", { className: "nav nav-pills nav-fill", children: settingsSections.map((section) => {
                            const IconComponent = section.icon;
                            return (_jsxs("button", { onClick: () => onSectionChange(section.id), className: `nav-link d-flex align-items-center gap-2 py-2 px-3 ${activeSection === section.id
                                    ? 'active bg-primary text-white'
                                    : 'text-dark'}`, style: {
                                    borderRadius: "8px",
                                    border: "none",
                                    margin: "0 4px"
                                }, children: [_jsx(IconComponent, { size: 16 }), _jsx("span", { className: "fw-medium", children: section.label })] }, section.id));
                        }) }) }) }) }) }));
};
export default SettingsNavigation;
