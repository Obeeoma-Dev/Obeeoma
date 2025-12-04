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
            <Card.Header className="fw-semibold mb-4 ps-0">Security Settings</Card.Header>

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
            <div className="mb-5">
                <h6 className="fw-semibold mb-3">Change Password</h6>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group className="mb-0">
                            <Form.Label className="small fw-500">Current Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                />
                                <button className="btn btn-outline-secondary" type="button" aria-label="toggle visibility">👁️</button>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-0">
                            <Form.Label className="small fw-500">New Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={settings.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                />
                                <button className="btn btn-outline-secondary" type="button" aria-label="toggle visibility">👁️</button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="g-3 mt-0">
                    <Col md={12}>
                        <Form.Group className="mb-0">
                            <Form.Label className="small fw-500">Confirm New Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={settings.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                />
                                <button className="btn btn-outline-secondary" type="button" aria-label="toggle visibility">👁️</button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {/* Divider */}
            <hr style={{ margin: '2rem 0', borderColor: '#eef2f4' }} />

            {/* Two-Factor Authentication Section */}
            <div className="mb-5">
                <h6 className="fw-semibold mb-3">Two-Factor Authentication</h6>
                <div className="p-4 d-flex align-items-center justify-content-between" style={{ background: '#f8faf9', borderRadius: 8 }}>
                    <div className="d-flex align-items-center">
                        <div style={{ width: 44, height: 44, borderRadius: 44, background: '#eafaf1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, fontSize: '1.5rem' }}>
                            🔒
                        </div>
                        <div>
                            <div className="fw-semibold">Enhance your account security</div>
                            <div className="small text-muted">Add an extra layer of protection to your account</div>
                        </div>
                    </div>
                    <div>
                        <Form.Check
                            type="switch"
                            id="two-factor-auth"
                            checked={settings.twoFactorEnabled}
                            onChange={handleToggle2FA}
                            className="mb-0"
                        />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr style={{ margin: '2rem 0', borderColor: '#eef2f4' }} />

            {/* Login Sessions Section */}
            <div className="mb-5">
                <h6 className="fw-semibold mb-4">Login Sessions</h6>

                {/* Current Session */}
                <div className="mb-4 p-4 d-flex align-items-center justify-content-between" style={{ background: '#fff', borderTop: '1px solid #eef2f4', borderBottom: '1px solid #eef2f4' }}>
                    <div className="d-flex align-items-center">
                        <div style={{ width: 44, height: 44, borderRadius: 44, background: '#eafaf1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, fontSize: '1.5rem' }}>
                            🖥️
                        </div>
                        <div>
                            <div className="fw-semibold">Chrome on Windows</div>
                            <div className="small text-muted">Lagos, Nigeria · Active now</div>
                        </div>
                    </div>
                    <div>
                        <span className="badge bg-success" style={{ borderRadius: 20, padding: '6px 12px' }}>Current</span>
                    </div>
                </div>

                {/* Previous Session */}
                <div className="mb-4 p-4 d-flex align-items-center justify-content-between" style={{ background: '#fff', borderTop: '1px solid #eef2f4', borderBottom: '1px solid #eef2f4' }}>
                    <div className="d-flex align-items-center">
                        <div style={{ width: 44, height: 44, borderRadius: 44, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, fontSize: '1.5rem' }}>
                            📱
                        </div>
                        <div>
                            <div className="fw-semibold">Safari on iPhone</div>
                            <div className="small text-muted">Lagos, Nigeria · 2 hours ago</div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-link text-danger p-0">Revoke</button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end gap-2 pt-4 border-top">
                <Button className="settings-save-btn" size="sm" onClick={handleSave}>
                    Save Security Settings
                </Button>
            </div>
        </Card>
    );
};

export default SecuritySettings;