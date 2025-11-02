
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../components/OtpComponent'; 
import { AppDispatch, RootState } from '../../store/store'; 
import {verifyOtpThunk} from '../../store/slices/authSlice'; 
import { selectUserDashboardRoute } from '../../store/slices/authSlice';

//defining the number of the OTP
const OTP_LENGTH = 6; 

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Providing states
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
  const dashboardRoute = useSelector(selectUserDashboardRoute);

  const email = user?.email; 
  
  useEffect(() => {
    if (!email || !user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.is_verified) {
      navigate(dashboardRoute || '/index', { replace: true });
    }
  }, [email, user, navigate, dashboardRoute]);


  const handleOtpChange = (newOtpValue: string) => {
    setOtp(newOtpValue);

    //  Checking for the length of otp
    if (newOtpValue.length === OTP_LENGTH && email) { 
      
      // Dispatch the verification thunk
      dispatch(verifyOtpThunk({ 
          email: email, 
          otp_code: newOtpValue 
      }))
      .unwrap()
      .then(() => {
        
        navigate(dashboardRoute || '/employer-dashboard', { replace: true });
      })
      .catch((err:unknown) => {
        console.error('OTP Verification Failed:', err);
      });
    }
  };

  if (isLoading && !user) {
    return <div>Loading user details...</div>;
  }
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg text-center">
        <h2 className="mb-4">Verifying your account</h2>
        <p className="text-muted mb-4">
            Please enter the {OTP_LENGTH}-digit code sent to **{email}**.
        </p>

        <OtpInput 
          value={otp} 
          valueLength={OTP_LENGTH} 
          onChange={handleOtpChange} 
        />
        
        <button 
          className="btn btn-primary mt-4" 
          onClick={() => handleOtpChange(otp)} // Re-run dispatch manually if needed
          disabled={otp.length !== OTP_LENGTH || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </button>

        {error && <div className="text-danger mt-3">{error}</div>}
        
      </div>
    </div>
  );
}