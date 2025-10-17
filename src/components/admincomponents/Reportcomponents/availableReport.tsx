// src/components/admincomponents/reportcomponents/AvailableReports.tsx

import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const AvailableReports: React.FC = () => {
    // Placeholder list of reports
    const reports = [
        'Monthly Platform Usage Statistics',
        'All General Health Trends',
        'All Associated Interventions',
        'All Recommendation Effectiveness',
        'Hotline Activity Analysis',
    ];

    return (
        <Card className="mb-4">
            <Card.Header>Available Reports</Card.Header>
            <ListGroup variant="flush">
                {reports.map((report, index) => (
                    <ListGroup.Item key={index}>
                        📄 {report}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default AvailableReports;