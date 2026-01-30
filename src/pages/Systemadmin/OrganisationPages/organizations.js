import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { adminAPI } from "../../../api/apiConfig";
import { Building2, Users, CircleCheckBig } from "lucide-react";
/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 */
const OrganizationPage = () => {
    const [dashboardStats, setDashboardStats] = useState([
        {
            id: "1",
            title: "Total Organizations",
            value: "0",
            trend: "+3 this month",
            icon: Building2,
            color: "emerald",
        },
        {
            id: "2",
            title: "Total Client",
            value: "0",
            trend: "+24 this month",
            icon: Users,
            color: "emerald",
        },
        {
            id: "3",
            title: "Active Programs",
            value: "0",
            trend: "+5 this month",
            icon: CircleCheckBig,
            color: "emerald",
        },
    ]);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await adminAPI.getDashboardOverview();
                const data = response.data;
                // Update stats with real data
                setDashboardStats([
                    {
                        id: "1",
                        title: "Total Organizations",
                        value: data.total_organizations?.toString() || "0",
                        trend: `+${data.organizations_this_month || 0} this month`,
                        icon: Building2,
                        color: "emerald",
                    },
                    {
                        id: "2",
                        title: "Total Client",
                        value: data.total_clients?.toString() || "0",
                        trend: `+${data.clients_this_month || 0} this month`,
                        icon: Users,
                        color: "emerald",
                    },
                    {
                        id: "3",
                        title: "Active Programs",
                        value: "0", // This field wasn't in the API response, keeping as 0 for now
                        trend: "+5 this month",
                        icon: CircleCheckBig,
                        color: "emerald",
                    },
                ]);
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        fetchDashboardData();
    }, []);
    return (_jsx(SystemAdminLayout, { title: "Organizations", children: _jsxs("div", { className: "p-4", children: [_jsx(Row, { className: "gy-4 mb-4", children: _jsx(DashboardStats, { stats: dashboardStats }) }), _jsx(OrganizationTable, {}), _jsx(OrganizationCharts, {})] }) }));
};
export default OrganizationPage;
