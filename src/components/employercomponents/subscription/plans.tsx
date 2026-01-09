import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';

const THEME_COLOR = '#22C55E';

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  users: string;
  storage: string;
  support: string;
  level: number;
}

export const plans: Plan[] = [
  { id: 'free', name: 'Free Plan', monthlyPrice: 0, annualPrice: 0, users: '1 User', storage: '1 GB', support: 'Community', level: 0 },
  { id: 'basic', name: 'Basic Plan', monthlyPrice: 29, annualPrice: 24, users: '10 Users', storage: '10 GB', support: 'Email Support', level: 1 },
];

interface ChangePlanModalProps {
  show: boolean;
  onHide: () => void;
  currentPlanId: string;
  onConfirm: (newPlan: Plan, billingCycle: 'monthly' | 'annually') => void;
}

export const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ show, onHide, currentPlanId, onConfirm }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleConfirmClick = () => {
    const selectedPlan = plans.find(p => p.id === (selectedPlanId || currentPlanId));
    if (selectedPlan) {
      onConfirm(selectedPlan, isAnnual ? 'annually' : 'monthly');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold" style={{ color: THEME_COLOR, fontFamily: 'body' }}>
          Upgrade or Change Your Plan
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="px-4">
        <p className="mb-4 fw-bold text-black" style={{ fontFamily: 'heading' }}>
          Select your new tier below to update your subscription.
        </p>

        <div className="d-flex justify-content-center align-items-center mb-5">
          <span className={!isAnnual ? 'fw-bold' : ''} style={{ color: '#000', fontFamily: 'body' }}>Monthly</span>
          <Form.Check 
            type="switch"
            id="billing-toggle"
            className="mx-3 custom-green-switch"
            checked={isAnnual}
            onChange={() => setIsAnnual(!isAnnual)}
          />
          <span className={isAnnual ? 'fw-bold' : ''} style={{ color: '#000', fontFamily: 'body' }}>Annually</span>
        </div>

        <Row className="g-4">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const isSelected = selectedPlanId === plan.id;

            return (
              <Col md={6} key={plan.id}>
                <Card 
                  className="h-100 shadow-sm"
                  style={{ 
                    cursor: isCurrent ? 'default' : 'pointer',
                    border: (isCurrent || isSelected) ? `2px solid ${THEME_COLOR}` : '1px solid #dee2e6',
                  }}
                  onClick={() => !isCurrent && setSelectedPlanId(selectedPlanId === plan.id ? null : plan.id)}
                >
                  <Card.Body className="d-flex flex-column text-black">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="fw-bold" style={{ color: THEME_COLOR, fontFamily: 'body' }}>{plan.name}</h4>
                    </div>

                    <div className="mb-4 text-center">
                       <h2 className="fw-bold text-black" style={{ fontFamily: 'body' }}>
                         ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                         <small className="fs-6 text-muted" style={{ fontFamily: 'body' }}> /mo</small>
                       </h2>
                    </div>

                    <div className="flex-grow-1 mb-4" style={{ fontSize: '0.9rem', color: '#000' , fontFamily: 'body' }}>
                        <div className="mb-2"><strong>Users:</strong> {plan.users}</div>
                        <div className="mb-2"><strong>Storage:</strong> {plan.storage}</div>
                        <div className="mb-2"><strong>Support:</strong> {plan.support}</div>
                    </div>

                    <Button 
                      className="w-100 rounded-pill fw-bold"
                      style={{ 
                        // Updated to ensure font family applies to all states
                        fontFamily: 'body', 
                        backgroundColor: isCurrent ? '#E5E7EB' : (isSelected ? THEME_COLOR : 'transparent'), 
                        borderColor: isCurrent ? '#E5E7EB' : THEME_COLOR,
                        color: isCurrent ? '#6B7280' : (isSelected ? '#fff' : THEME_COLOR),
                        transition: '0.3s'
                      }}
                      disabled={isCurrent}
                    >
                      {/* Font family is inherited here from the button style */}
                      {isCurrent ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="border-0 justify-content-center pb-4">
        <Button 
          className="px-5 py-2 fw-bold border-0 shadow" 
          style={{ backgroundColor: THEME_COLOR, color: '#fff', fontFamily: 'body' }}
          onClick={handleConfirmClick}
          disabled={!selectedPlanId}
        >
          Confirm Plan Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePlanModal;