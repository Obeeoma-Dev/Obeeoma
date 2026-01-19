import React from 'react' 
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import { CreditCard, FileText } from 'lucide-react'
import './programEngagementChart'

interface ActivityItem {
    icon: React.ReactNode 
    title: string 
    timestamp: string
    iconBgClass: string 
}

/* Static list of recent activities */
const activities: ActivityItem[] = [
    {
        icon: <CreditCard size={20} />, 
        title: 'Subscription Renewed',
        timestamp: '2 days ago • Premium Plan',
        iconBgClass: 'icon-bg-success'
    },
    {
        icon: <FileText size={20} />, 
        title: 'Monthly Report Generated',
        timestamp: '1 week ago • August 2023',
        iconBgClass: 'icon-bg-success'
    }
]


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
