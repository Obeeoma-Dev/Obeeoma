import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

// Define the shape of security settings using TypeScript
export interface SecuritySettingsState {
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
    currentSession: string;
    previousSession: string;
}

// Main component
const SecuritySettings: React.FC = () => {
    // Local state with placeholder data
    const [settings, setSettings] = useState<SecuritySettingsState>({
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        currentSession: 'Active Now',
        previousSession: '11/21/2023, 09:45 AM',
    });

    // Feedback state
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');

    // Handle input changes for password fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Toggle two-factor authentication
    const handleToggle2FA = () => {
        setSettings((prev) => ({
            ...prev,
            twoFactorEnabled: !prev.twoFactorEnabled,
        }));
    };

    // Save handler (backend-ready placeholder)
    const handleSave = async () => {
        setSaveSuccess(false);
        setSaveError('');

        // Basic validation
        if (
            settings.newPassword &&
            settings.newPassword !== settings.confirmPassword
        ) {
            setSaveError('Passwords do not match.');
            return;
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Saving security settings:', settings);
            setSaveSuccess(true);
        } catch {
            setSaveError('Failed to save settings. Please try again.');
        }
    };

    return (
        <Card className="settings-card-compact shadow-sm border-0">
            <Card.Header className="fw-semibold mb-2 ps-0">Security Settings</Card.Header>

            {/* Success message */}
            {saveSuccess && (
                <Alert variant="success" onClose={() => setSaveSuccess(false)} dismissible>
                    Security settings saved successfully.
                </Alert>
            )}

            {/* Error message */}
            {saveError && (
                <Alert variant="danger" onClose={() => setSaveError('')} dismissible>
                    {saveError}
                </Alert>
            )}

            {/* Change Password Section */}
            <div className="mb-3 p-2 border rounded-2 settings-section-compact">
            <h6 className="fw-semibold mb-2">Change Password</h6>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-500">New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={settings.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-0">
                        <Form.Label className="small fw-500">Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                                    <Card className="settings-card-compact shadow-sm border-0 p-4">
                                        <Card.Header className="fw-semibold mb-3 ps-0">Security Settings</Card.Header>
                    </Form.Group>
                </Col>
            </Row>
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="mb-3 p-2 border rounded-2 settings-section-compact">
            <h6 className="fw-semibold mb-2">Two-Factor Authentication</h6>
            <Form.Check
                type="switch"
                id="two-factor-auth"
                label="Enhance your account security"
                checked={settings.twoFactorEnabled}
                                        <div className="mb-4">
                className="mb-0"
            />
            </div>

                        {/* Login Sessions Section */}
                        <div className="mb-4">
                            <h6 className="fw-semibold mb-3">Login Sessions</h6>

                            <div className="mb-3 p-3 border rounded-2 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{width:40, height:40, borderRadius:40, background:'#eafaf1', display:'flex', alignItems:'center', justifyContent:'center', marginRight:12}}>🖥️</div>
                                    <div>
                                        <div className="fw-semibold">Chrome on Windows</div>
                                        <div className="small text-muted">Lagos, Nigeria · Active now</div>
                                    </div>
                                </div>
                                <div><span className="badge bg-success" style={{borderRadius:20, padding:'6px 10px'}}>Current</span></div>
                            </div>

                            <div className="mb-3 p-3 border rounded-2 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{width:40, height:40, borderRadius:40, background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', marginRight:12}}>📱</div>
                                    <div>
                                        <div className="fw-semibold">Safari on iPhone</div>
                                        <div className="small text-muted">Lagos, Nigeria · 2 hours ago</div>
                                        </div>
                                </div>
                                        <div className="mb-4">
                            </div>
                        </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                <Button className="settings-save-btn" size="sm" onClick={handleSave}>
                    Save Security Settings
                </Button>
            </div>
                                        </div>
    );
};

export default SecuritySettings;