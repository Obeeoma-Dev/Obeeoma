import React from 'react';

// I AM USGING THIS FILE TO CORRECT MY CLIENT ENGAGMENT. 
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Badge,
    Form,
    InputGroup,
} from 'react-bootstrap';
import {
    TrendingUp,
    Award,
    Gift,
    Flame,
    ArrowUp,
    Search,
} from 'lucide-react';
// import { Layout } from '../components/Layout';

/**
 * Static statistics displayed at the top of the page
 */
const stats = [
    {
        name: 'Engagement Rate',
        value: '78%',
        change: '+5% this week',
        icon: TrendingUp,
        variant: 'success',
    },
    {
        name: 'Active Reward Programs',
        value: '12',
        change: '+2 this month',
        icon: Award,
        variant: 'primary',
    },
    {
        name: 'Rewards Assisted',
        value: '285,432',
        change: '+15% this month',
        icon: Gift,
        variant: 'secondary',
    },
];

/**
 * Client engagement data
 */
const clients = [
    {
        name: 'Madison Carano',
        organization: 'HealthOne',
        engagement: 'High',
        rate: '92%',
        points: '1,200',
        lastActivity: '2h ago',
        status: 'Active',
    },
    {
        name: 'William Johnson',
        organization: 'MediCare',
        engagement: 'High',
        rate: '88%',
        points: '980',
        lastActivity: '3h ago',
        status: 'Active',
    },
    {
        name: 'Vanessa Jefferson',
        organization: 'HealthOne',
        engagement: 'Low',
        rate: '45%',
        points: '1,100',
        lastActivity: '1h ago',
        status: 'Low Engagement',
    },
    {
        name: 'Preston Corbett',
        organization: 'WellnessCo',
        engagement: 'Medium',
        rate: '67%',
        points: '870',
        lastActivity: '5h ago',
        status: 'Active',
    },
];

/**
 * Top reward earners
 */
const topRewards = [
    { name: 'Madison Carano', points: '1,200 pts' },
    { name: 'William Johnson', points: '980 pts' },
    { name: 'Preston Corbett', points: '870 pts' },
];

/**
 * Engagement trends
 */
const trends = [
    { label: 'Course Completion', value: '+12%' },
    { label: 'Reward Redemption', value: '+8%' },
    { label: 'Member Activity', value: '+5%' },
];

/**
 * Streak statistics
 */
const streaks = [
    { label: '7-Day Streak', value: '65%', icon: '🔥' },
    { label: '30-Day Streak', value: '45%', icon: '🔥' },
    { label: '60-Day Streak', value: '30%', icon: '💧' },
];

export function ClientEngagement() {
    return (
        // <Layout title="Client Engagement">
        <Container fluid>

            {/* ===== PAGE HEADER ===== */}
            <div className="mb-4">
                <h2>Client Engagement & Rewards</h2>
                <p className="text-muted">
                    Monitor client activity and reward program performance.
                </p>
            </div>

            {/* ===== STATS CARDS ===== */}
            <Row className="mb-4">
                {stats.map((stat) => (
                    <Col key={stat.name} md={4}>
                        <Card className="mb-3 shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                    <stat.icon size={28} />
                                    <small className="text-success">{stat.change}</small>
                                </div>

                                <h3 className="mt-3">{stat.value}</h3>
                                <Card.Text className="text-muted">
                                    {stat.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ===== SEARCH BAR ===== */}
            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Text>
                            <Search size={18} />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search patients by name or organization..."
                            aria-label="Search clients"
                        />
                    </InputGroup>
                </Col>
            </Row>

            {/* ===== CLIENT TABLE ===== */}
            <Card className="mb-4 shadow-sm">
                <Card.Header>
                    <strong>Client Engagement Table</strong>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Organization</th>
                                <th>Engagement</th>
                                <th>Rate</th>
                                <th>Points</th>
                                <th>Last Activity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.name}>
                                    <td>{client.name}</td>
                                    <td>{client.organization}</td>
                                    <td>
                                        <Badge bg={
                                            client.engagement === 'High'
                                                ? 'danger'
                                                : client.engagement === 'Low'
                                                    ? 'info'
                                                    : 'warning'
                                        }>
                                            {client.engagement}
                                        </Badge>
                                    </td>
                                    <td>{client.rate}</td>
                                    <td>{client.points}</td>
                                    <td>{client.lastActivity}</td>
                                    <td>
                                        <Badge bg={client.status === 'Active' ? 'success' : 'secondary'}>
                                            {client.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* ===== BOTTOM CARDS ===== */}
            <Row>
                <Col md={4}>
                    <Card className="mb-3 shadow-sm">
                        <Card.Body>
                            <Award size={20} className="mb-2" />
                            <h5>Top Rewards</h5>
                            {topRewards.map((reward, index) => (
                                <div key={reward.name} className="d-flex justify-content-between">
                                    <span>#{index + 1} {reward.name}</span>
                                    <strong>{reward.points}</strong>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3 shadow-sm">
                        <Card.Body>
                            <TrendingUp size={20} className="mb-2" />
                            <h5>Engagement Trends</h5>
                            {trends.map((trend) => (
                                <div key={trend.label} className="d-flex justify-content-between">
                                    <span>{trend.label}</span>
                                    <span className="text-success">
                                        <ArrowUp size={14} /> {trend.value}
                                    </span>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3 shadow-sm">
                        <Card.Body>
                            <Flame size={20} className="mb-2" />
                            <h5>Streak Statistics</h5>
                            {streaks.map((streak) => (
                                <div key={streak.label} className="d-flex justify-content-between">
                                    <span>{streak.icon} {streak.label}</span>
                                    <strong>{streak.value}</strong>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
        // </Layout>
    );
}
