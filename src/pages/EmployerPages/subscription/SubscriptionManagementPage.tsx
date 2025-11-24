// import React, { useState } from 'react';
// import PaymentUpdateModal from '../../../components/employercomponents/subscription/PaymentUpdateModal';

// const SubscriptionManagementPage: React.FC = () => {
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
    

//     const userEmail = "user@example.com"; 

//     return (
//         <div>
//             {/* ... Current Plan Section ... */}
//             <div className="current-plan">
//                 {/* ... other plan details ... */}
//                 <button 
//                     className="btn btn-success" 
//                     onClick={() => setShowUpdateModal(true)}
//                 >
//                     Update Payment Method
//                 </button>
//             </div>
//             {/* ... Available Plans Section ... */}

//             <PaymentUpdateModal
//                 show={showUpdateModal}
//                 onHide={() => setShowUpdateModal(false)}
//                 userEmail={userEmail}
//             />
//         </div>
//     );
// };