import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// 1. Define the props interface
interface SuccessModalProps {
    show: boolean;
    onHide: () => void;
    handleClose: () => void;
    primaryColor: string; // To pass the custom color from the parent
}

// 2. Define the functional component
const SuccessModal: React.FC<SuccessModalProps> = ({ show, handleClose, primaryColor }) => {
    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            backdrop="static" // Prevent closing when clicking outside
            keyboard={false}  // Prevent closing with the keyboard
        >
            <Modal.Header closeButton style={{ borderBottom: 'none' }} />
            <Modal.Body className="text-center p-5">
                <FontAwesomeIcon 
                    icon={faCheckCircle} 
                    size="3x" 
                    style={{ color: primaryColor, marginBottom: '1rem' }} 
                />
                <h4 className="fw-bold text-dark mb-3">Registration Successful!</h4>
                <p className="text-muted">
                    Your employer account has been created. A verification email has been sent to your company email address. You will now be redirected to the login page.
                </p>
                <Button
                    variant="success"
                    onClick={handleClose}
                    className="w-100 py-3 mt-3 fw-semibold"
                    style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                >
                    Go to Login
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessModal;