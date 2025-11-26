import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
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
    const [localError, setLocalError] = useState<string | null>(null);
    const [isResendLoading, setIsResendLoading] = useState(false);
    // State for the resend countdown timer
    const [resendTimer, setResendTimer] = useState(0); 
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const otpGroupStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', width: 'auto', columnGap: '8px', margin: '0 auto 30px' };

    const { user, isLoading, error: authError } = useSelector(
        (state: RootState) => state.auth
    );

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
        let timerId: NodeJS.Timeout;
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
    const handleResendCode = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
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
            // await dispatch(resendOtpThunk({ code: '0' })).unwrap(); 
            
            // On successful resend
            window.alert('New verification code sent to your email! Please check your inbox.');
            setOtp(''); // Clear OTP input
            setResendTimer(RESEND_COOLDOWN_SECONDS); // Start the cooldown timer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Resend Failed:', err);
            const errorMessage = err?.message || 'Failed to resend code. Please try again later.';
            setLocalError(errorMessage);
        } finally {
            setIsResendLoading(false);
        }
    }, [dispatch, email, isResendLoading, resendTimer]); // Dependencies for useCallback

    /**
     * Handles the OTP verification process.
     */
    const handleVerify = (otpCode: string) => {
        if (otpCode.length !== OTP_LENGTH || !email) {
            setLocalError('Please enter a valid 6-digit code and ensure your email is present.');
            return;
        }

        setLocalError(null);

        dispatch(
            verifyOtpThunk({
                otp_code: otpCode,
            })
        )
            .unwrap()
            .then(() => {
                // On SUCCESS, redirect
                navigate('/reset-password', { replace: true });
            })
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err: any) => {
                console.error('OTP Verification Failed:', err);
                const errorMessage = err?.message || 'Verification failed. Please check the code.';
                setLocalError(errorMessage);
                setOtp(''); // Clear OTP on failed attempt
            });
    };

    const isAnyLoading = isLoading || isResendLoading;
    const isResendDisabled = isResendLoading || resendTimer > 0 || !email;

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {/* CARD Container */}
            <div
                className="card p-4 shadow-lg text-center"
                style={{ maxWidth: '700px', width: '100%' }}
            >
                <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                    <img
                        src={logo}
                        alt="Obeeoma Logo"
                        style={{
                            height: "50px",
                            width: "auto"
                        }}
                        className="mb-1"
                    />
                </div>

                {/* Title & Description */}
                <h2 className="text-center mb-2" style={{ fontFamily: "body", fontSize: '1.5rem', fontWeight: "bold" }}>Check Your Email</h2>
                <p className="text-muted mb-4" style={{ fontFamily: "body", fontSize: '0.9rem' }}>
                    We sent a verification code to your email. Enter the code below to reset your password
                </p>

                <p className="mb-2" style={{ fontWeight: '500', fontSize: '15px' }}>Enter Verification Code</p>

                {/* OTP Input */}
                <div className='otpGroup' style={otpGroupStyle}>
                    <OtpInput
                        value={otp}
                        valueLength={OTP_LENGTH}
                        onChange={setOtp}
                    />
                </div>

                {/* Error/Loading Messages */}
                {(localError || authError) && (
                    <div className="text-danger mt-1 mb-3 small fw-bold">
                        {localError || authError}
                    </div>
                )}

                {/* Verify Button */}
                <Button
                    type="button"
                    className="w-100 mb-3 py-2 fw-semibold"
                    // Disable if OTP length is wrong or if any operation is loading
                    disabled={otp.length !== OTP_LENGTH || isAnyLoading}
                    onClick={() => handleVerify(otp)}
                    style={{
                        backgroundColor: customStyles.primaryColor,
                        borderColor: customStyles.primaryColor,
                        color: "white",
                        boxShadow: "none",
                        fontFamily: "body",
                        opacity: (otp.length !== OTP_LENGTH || isAnyLoading) ? 0.6 : 1 // Visual feedback for disabled state
                    }}
                >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>

                {/* Resend Link with Cooldown Timer */}
                <div className="text-center mt-3">
                    <span
                        className="text-center text-muted small"
                        style={{ fontFamily: 'body' }}
                    >
                        Did not receive the code?{' '}
                    </span>
                    {/* Resend button/link */}
                    {resendTimer > 0 ? (
                        <span 
                            className="small fw-semibold"
                            style={{ color: 'gray', fontFamily: 'body' }}
                        >
                            Resend in {resendTimer}s
                        </span>
                    ) : (
                        <Link
                            onClick={handleResendCode}
                            style={{
                                color: '#3CB371',
                                textDecoration: 'none',
                                fontWeight: '600',
                                cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                                fontFamily: 'body',
                                opacity: isResendDisabled ? 0.6 : 1, // Visual feedback for disabled state
                            }}
                            to="#"
                            className="small"
                            role="button"
                        >
                            {isResendLoading ? 'Sending...' : 'Resend'}
                        </Link>
                    )}
                </div>

                {/* "Back to Sign In" link */}
                <div className="mt-4">
                    <Link
                        to="/login"
                        style={{ color: '#3CB371', textDecoration: 'none', fontSize: '14px' }}
                    >
                        ← Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
