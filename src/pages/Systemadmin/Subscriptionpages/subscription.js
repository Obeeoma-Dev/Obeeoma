import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MetricsPanel from '../../../components/admincomponents/Subscriptioncomponents/subMetricPannel';
import RecentSubscriptionsTable from '../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable';
import ServiceUtilizationChart from '../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart';
import RecentActivityFeed from '../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed';
import AdminHeader from '../../../components/admincomponents/adminheader';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import { Container, Row, Col } from 'react-bootstrap';
const SubscriptionPage = () => {
    // Placeholder data for backend-ready structure
    const metrics = {
        totalOrganizations: 12,
        totalSubscriptions: 34,
        coveredEmployees: '4.2k',
        utilizationRate: 68,
    };
    const subscriptions = [
        {
            organization: 'Acme Corporation',
            type: 'Enterprise',
            employees: 250,
            startDate: 'Mar 15, 2023',
            endDate: 'Mar 15, 2024',
            status: 'Active',
        },
        {
            organization: 'Green Energy Co',
            type: 'Startup',
            employees: 75,
            startDate: 'Mar 15, 2023',
            endDate: 'Mar 15, 2024',
            status: 'Inactive',
        },
    ];
    const services = [
        { name: 'Therapy Sessions', percentage: 64 },
        { name: 'Mindfulness', percentage: 52 },
        { name: 'Stress Management', percentage: 48 },
        { name: 'Sleep Resources', percentage: 36 },
        { name: 'Nutrition', percentage: 28 },
    ];
    const activities = [
        'Acme Corp added subscription for 250 employees',
        'Green Energy Co subscription marked inactive',
    ];
    return (_jsxs(_Fragment, { children: [_jsx(AdminHeader, {}), _jsxs(Row, { children: [_jsx(Col, { md: 2, children: _jsx(AdminSidebar, {}) }), _jsx(Col, { md: 10, children: _jsxs(Container, { fluid: true, className: "mt-4", children: [_jsx(MetricsPanel, { ...metrics }), _jsxs(Row, { children: [_jsxs(Col, { md: 8, children: [_jsx(RecentSubscriptionsTable, { subscriptions: subscriptions }), _jsx(ServiceUtilizationChart, { services: services })] }), _jsx(Col, { md: 4, children: _jsx(RecentActivityFeed, { activities: activities }) })] })] }) })] })] }));
};
export default SubscriptionPage;
