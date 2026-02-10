import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Eye, Edit, Trash2 } from "lucide-react";

// Define the props
interface ActionModalProps {
  show: boolean;
  item: any; // ContentItem type
  onView: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onClose: () => void;
}

export function ActionModal({
  show,
  item,
  onView,
  onEdit,
  onDelete,
  onClose,
}: ActionModalProps) {
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
            padding: 16px;
            min-width: 200px;
          }

          /* Action button styling */
          .action-btn {
            width: 100%;
            text-align: left;
            border: none;
            background: transparent;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: background-color 0.2s;
          }

          .action-btn:hover {
            background: #F3F4F6;
          }

          .action-btn.delete {
            color: #DC2626;
          }

          .action-btn.delete:hover {
            background: #FEF2F2;
          }

          /* Icon styling */
          .action-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }

          /* Modal container positioning */
          .action-modal-container {
            position: absolute;
            right: 20px;
            top: 20px;
          }
        `}
      </style>

      {/* Modal Component */}
      <Modal
        show={show}
        onHide={onClose}
        centered
        backdropClassName="custom-modal-backdrop"
        contentClassName="custom-modal-content"
        dialogClassName="action-modal-container"
      >
        {/* Modal Body */}
        <div className="p-0">
          {/* View/Preview Action */}
          <button
            className="action-btn"
            onClick={() => {
              onView(item);
              onClose();
            }}
          >
            <Eye className="action-icon" />
            View/Preview
          </button>

          {/* Edit Details Action */}
          <button
            className="action-btn"
            onClick={() => {
              onEdit(item);
              onClose();
            }}
          >
            <Edit className="action-icon" />
            Edit Details
          </button>

          {/* Delete Action */}
          <button
            className="action-btn delete"
            onClick={() => {
              onDelete(item);
              onClose();
            }}
          >
            <Trash2 className="action-icon" />
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
