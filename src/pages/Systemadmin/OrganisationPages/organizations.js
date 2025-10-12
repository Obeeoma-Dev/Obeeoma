import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationStats from "../../../components/admincomponents/organisationcomponents/OrganisationStats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";
// Sample organization data
const mockOrganizations = [
  {
    id: "1",
    name: "Wellness Center Inc.",
    clients: 284,
    programs: 12,
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Community Mental Health",
    clients: 194,
    programs: 8,
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "3",
    name: "Urban Outreach",
    clients: 134,
    programs: 6,
    status: "Inactive",
    lastActive: "2 days ago",
  },
];
// Main admin page for managing organizations
const OrganizationPage = () => {
  return _jsxs("div", {
    className: "d-flex",
    children: [
      _jsx(Sidebar, {}),
      _jsxs("div", {
        className: "flex-grow-1 d-flex flex-column overflow-hidden",
        children: [
          _jsx(Header, {}),
          _jsxs(Container, {
            fluid: true,
            className: "p-4",
            children: [
              _jsx("h2", {
                className: "mb-4 text-success",
                children: "Organizations Overview",
              }),
              _jsx(OrganizationStats, {}),
              _jsx(OrganizationTable, { organizations: mockOrganizations }),
              _jsx(OrganizationCharts, {}),
            ],
          }),
        ],
      }),
    ],
  });
};
export default OrganizationPage;
