import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import OtpInput from '../../components/OtpComponent';
import { Button } from 'react-bootstrap';

import {
  verifyOtpThunk,
  resendOtpThunk,
  selectUserDashboardRoute,
} from '../../store/slices/authSlice';
import logo from './../../assets/Images/obeeomalogoword1.png';

const customStyles = {
  primaryColor: "#3CB371",
};

const OTP_LENGTH = 6;

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [isResendLoading, setIsResendLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Define style object outside the component or memoize if it's based on props
  const otpGroupStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    columnGap: '8px', 
    margin: '0 auto 30px', 
  };

  const { user, isLoading, error: authError } = useSelector(
    (state: RootState) => state.auth
  );
  const dashboardRoute = useSelector(selectUserDashboardRoute);

  // Use the email for the OTP process, typically from the user object after login/registration
  // NOTE: If this page is used for *Password Reset*, the email should come from
  // a separate state (like a resetPasswordSlice) or query parameter, not the auth.user object.
  const email = user?.email;

  useEffect(() => {
    // 1. Guard against direct access if the user state is empty/unintended for verification
    // *CORRECTION*: Changed target of fallback navigation from '/otp-verify' (which loops) to '/login'.
    if (!user || !email) {
      navigate('/login', { replace: true }); 
      return;
    }

    // 2. Redirect if already verified (Standard Registration Flow)
    if (user.is_verified) {
      navigate(dashboardRoute || '/login', { replace: true });
    }
    
    // NOTE: If this component is *only* for Password Reset, the logic above (checking user status) 
    // should be replaced with checks for the reset token/state.
  }, [email, user, navigate, dashboardRoute]);


  // Effect to clear local error when OTP changes
  useEffect(() => {
    if (otp.length > 0 && localError) {
      setLocalError(null);
    }
  }, [otp, localError]);

  const handleVerify = (otpCode: string) => {
    if (otpCode.length !== OTP_LENGTH || !email) {
      setLocalError('Please enter a valid 6-digit code.');
      return;
    }

    setLocalError(null);

    dispatch(
      verifyOtpThunk({
        email: email,
        otp_code: otpCode,
      })
    )
      .unwrap()
      .then(() => {
        // Successful verification - Navigate to the next appropriate route.
        // If this is *registration* verification, navigate to the dashboard.
        // If this is *password reset*, navigate to the password change page.
        navigate(dashboardRoute || '/login', { replace: true });
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.error('OTP Verification Failed:', err);
        // Safely extract the error message from the thunk's rejected value
        const errorMessage =
          (err as any)?.message || (err as string) || 'Verification failed. Please check the code.';
        setLocalError(errorMessage);
        setOtp(''); // Clear OTP on failed attempt for security/fresh start
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
        // Use a less intrusive method than `alert`, like a toast or notification.
        // For this example, an alert is kept but a comment added.
        window.alert('New verification code sent to your email!');
        setOtp(''); // Clear OTP input after resend
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.error('Resend Failed:', err);
        // Safely extract the error message
        const errorMessage = (err as any)?.message || (err as string) || 'Failed to resend code. Please try again later.';
        setLocalError(errorMessage);
      })
      .finally(() => {
        setIsResendLoading(false);
      });
  };

  const isAnyLoading = isLoading || isResendLoading;
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* CARD Container */}
      <div 
        className="card p-4 shadow-lg text-center"
        style={{ maxWidth: '400px', width: '90%' }} 
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
        <h2 className="text-center mb-2" style={{ fontFamily:"body", fontSize: '1.5rem', fontWeight: "bold" }}>Check Your Email</h2>
        <p className="text-muted mb-4" style={{ fontFamily:"body", fontSize: '0.9rem' }}>
          We sent a verification code to **{email || 'your email address'}**. Enter the code below to {user?.is_verified ? 'complete login' : 'verify your account'}.
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
          
        {/* Resend Link */}
        <div className="text-center mt-3">
          <span
            className="text-center text-muted small"
            style={{ fontFamily: 'body' }}
          >
            Did not receive the code?{' '}
          </span>
          <Link
            onClick={handleResendCode}
            style={{
              color: '#3CB371',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: isResendLoading || !email ? 'not-allowed' : 'pointer',
              fontFamily: 'body',
              opacity: isResendLoading || !email ? 0.6 : 1, // Visual feedback for disabled state
            }}
            to="#"
            className="small"
          >
            {isResendLoading ? 'Sending...' : 'Resend'}
          </Link>
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