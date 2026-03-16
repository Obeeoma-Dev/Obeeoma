
import React, { useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { CheckCircle2, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./../../../store/store";
import { fetchSubscriptions, Subscription } from "./../../../store/slices/subscriptionSlice";

// Props interface for optional subscriptions prop
interface Props {
  subscriptions?: Subscription[];
}

const RecentSubscriptionsTable: React.FC<Props> = ({ subscriptions: propSubscriptions }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Connect to Redux state
  const { items: reduxItems, loading, error } = useSelector(
    (state: RootState) => state.Subscription
  );

  // Fetch data on component mount if no prop is provided
  useEffect(() => {
    if (!propSubscriptions) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, propSubscriptions]);

  // Use prop subscriptions if provided, otherwise use Redux data
  const items = propSubscriptions || reduxItems;

  if (loading && !propSubscriptions) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Fetching Paystack subscribers...</p>
      </div>
    );
  }

  if (error && !propSubscriptions) {
    return <Alert variant="danger" className="m-4">Error: {error}</Alert>;
  }

  return (
    <Table responsive className="mb-0">
      <thead className="bg-light" style={{ fontFamily: "heading" }}>
        <tr>
          <th className="px-4 py-3 text-muted small fw-semibold">Organization</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Plan</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Employees</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Active Users</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Status</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Expiry Date</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
            <tr><td colSpan={7} className="text-center py-4">No subscribers found.</td></tr>
        ) : (
          items.map((sub: Subscription, index) => (
            <tr key={index} className="border-bottom" style={{ fontFamily: "body" }}>
              <td className="px-4 py-3">{sub.organization}</td>
              <td className="px-4 py-3">{sub.plan}</td>
              <td className="px-4 py-3">{sub.employees}</td>
              <td className="px-4 py-3">
                {sub.activeUsers} ({sub.activeUsersPercentage}%)
              </td>
              <td className="px-4 py-3">
                {sub.status === "Active" ? (
                  <span className="d-flex align-items-center text-success">
                    <CheckCircle2 size={16} className="me-1" /> Active
                  </span>
                ) : (
                  <span className="d-flex align-items-center text-warning">
                    <Clock size={16} className="me-1" /> Pending
                  </span>
                )}
              </td>
              <td className="px-4 py-3">{sub.expiryDate}</td>
              <td className="px-4 py-3">
                <div className="d-flex gap-2">
                  <button className="btn btn-link p-0 text-success text-decoration-none small">View</button>
                  <button className="btn btn-link p-0 text-success text-decoration-none small">Edit</button>
                  <button className="btn btn-link p-0 text-danger text-decoration-none small">Deactivate</button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default RecentSubscriptionsTable;




// import React from "react";
// import { Table } from "react-bootstrap";
// import { CheckCircle2, Clock } from "lucide-react";

// // Define the shape of each subscription entry
// interface Subscription {
//   organization: string;
//   plan: string;
//   employees: number;
//   activeUsers: number;
//   activeUsersPercentage: number;
//   status: "Active" | "Pending";
//   expiryDate: string;
// }

// // Props interface for backend-ready data injection
// interface Props {
//   subscriptions: Subscription[];
// }

// const RecentSubscriptionsTable: React.FC<Props> = ({ subscriptions }) => {
//   return (
//     <Table responsive className="mb-0">
//       <thead className="bg-light" style={{ fontFamily: "heading" }}>
//         <tr>
//           <th className="px-4 py-3 text-muted small fw-semibold">
//             Organization
//           </th>
//           <th className="px-4 py-3 text-muted small fw-semibold">Plan</th>
//           <th className="px-4 py-3 text-muted small fw-semibold">Employees</th>
//           <th className="px-4 py-3 text-muted small fw-semibold">
//             Active Users
//           </th>
//           <th className="px-4 py-3 text-muted small fw-semibold">Status</th>
//           <th className="px-4 py-3 text-muted small fw-semibold">
//             Expiry Date
//           </th>
//           <th className="px-4 py-3 text-muted small fw-semibold">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {subscriptions.map((sub, index) => (
//           <tr
//             key={index}
//             className="border-bottom"
//             style={{ fontFamily: "body" }}
//           >
//             <td className="px-4 py-3">{sub.organization}</td>
//             <td className="px-4 py-3">{sub.plan}</td>
//             <td className="px-4 py-3">{sub.employees}</td>
//             <td className="px-4 py-3">
//               {sub.activeUsers} ({sub.activeUsersPercentage}%)
//             </td>
//             <td className="px-4 py-3">
//               {sub.status === "Active" ? (
//                 <span className="d-flex align-items-center text-success">
//                   <CheckCircle2 size={16} className="me-1" />
//                   Active
//                 </span>
//               ) : (
//                 <span className="d-flex align-items-center text-warning">
//                   <Clock size={16} className="me-1" />
//                   Pending
//                 </span>
//               )}
//             </td>
//             <td className="px-4 py-3">{sub.expiryDate}</td>
//             <td className="px-4 py-3">
//               <div className="d-flex gap-2">
//                 <a href="#" className="text-success text-decoration-none small">
//                   View
//                 </a>
//                 <a href="#" className="text-success text-decoration-none small">
//                   Edit
//                 </a>
//                 <a href="#" className="text-danger text-decoration-none small">
//                   Deactivate
//                 </a>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default RecentSubscriptionsTable;

