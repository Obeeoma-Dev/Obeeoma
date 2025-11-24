// src/components/Billing/BillingHistoryTable.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { RootState } from '../../../store/store';
import { fetchBillingHistory } from '../../../store/slices/billingSlice';

const BillingHistoryTable: React.FC = () => {
    const dispatch = useDispatch();
    const { invoices, status, error } = useSelector((state: RootState) => state.billing);

    useEffect(() => {
        // Fetch history only if it hasn't been fetched or failed
        if (status === 'idle') {
            dispatch(fetchBillingHistory() as any);
        }
    }, [status, dispatch]);
    
    // Helper function to format the amount
    const formatAmount = (amount: number, currency: string) => 
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);


    if (status === 'loading' || status === 'idle') {
        return <Spinner animation="border" size="sm" />;
    }

    if (error) {
        return <Alert variant="danger">Error loading history: {error}</Alert>;
    }

    if (invoices.length === 0) {
        return <Alert variant="info">No billing history found.</Alert>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Billing History</h4>
                {/* Link to view full page of invoices */}
                <Button variant="link" size="sm" onClick={() => {/* navigate to full invoice view */}}>
                    VIEW ALL INVOICES
                </Button>
            </div>
            
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.invoice_number}>
                            <td>{invoice.date}</td>
                            <td>{invoice.description}</td>
                            <td>{formatAmount(invoice.amount, invoice.currency)}</td>
                            <td>
                                <span className={`badge bg-${invoice.status === 'paid' ? 'success' : 'warning'}`}>
                                    {invoice.status.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                {invoice.invoice_url ? (
                                    <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">Download</a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BillingHistoryTable;

// const BillingHistory = () => {
//   // TODO: Replace with API data
//   const billingHistory = [
//     { id: 1, date: "Nov 15, 2023", amount: "$79.00", status: "Paid" },
//     { id: 2, date: "Oct 15, 2023", amount: "$79.00", status: "Paid" },
//     { id: 3, date: "Sep 15, 2023", amount: "$79.00", status: "Paid" },
//   ];

//   return (
//     <div className="row">
//       <div className="col-12">
//         <div className="card border-0 shadow-sm">
//           <div className="card-body p-4">
//             <h3 className="h5 fw-semibold mb-4">Billing History</h3>
//             <div className="table-responsive">
//               <table className="table table-hover">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {billingHistory.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.date}</td>
//                       <td>{item.amount}</td>
//                       <td>
//                         <span className="badge bg-success">{item.status}</span>
//                       </td>
//                       <td>
//                         <button className="btn btn-link p-0 text-primary">Download</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillingHistory;