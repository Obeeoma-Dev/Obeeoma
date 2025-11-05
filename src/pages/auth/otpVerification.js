import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from '../../components/OtpComponent';
import { Button } from 'react-bootstrap';
import { verifyOtpThunk, resendOtpThunk, selectUserDashboardRoute, } from '../../store/slices/authSlice';
import logo from './../../assets/Images/obeeomalogoword1.png';
const customStyles = {
    primaryColor: "#3CB371",
};
const OTP_LENGTH = 6;
export default function OtpVerificationPage() {
    const [otp, setOtp] = useState('');
    const [localError, setLocalError] = useState(null);
    const [isResendLoading, setIsResendLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otpGroupStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: 'auto',
        columnGap: '8px',
        margin: '0 auto 30px',
    };
    const { user, isLoading, error: authError } = useSelector((state) => state.auth);
    const dashboardRoute = useSelector(selectUserDashboardRoute);
    const email = user?.email;
    useEffect(() => {
        // Redirect if no user or email is available (protection)
        if (!user || !email) {
            //using root for safe fallback
            navigate('/otp-verify', { replace: true });
            return;
        }
        // Redirect if already verified
        if (user.is_verified) {
            navigate(dashboardRoute || '/otp-verify', { replace: true });
        }
    }, [email, user, navigate, dashboardRoute]);
    const handleVerify = (otpCode) => {
        if (otpCode.length !== OTP_LENGTH || !email) {
            setLocalError('Please enter a valid 6-digit code.');
            return;
        }
        // Clear local errors before dispatching
        setLocalError(null);
        // Dispatch for the thunk from authslice
        dispatch(verifyOtpThunk({
            email: email,
            otp_code: otpCode,
        }))
            .unwrap()
            .then(() => {
            // Successful verification - navigate to dashboard
            navigate(dashboardRoute || '/login', { replace: true });
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('OTP Verification Failed:', err);
            const errorMessage = 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            err?.message || 'Verification failed. Please check the code.';
            setLocalError(errorMessage);
        });
    };
    const handleResendCode = () => {
        if (!email) {
            setLocalError('Email address is missing. Cannot resend code.');
            return;
        }
        setIsResendLoading(true);
        setLocalError(null); // Clear previous errors
        dispatch(resendOtpThunk({ email }))
            .unwrap()
            .then(() => {
            alert('New verification code sent to your email!');
            setOtp(''); // Clear OTP input after resend
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('Resend Failed:', err);
            const errorMessage = err || 'Failed to resend code. Please try again later.';
            setLocalError(errorMessage);
        })
            .finally(() => {
            setIsResendLoading(false);
        });
    };
    const isAnyLoading = isLoading || isResendLoading;
    return (_jsx("div", { style: {
            backgroundColor: "#f5f5f5",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
        }, children: _jsxs("div", { className: "card p-3 shadow-lg text-center", style: {
                maxWidth: '600px',
                width: '100%',
                maxHeight: 'calc(100vh - 40px)',
                overflow: 'auto'
            }, children: [_jsxs("div", { className: "d-flex flex-column align-items-center justify-content-center mb-3", style: { fontFamily: 'heading' }, children: [_jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                                height: "40px",
                                width: "auto"
                            }, className: "mb-2" }), _jsx("h2", { className: "mb-1", style: { fontFamily: "body", fontSize: "bolder" }, children: "Check Your Email" }), _jsx("p", { className: "text-muted mb-2", style: { fontFamily: "body", fontSize: "14px" }, children: "We sent a verification code to your email address. Enter the code below to reset your password." }), _jsx("p", { className: "mb-2", style: { fontWeight: '500', fontSize: '14px' }, children: "Enter Verification Code" })] }), _jsx("div", { className: 'otpGroup', style: otpGroupStyle, children: _jsx(OtpInput, { value: otp, valueLength: OTP_LENGTH, onChange: setOtp }) }), _jsx(Button, { type: "button", className: "w-100 mb-2 py-2 fw-semibold", disabled: otp.length !== OTP_LENGTH || isAnyLoading, onClick: () => handleVerify(otp), style: {
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                        color: "white",
                        boxShadow: "none",
                        fontFamily: "body"
                    }, children: isLoading ? 'Verifying...' : 'Verify Code' }), _jsxs("div", { className: "text-center mt-2", children: [_jsxs("span", { className: "text-center text-muted small", style: { fontFamily: 'body' }, children: ["Did not receive the code?", ' '] }), _jsx(Link, { onClick: handleResendCode, style: {
                                color: '#3CB371',
                                textDecoration: 'none',
                                fontWeight: '500',
                                cursor: isResendLoading ? 'not-allowed' : 'pointer',
                                fontFamily: 'body',
                            }, to: "#", className: "small", children: isResendLoading ? 'Sending...' : 'Resend' })] }), _jsx("div", { className: "mt-2", children: _jsx(Link, { to: "/login", style: { color: '#3CB371', textDecoration: 'none', fontSize: '14px' }, children: "\u2190 Back to Sign In" }) }), (localError || authError) && (_jsx("div", { className: "text-danger mt-2 small", children: localError || authError }))] }) }));
}
