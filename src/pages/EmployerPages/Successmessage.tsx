import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

type StyleMap = {
  [key: string]: CSSProperties;
};

const styles: StyleMap = {
  // .confirmation-container
  confirmationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  // .confirmation-card
  confirmationCard: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
  },

  // .success-icon-wrapper
  successIconWrapper: {
    marginBottom: "20px",
    display: "inline-block",
  },

  // Note: The SVG itself handles its color/size within the JSX below

  // .title
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "10px",
    fontFamily: "heading",
    color: "#333",
  },

  // .message
  message: {
    fontSize: "16px",
    color: "#555",
    fontFamily: "body",
    marginBottom: "30px",
    lineHeight: 1.5,
  },

  // .dashboard-button (Base style)
  dashboardButton: {
    backgroundColor: "#22C55E",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "15px 30px",
    fontSize: "16px",
    fontFamily: "body",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginBottom: "30px",
    transition: "background-color 0.2s",
  },

  // Note: Hover effect is not possible with simple inline styles,

  // .email-note
  emailNote: {
    fontSize: "14px",
    color: "#888",
    marginTop: "20px",
    fontFamily: "body",
  },
};

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    // Navigates the user to the Employer Dashboard page
    navigate("/employer-dashboard");
  };

  return (
    <div style={styles.confirmationContainer}>
      <div style={styles.confirmationCard}>
        {/* Checkmark Icon (SVG is defined here) */}
        <div style={styles.successIconWrapper}>
          <svg
            style={{ width: "70px", height: "70px" }} // .success-icon styles
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            {/* The green circle */}
            <circle cx="26" cy="26" r="25" fill="#22C55E" />
            {/* The white checkmark path */}
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="5"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h1 style={styles.title}>Payment Successful!</h1>

        <p style={styles.message}>
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <button style={styles.dashboardButton} onClick={handleGoToDashboard}>
          Go to Employer Dashboard
        </button>

        <p style={styles.emailNote}>
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
