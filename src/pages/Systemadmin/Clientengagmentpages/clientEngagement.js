import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// clientEngagement.tsx
// Main page for displaying client engagement dashboard with sidebar layout
import { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
// Import sidebar and dashboard components
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import EngagementSummary from '../../../components/admincomponents/Clientcomponents/engagementsummary';
import EngagementCharts from '../../../components/admincomponents/Clientcomponents/engagementCharts';
import PatientSearchFilter from '../../../components/admincomponents/Clientcomponents/patientsearchfilter';
import PatientEngagementTable from '../../../components/admincomponents/Clientcomponents/patientEngagementTable';
import EngagementStatsPanel from '../../../components/admincomponents/Clientcomponents/engagemntStartsPanel';
// Placeholder data to simulate backend response
const placeholderData = {
    engagementRate: 78,
    activePrograms: 12,
    totalPoints: 285432,
    patients: [
        {
            name: 'Madison Carano',
            organization: 'HealthOne',
            engagementRate: 92,
            pointsRedeemed: 1200,
            lastActivity: '2h ago',
        },
        {
            name: 'William Johnson',
            organization: 'MediCare',
            engagementRate: 88,
            pointsRedeemed: 980,
            lastActivity: '3h ago',
        },
        {
            name: 'Vanessa Jefferson',
            organization: 'HealthOne',
            engagementRate: 85,
            pointsRedeemed: 1100,
            lastActivity: '1h ago',
        },
    ],
    trends: {
        weekly: 5,
        monthly: 12,
        rewardActivity: 8,
    },
    streaks: {
        sevenDay: 65,
        thirtyDay: 45,
        sixtyDay: 30,
    },
};
// Main component
const ClientEngagement = () => {
    // State to hold engagement data
    const [data, setData] = useState(null);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State to track any errors
    const [error, setError] = useState(null);
    // Simulate backend fetch using placeholder data
    useEffect(() => {
        const simulateFetch = async () => {
            try {
                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Set placeholder data as if it came from backend
                setData(placeholderData);
            }
            catch (err) {
                // Catch any unexpected errors
                setError(err.message);
            }
            finally {
                // Stop loading spinner
                setLoading(false);
            }
        };
        simulateFetch();
    }, []);
    // Show spinner while loading
    // if (loading) {
    //   return (
    //     <div style={{ display: 'flex' }}>
    //       {/* Sidebar stays visible during loading */}
    //       <AdminSidebar />
    //       <Container className="mt-5 text-center">
    //         <Spinner animation="border" role="status" />
    //         <p>Loading client engagement data...</p>
    //       </Container>
    //     </div>
    //   );
    // }
    // Show error message if something goes wrong
    if (error) {
        return (_jsxs("div", { style: { display: 'flex' }, children: [_jsx(AdminSidebar, {}), _jsx(Container, { className: "mt-5", children: _jsxs(Alert, { variant: "danger", children: ["Error: ", error] }) })] }));
    }
    // Render dashboard once data is available
    return (_jsxs("div", { style: { display: 'flex' }, children: [_jsx(AdminSidebar, {}), _jsxs(Container, { className: "mt-4", children: [_jsx(EngagementSummary, {}), _jsx(EngagementCharts, {}), _jsx(PatientSearchFilter, {}), _jsx(PatientEngagementTable, {}), _jsx(EngagementStatsPanel, {})] })] }));
};
export default ClientEngagement;
