import React from "react";
import { Modal, Button } from "react-bootstrap";

// Define the props
interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  show,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <>
      <style>
        {`
          /* Modal background overlay tint */
          .custom-modal-backdrop {
            background-color: rgba(0,0,0,0.5) !important;
          }

          /* White modal container with rounded corners */
          .custom-modal-content {
            border-radius: 16px;
            padding: 24px;
          }

          /* Modal title styling */
          .custom-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827; /* gray-900 */
            margin-bottom: 8px;
          }

          /* Modal message styling */
          .custom-message {
            font-size: 14px;
            color: #4B5563; /* gray-600 */
            margin-bottom: 24px;
          }

          /* Cancel button style */
          .custom-cancel-btn {
            border: 1px solid #D1D5DB !important; /* gray-300 */
            background: white !important;
            color: #374151 !important; /* gray-700 */
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
          }

          .custom-cancel-btn:hover {
            background: #F9FAFB !important; /* gray-50 */
          }

          /* Delete button style */
          .custom-confirm-btn {
            background: #DC2626 !important; /* red-600 */
            color: white !important;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            border: none;
          }

          .custom-confirm-btn:hover {
            background: #B91C1C !important; /* red-700 */
          }

          /* Align buttons to the right with spacing */
          .custom-btn-row {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
          }
        `}
      </style>

      {/* Modal Component */}
      <Modal
        show={show}
        onHide={onCancel}
        centered
        backdropClassName="custom-modal-backdrop"
        contentClassName="custom-modal-content"
      >
        {/* Modal Body */}
        <div>
          <h3 className="custom-title">{title}</h3>

          <p className="custom-message">{message}</p>

          {/* Buttons Row */}
          <div className="custom-btn-row">
            <Button className="custom-cancel-btn" onClick={onCancel}>
              {cancelText}
            </Button>

            <Button className="custom-confirm-btn" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
