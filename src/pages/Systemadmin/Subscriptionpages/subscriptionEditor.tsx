// src/components/admincomponents/Subscriptionpages/SubscriptionEditor.tsx

import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

// Import styled sidebar and header components
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import AdminHeader from '../../../components/admincomponents/adminheader';

// Define the shape of a subscription plan using TypeScript interface
export interface SubscriptionPlan {
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    features: {
        basicResources: boolean;
        liveWebinars: boolean;
        clientEngagement: boolean;
        mentorship: boolean;
        upTo50Employees: boolean;
    };
}

// Default plan data (can be replaced with props or API response)
const defaultPlan: SubscriptionPlan = {
    name: 'Basic',
    description: 'Essential mental health resources for small organizations.',
    monthlyPrice: 5.99,
    annualPrice: 59.99,
    features: {
        basicResources: true,
        liveWebinars: false,
        clientEngagement: false,
        mentorship: false,
        upTo50Employees: false,
    },
};

// Main component
const SubscriptionEditor: React.FC = () => {
    // Local state to hold form data
    const [plan, setPlan] = useState<SubscriptionPlan>(defaultPlan);

    // Handle input changes for text and number fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setPlan((prev) => ({
            ...prev,
            [name]: name.includes('Price') ? parseFloat(value) : value,
        }));
    };

    // Toggle individual feature checkboxes
    const handleFeatureToggle = (
        featureKey: keyof SubscriptionPlan['features']
    ) => {
        setPlan((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [featureKey]: !prev.features[featureKey],
            },
        }));
    };

    // Placeholder for save logic (connect to backend later)
    const handleSave = () => {
        console.log('Saving plan:', plan);
        // TODO: Send plan to backend via API
    };

    // Placeholder for delete logic
    const handleDelete = () => {
        console.log('Deleting plan:', plan.name);
        // TODO: Call delete API
    };

    return (
        // Full-height layout with sidebar and header
        <div className="d-flex vh-100">
            {/* Sidebar stays fixed on the left */}
            <div className="flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Main content area grows to fill remaining space */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Fixed header at the top */}
                <div style={{ flexShrink: 0 }}>
                    <AdminHeader />
                </div>

                {/* Scrollable content below header */}
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        padding: '2rem',
                        backgroundColor: '#f8f9fa',
                    }}
                >
                    <Card className="p-4 shadow-sm">
                        <h4 className="mb-3">Plan Name: {plan.name}</h4>

                        {/* Description field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={plan.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Pricing fields */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Price (USD)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="monthlyPrice"
                                        value={plan.monthlyPrice}
                                        onChange={handleChange}
                                        min={0}
                                        step={0.01}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Annual Price (USD)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="annualPrice"
                                        value={plan.annualPrice}
                                        onChange={handleChange}
                                        min={0}
                                        step={0.01}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Feature checkboxes */}
                        <div className="mb-3">
                            <Form.Label>Plan Features</Form.Label>
                            <div className="d-flex flex-column gap-2">
                                {Object.entries(plan.features).map(([key, value]) => (
                                    <Form.Check
                                        key={key}
                                        type="checkbox"
                                        label={formatFeatureLabel(key)}
                                        checked={value}
                                        onChange={() =>
                                            handleFeatureToggle(key as keyof typeof plan.features)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button variant="success" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Helper to format feature keys into readable labels
const formatFeatureLabel = (key: string): string => {
    const map: Record<string, string> = {
        basicResources: 'Access to basic resources',
        liveWebinars: 'Access to live webinars',
        clientEngagement: 'Client engagement',
        mentorship: 'Mentorship',
        upTo50Employees: 'Up to 50 employees',
    };
    return map[key] || key;
};

export default SubscriptionEditor;