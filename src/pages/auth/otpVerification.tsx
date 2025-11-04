import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from '../../components/OtpComponent';
import { AppDispatch, RootState } from '../../store/store';
import {
  verifyOtpThunk,
  resendOtpThunk, 
  selectUserDashboardRoute,
} from '../../store/slices/authSlice';
import logo from './../../assets/Images/green..png';


const OTP_LENGTH = 6;

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState<string | null>(null); 
  const [isResendLoading, setIsResendLoading] = useState(false); 

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

 
  const { user, isLoading, error: authError } = useSelector(
    (state: RootState) => state.auth
  );
  const dashboardRoute = useSelector(selectUserDashboardRoute);

  const email = user?.email;

  useEffect(() => {
    
    if (!user || !email) {
      
      navigate('/otp-verify', { replace: true });
      return;
    }
  
    if (user.is_verified) {
      navigate(dashboardRoute || '/', { replace: true });
    }
   
  }, [email, user, navigate, dashboardRoute]);

  // const handleOtpChange = (newOtpValue: string) => {
  //   setOtp(newOtpValue);
  //   setLocalError(null); 
  //   
  //   if (newOtpValue.length === OTP_LENGTH && email) {
  //     handleVerify(newOtpValue);
  //   }
  // };

  const handleVerify = (otpCode: string) => {
    if (otpCode.length !== OTP_LENGTH || !email) {
        setLocalError('Please enter a valid 6-digit code.');
        return;
    }
    
    // Dispatch for the thunk from authslice
    dispatch(
      verifyOtpThunk({
        email: email,
        otp_code: otpCode,
      })
    )
      .unwrap()
      .then(() => {
        
        navigate(dashboardRoute || '/reset-password', { replace: true });
      })
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.error('OTP Verification Failed:', err);
        const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (err as any)?.message || 'Verification failed. Please check the code.';
        setLocalError(errorMessage);
      });
  };

  
  const handleResendCode = () => {
    if (!email) {
      setLocalError('Email address is missing. Cannot resend code.');
      return;
    }

    setIsResendLoading(true);
    setLocalError(null);
    
    
    dispatch(resendOtpThunk({ email }))
      .unwrap()
      .then(() => {
        alert('New verification code sent to your email!');
        setOtp('');
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.error('Resend Failed:', err);
        const errorMessage = err || 'Failed to resend code. Please try again later.';
        setLocalError(errorMessage);
      })
      .finally(() => {
        setIsResendLoading(false);
      });
  };

  const isAnyLoading = isLoading || isResendLoading;
  
  
  // if (!user || !email) {
  //   return <div>Loading user details or redirecting...</div>;
  // }
  // 
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center">
        <div
          className="d-flex flex-column align-items-center justify-content-center mb-4"
          style={{ fontFamily: 'heading' }}
        >
          <img
            src={logo}
            alt="Obeeoma Logo"
            width="100"
            className="mb-1"
          />
          <p className="m-0 text-center"></p>

          <h2 className="mb-4">Check Your Email</h2>
          <p className="text-muted mb-4">
            We sent a verification code to email. Please enter the{' '}
            {OTP_LENGTH}-digit code.
          </p>
          <h4>Enter verification code</h4>
        </div>

        <OtpInput
          value={otp}
          valueLength={OTP_LENGTH}
          onChange={setOtp}
        />
        <div className="text-center mt-3">
          <span
            className="text-center text-muted small"
            style={{ fontFamily: 'body' }}
          >
            Didn't receive any code?{' '}
          </span>
          <Link
            onClick={handleResendCode}
            style={{
              color: '#3CB371',
              textDecoration: 'none',
              fontWeight: '500',
              cursor: isResendLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'body',
            }}
            to="#"
            className="small"
          >
            {isResendLoading ? 'Sending...' : 'Send Code again'}
          </Link>
        </div>

        <button
          className="btn mt-4"
          style={{ backgroundColor: '#3CB371', borderColor: '#3CB371' }}
          
          onClick={() => handleVerify(otp)} 
          disabled={otp.length !== OTP_LENGTH || isAnyLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </button>

        
        {(localError || authError) && (
          <div className="text-danger mt-3">{localError || authError}</div>
        )}
      </div>
    </div>
  );
}