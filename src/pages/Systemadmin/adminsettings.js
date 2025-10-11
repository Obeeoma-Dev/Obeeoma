import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React-Boostrap components.
import { Container, Row, Col } from "react-bootstrap";
// Import reusable components.
import Sidebar from "../../components/admincomponents/adminsidebar";
import SettingsTabs from "../../components/admincomponents/SettingsTabs";
// Define the AdminSettings page component.
const AdminSettings = () => {
    return (
    // Container provides horizontal padding and centers content.
    _jsx(Container, { fluid: true, children: _jsxs(Row, { children: [_jsx(Col, { md: 2, children: _jsx(Sidebar, {}) }), _jsx(Col, { md: 10, children: _jsx(SettingsTabs, {}) })] }) }));
};
export default AdminSettings;
