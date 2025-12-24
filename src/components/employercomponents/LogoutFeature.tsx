import React from "react";
import { Button } from "react-bootstrap";
import LogoutModal from "./LogoutModal"; // Adjust path as needed
import { useLogout } from "../../hooks/useLogout";

interface LogoutFeatureProps {
  // Pass any props you want to customize the appearance of the button
  buttonVariant?: "primary" | "secondary" | "danger";
  buttonText?: string;
  className?: string;
  userName?: string; // Optional: Pass user data from parent
  userLocation?: string; // Optional: Pass user data from parent
}

const LogoutFeature: React.FC<LogoutFeatureProps> = ({
  buttonVariant = "danger",
  buttonText = "Logout",
  className = "",
  userName,
  userLocation,
}) => {
  //connect the logic! ---
  const { isModalOpen, openModal, closeModal, confirmLogout } = useLogout();

  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={openModal} // Logic to open the modal
        className={className}
      >
        *{buttonText}*
      </Button>

      {/* 2. The Modal (Design) */}
      <LogoutModal
        isOpen={isModalOpen} // State from the custom hook
        onClose={closeModal} // Logic to close the modal
        onConfirm={confirmLogout} // Logic for the actual logout action
        userName={userName}
        userLocation={userLocation}
      />
    </>
  );
};

export default LogoutFeature;
