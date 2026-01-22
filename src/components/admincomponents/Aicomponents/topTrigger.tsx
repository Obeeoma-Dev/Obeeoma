import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import './aicomponent.css';

interface TriggerItem {
  name: string
  score: number
}

interface TopTriggersProps {
  triggers: TriggerItem[]
}

const TopTriggers: React.FC<TopTriggersProps> = ({ triggers }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        {/* Header */}
        <div className="mb-4 d-flex align-items-center" style={{ fontFamily: 'heading' }}>
          <ExclamationCircleFill className="me-2 text-danger" size={24} />
          <div>
            <Card.Title className="mb-0">Top Anxiety Triggers</Card.Title>
          </div>
        </div>

        {/* Trigger rows */}
        {triggers.map((trigger) => (
          <div key={trigger.name} className="mb-4">
            <Row className="align-items-center mb-2">
              <Col>
                <div className="fw-semibold" style={{ fontFamily: 'body' }}>
                  {trigger.name}
                </div>
              </Col>
              <Col xs="auto">
                <div className="fw-bold text-dark">{trigger.score}%</div>
              </Col>
            </Row>
            <ProgressBar
              now={trigger.score}
              className="trigger"
              style={{ height: '6px', backgroundColor: '#e9ecef' }} // background track
            >
              <div
                className="progress-bar"
                style={{
                  width: `${trigger.score}%`,
                  backgroundColor: '#0B6E45',
                }}
              />
            </ProgressBar>
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}

export default TopTriggers