// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Modal, Form, Alert } from 'react-bootstrap';
// import { useFlutterwave, closePaymentModal, FlutterwaveResponse } from 'flutterwave-react-v3'; 
// import { PaymentUpdatePayload } from '../../../types/employer';
// import { updatePaymentMethod } from '../../../store/slices/billingSlice'; 

// import { RootState } from '../../../store/store';

// const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string; 

// interface PaymentUpdateModalProps {
//     show: boolean;
//     onHide: () => void;
//     userEmail: string; 
// }

// const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({ show, onHide, userEmail }) => {
//     const dispatch = useDispatch();
//     const billingStatus = useSelector((state: RootState) => state.billing.status);
//     const billingError = useSelector((state: RootState) => state.billing.error);


//     const config = {
//         public_key: FLUTTERWAVE_PUBLIC_KEY,
//         tx_ref: Date.now().toString(),
//         amount: 100, 
//         currency: 'NGN', 
//         payment_options: 'card',
//         customer: {
//             email: userEmail,
//             name: 'Customer Name',
//         },
//         customizations: {
//             title: 'Update Payment Card',
//             description: 'Securely generate token for recurring payment.',
//         },
//         meta: {
//             is_tokenization: 'true',
//         },
//     };

//     const handleFlutterwaveCall = useFlutterwave(config);

//     const initiateTokenization = () => {
//         handleFlutterwaveCall({
//             callback: (response:FlutterwaveResponse) => {
//                 if (response.status === 'successful' && response.card?.token) { 
//                     const token_id = response.card.token;

//                     dispatch(updatePaymentMethod({ token_id, email: userEmail }) as any) 
//                         .unwrap()
//                         .then(() => {
//                             onHide();
//                             alert('Payment method updated successfully!');
//                         })
//                         .catch((error: any) => {
//                              // The catch block now handles the error returned by rejectWithValue
//                              console.error("Payment method update failed:", error);
//                         });

//                 } else {
//                     alert('Card tokenization failed or was canceled.');
//                 }
//                 closePaymentModal(); 
//             },
//             onClose: () => {
//                 console.log('Payment modal closed by user.');
//             },
//         });
//     };

//     return (
//         <Modal show={show} onHide={onHide} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Update Payment Method</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>We use a secure payment portal to generate a token for recurring billing. Your card details will not be stored on our servers.</p>
                
//                 {billingError && <Alert variant="danger">{billingError}</Alert>}
//                 {billingStatus === 'succeeded' && <Alert variant="success">Update successful!</Alert>}

//                 <Form>
//                     <Button 
//                         variant="primary" 
//                         onClick={initiateTokenization} 
//                         disabled={billingStatus === 'loading'}
//                         className="w-100 mt-3"
//                     >
//                         {billingStatus === 'loading' ? 'Processing...' : 'Securely Update Card'}
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default PaymentUpdateModal;
