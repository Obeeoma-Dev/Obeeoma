// import React, { useState } from 'react';
// import QRCode from 'qrcode';
// import { Button, Card, Form } from 'react-bootstrap';
// import logo from './../../assets/Images/obeeomalogoword1.png';

// // Enhanced: Now properly wrapped within MfaSetupPage function component
// const MfaSetupPage: React.FC = () => {
//   const [url, setUrl] = useState('https://example.com');
//   const [qrcode, setQrcode] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [error, setError] = useState('');

//   // Enhanced QR Code generation function
//   const GenerateQRCode = async () => {
//     if (!url.trim()) {
//       setError('Please enter a valid URL or text');
//       return;
//     }

//     setIsGenerating(true);
//     setError('');

//     try {
//       // Generate QR code with proper settings
//       const qrCodeDataURL = await QRCode.toDataURL(url, {
//         width: 256,
//         margin: 2,
//         color: {
//           dark: '#022514ff', // Black squares
//           light: '#FFFFFF' // White background
//         }
//       });
//       setQrcode(qrCodeDataURL);
//     } catch (err) {
//       console.error('QR Code generation failed:', err);
//       setError('Failed to generate QR code. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Clear QR code
//   const clearQRCode = () => {
//     setQrcode('');
//     setUrl('https://example.com');
//     setError('');
//   };

//   // Proper return statement for the React component with enhanced UI
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100 p-3"
//       style={{ backgroundColor: "#f5f5f5" }}
//     >
          
//       <Card className="shadow-sm p-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "8px" }}>
//           <div className="d-flex flex-column align-items-center justify-content-center mb-4">
//                     <img
//                         src={logo}
//                         alt="Obeeoma Logo"
//                         style={{
//                             height: "50px",
//                             width: "auto"
//                         }}
//                         className="mb-1"
//                     />
//                 </div>
//         <Card.Body>
//           <h3 className="text-center mb-4 fw-semibold">QR Code Generator</h3>
//           <p className="text-center text-muted mb-4">
//             Enter a URL or text below to generate a QR code
//           </p>

//           <Form.Group className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="e.g. https://google.com or Hello World"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               className="mb-3"
//             />

//             {/* Error message */}
//             {error && (
//               <div className="text-danger small mb-3">{error}</div>
//             )}

//             <div className="d-flex gap-2">
//               <Button
//                 onClick={GenerateQRCode}
//                 disabled={isGenerating}
//                 className="flex-grow-1"
//                 style={{
//                   backgroundColor: "#28a745",
//                   borderColor: "#28a745"
//                 }}
//               >
//                 {isGenerating ? 'Generating...' : 'Generate QR Code'}
//               </Button>

//               {qrcode && (
//                 <Button
//                   variant="outline-secondary"
//                   onClick={clearQRCode}
//                 >
//                   Clear
//                 </Button>
//               )}
//             </div>
//           </Form.Group>

//           {/* Authenticator Code Input */}
//           <Form.Group className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="6-digit code"
//               maxLength={6}
//               inputMode="numeric"
//               pattern="[0-9]{6}"
//               className="text-center py-2"
//               style={{ fontSize: '1.2rem', letterSpacing: '8px' }}
//             />
//             <Form.Text className="text-muted">
//               Open your authenticator app and enter the 6-digit code
//             </Form.Text>
//           </Form.Group>

//           {/* QR Code Display */}
//           {qrcode && (
//             <div className="text-center">
//               <div className="qr-code p-3 border rounded mb-3 bg-white">
//                 <img
//                   src={qrcode}
//                   alt="Generated QR Code"
//                   style={{ maxWidth: '200px', height: '200px' }}
//                   className="img-fluid"
//                 />
//               </div>

//               {/* Download link */}
//               <a
//                 href={qrcode}
//                 download="qrcode.png"
//                 className="btn btn-outline-primary me-2"
//                 style={{ textDecoration: 'none' }}
//               >
//                  Download QR Code
//               </a>

//               <small className="text-muted d-block mt-2">
//                 Generated for: <code>{url}</code>
//               </small>
//             </div>
//           )}

//           {/* Instructions */}
//           {!qrcode && (
//             <div className="text-center text-muted small">
//               <em>Try entering a URL like "https://google.com" or any text!</em>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default MfaSetupPage;

import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setupMfa, confirmMfa } from '../../store/slices/authSlice';
import logo from './../../assets/Images/obeeomalogoword1.png'; 

const MfaSetupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    mfaSetupData, 
    isLoading, 
    error, 
    isMfaSetupConfirmed,
    user // Assuming user is available in authSlice
  } = useAppSelector((state) => state.auth);

  const [confirmationCode, setConfirmationCode] = useState('');

  // 1. Fetch QR Code data on component mount
  // useEffect(() => {
  //   // Only fetch if data is not already present and not confirmed
  //   if (!mfaSetupData && !isMfaSetupConfirmed) {
  //     dispatch(setupMfa());
  //   }
  // }, [dispatch, mfaSetupData, isMfaSetupConfirmed]);

  // // 2. Handle Confirmation Submission
  const handleConfirmMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationCode.length !== 6 || isLoading || !mfaSetupData) return;

    const payload = { code: confirmationCode };
    
    // Dispatch the confirm thunk
    const result = await dispatch(confirmMfa(payload));

    if (confirmMfa.fulfilled.match(result)) {
      alert('MFA successfully enabled! Redirecting...');
      // Navigation should happen here, e.g., navigate('/settings');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value.replace(/\D/g, '').substring(0, 6));
  };
  
  // RENDER STATES
  
  if (isMfaSetupConfirmed) {
      return (
          <Alert variant="success" className="text-center p-5">
              <h4>Multi-Factor Authentication is Active!</h4>
              <p>Your account is now protected. You can close this window.</p>
          </Alert>
      );
  }
  
  if (isLoading && !mfaSetupData) {
      return (
          <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="border" /> <span>&nbsp; Loading MFA setup data...</span>
          </div>
      );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 p-3" style={{ backgroundColor: "#f5f5f5" }}>
      <Card className="shadow-sm p-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "8px" }}>
        <div className="d-flex flex-column align-items-center justify-content-center mb-4">
          <img src={logo} alt="Logo" style={{ height: "50px", width: "auto" }} className="mb-1" />
        </div>
        <Card.Body>
          <h3 className="text-center mb-4 fw-semibold">Enable Two-Factor Authentication</h3>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <p className="text-center text-muted mb-4">
            Scan the QR code below using an authenticator app...
          </p>

          {mfaSetupData ? (
            <div className="text-center">
              {/* QR Code Display: Uses the base64 data from the backend */}
              <div className="qr-code p-3 border rounded mb-3 bg-white">
                <img
                  src={`data:image/png;base64,${mfaSetupData.qr_code_base64}`}
                  alt="MFA Setup QR Code"
                  style={{ maxWidth: '200px', height: '200px' }}
                  className="img-fluid"
                />
              </div>
              

              {/* Manual Secret Key */}
              <Alert variant="info" className="p-2 mb-4">
                Manual Key: <code>{mfaSetupData.secret}</code>
              </Alert>

              <Form onSubmit={handleConfirmMfa}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="6-digit verification code"
                    value={confirmationCode}
                    onChange={handleCodeChange}
                    maxLength={6}
                    inputMode="numeric"
                    className="text-center py-2"
                    style={{ fontSize: '1.2rem', letterSpacing: '6px' }}
                    required
                    disabled={isLoading}
                  />
                  <Form.Text className="text-muted">
                    Enter the code generated by your authenticator app to confirm setup.
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={isLoading || confirmationCode.length < 6}
                  className="w-100 mt-3"
                  style={{ backgroundColor: "#22C55E", borderColor: "#22C55E" }}
                >
                  {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Confirm and Enable MFA'}
                </Button>
              </Form>
            </div>
          ) : (
            <Alert variant="warning" className="text-center">
                {/* Could not load MFA setup data. Please check your system administrator permissions. */}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MfaSetupPage;
