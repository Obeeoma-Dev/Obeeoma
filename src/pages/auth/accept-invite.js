import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoword1.png";
const AcceptInvite = () => {
    const navigate = useNavigate();
    const handleBackToLogin = () => {
        navigate("/login");
    };
    const handleResendEmail = () => {
        // Navigate back to reset password page to resend email
        navigate("/reset-password-signin");
    };
    return (_jsx("div", { style: {
            backgroundColor: "#f5f5f5",
            height: "100vh",
            overflow: "auto",
            paddingBottom: "80px",
        }, className: "d-flex align-items-center justify-content-center", children: _jsx(Card, { className: "shadow-lg border-0 overflow-hidden", style: { maxWidth: "600px", width: "100%" }, children: _jsx(Row, { className: "g-0", children: _jsxs(Col, { md: 12, className: "p-5 bg-white text-center", children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                                    height: "50px",
                                    width: "auto"
                                }, className: "mb-1" }) }), _jsx("div", { className: "mb-4", children: _jsx(CheckCircle, { size: 64, className: "text-success mb-3", style: { strokeWidth: 1.5 } }) }), _jsx("h2", { className: "fw-semibold mb-3 text-success", children: "Email Sent Successfully!" }), _jsx(Alert, { variant: "success", className: "border-0 bg-light text-start", children: _jsxs("div", { className: "d-flex align-items-start", children: [_jsx(Mail, { size: 20, className: "text-success me-3 mt-1" }), _jsxs("div", { children: [_jsx("h6", { className: "fw-semibold mb-2", children: "Check Your Email" }), _jsx("p", { className: "mb-2", children: "We've sent a password reset link to your email address. If you have an account with us, you should receive the email shortly." }), _jsxs("p", { className: "mb-0 text-muted small", children: [_jsx("strong", { children: "Note:" }), " If you don't see the email in your inbox, please check your spam or junk folder."] })] })] }) }), _jsxs("div", { className: "mt-4", children: [_jsx(Button, { variant: "success", className: "me-3 px-4 py-2 fw-semibold", onClick: handleResendEmail, children: "Resend Email" }), _jsxs(Button, { variant: "outline-secondary", className: "px-4 py-2 fw-semibold", onClick: handleBackToLogin, children: [_jsx(ArrowLeft, { size: 18, className: "me-2" }), "Back to Login"] })] }), _jsx("div", { className: "mt-4 pt-3 border-top", children: _jsx("p", { className: "text-muted small mb-0", children: "Didn't receive the email? Make sure you entered the correct email address or contact support if you continue to have issues." }) })] }) }) }) }));
};
export default AcceptInvite;
