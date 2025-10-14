import { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";

interface PaymentDialogProps {
  show: boolean;
  onClose: () => void;
}

const PaymentDialog = ({ show, onClose }: PaymentDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState("enterprise-plus");

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1055,
        }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
        style={{
          zIndex: 1056,
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Complete Your Subscription</h5>
          <button
            onClick={onClose}
            className="btn btn-link p-0"
            style={{ color: "#6b7280" }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Plan Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Select Plan</label>
            <select
              className="form-select"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="starter">Starter - $19/month</option>
              <option value="enterprise">Enterprise - $49/month</option>
              <option value="enterprise-plus">Enterprise Plus - $99/month</option>
            </select>
          </div>

          {/* Order Summary */}
          <div
            className="p-3 rounded mb-4"
            style={{ backgroundColor: "var(--obeeoma-mint)" }}
          >
            <h6 className="fw-semibold mb-3">Order Summary</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>Enterprise Plus Plan</span>
              <span className="fw-semibold">$99.00</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>Tax</span>
              <span>$9.90</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total</span>
              <span className="fw-bold fs-5" style={{ color: "var(--obeeoma-primary)" }}>
                $108.90
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Cardholder Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Card Number</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard
                  size={20}
                  className="position-absolute end-0 top-50 translate-middle-y me-3"
                  style={{ color: "#6b7280" }}
                />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <label className="form-label fw-semibold">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Billing Address</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Street Address"
              />
              <div className="row g-3">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-4 p-3 rounded" style={{ backgroundColor: "#f9fafb" }}>
              <Lock size={16} style={{ color: "var(--obeeoma-primary)" }} />
              <span className="small text-muted">
                Your payment information is encrypted and secure
              </span>
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-secondary flex-grow-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white flex-grow-1"
                style={{ backgroundColor: "var(--obeeoma-primary)" }}
              >
                Complete Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentDialog;
