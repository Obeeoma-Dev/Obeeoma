import React from 'react' // Import React for JSX support

// Import Card component from React-Bootstrap
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap'

// Import layout utility from React-Bootstrap
import Stack from 'react-bootstrap/Stack'

// Import Lucide icons (icons stay the same, only styling changes)
import { CreditCard, FileText } from 'lucide-react'

// Import component-specific CSS (NO Tailwind)
import './programEngagementChart'

/**
 * TypeScript interface defining the shape of an activity item
 */
interface ActivityItem {
    icon: React.ReactNode // Icon element to render
    title: string // Activity title text
    timestamp: string // Time description text
    iconBgClass: string // CSS class for icon background
}

/**
 * Static list of recent activities
 */
const activities: ActivityItem[] = [
    {
        icon: <CreditCard size={20} />, // Credit card icon
        title: 'Subscription Renewed',
        timestamp: '2 days ago • Premium Plan',
        iconBgClass: 'icon-bg-success'
    },
    {
        icon: <FileText size={20} />, // File icon
        title: 'Monthly Report Generated',
        timestamp: '1 week ago • August 2023',
        iconBgClass: 'icon-bg-success'
    }
]

/**
 * RecentActivity component
 */
export function RecentActivity() {
    return (


        <Row className="align-items-stretch">
            <Col md={6}>
                {/* Navigation / actions card */}
                <Card className="h-100">
                    <ListGroup variant="flush">

                        {/* Organization settings */}
                        <ListGroup.Item>
                            <Button variant="link" className="action-link" style={{
                                fontFamily: 'body', color: 'black', textDecoration: 'none'
                            }}>
                                Organization Settings
                            </Button>
                        </ListGroup.Item>

                        {/* User management */}
                        <ListGroup.Item>
                            <Button variant="link" className="action-link" style={{
                                fontFamily: 'body', color: 'black', textDecoration: 'none'
                            }}>
                                User Management
                            </Button>
                        </ListGroup.Item>

                        {/* Program settings */}
                        <ListGroup.Item>
                            <Button variant="link" className="action-link" style={{
                                fontFamily: 'body', color: 'black', textDecoration: 'none'
                            }}>
                                Program Settings
                            </Button>
                        </ListGroup.Item>

                        {/* Billing history */}
                        <ListGroup.Item>
                            <Button variant="link" className="action-link" style={{
                                fontFamily: 'body', color: 'black', textDecoration: 'none'
                            }}>
                                Billing History
                            </Button>
                        </ListGroup.Item>

                        {/* Deactivate action */}
                        <ListGroup.Item>
                            <Button variant="link" className="action-link text-danger" style={{
                                fontFamily: 'body', color: '#dc3545', textDecoration: 'none'
                            }}>
                                Deactivate Organization
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>




            <Col md={6}>

                <Card className="h-100">
                    {/* Card body wrapper */}
                    <Card.Body>

                        {/* Card title */}
                        <Card.Title className="recent-activity-title">
                            Recent Activity
                        </Card.Title>

                        {/* Vertical stack for activity items */}
                        <Stack gap={3}>
                            {activities.map((activity, index) => (

                                // Single activity row
                                <div
                                    key={index}
                                    className="activity-item"
                                >
                                    {/* Icon wrapper */}
                                    <div className={`activity-icon ${activity.iconBgClass}`}>
                                        {activity.icon}
                                    </div>

                                    {/* Text content */}
                                    <div className="activity-content">
                                        <div className="activity-title">
                                            {activity.title}
                                        </div>
                                        <div className="activity-timestamp">
                                            {activity.timestamp}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Stack>

                    </Card.Body>
                </Card>
            </Col>
        </Row>

    )
}
