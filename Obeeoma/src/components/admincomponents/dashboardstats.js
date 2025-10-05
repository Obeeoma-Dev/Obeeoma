import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StatCard from './StatCard';
/**
 * DashboardStats component displays the top-level metrics in a grid layout
 * Shows key performance indicators like organizations, clients, revenue, and calls
 */
const DashboardStats = () => {
    // Array of stat card data to display
    const stats = [
        {
            id: '1',
            title: 'Total Organizations',
            value: '42',
            change: '+3 this month',
            icon: 'Building2',
            iconColor: 'bg-emerald-50',
        },
        {
            id: '2',
            title: 'Total Clients',
            value: '1,264',
            change: '+18 this month',
            icon: 'Users',
            iconColor: 'bg-emerald-50',
        },
        {
            id: '3',
            title: 'Monthly Revenue',
            value: '$25,800',
            change: '+3.2% this month',
            icon: 'DollarSign',
            iconColor: 'bg-emerald-50',
        },
        {
            id: '4',
            title: 'Hotline Calls Today',
            value: '42',
            change: '-8% vs yesterday',
            icon: 'Phone',
            iconColor: 'bg-emerald-50',
        },
    ];
    return (
    // Container section with title and grid layout
    _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Dashboard Overview" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat) => (_jsx(StatCard, { data: stat }, stat.id))) })] }));
};
export default DashboardStats;
