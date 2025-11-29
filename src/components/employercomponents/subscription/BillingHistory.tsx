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
                <h4 className="mb-0" style={{fontFamily:'body'}}>Billing History</h4>
                {/* Link to view full page of invoices */}
                <Button variant="link" size="sm" onClick={() => {/* navigate to full invoice view */}}>
                    VIEW ALL INVOICES
                </Button>
            </div>
            
            <Table striped bordered hover responsive size="sm" style={{fontFamily:'body'}}>
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

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Table, Spinner, Alert, Button } from 'react-bootstrap';
// import { RootState } from '../../../store/store';
// import { fetchBillingHistory } from '../../../store/slices/billingSlice';

// const BillingHistoryTable: React.FC = () => {
//     const dispatch = useDispatch();
//     // const { invoices, status, error } = useSelector((state: RootState) => state.billing);

//     useEffect(() => {
//         // Fetch history only if it hasn't been fetched or failed
//         if (status === 'idle') {
//             dispatch(fetchBillingHistory() as any);
//         }
//     }, [status, dispatch]);

//     // Helper function to format the amount
//     const formatAmount = (amount: number, currency: string) =>
//         new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);


//     if (status === 'loading' || status === 'idle') {
//         return <Spinner animation="border" size="sm" />;
//     }

//     // if (error) {
//     //     return <Alert variant="danger">Error loading history: {error}</Alert>;
//     // }

//     // if (invoices.length === 0) {
//     //     return <Alert variant="info">No billing history found.</Alert>;
//     // }

//     return (
//         <div>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4 className="mb-0">Billing History</h4>
//                 {/* Link to view full page of invoices */}
//                 <Button variant="link" size="sm" onClick={() => {/* navigate to full invoice view */ }}>
//                     VIEW ALL INVOICES
//                 </Button>
//             </div>

//             <Table striped bordered hover responsive size="sm">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                     {/* {invoices.map((invoice) => (
//                         <tr key={invoice.invoice_number}>
//                             <td>{invoice.date}</td>
//                             <td>{invoice.description}</td>
//                             <td>{formatAmount(invoice.amount, invoice.currency)}</td>
//                             <td>
//                                 <span className={`badge bg-${invoice.status === 'paid' ? 'success' : 'warning'}`}>
//                                     {invoice.status.toUpperCase()}
//                                 </span>
//                             </td>
//                             <td>
//                                 {invoice.invoice_url ? (
//                                     <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">Download</a>
//                                 ) : (
//                                     'N/A'
//                                 )}
//                             </td>
//                         </tr>
//                     ))} */}
//                 </tbody>
//               </table>
//             </div>  

//   );
// };

// export default BillingHistoryTable;