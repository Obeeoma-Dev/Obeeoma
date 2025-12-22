// // src/components/UsageView.tsx

// import React, { useState, useEffect } from 'react';
// import  { employerAPI }  from '../../../api/apiConfig';
// import { UsageData} from './../../../types/employer'
// import { Spinner, Alert, ProgressBar } from 'react-bootstrap';

// const UsageView: React.FC = () => {
//   const [usage, setUsage] = useState<UsageData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadUsage = async () => {
//       try {
//         const response = await employerAPI.viewUsage();
//         const data: UsageData = response.data;
//         setUsage(data);
//       } catch (err) {
//         setError("Failed to fetch usage data.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUsage();
//   }, []);

//   if (loading) {
//     return <Spinner animation="border" />;
//   }

//   if (error || !usage) {
//     return <Alert variant="danger">{error || "No usage data found."}</Alert>;
//   }

//   // Helper component to display a progress bar
//   const UsageBar: React.FC<{ label: string, used: number, limit: number, percent: number }> = ({ label, used, limit, percent }) => (
//     <div className="mb-3">
//       <div className="d-flex justify-content-between mb-1">
//         <strong>{label}</strong>
//         <span>{used} / {limit} Used</span>
//       </div>
//       <ProgressBar
//         now={percent}
//         label={`${percent}%`}
//         variant={percent > 90 ? 'danger' : percent > 75 ? 'warning' : 'success'}
//       />
//     </div>
//   );

//   return (
//     <div className="usage-view p-4 border rounded">
//       <h3 className="mb-4">Current Usage</h3>
//       <UsageBar
//         label="API Calls"
//         used={usage.api_calls_used}
//         limit={usage.api_calls_limit}
//         percent={usage.api_calls_percent}
//       />
//       <UsageBar
//         label="Team Seats"
//         used={usage.seats_used}
//         limit={usage.seats_limit}
//         percent={usage.seats_percent}
//       />
//       <p className="text-muted small mt-3">Last Updated: {new Date(usage.last_updated).toLocaleString()}</p>
//     </div>
//   );
// };

// export default UsageView;
