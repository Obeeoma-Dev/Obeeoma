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

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { updatePaymentMethod } from '../../../store/slices/billingSlice';
import { RootState } from '../../../store/store';

interface FlutterwaveResponse {
    status: string;
    card?: {
        token: string;
    };
}

const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string;

interface PaymentUpdateModalProps {
    show: boolean;
    onHide: () => void;
    userEmail: string;
}

const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({ show, onHide, userEmail }) => {
    const dispatch = useDispatch();
    const billingStatus = useSelector((state: RootState) => state.billing.status);
    const billingError = useSelector((state: RootState) => state.billing.error);
    const employer = useSelector((state: RootState) => state.employer.currentEmployer);

    // useMemo ensures the config object is stable but updates if userEmail/employer changes
    const config = useMemo(() => ({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `token_${Date.now()}`,
        amount: 400, // Smallest possible amount for tokenization validation
        currency: 'NGN',
        payment_options: 'card',
        customer: {
            email: userEmail,
            name: employer ? `${employer.firstName} ${employer.lastName}` : 'Customer Name',
            phone_number: employer?.phone || '',
        },
        customizations: {
            title: 'Update Payment Card',
            description: 'Securely link your card for recurring payments.',
            logo: '/obeeomalogoicon2.png',
        },
        meta: {
            is_tokenization: true,
        },
    }), [userEmail, employer]);

    const handleFlutterwaveCall = useFlutterwave(config);

    const initiateTokenization = () => {
        // Double check email exists before calling
        if (!userEmail) {
            alert("Customer email is missing. Please contact support.");
            return;
        }

        handleFlutterwaveCall({
            callback: (response: FlutterwaveResponse) => {
                if (response.status === 'successful' && response.card?.token) {
                    const token_id = response.card.token;

                    dispatch(updatePaymentMethod({ token_id, email: userEmail }) as any)
                        .unwrap()
                        .then(() => {
                            onHide();
                            alert('Payment method updated successfully!');
                        })
                        .catch((error: any) => {
                            console.error("Payment method update failed:", error);
                        });

                } else {
                    alert('Card validation failed. Please try again.');
                }
                closePaymentModal();
            },
            onClose: () => {
                console.log('Payment modal closed by user.');
            },
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Update Payment Method</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4">
                    <p className="text-muted small">
                        To securely update your card, Flutterwave will perform a small validation. 
                        This tokenizes your card for future recurring billing without storing 
                        your full card details on our servers.
                    </p>
                </div>

                {billingError && <Alert variant="danger" className="small">{billingError}</Alert>}
                
                <Button
                    variant="primary"
                    onClick={initiateTokenization}
                    disabled={billingStatus === 'loading'}
                    className="w-100 py-2 fw-bold"
                    style={{ backgroundColor: '#22C55E', border: 'none', fontFamily:'body'}}
                >
                    {billingStatus === 'loading' ? 'Processing...' : 'Securely Update Card'}
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentUpdateModal;
