import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Alert, Form } from "react-bootstrap";
import PaystackPop from "@paystack/inline-js";
import { updatePaymentMethod } from "../../../store/slices/billingSlice";
import { RootState } from "../../../store/store";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

interface PaymentUpdateModalProps {
  show: boolean;
  onHide: () => void;
  userEmail: string;
}

const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({
  show,
  onHide,
  userEmail,
}) => {
  const dispatch = useDispatch();
  const billingStatus = useSelector((state: RootState) => state.billing.status);
  const billingError = useSelector((state: RootState) => state.billing.error);
  const employer = useSelector(
    (state: RootState) => state.employer.currentEmployer,
  );

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setShowEmailInput(!userEmail);
      setEmail(userEmail || "");
      setEmailError("");
    } else {
      setShowEmailInput(false);
      setEmail("");
      setEmailError("");
    }
  }, [show, userEmail]);

  const validateEmail = (emailToValidate: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const handleEmailSubmit = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    initiateTokenization(email);
  };

  const initiateTokenization = (emailToUse: string) => {
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: emailToUse,
      amount: 4000,
      currency: "NGN",
      reference: `token_${Date.now()}`,
      channels: ["card"],
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: employer
              ? `${employer.firstName} ${employer.lastName}`
              : "Customer Name",
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: employer?.phone || "",
          },
        ],
      },
      onSuccess: (transaction) => {
        // Extract authorization code for card tokenization
        const authorizationCode = transaction.reference;

        // Dispatch the update payment method action
        dispatch(
          updatePaymentMethod({
            authorization_code: authorizationCode,
            email: emailToUse,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as any,
        )
          .unwrap()
          .then(() => {
            onHide();
            alert("Payment method updated successfully!");
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((error: any) => {
            console.error("Payment method update failed:", error);
          });
      },
      onCancel: () => {
        console.log("Payment modal closed by user.");
      },
    });
  };

  const handleButtonClick = () => {
    if (!userEmail && !showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    if (showEmailInput) {
      handleEmailSubmit();
    } else {
      initiateTokenization(userEmail);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold" style={{ fontFamily: "body" }}>
          Update Payment Method
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <p className="text-muted small" style={{ fontFamily: "body" }}>
            To securely update your card, Paystack will perform a small
            validation. This tokenizes your card for future recurring billing
            without storing your full card details on our servers.
          </p>
        </div>

        {billingError && (
          <Alert variant="danger" className="small">
            {billingError}
          </Alert>
        )}

        {showEmailInput && (
          <Form.Group className="mb-3">
            <Form.Label
              className="small fw-semibold"
              style={{ fontFamily: "body" }}
            >
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              isInvalid={!!emailError}
              style={{ fontFamily: "body" }}
            />
            {emailError && (
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        )}

        <Button
          variant="primary"
          onClick={handleButtonClick}
          disabled={billingStatus === "loading"}
          className="w-100 py-2 fw-bold"
          style={{
            backgroundColor: "#22C55E",
            border: "none",
            fontFamily: "body",
          }}
        >
          {billingStatus === "loading"
            ? "Processing..."
            : showEmailInput
              ? "Continue"
              : "Securely Update Card"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentUpdateModal;
