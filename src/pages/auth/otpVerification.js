import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from '../../components/OtpComponent';
import { Button } from 'react-bootstrap';
import { verifyOtpThunk, resendOtpThunk } from '../../store/slices/authSlice';
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
    // Define style object outside the component or memoize if it's based on props
    const otpGroupStyle = { display: 'flex', justifyContent: 'center', width: 'auto', columnGap: '8px', margin: '0 auto 30px' };
    const { user, isLoading, error: authError } = useSelector((state) => state.auth);
    // const dashboardRoute = useSelector(selectUserDashboardRoute);
    const email = user?.email; // Get email from authenticated user state
    //Effect to clear local error when OTP changes
    useEffect(() => {
        if (otp.length > 0 && localError) {
            setLocalError(null);
        }
    }, [otp, localError]);
    /**
     * Handles the OTP verification process and redirects on success.
     */
    const handleVerify = (otpCode) => {
        if (otpCode.length !== OTP_LENGTH || !email) {
            setLocalError('Please enter a valid 6-digit code.');
            return;
        }
        setLocalError(null);
        dispatch(verifyOtpThunk({
            //email: email,
            otp_code: otpCode,
        }))
            .unwrap()
            .then(() => {
            // On SUCCESS, redirect the user to the reset-password page.
            navigate('/reset-password', { replace: true });
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('OTP Verification Failed:', err);
            // Safely extract the error message from the thunk's rejected value
            const errorMessage = 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            err?.message || err || 'Verification failed. Please check the code.';
            setLocalError(errorMessage);
            setOtp(''); // Clear OTP on failed attempt
        });
    };
    const handleResendCode = () => {
        if (!email) {
            setLocalError('Email address is missing. Please try logging in again.');
            return;
        }
        setIsResendLoading(true);
        setLocalError(null); //Clear previous errors
        dispatch(resendOtpThunk({ email }))
            .unwrap()
            .then(() => {
            window.alert('New verification code sent to your email!');
            setOtp(''); // Clear OTP input after resend
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('Resend Failed:', err);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorMessage = err?.message || err || 'Failed to resend code. Please try again later.';
            setLocalError(errorMessage);
        })
            .finally(() => {
            setIsResendLoading(false);
        });
    };
    const isAnyLoading = isLoading || isResendLoading;
    return (_jsx("div", { className: "container d-flex justify-content-center align-items-center vh-100", children: _jsxs("div", { className: "card p-4 shadow-lg text-center", style: { maxWidth: '700px', width: '100%' }, children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                            height: "50px",
                            width: "auto"
                        }, className: "mb-1" }) }), _jsx("h2", { className: "text-center mb-2", style: { fontFamily: "body", fontSize: '1.5rem', fontWeight: "bold" }, children: "Check Your Email" }), _jsx("p", { className: "text-muted mb-4", style: { fontFamily: "body", fontSize: '0.9rem' }, children: "We sent a verification code to your email address. Enter the code below to reset your password" }), _jsx("p", { className: "mb-2", style: { fontWeight: '500', fontSize: '15px' }, children: "Enter Verification Code" }), _jsx("div", { className: 'otpGroup', style: otpGroupStyle, children: _jsx(OtpInput, { value: otp, valueLength: OTP_LENGTH, onChange: setOtp }) }), (localError || authError) && (_jsx("div", { className: "text-danger mt-1 mb-3 small fw-bold", children: localError || authError })), _jsx(Button, { type: "button", className: "w-100 mb-3 py-2 fw-semibold", 
                    // Disable if OTP length is wrong or if any operation is loading
                    disabled: otp.length !== OTP_LENGTH || isAnyLoading, onClick: () => handleVerify(otp), style: {
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                        color: "white",
                        boxShadow: "none",
                        fontFamily: "body",
                        opacity: (otp.length !== OTP_LENGTH || isAnyLoading) ? 0.6 : 1 // Visual feedback for disabled state
                    }, children: isLoading ? 'Verifying...' : 'Verify Code' }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "text-center text-muted small", style: { fontFamily: 'body' }, children: ["Did not receive the code?", ' '] }), _jsx(Link, { onClick: handleResendCode, style: {
                                color: '#3CB371',
                                textDecoration: 'none',
                                fontWeight: '600',
                                cursor: isResendLoading || !email ? 'not-allowed' : 'pointer',
                                fontFamily: 'body',
                                opacity: isResendLoading || !email ? 0.6 : 1, // Visual feedback for disabled state
                            }, to: "#", className: "small", children: isResendLoading ? 'Sending...' : 'Resend' })] }), _jsx("div", { className: "mt-4", children: _jsx(Link, { to: "/login", style: { color: '#3CB371', textDecoration: 'none', fontSize: '14px' }, children: "\u2190 Back to Sign In" }) })] }) }));
}
