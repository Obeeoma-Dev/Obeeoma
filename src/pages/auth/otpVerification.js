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
    const { user, isLoading, error: authError } = useSelector((state) => state.auth);
    const dashboardRoute = useSelector(selectUserDashboardRoute);
    const email = user?.email; // A email is in Redux state
    //   useEffect(() => {
    //   
    // //     if (!user || !email) {
    // //       navigate('/login', { replace: true }); 
    // //       return;
    // //     }
    //    
    //   }, [email, user, navigate, dashboardRoute]);
    // Effect to clear local error when OTP changes
    useEffect(() => {
        if (otp.length > 0 && localError) {
            setLocalError(null);
        }
    }, [otp, localError]);
    //Handles the OTP verification process and redirects on success.
    const handleVerify = (otpCode) => {
        if (otpCode.length !== OTP_LENGTH || !email) {
            setLocalError('Please enter a valid 6-digit code.');
            return;
        }
        setLocalError(null);
        dispatch(verifyOtpThunk({
            // email: email, // Optional, depends on your API
            otp_code: otpCode,
        }))
            .unwrap()
            .then(() => {
            //Redirect the user to the reset-password page.
            navigate('/reset-password', { replace: true });
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('OTP Verification Failed:', err);
            // to capture the errors for better visibility
            const errorMessage = err?.message || err?.detail || 'Verification failed. Please check the code.';
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
        setLocalError(null); // Clear previous errors
        dispatch(resendOtpThunk({ email }))
            .unwrap()
            .then(() => {
            window.alert('New verification code sent to your email!');
            setOtp(''); // Clear OTP input after resend
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err) => {
            console.error('Resend Failed:', err);
            // for visible error
            const errorMessage = err?.message || err?.detail || 'Failed to resend code. Please try again later.';
            setLocalError(errorMessage);
        })
            .finally(() => {
            setIsResendLoading(false);
        });
    };
    const isAnyLoading = isLoading || isResendLoading;
    return (_jsx("div", { className: "container d-flex justify-content-center align-items-center vh-100", children: _jsxs("div", { className: "card p-4 shadow-lg text-center", style: { maxWidth: '600px', width: '100%' }, children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                            height: "50px",
                            width: "auto"
                        }, className: "mb-1" }) }), _jsx("h2", { className: "text-center mb-2", style: { fontFamily: "body", fontSize: '1.5rem', fontWeight: "bold" }, children: "Check Your Email" }), _jsxs("p", { className: "text-muted mb-4", style: { fontFamily: "body", fontSize: '0.9rem' }, children: ["We sent a verification code to **", email || 'your email', "**. Enter the code below to reset your password."] }), _jsx("p", { className: "mb-2", style: { fontWeight: '500', fontSize: '15px' }, children: "Enter Verification Code" }), _jsx("div", { className: 'otp-group', style: {
                        display: 'flex',
                        justifyContent: 'center', // **This ensures the OtpInput component is centered**
                        marginBottom: '1.5rem' // Added margin for spacing
                    }, children: _jsx(OtpInput, { value: otp, valueLength: OTP_LENGTH, onChange: setOtp }) }), (localError || authError) && (_jsx("div", { className: "text-danger mt-1 mb-3 small fw-bold", children: localError || authError })), _jsx(Button, { type: "button", className: "w-100 mb-3 py-2 fw-semibold", disabled: otp.length !== OTP_LENGTH || isAnyLoading, onClick: () => handleVerify(otp), style: {
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                        color: "white",
                        boxShadow: "none",
                        fontFamily: "body",
                        opacity: (otp.length !== OTP_LENGTH || isAnyLoading) ? 0.6 : 1
                    }, children: isLoading ? 'Verifying...' : 'Verify Code' }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "text-center text-muted small", style: { fontFamily: 'body' }, children: ["Did not receive the code?", ' '] }), _jsx(Link, { onClick: handleResendCode, style: {
                                color: '#3CB371',
                                textDecoration: 'none',
                                fontWeight: '600',
                                cursor: isResendLoading || !email ? 'not-allowed' : 'pointer',
                                fontFamily: 'body',
                                opacity: isResendLoading || !email ? 0.6 : 1,
                            }, to: "#", className: "small", children: isResendLoading ? 'Sending...' : 'Resend' })] }), _jsx("div", { className: "mt-4", children: _jsx(Link, { to: "/login", style: { color: '#3CB371', textDecoration: 'none', fontSize: '14px' }, children: "Back to Sign In" }) })] }) }));
}
