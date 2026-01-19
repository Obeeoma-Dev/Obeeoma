// Import React (required for JSX and functional components)
import React from 'react'

// Import React-Bootstrap components
import { Card, Badge } from 'react-bootstrap'

// Import icon from lucide-react (allowed, not Tailwind related)
import { Building2 } from 'lucide-react'

// Import component-specific CSS (plain CSS, not Tailwind)
import './organizationUse.css'

// Define the props interface for strong typing and lint safety
interface OrganizationProfileProps {
    name: string
    id: string
    subscriptionPlan: string
    status: 'Active' | 'Inactive'
    region: string
    lastActive: string
}

// Export the component as a named export
export function OrganizationProfile({
    name,
    id,
    subscriptionPlan,
    status,
    region,
    lastActive
}: OrganizationProfileProps) {
    return (
        // Wrapper div to stack cards vertically
        <div className="organization-profile">

            {/* Main organization information card */}
            <Card className="mb-3">
                <Card.Body className="d-flex flex-column">
                    {/* Top content */}
                    <div>
                        <div className="text-center mb-3">
                            <div className="org-icon mb-2">
                                <Building2 size={40} />
                            </div>
                            <Card.Title className="mb-1" style={{ fontFamily: 'body' }}>
                                {name}
                            </Card.Title>
                            <Card.Text className="text-muted" style={{ fontFamily: 'body' }}>
                                ID: {id}
                            </Card.Text>
                        </div>

                        <hr />

                        {/* Info sections */}
                        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontFamily: 'body' }}>
                            <small className="text-muted">Subscription Plan</small>
                            <Badge bg="info">{subscriptionPlan}</Badge>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontFamily: 'body' }}>
                            <small className="text-muted">Status</small>
                            <Badge bg={status === 'Active' ? 'success' : 'secondary'}>{status}</Badge>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontFamily: 'body' }}>
                            <small className="text-muted">Region</small>
                            <strong>{region}</strong>
                        </div>
                    </div>

                    {/* Bottom-right aligned Last Active */}
                    <div className="d-flex justify-content-between align-items-center pe-2" style={{ fontFamily: 'body' }}>
                        <small className="text-muted">Last Active</small>
                        <strong>{lastActive}</strong>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
