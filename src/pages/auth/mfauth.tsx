import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Button, Card, Form } from 'react-bootstrap';
import logo from './../../assets/Images/obeeomalogoword1.png';

// Enhanced: Now properly wrapped within MfaSetupPage function component
const MfaSetupPage: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [qrcode, setQrcode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Enhanced QR Code generation function
  const GenerateQRCode = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL or text');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate QR code with proper settings
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#022514ff', // Black squares
          light: '#FFFFFF' // White background
        }
      });
      setQrcode(qrCodeDataURL);
    } catch (err) {
      console.error('QR Code generation failed:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Clear QR code
  const clearQRCode = () => {
    setQrcode('');
    setUrl('https://example.com');
    setError('');
  };

  // Proper return statement for the React component with enhanced UI
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 p-3"
      style={{ backgroundColor: "#f5f5f5" }}
    >
          
      <Card className="shadow-sm p-4" style={{ maxWidth: "600px", width: "100%", borderRadius: "8px" }}>
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
        <Card.Body>
          <h3 className="text-center mb-4 fw-semibold">QR Code Generator</h3>
          <p className="text-center text-muted mb-4">
            Enter a URL or text below to generate a QR code
          </p>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="e.g. https://google.com or Hello World"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-3"
            />

            {/* Error message */}
            {error && (
              <div className="text-danger small mb-3">{error}</div>
            )}

            <div className="d-flex gap-2">
              <Button
                onClick={GenerateQRCode}
                disabled={isGenerating}
                className="flex-grow-1"
                style={{
                  backgroundColor: "#28a745",
                  borderColor: "#28a745"
                }}
              >
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>

              {qrcode && (
                <Button
                  variant="outline-secondary"
                  onClick={clearQRCode}
                >
                  Clear
                </Button>
              )}
            </div>
          </Form.Group>

          {/* Authenticator Code Input */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="6-digit code"
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]{6}"
              className="text-center py-2"
              style={{ fontSize: '1.2rem', letterSpacing: '8px' }}
            />
            <Form.Text className="text-muted">
              Open your authenticator app and enter the 6-digit code
            </Form.Text>
          </Form.Group>

          {/* QR Code Display */}
          {qrcode && (
            <div className="text-center">
              <div className="qr-code p-3 border rounded mb-3 bg-white">
                <img
                  src={qrcode}
                  alt="Generated QR Code"
                  style={{ maxWidth: '200px', height: '200px' }}
                  className="img-fluid"
                />
              </div>

              {/* Download link */}
              <a
                href={qrcode}
                download="qrcode.png"
                className="btn btn-outline-primary me-2"
                style={{ textDecoration: 'none' }}
              >
                 Download QR Code
              </a>

              <small className="text-muted d-block mt-2">
                Generated for: <code>{url}</code>
              </small>
            </div>
          )}

          {/* Instructions */}
          {!qrcode && (
            <div className="text-center text-muted small">
              <em>Try entering a URL like "https://google.com" or any text!</em>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MfaSetupPage;