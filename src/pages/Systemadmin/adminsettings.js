import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminSidebar from "../../components/admincomponents/adminsidebar";
import AdminHeader from "../../components/admincomponents/adminheader";
import SettingsTabs from "../../components/admincomponents/Settingscomponents/SettingsTabs";
import { Container } from "react-bootstrap";
// AdminSettings now uses the same layout pattern as other system admin pages
// (fixed sidebar, top header, scrollable content). Content is constrained
// to a centered max width so cards never overlap the sidebar.
const AdminSettings = () => {
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(AdminHeader, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1.5rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx(Container, { fluid: true, children: _jsx("div", { style: { maxWidth: 1100, margin: "0 auto" }, children: _jsx(SettingsTabs, {}) }) }) })] })] }));
};
export default AdminSettings;
