import React from "react"; // Import React (required for JSX)
import { Modal, Button } from "react-bootstrap"; // Import Modal & Button from react-bootstrap
import { X } from "lucide-react"; // Import close icon

// Define the props interface for strong typing (TypeScript)
interface PopupProps {
  isOpen: boolean; // Controls whether the popup is visible
  onClose: () => void; // Function called when popup closes
  title: string; // Popup title text
  children: React.ReactNode; // Popup content
  maxWidth?: "sm" | "md" | "lg" | "xl"; // Bootstrap modal size options
}

// Popup component definition
export function Popup({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md", // Default modal size
}: PopupProps) {
  const modalSize = maxWidth === "md" ? undefined : maxWidth;

  return (
    // React-Bootstrap Modal component
    <Modal
      show={isOpen} // Controls visibility
      onHide={onClose} // Handles backdrop click & ESC key
      centered // Vertically centers modal
      size={modalSize} // Controls modal width
      backdrop="static" // Prevents accidental close on backdrop click
      keyboard // Enables ESC key close
      animation // Enables Bootstrap animation
    >
      {/* Modal header */}
      <Modal.Header className="border-bottom">
        {/* Modal title */}
        <Modal.Title>{title}</Modal.Title>

        {/* Custom close button */}
        <Button
          variant="light" // Bootstrap button style
          onClick={onClose} // Trigger close handler
          aria-label="Close popup" // Accessibility support
        >
          <X size={18} />
        </Button>
      </Modal.Header>

      {/* Modal body where content is rendered */}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
