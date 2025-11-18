// // src/pages/MfaSetupPage.tsx
// import React, { useState, FormEvent, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { setupMfa, confirmMfa, clearError, logout } from '../../store/slices/authSlice'; // Import thunks and actions
// import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MfaSetupPage: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch<AppDispatch>();

//     // --- Selectors ---
//     const { mfaSetupData, isLoading, error, isMfaSetupConfirmed, accessToken } = useSelector(
//         (state: RootState) => state.auth
//     );

//     // --- Local State ---
//     const [code, setCode] = useState<string>('');
//     const [showSecret, setShowSecret] = useState<boolean>(false);

//     // --- Effects & Handlers ---

//     // 1. Initial Data Fetch (Replaces startMfaSetup logic)
//     useEffect(() => {
//         // If we don't have setup data and aren't loading, dispatch the thunk
//         if (!mfaSetupData && !isLoading && accessToken) {
//             dispatch(setupMfa());
//         }
//     }, [mfaSetupData, isLoading, accessToken, dispatch]);

//     // 2. Navigation Control (Success and Session Expiration)
//     useEffect(() => {
//         // Handle successful confirmation
//         if (isMfaSetupConfirmed) {
//             navigate("/system-admin", { replace: true });
//         }
        
//         // Handle session expiration (401 handled by slice, which calls logout)
//         // If accessToken becomes null (due to logout in slice), redirect to login
//         if (!accessToken) {
//             navigate("/login", { replace: true });
//         }
//     }, [isMfaSetupConfirmed, accessToken, navigate]);

//     // 3. Form Submission (Step 2: Confirmation)
//     const handleConfirm = async (e: FormEvent) => {
//         e.preventDefault();
//         if (code.length !== 6) {
//             dispatch(clearError()); // Clear any previous API error
//             // Setting a local error for immediate UI feedback
//             alert('Please enter a valid 6-digit code.'); 
//             return;
//         }
        
//         // Dispatch the async thunk to confirm the MFA setup
//         // The result of this thunk will update 'isMfaSetupConfirmed' or 'error' in Redux
//         dispatch(confirmMfa({ code }));
//     };
    
//     // --- Render Logic ---

//     if (isLoading && !mfaSetupData) {
//         return (
//             <div className="d-flex justify-content-center align-items-center vh-100">
//                 <Spinner animation="border" role="status" className="me-2" />
//                 <span>Loading MFA setup data...</span>
//             </div>
//         );
//     }
    
//     // Handles initial 401 or generic setup failure (400/500)
//     if (!mfaSetupData) {
//         if (error) {
//             return (
//                 <div className="d-flex justify-content-center align-items-center vh-100">
//                     <Card className="p-4 text-center">
//                         <p className="text-danger">Setup Error: {error}</p> 
//                         <Button onClick={() => dispatch(setupMfa())}>Retry Setup</Button>
//                         <Button variant="link" onClick={() => dispatch(logout())}>Go to Login</Button>
//                     </Card>
//                 </div>
//             );
//         }
//         return null; 
//     }
    
//     // Main UI Render (Once mfaSetupData is available)
//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 p-3" style={{ backgroundColor: "#f5f5f5" }}>
//           <Card className="shadow-sm p-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "8px" }}>
//             <Card.Body>
//               <h3 className="text-center mb-4 fw-semibold">Two-Factor Authentication Setup 🔒</h3>
//               <p className="text-center text-muted">Scan the QR code below with an authenticator app (e.g., Google Authenticator) to complete your admin security setup.</p>
              
//               <div className="d-flex justify-content-center my-4">
//                 <div className="qr-code p-3 border rounded">
//                   <img 
//                     src={`data:image/png;base64,${mfaSetupData.qr_code_base64}`} 
//                     alt="MFA QR Code" 
//                     style={{ maxWidth: '200px', height: 'auto' }}
//                   />
//                 </div>
//               </div>
              
//               <div className="secret-key-area text-center mb-4">
//                 <p className="mb-1"><strong>Or manually enter Secret Key:</strong></p>
//                 <code className="p-2 border rounded d-inline-block" style={{ userSelect: showSecret ? 'text' : 'none', backgroundColor: '#eee' }}>
//                   {showSecret ? mfaSetupData.secret : '...'}
//                 </code>
//                 <Button 
//                   variant="link" 
//                   onClick={() => setShowSecret(prev => !prev)}
//                   className="ms-2 small"
//                 >
//                   {showSecret ? 'Hide' : 'Show'}
//                 </Button>
//               </div>

//               <hr className="mb-4" />

//               <Form onSubmit={handleConfirm}>
//                 <h5 className="mb-3">Verification Code</h5>
                
//                 <Form.Group className="mb-3" controlId="mfaCode">
//                   <Form.Control
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     maxLength={6}
//                     placeholder="6-digit code from app"
//                     inputMode="numeric"
//                     pattern="[0-9]{6}"
//                     required
//                     disabled={isLoading}
//                     className="py-2 text-center"
//                     style={{ fontSize: '1.2rem', letterSpacing: '2px' }}
//                   />
//                   <Form.Text className="text-muted">Enter the code generated by your authenticator app.</Form.Text>
//                 </Form.Group>
                
//                 {/* Error from Redux state (400 for invalid code, 500 etc.) */}
//                 {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                
//                 <Button 
//                   type="submit"
//                   className="w-100 py-2 fw-semibold mt-3"
//                   disabled={isLoading || code.length !== 6}
//                   style={{ backgroundColor: "#3CB371", borderColor: "#3CB371", color: "white" }}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                       Confirming...
//                     </>
//                   ) : (
//                     "Confirm MFA Setup"
//                   )}
//                 </Button>
                
//                 <p className="text-center small text-muted mt-3">
//                   Warning: Multiple setup attempts rotate the secret; old codes will stop working.
//                 </p>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//     );
// };

// export default MfaSetupPage;