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
        <Card className="p-4 shadow-sm">
            <h4 className="mb-4">Security Settings</h4>

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
            <h5 className="mb-3">Change Password</h5>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={settings.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Two-Factor Authentication Section */}
            <h5 className="mb-3">Two-Factor Authentication</h5>
            <Form.Check
                type="switch"
                id="two-factor-auth"
                label="Enhance your account security"
                checked={settings.twoFactorEnabled}
                onChange={handleToggle2FA}
                className="mb-4"
            />

            {/* Login Sessions Section */}
            <h5 className="mb-3">Login Sessions</h5>
            <div className="mb-2">
                <strong>Current Session:</strong> {settings.currentSession}
            </div>
            <div className="mb-4">
                <strong>Previous Session:</strong> {settings.previousSession}
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleSave}>
                    Save Security Settings
                </Button>
            </div>
        </Card>
    );
};

export default SecuritySettings;