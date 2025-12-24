import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  userLocation?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName = "Billy",
  userLocation = "Location",
}) => {
  if (!isOpen) return null;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Log out</h5>
          </div>

          <div className="modal-body pt-0">
            <p className="mb-4">
              Are you sure you want to complete this action?
            </p>

            {/* User Info */}
            <div className="card border-0 bg-light mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <p className="small text-muted mb-1">Name</p>
                    <p className="fw-medium mb-0">{userName}</p>
                  </div>
                  <div className="col-6">
                    <p className="small text-muted mb-1">Location</p>
                    <p className="fw-medium mb-0">{userLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="card border-0 bg-light">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <p className="small text-muted mb-1">Date</p>
                    <p className="fw-medium mb-0">{formattedDate}</p>
                  </div>
                  <div className="col-12">
                    <p className="small text-muted mb-1">Time</p>
                    <p className="fw-medium mb-0">{formattedTime} (60 min)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={onConfirm}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
