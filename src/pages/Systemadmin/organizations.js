import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/admincomponents/adminsidebar";
import OrganizationStats from "../../components/admincomponents/organisationcomponents.tsx/OrganisationStats";
import OrganizationTable from "../../components/admincomponents/organisationcomponents.tsx/organisationTable";
import OrganizationCharts from "../../components/admincomponents/organisationcomponents.tsx/organisation.chats";
// Main admin page for managing organizations
const OrganizationPage = () => {
    return (_jsxs("div", { className: "d-flex", children: [_jsx(Sidebar, {}), _jsxs(Container, { fluid: true, className: "p-4", children: [_jsx("h2", { className: "mb-4 text-success", children: "Organizations Overview" }), _jsx(OrganizationStats, {}), _jsx(OrganizationTable, {}), _jsx(OrganizationCharts, {})] })] }));
};
export default OrganizationPage;
