import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// Table component to display organizations
const OrganizationTable = ({ organizations }) => {
  return _jsxs(Table, {
    striped: true,
    bordered: true,
    hover: true,
    responsive: true,
    className: "mt-3",
    children: [
      _jsx("thead", {
        className: "table-success",
        children: _jsxs("tr", {
          children: [
            _jsx("th", { children: "Organization Name" }),
            _jsx("th", { children: "Clients" }),
            _jsx("th", { children: "Programs" }),
            _jsx("th", { children: "Status" }),
            _jsx("th", { children: "Last Active" }),
            _jsx("th", { children: "Actions" }),
          ],
        }),
      }),
      _jsx("tbody", {
        children: organizations.map((org) =>
          _jsxs(
            "tr",
            {
              children: [
                _jsx("td", { children: org.name }),
                _jsx("td", { children: org.clients }),
                _jsx("td", { children: org.programs }),
                _jsx("td", { children: org.status }),
                _jsx("td", { children: org.lastActive }),
                _jsx("td", {
                  children: _jsx(Link, {
                    to: `/systemadmin/organizations/${org.id}`,
                    children: _jsx(Button, {
                      variant: "outline-success",
                      size: "sm",
                      children: "View Details",
                    }),
                  }),
                }),
              ],
            },
            org.id,
          ),
        ),
      }),
    ],
  });
};
export default OrganizationTable;
