import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { PaymentUpdatePayload } from '../../../types/employer';
import { updatePaymentMethod } from '../../../store/slices/billingSlice';

import { RootState } from '../../../store/store';

interface FlutterwaveResponse {
    status: string;
    card?: {
        token: string;
    };
    token?: string;
    [key: string]: any; // Allow additional properties
}

const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string;

interface PaymentUpdateModalProps {
    show: boolean;
    onHide: () => void;
    userEmail: string;
}

const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({ show, onHide, userEmail }) => {
    const [email, setEmail] = useState(userEmail);
    const dispatch = useDispatch();
    const billingStatus = useSelector((state: RootState) => state.billing.status);
    const billingError = useSelector((state: RootState) => state.billing.error);
    const employer = useSelector((state: RootState) => state.employer.currentEmployer);

    const config = {
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: Date.now().toString(),
        amount: 99.00,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
            email: email,
            name: employer ? `${employer.firstName} ${employer.lastName}` : 'Customer Name',
            phone_number: employer?.phone || '',
        },
        customizations: {
            title: 'Update Payment Card',
            description: 'Securely generate token for recurring payment.',
            logo: '/obeeomalogoicon2.png',
        },
        meta: {
            is_tokenization: true,
        },
    };

    const handleFlutterwaveCall = useFlutterwave(config);

    const initiateTokenization = () => {
        handleFlutterwaveCall({
            callback: (response:FlutterwaveResponse) => {
                console.log('Flutterwave response:', response);
                const token_id = response.card?.token || response.token;
                if ((response.status === 'successful' || response.status === 'success') && token_id) {

                    dispatch(updatePaymentMethod({ token_id, customer_email: email }) as any)
                        .unwrap()
                        .then(() => {
                            onHide();
                            alert('Payment method updated successfully!');
                        })
                        .catch((error: any) => {
                             // The catch block now handles the error returned by rejectWithValue
                             console.error("Payment method update failed:", error);
                        });

                } else {
                    alert('Card tokenization failed or was canceled.');
                }
                closePaymentModal();
            },
            onClose: () => {
                console.log('Payment modal closed by user.');
            },
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontFamily: 'body'}}>Update Payment Method</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontFamily: 'body' }}>We use a secure payment portal to generate a token for recurring billing. Your card details will not be stored on our servers.</p>

                {billingError && <Alert variant="danger" style={{ fontFamily: 'body' }}>{billingError}</Alert>}
                {billingStatus === 'succeeded' && <Alert variant="success" style={{ fontFamily: 'body' }}>Update successful!</Alert>}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontFamily: 'body' }}>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            style={{ fontFamily: 'body' }}
                        />
                    </Form.Group>
                    <Button
                        onClick={initiateTokenization}
                        disabled={billingStatus === 'loading' || !email.trim()}
                        className="w-100 mt-3"
                        style={{ fontFamily: 'body', backgroundColor: '#22C55E', borderColor: '#22C55E' }}
                    >
                        {billingStatus === 'loading' ? 'Processing...' : 'Securely Update Card'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentUpdateModal;
