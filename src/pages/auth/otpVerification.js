import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
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
// Cooldown period in seconds (60 seconds is a common standard)
const RESEND_COOLDOWN_SECONDS = 60;
export default function OtpVerificationPage() {
    const [otp, setOtp] = useState('');
    const [localError, setLocalError] = useState(null);
    const [isResendLoading, setIsResendLoading] = useState(false);
    // State for the resend countdown timer
    const [resendTimer, setResendTimer] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otpGroupStyle = { display: 'flex', justifyContent: 'center', width: 'auto', columnGap: '8px', margin: '0 auto 30px' };
    const { user, isLoading, error: authError } = useSelector((state) => state.auth);
    // Get email from user state (Used for display and pre-check)
    const email = user?.email;
    // Effect to clear local error when OTP changes
    useEffect(() => {
        if (otp.length > 0 && localError) {
            setLocalError(null);
        }
    }, [otp, localError]);
    // Effect for the Resend Timer/Cooldown
    useEffect(() => {
        let timerId;
        if (resendTimer > 0) {
            timerId = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
        }
        return () => clearTimeout(timerId);
    }, [resendTimer]);
    /**
     * Handles the "Send Code again" link click with Cooldown Timer logic.
     */
    const handleResendCode = useCallback(async (e) => {
        e.preventDefault();
        // 1. Cooldown and Loading check to prevent spamming
        if (isResendLoading || resendTimer > 0) {
            return;
        }
        // Basic check for email context (though not passed in the payload)
        if (!email) {
            setLocalError('Email address is missing. Please return to the previous step.');
            return;
        }
        setIsResendLoading(true);
        setLocalError(null);
        try {
<<<<<<< HEAD
            await dispatch(resendOtpThunk({ code: '0' })).unwrap();
=======
            await dispatch(verifyOtpThunk({ otp_code: '0' })).unwrap();
>>>>>>> a97afbd044d22b6739fe3fb742ed882e1856e6f6
            // On successful resend
            window.alert('New verification code sent to your email! Please check your inbox.');
            setOtp(''); // Clear OTP input
            setResendTimer(RESEND_COOLDOWN_SECONDS); // Start the cooldown timer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            console.error('Resend Failed:', err);
            const errorMessage = err?.message || 'Failed to resend code. Please try again later.';
            setLocalError(errorMessage);
        }
        finally {
            setIsResendLoading(false);
        }
    }, [dispatch, email, isResendLoading, resendTimer]); // Dependencies for useCallback
    /**
     * Handles the OTP verification process.
     */
    const handleVerify = (otpCode) => {
        if (otpCode.length !== OTP_LENGTH || !email) {
            setLocalError('Please enter a valid 6-digit code and ensure your email is present.');
            return;
        }
        setLocalError(null);
        dispatch(verifyOtpThunk({
            otp_code: otpCode,
        }))
            .unwrap()
            .then(() => {
            // On SUCCESS, redirect
            navigate('/reset-password', { replace: true });
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('OTP Verification Failed:', err);
            const errorMessage = err?.message || 'Verification failed. Please check the code.';
            setLocalError(errorMessage);
            setOtp(''); // Clear OTP on failed attempt
        });
    };
    const isAnyLoading = isLoading || isResendLoading;
    const isResendDisabled = isResendLoading || resendTimer > 0 || !email;
    return (_jsx("div", { className: "container d-flex justify-content-center align-items-center vh-100", children: _jsxs("div", { className: "card p-4 shadow-lg text-center", style: { maxWidth: '700px', width: '100%' }, children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                            height: "50px",
                            width: "auto"
                        }, className: "mb-1" }) }), _jsx("h2", { className: "text-center mb-2", style: { fontFamily: "body", fontSize: '1.5rem', fontWeight: "bold" }, children: "Check Your Email" }), _jsx("p", { className: "text-muted mb-4", style: { fontFamily: "body", fontSize: '0.9rem' }, children: "We sent a verification code to your email. Enter the code below to reset your password" }), _jsx("p", { className: "mb-2", style: { fontWeight: '500', fontSize: '15px' }, children: "Enter Verification Code" }), _jsx("div", { className: 'otpGroup', style: otpGroupStyle, children: _jsx(OtpInput, { value: otp, valueLength: OTP_LENGTH, onChange: setOtp }) }), (localError || authError) && (_jsx("div", { className: "text-danger mt-1 mb-3 small fw-bold", children: localError || authError })), _jsx(Button, { type: "button", className: "w-100 mb-3 py-2 fw-semibold", 
                    // Disable if OTP length is wrong or if any operation is loading
                    disabled: otp.length !== OTP_LENGTH || isAnyLoading, onClick: () => handleVerify(otp), style: {
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                        color: "white",
                        boxShadow: "none",
                        fontFamily: "body",
                        opacity: (otp.length !== OTP_LENGTH || isAnyLoading) ? 0.6 : 1 // Visual feedback for disabled state
                    }, children: isLoading ? 'Verifying...' : 'Verify Code' }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "text-center text-muted small", style: { fontFamily: 'body' }, children: ["Did not receive the code?", ' '] }), resendTimer > 0 ? (_jsxs("span", { className: "small fw-semibold", style: { color: 'gray', fontFamily: 'body' }, children: ["Resend in ", resendTimer, "s"] })) : (_jsx(Link, { onClick: handleResendCode, style: {
                                color: '#3CB371',
                                textDecoration: 'none',
                                fontWeight: '600',
                                cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                                fontFamily: 'body',
                                opacity: isResendDisabled ? 0.6 : 1, // Visual feedback for disabled state
                            }, to: "#", className: "small", role: "button", children: isResendLoading ? 'Sending...' : 'Resend' }))] }), _jsx("div", { className: "mt-4", children: _jsx(Link, { to: "/login", style: { color: '#3CB371', textDecoration: 'none', fontSize: '14px' }, children: "\u2190 Back to Sign In" }) })] }) }));
}
